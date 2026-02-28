export const getToken = () => localStorage.getItem('token')
export const setToken = (token) => localStorage.setItem('token', token)
export const removeToken = () => localStorage.removeItem('token')

export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user))
export const removeUser = () => localStorage.removeItem('user')

export const getRefreshToken = () => localStorage.getItem('refreshToken')
export const setRefreshToken = (token) => localStorage.setItem('refreshToken', token)
export const removeRefreshToken = () => localStorage.removeItem('refreshToken')

export const clearStorage = () => {
  removeToken()
  removeUser()
  removeRefreshToken()
}