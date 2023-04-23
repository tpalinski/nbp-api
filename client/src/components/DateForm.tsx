import React, { useState} from 'react'
import { getExchange } from '../utils/nbpRepository';

export function DateForm(){


  let [currency, setCurrency] = useState("");
  let[date, setDate] = useState("");
  let [display, setDisplay] = useState("")


  const handleCurrencyChange = (event:React.FormEvent<HTMLInputElement> ) => {
    setCurrency(event.currentTarget.value)
  }

  const handleDateChange = (event:React.FormEvent<HTMLInputElement> ) => {
    setDate(event.currentTarget.value)
  }

  const handleSubmit = () => {
    getExchange(currency, date).then((res) => {
      setDisplay(`Average exchange rate for ${date}: ${res.averageRate}`)
    })
  }

  return(
    <div className='request-form'>
        <h2> Average exchange rate (day) </h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}>
            <label htmlFor="currency"> Enter currency symbol </label>
            <input type="text" id='currency' name='currency' onChange={handleCurrencyChange}/>
            <input type="date" id='date' onChange={handleDateChange} min="2002-01-02" /> 
            <input type="submit" /> 
        </form>
      <div className='info-display'>
           {display}
      </div>
    </div>
  )
}
