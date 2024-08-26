"use client"

import {useState,useEffect} from "react"
import {useParams,useRouter} from "next/navigation"



async function loadProduct(id){
    const res = await fetch(`http://localhost:8001/api/productos/${id}/`);
    const data = res.json();
    return data
}



export default function savProduct(){

    const[product,setProduct]=useState({title: '',
        price: '',
        descripcion: '',
        category: '',
        image: '',        
    });
    const params = useParams();
    const router = useRouter();

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


    const handleSubmit = async (e)=> {
        debugger
        e.preventDefault();
        const method = params.id && params.id !== 'nuevo' ? 'PUT' : 'POST';
        const url = params.id && params.id !== 'nuevo' ? 
        `http://localhost:8001/api/productos/${params.id}/`
        : 'http://localhost:8001/api/productos/';
        try {
            await fetch(url,{
                method,
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(product),
            });
            router.push('/producto1');
        } catch (error) {
            console.log(error)
            
        }
         
    }

    return(
        <form onSubmit={handleSubmit}  >
            <div>
                <label>Titulo</label>
                <input type="text" value={product.title ?? ''} onChange={handleChange} name="title" placeholder="Titulo"/>
            </div>
            <div>
                <label>Precio</label>
                <input type="text" value={product.price ?? ''} onChange={handleChange} name="price" placeholder="Precio" />
            </div>
            <div>
                <label>Descripcion</label>
                <input type="text" value={product.descripcion ?? ''} onChange={handleChange} name="descripcion" placeholder="Descripcion" />
            </div>
            <div>
                <label>Category</label>
                <input type="text" value={product.category ?? ''} onChange={handleChange} name="category" placeholder="categoria" />
            </div>
            <div>
                <label>Imagen</label>
                <input type="text" value={product.image ?? ''} onChange={handleChange} name="image" placeholder="Imagen" />
            </div>
            <button type="submit" >{params.id && params.id !== 'nuevo' ? 'Actualizar' : 'Nuevo'}</button>
        </form>
    );
}