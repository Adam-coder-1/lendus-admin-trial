import type { ColumnsType } from 'antd/es/table'
import { type FC, useState, useEffect } from 'react'
import { type TableProps, Card, Button, Table, Space, Modal, Form } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { getApplicationList } from '@/api'
import type { APIResult, PageState, TableDataType } from './types'
import { useNavigate } from 'react-router-dom'

interface Params {
  id: number
}

const TableBasic: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<TableDataType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<PageState>({ current: 1, pageSize: 10 })

  const columns: ColumnsType<TableDataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    },
    {
      title: 'name',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: 'Operate',
      key: 'action',
      align: 'center',
      render: (_, record: any) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={handleDelete}>
            Delete
          </Button>
        </Space>
      )
    }
  ]

  const tableSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: any[]) => {
      console.log(selectedRowKeys)
    }
  }

  useEffect(() => {
    fetchData()
  }, [tableQuery])

  // fetch the application list
  async function fetchData() {
    setTableLoading(true)
    const data = await getApplicationList(tableQuery)
    const { list, total } = data as unknown as APIResult
    setTableData(list)
    setTableTotal(total)
    setTableLoading(false)
  }

  /**
   * Handles the change of pagination for a table.
   * This function is responsible for updating the pagination state of a table.
   *
   * @param page The new page number.
   * @param pageSize The new page size.
   */
  function handlePageChange(page: number, pageSize: number) {
    setTableQuery({ ...tableQuery, current: page, pageSize })
  }

  // handle the logic of the delete button
  function handleDelete() {
    Modal.confirm({
      title: 'This operation will delete the selected data. Do you want to continue?',
      icon: <ExclamationCircleOutlined rev={undefined} />,
      // okType: 'danger',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  // handle the logic of the edit button
  const navigate = useNavigate()
  function handleEdit(record: TableDataType) {
    navigate(`./detail?id=${record.id}`)
  }

  return (
    <Card bordered={false}>
      <Table
        rowKey='id'
        rowSelection={tableSelection}
        columns={columns}
        dataSource={tableData}
        loading={tableLoading}
        pagination={{
          current: tableQuery.current,
          pageSize: tableQuery.pageSize,
          total: tableTotal,
          showTotal: () => `Total ${tableTotal} items`,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: handlePageChange
        }}
      />
    </Card>
  )
}

export default TableBasic
