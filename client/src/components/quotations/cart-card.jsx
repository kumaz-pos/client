import React from 'react'
import { useState,useEffect } from 'react'
function CartCard({item,data,addToCart,removeItemFromCart}) { 
  
  const [addState, setAddState] = useState(true);
  const [quantity, setquantity] = useState(0);
  const [done, setdone] = useState(true)

  function addItemToCart() {
    addToCart(item._id,data? data : null,quantity);
    console.log( addToCart(item._id,data? data : null,parseInt(quantity)));
    setdone(!done)
   
  }


  function addStateButton() {
    setAddState(!addState)
  }
  return (
    
      addState ? 
       <div key={item._id} class="card">
  
      <div style={{
        display:"flex",
       justifyContent:"space-between"
      }}  class="card-header">
      <h3 class="card-title"> {item.name} {item.brand} {item.model} {item.year}   - {item.sellingPrice}
      </h3>
   
        <span  >
        <button  style={{
        marginLeft:"auto",
  
      }} onClick={()=>addStateButton()}  className='btn btn-info'>
  Add
        </button>
        </span> 
      
     
    </div> 
    </div>   :  done ? 
    <div key={item._id} class="card">
  
    <div style={{
      display:"flex",
     justifyContent:"space-between"
    }}  class="card-header">
    <h3 class="card-title"> {item.name} {item.brand} {item.model} {item.year}   - {item.sellingPrice}
    </h3>
   
   
    
   
  </div> 
  <div style={{display:"grid",alignContent:"center",gap:"0.5rem",alignItems:'center',justifyContent:"center",gridTemplateColumns:"repeat(2,1fr)"}}>
    <p>
    <label class="form-label">
      Quantity
    </label>
    <input    type="number" onChange={(e)=>setquantity(e.target.value)} class="form-control" placeholder="Quantity"/>
    </p>
    <p>
    <label class="form-label">
      Add Vat
    </label>
    <label class="form-check form-switch m-0">
                          <input class="form-check-input position-static" type="checkbox"  />
                        </label>
    </p>
  <p style={{display:"flex",justifyContent:"center"}}>
    <button onClick={()=>addItemToCart()} className='btn btn-success'>
      Done
    </button>
 
  </p>
  
    
      
    
    </div>

  </div> :

<div key={item._id} class="card">
  
<div style={{
  display:"flex",
 justifyContent:"space-between"
}}  class="card-header">
<h3 class="card-title"> {item.name} {item.brand} {item.model} {item.year}   - {item.sellingPrice}
</h3>




</div> 
<div style={{display:"grid",alignContent:"center",gap:"0.5rem",alignItems:'center',justifyContent:"center",gridTemplateColumns:"repeat(2,1fr)"}}>

<p  style={{display:"flex",gap:"0.5rem",justifyContent:"center"}} className='tags-list'>
<button class="tag" onClick={
 ()=> setdone(!done)
}>
                       edit
                       
                      </button>
                      <button onClick={()=>removeItemFromCart(item._id)} class="tag">
                        remove
                      
                      </button>

</p>


  

</div>

</div> 




    
    

  )
}

export default CartCard

{
  /**<span  >
      <button  style={{
      marginLeft:"auto",

    }} onClick={()=>addItemToCart()}  className='btn btn-info'>
Add
      </button>
      </span>  */
}