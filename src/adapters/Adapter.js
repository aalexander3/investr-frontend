const URL = "http://localhost:3000/api/v1/investors"
const startUpURL = "http://localhost:3000/api/v1/start_ups"
// const HEADERS = {
//   'Content-Type': 'application/json',
//   'Accepts': 'application/json'
// }


export const InvestorsAdapter = {
  index: () => fetch(URL).then(resp => resp.json())
}

export const StartUpsAdapter = {
  index: () => fetch(startUpURL).then(res => res.json())
}
