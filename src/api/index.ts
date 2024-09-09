import { service } from '@/utils/axios'
import type { LoanPartyFormParams, PageState } from '@/views/applications/types'

interface LoginParams {
  username: string
  password: string
}

// User login api
export function loginApi(data: LoginParams): Promise<any> {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

// Get User info
export function getUserInfo(): Promise<any> {
  return service({
    url: '/getUserInfo',
    method: 'get'
  })
}

// User logout api
export function logoutApi() {
  return service({
    url: '/logout',
    method: 'get'
  })
}

// applications list
export function getApplicationList(params: PageState) {
  return service({
    url: '/applications/getList',
    method: 'get',
    params
  })
}

// applications detail
export function getApplicationDetail(params: { id: string }): Promise<{ id: string; name: string; step: number }> {
  return service({
    url: '/applications/getDetail',
    method: 'get',
    params
  })
}

// applications formList
export function getApplicationFormList(params: {
  applicationId: string
  horizontalTabId: string
  verticalTabId: string
}): Promise<LoanPartyFormParams[]> {
  return service({
    url: '/applications/getFormList',
    method: 'get',
    params
  })
}

// applications update
export function updateApplication(data: LoanPartyFormParams[]) {
  return service({
    url: '/applications/updateFormList',
    method: 'put',
    data
  })
}
