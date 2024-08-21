"use client"

import {useState,useEffect} from "react"
import {useParams} from "next/navigation"



async function loadProduct(id){
    const res = await fetch(`http://localhost:8001/api/productos/${id}/`);
    const data = res.json();
    return data
}



export default function savProduct(){

    const[product,setProduct]=useState({});
    const params = useParams();

    const handleChange = (e)=> {
        setProduct({...product,[e.target.name]:e.target.value})
    };
    
    useEffect(()=>{
        async function post() {
            if(params.id && params.id != 'nuevo'){
                const dat = await loadProduct(params.id);
                setProduct(dat);
            }            
        }
        post();
    },[params.id]) 

    return(
        <form  >
            <div>
                <label>Titulo</label>
                <input type="string" value={product.tilte ?? ''} onChange={handleChange} name="title" placeholder="Titulo"/>
            </div>

        </form>
    );
}