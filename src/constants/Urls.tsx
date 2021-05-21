export const baseUrl: string = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : ''

export const usersUrl: string = baseUrl + 'users'