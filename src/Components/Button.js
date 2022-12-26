import React, { useContext } from 'react'
import { CalcContext } from '../context/CalcContext';

const getStyleName = (btn) =>{
    const className = {
        "=": "equals",
        "x": "opt",
        "+": "opt",
        "-": "opt",
        "/": "opt"
    }
    return className[btn];
}

const Button = ({value}) => {
    const {Calc, setCalc} = useContext(CalcContext);

    // User Decimal click
    const decimalClick = () =>{
        setCalc({
            ...Calc,
            num: !Calc.num.toString().includes(".") ? Calc.num + value : Calc.num
        })    
    }

    // User C click
    const resetClick = () =>{
        setCalc({
            sign: "",
            num: 0,
            res: 0
        })
    }

    // User click number
    const handleClickButton= ()=>{
        const numberString = value.toString();
        let numberValue;

        if(numberString==='0' && Calc.num==='0'){
                numberValue = "0";
        }else{
            numberValue = Number(Calc.num + numberString)
        }

        setCalc({
            ...Calc,
            num: numberValue
        })
    }

    // User click operation
    const signClick = ()=>{
        setCalc({
            sign: value,
            res: !Calc.res && Calc.num ? Calc.num : Calc.res,
            num: 0
        })
    }

    // User click equals
    const equalsClick = ()=>{
        if(Calc.res && Calc.num){

            const math =(a, b, sign) =>{
                const result = {
                    "+": (a,b)=> a+b,
                    "-": (a,b)=> a-b,
                    "/": (a,b)=> a/b,
                    "x": (a,b)=> a*b,
                }
    
                return result[sign](a,b);
            }
            setCalc({
                res: math(Calc.res, Calc.num, Calc.sign),
                sign: "",
                num: 0
            })
        }

    }

    // User click persent
    const persentClick = ()=>{
        setCalc({
            num: (Calc.num/100),
            res: (Calc.res/100),
            sign: ""
        })
    }

    // User click invert button
    const invertClick = ()=>{
        setCalc({
            num: Calc.num ? Calc.num * -1 : 0,
            res: Calc.res ? Calc.res * -1 : 0,
            sign: ""
        })
    }

    const handleBtnClick = ()=>{
        const results = {
            ".": decimalClick,
            "C": resetClick,
            "/": signClick,
            "x": signClick,
            "-": signClick,
            "+": signClick,
            "=": equalsClick,
            "%": persentClick,
            "+-": invertClick
        }
        if(results[value]){
            return results[value]();
        }else{
            return handleClickButton();
        }
    }
  return (
      <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
  )
}

export default Button
