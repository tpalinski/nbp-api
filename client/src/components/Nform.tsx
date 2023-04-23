import React, { useState } from 'react'
import { getAverages } from '../utils/nbpRepository';

export function Nform() {

  let [currency, setCurrency] = useState("");

  const handleSubmit = () => {
    getAverages('gbp', 43).then((res) => {
      alert(res);
    })
  }

  const handleCurrencyChange = (event:React.FormEvent<HTMLInputElement> ) => {
    setCurrency(event.currentTarget.value)
  }
  return(
    <div className='request-form'>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}>
            <input type="text" onChange={handleCurrencyChange}/>
            <input type="number" max="255" min="0" /> 
            <input type="submit" /> 
        </form>
    </div>
  );
}
