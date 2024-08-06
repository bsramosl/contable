

async function loadProduct(){
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()
    return data;
}


async function Producto(){
    const pro = await loadProduct();
    return(
        <div>
            <h1>Producto</h1>

            <table>
                <thead>

                </thead>
                <tbody>
                {pro.map((product)=>(
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.rating.count}</td>
                    <td>
                        <a className="btn btn-info">Edit</a>
                        <a className="btn btn-danger">Eliminar</a>
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