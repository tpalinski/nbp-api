import React, { useState } from 'react'
import { getAverages, getDiffs } from '../utils/nbpRepository';

export interface NformProps {
  requestType: String 
}

const enum RequestType  {
  AVERAGE = "average",
  DIFF = 'difference'
}

export function Nform(props: NformProps) {

  let [currency, setCurrency] = useState("");
  let[N, setN] = useState(1);
  let [display, setDisplay] = useState("")

  const handleSubmit = () => {
    if(props.requestType == RequestType.AVERAGE) {
      getAverages(currency, N).then((res) => {
         setDisplay(`Minimum average: ${res.min.value.avg}, maximum average: ${res.max.value.avg}`) 
      })
    } else {
      getDiffs(currency, N).then((res) => {
        setDisplay(`Maximum difference: ${res.value.maxDiff}`)
      })
    }
  }

  const handleCurrencyChange = (event:React.FormEvent<HTMLInputElement> ) => {
    setCurrency(event.currentTarget.value)
  }

  const handleNChange = (event: React.FormEvent<HTMLInputElement> ) => {
    setN(parseInt(event.currentTarget.value))
  }

  return(
    <div className='request-form'>
        <h2> {props.requestType.toUpperCase()}</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}>
            <label htmlFor="currency"> Enter currency symbol </label>
            <input type="text" name='currency' onChange={handleCurrencyChange}/>

            <label htmlFor='number'> Enter the amount of entries you want to check </label>
            <input type="number" name='number' onChange={handleNChange}max="255" min="0" /> 
            <input type="submit" /> 
        </form>
      <div className='info-display'>
           {display}
      </div>
    </div>
  );
}
