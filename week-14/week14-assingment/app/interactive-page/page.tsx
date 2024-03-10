"use client"
import {useState } from "react"
const InteractivePage=()=>{
    const [count,setcount]=useState(0);

    return(
        <div className="flex flex-col items-center">
            <h1 className="fint-bold text-2xl">Welcome to Interactive page</h1>
            <button  className="border-white border-2 px-4 py-2 rounded-xl" onClick={()=>setcount((count)=>count+1)}>Click {count}</button>
        </div>
    )
}
export  default InteractivePage