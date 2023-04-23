
const REQUEST_URL = "http://localhost:8080"

export const getAverages = async (currency: String, N: number): Promise<AverageResponse> => {
    let res = await fetch(new URL(`${REQUEST_URL}/average/${currency}/${N}`), {mode: 'no-cors'})
    if(!res.ok) throw new Error("Can't fetch data from the API")
    let data = await res.json() as AverageResponse
    return data
} 
