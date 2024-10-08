"use client"
import Link from "next/link";
import {useEffect,useState} from "react";

async function loadProducto(){ 
    const res = await fetch('http://localhost:8001/api/productos/');
    const data = await res.json();
    return data;
}

 
async function eliminar(id) {
    await fetch(`http://localhost:8001/api/productos/${id}/`,{
        method:'DELETE',
    });
}


export default function Product(){
    const[product,setProduct]= useState([]);

    useEffect(()=>{
        async function fetchProduct(){
            const pro = await loadProducto();
            setProduct(pro)
        }
        fetchProduct();
    },[])
 
    return (
        <div>
            <table>
                <Link href="producto/nuevo" className="btn block text-white rounded border-black border-2">Nuevo</Link>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tittle</th>
                        <th>Descripcion</th>
                        <th>Categoria</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((producto)=>(
                        <tr>
                            <td>{producto.id}</td>
                            <td>{producto.title}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.category}</td>
                            <td>
                                <Link href={`producto/${producto.id}`} className="">Editar</Link>
                                <button onClick={()=>eliminar(producto.id)} className="">Eliminar</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}