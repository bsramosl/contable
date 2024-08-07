"use client"
import {useParams} from "next/navigation"
import {useState,useEffect} from "react"


async function loadUser(id){
    const res = await fetch(`https://fakestoreapi.com/users/${id}`);
    const data = await res.json(); 
    return data
}


function userPost(){
    const [user,setUser]= useState([]);
    const params = useParams();

    useEffect(()=>{
        async function post(){
            if (params.id){
                const user = await loadUser(params.id);
                setUser(user);
            }                 
        }
        post();
    },[params.id])

    const handleChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value})
    };

    return(
        <form>
            <div>
                <label>Email: </label>
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
            </div>
            <div>
                <label>Username: </label>
                <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" />
            </div>
            <div>
                <label>Password: </label>
                <input type="text" name="password" value={user.password} onChange={handleChange} placeholder="Contraseña" />
            </div>

            <button type="submit" className="">Guardar</button>
        </form>
    )
}

export default userPost;