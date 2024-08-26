"use client"
import {useParams} from "next/navigation"
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";


async function loadProducto(id){
    const res = await fetch(`http://localhost:8001/api/productos/${id}/`);
    const data = await res.json();
    return data
}


export default function edProducto(){
    const[product,setProduct] = useState({
        title: '',
        price: '',
        descripcion: '',
        category: '',
        image: '',
    });
    const router = useRouter();
    const params = useParams();
 
    useEffect(()=>{        
        async function post(){
            if (params.id && params.id != 'nuevo'){
                const dat = await loadProducto(params.id);
                setProduct(dat);
            }
        }
        post();
    },[params.id])

    const handleChange = (e)=>{
        setProduct({...product,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=>{ 
        e.preventDefault();  
        
        const method = params.id && params.id !== 'nuevo' ? 'PUT' : 'POST';
       
        const url = params.id && params.id !== 'nuevo'
        ? `http://localhost:8001/api/productos/${params.id}/`
        : 'http://localhost:8001/api/productos/';

        try {
            await fetch(url,{
                method,
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(product),
            });
            router.push('/producto')
        } catch (error) {
        console.error(error);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Titulo</label>
                    <input type="text" name="title" value={product.title  ?? ''} onChange={handleChange} placeholder="Producto" ></input>
                </div>
                <div>
                    <label>Precio</label>
                    <input  type="number" name="price" value={product.price  ?? ''} onChange={handleChange} placeholder="Precio"/>
                </div>
                <div>
                    <label>Descripcion</label>
                    <input type="text" name="descripcion" value={product.descripcion  ?? ''} onChange={handleChange} placeholder="Descripcion"/>
                </div>
                <div>
                    <label>Categoria</label>
                    <input type="text" name="category" value={product.category ?? ''} onChange={handleChange} placeholder="Category"/>
                </div>
                <div>
                    <label>Imagen</label>
                    <input type="text" name="image" value={product.image ?? ''} onChange={handleChange} placeholder="Imagen"/>
                </div>
                <button type="submit" className="block rounded"> {params.id && params.id !== 'nuevo' ? 'Actualizar' : 'Crear'}</button>
            </form>

        </div>
    )
}