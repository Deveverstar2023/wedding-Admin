// add user

export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

// remove user
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}

// get user
export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user')
  const user = result ? JSON.parse(result) : null
  return user
}

// get  token
export const getLocalAccessToken = () => {
  const user = getUserFromLocalStorage()
  if (!user) return null
  return user.token
}
export const getLocalRefreshToken = () => {
  const user = getUserFromLocalStorage()
  return user.token
}

export const updateLocalAccessToken = (newAccessToken) => {
  const user = getUserFromLocalStorage()
  user.tokens.accessToken = newAccessToken
  addUserToLocalStorage(user)
}
