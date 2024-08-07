"use client"
import Link from "next/link"
import {useEffect,useState} from "react"


async function loadUser(){
    const res = await fetch('https://fakestoreapi.com/users');
    const data = res.json();
    return data
}

async function eliminar(id){
    await fetch(`https://fakestoreapi.com/users/${id}`,{
        method:'DELETE',
    })
}

function User(){
    const[user,setUser] = useState([]);

    useEffect(()=>{
        async function fetchUser(){
            const use = await loadUser()
            setUser(use);
        }
        fetchUser()
    },[]);

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((users)=>(
                        <tr>
                            <td>{users.id}</td>
                            <td>{users.username}</td>
                            <td>{users.name.firstname}</td>
                            <td>{users.name.lastname}</td>
                            <td>{users.email}</td>
                            <td>
                                <Link href={`/user/${users.id}`}>View</Link>
                                <Link href="">Editar</Link>
                                <button onClick={()=>eliminar(users.id)}>Eliminar</button>                                
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default User;