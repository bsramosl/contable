"use client"
import {useParams} from "next/navigation"
import { useEffect,useState } from "react";
import { useRouter } from "next/router";


async function loadProducto(id){
    const res = await fetch(`http://localhost:8000/api/productos/${id}`);
    const data = await res.json();
    return data
}




export default function edProducto(){
    const[product,setProduct] = useState([]);

    const params = useParams();
 
    useEffect(()=>{
        async function post(){
            if (params.id){
                const dat = await loadProducto(params.id);
                setProduct(dat);
            }
        }
        post();
},[params.id])

    const handleChange = (e)=>{
        setProduct({...product,[e.target.value]:e.target.value});
    };

    return(
        <div>
            <from>
                <div>
                    <label>Tittle</label>
                    <input type="text" name="title" value={product.title} onChange={handleChange} placeholder="Producto" ></input>
                </div>
                <div>
                    <label>Precio</label>
                    <input  type="text" name="price" value={product.price} onChange={handleChange} placeholder="Precio"/>
                </div>
                <div>
                    <label>Descripcion</label>
                    <input type="text" name="descripcion" value={product.descripcion} onChange={handleChange} placeholder="Descripcion"/>
                </div>
                <div>
                    <label>category</label>
                    <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category"/>
                </div>
                <div>
                    <label>Imagen</label>
                    <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Imagen"/>
                </div>
                <button type="submit">Guardar</button>
            </from>

        </div>
    )
}