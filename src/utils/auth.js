
export let TokenKey = 'x-auth-Token'
export function getToken () {
  return sessionStorage.getItem(TokenKey)
}
export function setToken (token) {
  sessionStorage.setItem(TokenKey, token)
}
export function removeToken () {
  sessionStorage.removeItem(TokenKey)
}

let limited = 'x-auth-limited'
export function getLimited () {
  return sessionStorage.getItem(limited)
}
export function setLimited (data) {
  sessionStorage.setItem(limited, data)
}

let limitedUrl = 'x-auth-limitedUrl'
export function getLimitedUrl () {
  return sessionStorage.getItem(limitedUrl)
}
export function setLimitedUrl (data) {
  sessionStorage.setItem(limitedUrl, data)
}
