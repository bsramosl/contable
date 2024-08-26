"use client"
import {useState,useEffect} from "react"

async function loadProduct(){
    const rest = await fetch('http://localhost:8001/api/productos/')
    const data = await rest.json()
    return data
}


export default function modalproduct(){
    const[product,setProduct] = useState([]); 

    useEffect(()=>{
        async function useProduct(){
            const pro = await loadProduct()
            setProduct(pro)
        }
        useProduct();
    },[]);    

    return ( 
        <>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Categoria</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
            {product.map((prod)=>(
                 <tr>                   
                    <th>{prod.title}</th>
                    <th>{prod.descripcion}</th>
                    <th></th>
                    <th>{prod.category}</th>
                    <th>
                        <a></a>
                    </th>
                 </tr>
            ))} 
            </tbody>
        </table>
        </>
    )
}