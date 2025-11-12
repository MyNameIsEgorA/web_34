export type UserRole = "admin" | "user"
export type UserStatus = "active" | "inactive" | 'banned'

export type UserDTO = {
    id: number
    name: string
    birthDate: string
    email: string
    avatar: string | null
    role: UserRole
    status: UserStatus
    password: string
}