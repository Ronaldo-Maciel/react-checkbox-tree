async function getfromApi() {
  const response = await fetch('/api/data.json')
  const data = await response.json()
  return data
}

export default getfromApi
