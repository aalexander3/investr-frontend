const BASE_URL ="http://localhost:3000/api/v1/"
const URL = "http://localhost:3000/api/v1/investors"
const startUpURL = "http://localhost:3000/api/v1/start_ups"
const MESSAGES_URL = 'http://localhost:3000/api/v1/messages'

const headers = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
}

const config = (method, body) => {
  return {
    method,
    headers,
    body: JSON.stringify(body)
  }
}

const configWithAuth = (token) => {
  return {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
      'Authorization': token
    }
  }
}


export const InvestorsAdapter = {
  index: () => fetch(URL).then(res => res.json()),
  create: (body) => fetch(URL, config('POST', body)).then(res => res.json())
}

export const StartUpsAdapter = {
  index: () => fetch(startUpURL).then(res => res.json()),
  create: (body) => fetch(startUpURL, config('POST', body)).then(res => res.json())
}

export const SessionsAdapter = {
  login: (body) => fetch(`${BASE_URL}login`, config('POST', body)).then(res => res.json()),
  reauth: (token) => fetch(`${BASE_URL}authorize`, configWithAuth(token)).then(res => res.json())
}

export const MessagesAdapter = {
  create: (body) => fetch(MESSAGES_URL, config("POST", body))
}
