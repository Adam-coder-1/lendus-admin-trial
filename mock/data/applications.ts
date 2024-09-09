import type { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import { resultError, resultPageSuccess, resultSuccess } from '../_utils'

const genList = () => {
  const list: any[] = []
  for (let index = 0; index < 35; index++) {
    const num = index < 10 ? '0' + index : index
    list.push({
      id: Number(`10${num}`) + 1 + '',
      name: Random.name(),
      step: Math.floor(Math.random() * 7)
    })
  }
  return list
}
const tableList = genList()

const createFakeFormList = () => {
  return [
    {
      horizontalTabId: 'Application Preparation',
      verticalTabId: 'Loan Parties',
      header: 'Loan Party #1',
      firstName: 'Jane',
      middleName: '',
      lastName: 'Doe',
      title: 'Mrs',
      birth: '2024-09-07T16:00:00.000Z',
      email: 'jane@doe.com',
      employmentStatus: 'Employed',
      address: '10 Old South Head Road, Rose Bay, 2029, Australia',
      phone: '111111111',
      residencyStatus: 'Citizen'
    },
    {
      horizontalTabId: 'Application Preparation',
      verticalTabId: 'Loan Parties',
      header: 'Loan Party #2',
      firstName: 'Jane',
      middleName: '',
      lastName: 'Doe',
      title: 'Mrs',
      birth: null,
      email: 'jane@doe.com',
      employmentStatus: 'Employed',
      address: '10 Old South Head Road, Rose Bay, 2029, Australia',
      phone: '111111111',
      residencyStatus: 'Citizen'
    }
  ]
}
let formList = createFakeFormList()

function updateData(arr, prop, updateList) {
  return arr.map(item => {
    updateList.forEach(update => {
      if (item[prop] === update[prop]) {
        item = { ...item, ...update }
      }
    })
    return item
  })
}
export default [
  {
    url: '/api/applications/getList',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { current = 1, pageSize = 10 } = query
      return resultPageSuccess(current, pageSize, tableList)
    }
  },
  {
    url: '/api/applications/getDetail',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      const detail = tableList.find(item => item.id === id)
      if (detail) {
        return resultSuccess(detail)
      } else {
        return resultError('No detail found')
      }
    }
  },
  {
    url: '/api/applications/getFormList',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { horizontalTabId, verticalTabId } = query
      const detailList = formList.filter(
        item => item.horizontalTabId === horizontalTabId && item.verticalTabId === verticalTabId
      )
      if (detailList?.length) {
        return resultSuccess(detailList)
      } else {
        return resultError('No details found')
      }
    }
  },
  {
    url: '/api/applications/updateFormList',
    timeout: 200,
    method: 'put',
    response: ({ body }) => {
      formList = updateData(formList, 'header', body)
      return resultSuccess(body, { message: 'Application data is modified successfully.' })
    }
  }
] as MockMethod[]
