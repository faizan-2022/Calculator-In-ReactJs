import React, { createContext, useState } from 'react'

export const CalcContext = createContext();
const CalcProvider = ({children}) => {
    const [Calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0
    });

    const providerValue = {
        Calc, setCalc
    }
  return (
    <div>
        <CalcContext.Provider value={providerValue}> 
        {children}
        </CalcContext.Provider>
    </div>
  )
}


export default CalcProvider
