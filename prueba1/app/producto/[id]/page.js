"use client"
import {useParams} from "next/navigation"
import { useEffect, useState } from "react";

async function loadProduct(id){
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await res.json();
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

    const handleChange = (e)=>{
        setProduct({...product,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`https://fakestoreapi.com/products/${params.id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(product),
        });
        router.push('/producto')
    }
    
    return ( 
       <div className="card"> 
        <h1>Prueba de paramas{product.id}</h1>
          <form onSubmit={handleSubmit}>
            <div>
                <label className="label">Titulo:  </label>
                <input className="block w-full roundend border-2 border-black" type="text" name="title" value={product.title} onChange={handleChange} placeholder="Titulo"  />
            </div>
            <div>
                <label>Precio: </label>
                <input className="block w-full rounded border-2 border-black" type="text" name="price" value={product.price} onChange={handleChange} placeholder="Pecio" />
            </div>
            <div>
                <label>Categoria: </label>
                <input className="block w-full rounded border-2 border-black" type="taext" name="category" value={product.category} onChange={handleChange} placeholder="Categoria" />
            </div>
            <div>
                <label>Descripcion: </label>
                <input className="block w-full rounded border-2 border-black" type="text" name="description" value={product.description} onChange={handleChange} placeholder="Descripcion" />
            </div>
            <div>
                <label>Imagen: </label>
                <input className="block w-full rounded border-2 border-black" type="text" name="image" value={product.image} onChange={handleChange} placeholder="Imagen"  />
            </div>
            <button type="submit" className="block rounded">Guardar</button>
          </form>
       </div> 
    );
}