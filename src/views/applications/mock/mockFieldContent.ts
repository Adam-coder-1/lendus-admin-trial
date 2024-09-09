import type { DynamicFormContent } from '@/components/DynamicForm/src/types'

export const applicationPreparationFieldContent: DynamicFormContent[] = [
  {
    title: 'Loan Party #1',
    fields: [
      {
        type: 'input',
        label: 'First Name',
        name: 'firstName',
        placeholder: 'Input First Name',
        required: true
      },
      {
        type: 'input',
        label: 'Middle Name',
        name: 'middleName',
        placeholder: 'Input Middle Name'
      },
      {
        type: 'input',
        label: 'Last Name',
        name: 'lastName',
        placeholder: 'Input First Name',
        required: true
      },
      {
        type: 'select',
        label: 'Title',
        name: 'title',
        placeholder: 'Select Title',
        options: [
          { value: 'Mr', label: 'Mr' },
          { value: 'Mrs', label: 'Mrs' }
        ]
      },
      {
        type: 'date',
        label: 'Date of Birth',
        name: 'birth',
        placeholder: 'Select Date of Birth'
      },
      {
        type: 'input',
        label: 'Email Address',
        name: 'email',
        placeholder: 'Input Email Address',
        suffix: 'MailOutlined',
        required: true
      },
      {
        type: 'select',
        label: 'Employment Status',
        name: 'employmentStatus',
        placeholder: 'Select Employment Status',
        options: [
          { value: 'Employed', label: 'Employed' },
          { value: 'RecentlyEmployed', label: 'Recently Employed' },
          { value: 'NewHireOnProbation', label: 'New Hire on Probation' }
        ]
      },
      {
        type: 'input',
        label: 'Mobile Number',
        name: 'phone',
        placeholder: 'Input Mobile Number',
        suffix: 'PhoneOutlined',
        required: true
      },
      {
        type: 'select',
        label: 'Residency Status',
        name: 'residencyStatus',
        placeholder: 'Select Residency Status',
        options: [
          { value: 'Citizen', label: 'Citizen' },
          { value: 'Refugee', label: 'Refugee' },
          { value: 'NewImmigrant', label: 'New Immigrant' }
        ]
      },
      {
        type: 'autoComplete',
        label: 'Residential Address',
        name: 'address',
        placeholder: 'Input Residential Address',
        options: [
          {
            label: 'Sydney',
            value: 'Sydney'
          },
          {
            label: 'Melbourne',
            value: 'Melbourne'
          },
          {
            label: 'Brisbane',
            value: 'Brisbane'
          },
          {
            label: 'Perth',
            value: 'Perth'
          },
          {
            label: 'Adelaide',
            value: 'Adelaide'
          },
          {
            label: 'Gold Coast',
            value: 'Gold Coast'
          },
          {
            label: 'Canberra',
            value: 'Canberra'
          },
          {
            label: 'Newcastle',
            value: 'Newcastle'
          },
          {
            label: 'Wollongong',
            value: 'Wollongong'
          },
          {
            label: '10 Old South Head Road, Rose Bay, 2029, Australia',
            value: '10 Old South Head Road, Rose Bay, 2029, Australia'
          }
        ],
        suffix: 'EnvironmentOutlined'
      }
    ]
  },
  {
    title: 'Loan Party #2',
    fields: [
      {
        type: 'input',
        label: 'First Name',
        name: 'firstName',
        placeholder: 'Input First Name',
        required: true
      },
      {
        type: 'input',
        label: 'Middle Name',
        name: 'middleName',
        placeholder: 'Input Middle Name'
      },
      {
        type: 'input',
        label: 'Last Name',
        name: 'lastName',
        placeholder: 'Input First Name',
        required: true
      },
      {
        type: 'select',
        label: 'Title',
        name: 'title',
        placeholder: 'Select Title',
        options: [
          { value: 'Mr', label: 'Mr' },
          { value: 'Mrs', label: 'Mrs' }
        ]
      },
      {
        type: 'date',
        label: 'Date of Birth',
        name: 'birth',
        placeholder: 'Select Date of Birth'
      },
      {
        type: 'input',
        label: 'Email Address',
        name: 'email',
        placeholder: 'Input Email Address',
        suffix: 'MailOutlined',
        required: true
      },
      {
        type: 'select',
        label: 'Employment Status',
        name: 'employmentStatus',
        placeholder: 'Select Employment Status',
        options: [
          { value: 'Employed', label: 'Employed' },
          { value: 'RecentlyEmployed', label: 'Recently Employed' },
          { value: 'NewHireOnProbation', label: 'New Hire on Probation' }
        ]
      },
      {
        type: 'input',
        label: 'Mobile Number',
        name: 'phone',
        placeholder: 'Input Mobile Number',
        suffix: 'PhoneOutlined',
        required: true
      },
      {
        type: 'select',
        label: 'Residency Status',
        name: 'residencyStatus',
        placeholder: 'Select Residency Status',
        options: [
          { value: 'Citizen', label: 'Citizen' },
          { value: 'Refugee', label: 'Refugee' },
          { value: 'NewImmigrant', label: 'New Immigrant' }
        ]
      },
      {
        type: 'autoComplete',
        label: 'Residential Address',
        name: 'address',
        placeholder: 'Input Residential Address',
        options: [
          {
            label: 'Sydney',
            value: 'Sydney'
          },
          {
            label: 'Melbourne',
            value: 'Melbourne'
          },
          {
            label: 'Brisbane',
            value: 'Brisbane'
          },
          {
            label: 'Perth',
            value: 'Perth'
          },
          {
            label: 'Adelaide',
            value: 'Adelaide'
          },
          {
            label: 'Gold Coast',
            value: 'Gold Coast'
          },
          {
            label: 'Canberra',
            value: 'Canberra'
          },
          {
            label: 'Newcastle',
            value: 'Newcastle'
          },
          {
            label: 'Wollongong',
            value: 'Wollongong'
          },
          {
            label: '10 Old South Head Road, Rose Bay, 2029, Australia',
            value: '10 Old South Head Road, Rose Bay, 2029, Australia'
          }
        ],
        suffix: 'EnvironmentOutlined'
      }
    ]
  }
]
