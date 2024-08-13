"use client"
import Link from "next/link";
import {useEffect,useState} from "react";

async function loadProducto(){ 
    const res = await fetch('http://localhost:8000/api/productos/');
    const data = await res.json();
    return data;
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
                                <Link href={`producto/${producto.id}`} className="">Eliminar</Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}