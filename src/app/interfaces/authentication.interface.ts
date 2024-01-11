import { User } from "./user.interface"

export interface LoginResponse {
  token: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterUserResponse {
  message: string
  data: User
}
