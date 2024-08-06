


async function loadProduct(id){
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await res.json()
    return data;

}


export default async function PostId({params}){
    const pro = await loadProduct(params.id);
    return ( 
       <div className="card"> 
        <h1>Prueba de paramas{pro.id}</h1>
           <div className="card-header">
           <h2>{pro.title}</h2>
           </div>
           <div className="card-body">
            <p>{pro.description}</p>               
           </div> 
       </div> 
    );
}