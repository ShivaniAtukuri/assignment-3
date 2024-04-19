import React, {useState} from "react";
const Adder = () => {
    const [number1,setnumber1] = useState(0) ;
    const [number2,setnumber2] = useState(0) ;
    const [sum,setSum] = useState(0) ;
    const handleAddition = () => {
        const res = Number(number1) + Number(number2);
        setSum(res) ;
    } ;
    return (
         <div>
            <input type="number" value={number1}
                 onChange={(e) =>
                     setnumber1(e.target.value)}
                    />
                    <input type = "number"
                    value = {number2}
                    onChange={(e) => 
                    setnumber2(e.target.value)}
                    />
                    <button onClick={handleAddition} >Add</button>
                    <p> Sum:{sum} </p>
         </div>
    );
} ;
 export default Adder;