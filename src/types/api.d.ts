/** Shared response envelope used across more than one feature. */
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface ApiError {
  message: string
  statusCode: number
}
