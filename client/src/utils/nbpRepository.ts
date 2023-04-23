
const REQUEST_URL = "http://localhost:8080"

export const getAverages = async (currency: String, N: number): Promise<AverageResponse> => {
    let res = await fetch(new URL(`${REQUEST_URL}/average/${currency}/${N}`))
    if(!res.ok) throw new Error("Can't fetch data from the API")
    let data = await res.json() as AverageResponse
    return data
} 

export const getDiffs = async (currency: String, N: number): Promise<DiffResponse> => {
  let res = await fetch(new URL(`${REQUEST_URL}/difference/${currency}/${N}`)) 
  if(!res.ok) throw new Error("Can't fetch data from the API")
  let data = await res.json() as DiffResponse
  return data
}

export const getExchange = async (currency: String, date: String): Promise<ExchangeResponse> => {
  let res = await fetch(new URL(`${REQUEST_URL}/exchange/${currency}/${date}`)) 
  if(!res.ok) throw new Error("Can't fetch data from the API")
  let data = await res.json() as ExchangeResponse
  return data
}
