import validator from 'validator'

export const validateEmail = (rule: any, value: string) => {
  if (value && !validator.isEmail(value)) {
    return Promise.reject('Please enter a valid email address')
  }
  return Promise.resolve()
}

export const validatePhoneNumber = (rule: any, value: string) => {
  if (value && !validator.isMobilePhone(value, 'any')) {
    return Promise.reject('Please enter a valid mobile number')
  }
  return Promise.resolve()
}
