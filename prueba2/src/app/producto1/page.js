"use client"
import {useState,useEffect} from "react"
import Link from "next/link"

async function loadProduct(){
    const res = await fetch('http://localhost:8001/api/productos/');
    const data = res.json()
    return data

}


export default function producto1(){
    const[product,setProduct] = useState([]);

    useEffect(()=>{
        async function fetchProduct(){
            const pro = await loadProduct()
            setProduct(pro);
        }
        fetchProduct();
    },[])


    return(
        <div>
            <table>
                <thead> 
                    <Link href="producto1/nuevo">Nuevo</Link>
                    <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Precio</th>
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
                            <td>{producto.price}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.category}</td>
                            <td>
                                <Link href={`producto1/${producto.id}`}>Editar</Link>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    );
}