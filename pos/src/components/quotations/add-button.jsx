import React from 'react'

import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react'
import { BiCart } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';
import AddDiscount from './add-discount';
function AddButton({addItems,dispatch,productId,addToCart,removeFromCart}) {
    let cartItems=useSelector((state)=>state.cart);
    let singleItem=cartItems.cartItems.find((item)=>item.productId===productId);
   
    const [addState, setAddState] = useState(false);
    const [quantity, setquantity] = useState(0);
    const [done, setdone] = useState(true)
    const [vat, setvat] = useState(false)
    
    const [discount, setdiscount] = useState(false)
    const [discountpercentage, setdiscountpercentage] = useState(0)

    let qty=quantity;
    function addItem() {
        addItems()
        setAddState(!addState)
    }
    function addItemToCart() {
        dispatch(addToCart(productId,qty,vat,discount,discountpercentage))
    }
    function removeItemFromCart() {
        dispatch(removeFromCart(productId))
        setdone(!done)
    }
   console.log(discountpercentage);
  return (
    <div>
    {
        addState?  <button onClick={addItem} class="btn btn-dribbble  btn-icon" aria-label="Dribbble">
    
        <BiCart size={20} />
         </button> : 
         <div className='display-flex' style={{
            display:"flex",
            alignContent:"center",
            justifyContent:"right",
            gap:"2rem"

         }}> 


{
done ? <div style={{display:"grid",alignContent:"center",alignItems:"center",gap:"1rem"}}>
  <div className='inputs'>
  <p>
  <input   type="number" style={{
  height:"30%",
  display:"flex",
            alignContent:"center",
            width:"100%"

 }}  class="form-control " placeholder="quantity" onChange={(e)=>setquantity(e.target.value)}/>
  </p>
  <p style={{display:"flex",gap:"1rem"}}>
    <label  class="form-label">
      Add Vat
    </label>
    <label class="form-check form-switch m-0">
        {
            vat ?   <input class="form-check-input position-static" type="checkbox" style={{
            
                        alignContent:"center"
            
             }}  onChange={(e)=>(setvat(!vat))}  checked />:
            <input class="form-check-input position-static" type="checkbox"  onChange={(e)=>(setvat(!vat))}  />
        }
                         
                        </label>
                        <p style={{display:"flex",gap:"1rem"}}>
    <label class="form-label">
      Add Discount
    </label>
    <label class="form-check form-switch m-0">
        {
            discount ?   <input class="form-check-input position-static" type="checkbox" style={{
            
                        alignContent:"center"
            
             }}  onChange={(e)=>(setdiscount(!discount))}  checked />:
            <input class="form-check-input position-static" type="checkbox"  onChange={(e)=>(setdiscount(!discount))}  />
        }
                         
                        </label>
                        {
                          discount ?   <AddDiscount  setdiscountpercentage={setdiscountpercentage} />   : null
                        }
                    
    </p>
    </p>
   
  <div>

</div>
  </div>
  



    <p>
    <button onClick={
  ()=>{
    addItemToCart()
    setdone(!done)
  }
    } class="btn btn-success w-25 btn-icon mb-2" aria-label="Dribbble">
          
          Done
           </button> 
    </p>
  

</div> : <div style={{display:"flex",alignContent:"center",gap:"0.5rem"}}>
<h3> {
singleItem &&    singleItem.total
} <span> </span>
<BiX  onClick={()=>removeItemFromCart()} style={{color:"red",cursor:"pointer"}} size={20}/>
</h3>
</div>

}

         
         </div>



       
      
    }
     
</div>
  )
}

export default AddButton