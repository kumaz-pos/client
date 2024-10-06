import React from 'react'

function AddDiscount({setdiscountpercentage}) {
  return (
    <input   type="number" style={{
        height:"30%",
        display:"flex",
                  alignContent:"center",
                  width:"100%"
      
       }}  class="form-control "  placeholder="discount" onChange={(e)=>setdiscountpercentage(e.target.value)}/>
  )
}

export default AddDiscount