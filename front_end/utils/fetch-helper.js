import qs from 'qs'
import { trim } from 'lodash'

export const FETCH_DEFAULTS = {
  credentials: 'same-origin'
}

export function buildUrl(url, parameters, arrayFormat = 'brackets') {
  const querystring = qs.stringify(parameters, { arrayFormat })
  const u = trim(url)
  return `${u}?${querystring}`
}

export function parseJSON(response) {
  return response.json()
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function fetchJSON(url, options = {}) {
  const opts = {
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'pragma': 'no-cache',
      'cache-control': 'no-cache,no-store'

    },
    ...FETCH_DEFAULTS
  }
  return fetch(url, opts).then(checkStatus).then(parseJSON)
}

export function getJSON(url, options) {
  return fetchJSON(url, options)
}

export function postJSON(url, payload, options) {
  const opts = {
    ...options,
    method: 'post',
    body: JSON.stringify(payload),
    ...FETCH_DEFAULTS
  }
  return fetchJSON(url, opts)
}

export function putJSON(url, payload, options) {
  const opts = {
    ...options,
    method: 'put',
    body: JSON.stringify(payload),
    ...FETCH_DEFAULTS
  }
  return fetchJSON(url, opts)
}

export function deleteJSON(url, options){
  const opts = {
    ...options, 
    method: 'delete',
    ...FETCH_DEFAULTS
  }
  return fetchJSON(url, opts)
}