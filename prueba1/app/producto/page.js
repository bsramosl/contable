"use client"
import Link from "next/link"
import { useEffect, useState } from "react";


async function loadProduct(){
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json()
    return data;
}

async function eliminar(id) {
    await fetch(`https://fakestoreapi.com/products/${id}`,{
        method:'DELETE',
    });
}


function Producto(){
    const[product,setProduct]= useState([]);
    useEffect(()=>{
        async function fetchProducts(){
            const pro = await loadProduct()
            setProduct(pro);
        }
        fetchProducts();
    },[]);   
    return(
        <div>
            <h1>Producto</h1>
            <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Titulo</th>
                    <th>Precio</th>
                    <th>Ctegoria</th>
                    <th>Stock</th>
                    <th>Opciones</th>
                </tr>                
                </thead>
                <tbody>
                {product.map((product)=>(
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.rating.count}</td>
                    <td>
                        <Link href={`/producto/${product.id}`}>Ver</Link>
                        <Link href="/" className="btn btn-info">Edit</Link>
                        <button onClick={()=>eliminar(product.id)} className="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            ))
            }
                </tbody>
            </table>
        </div>
    );
}

export default Producto;