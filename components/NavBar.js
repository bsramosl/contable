import Link from "next/link"

export default function NavBar(){
    return(
        <div> 
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                <li>
                    <Link href="/producto" >Producto</Link>
                </li>
            </ul>
        </div>
    );
}