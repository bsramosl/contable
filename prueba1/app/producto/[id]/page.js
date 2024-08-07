"use client"
import {useParams} from "next/navigation"
import { useEffect, useState } from "react";

async function loadProduct(id){
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await res.json()
    return data; 
}
 

export default function PostId(){
    const[product,setProduct]=useState([]);
    const params = useParams()  
    useEffect(()=>{
        async function post(){
            if(params.id){
                const post = await loadProduct(params.id); 
            setProduct(post);
            }            
        }
        post();
    },[params.id])
    return ( 
       <div className="card"> 
        <h1>Prueba de paramas{product.id}</h1>
           <div className="card-header">
           <h2>{product.title}</h2>
           </div>
           <div className="card-body">
            <p>{product.description}</p>               
           </div> 
       </div> 
    );
}