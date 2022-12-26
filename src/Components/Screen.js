import React from 'react'
import { useContext } from 'react';
import {Textfit} from "react-textfit";
import { CalcContext } from '../context/CalcContext';

const Screen = () => {

    const {Calc} = useContext(CalcContext);

  return (
    <Textfit className='screen' max={70} mode="single">
      {Calc.num ? Calc.num : Calc.res}
    </Textfit>
  )
}

export default Screen