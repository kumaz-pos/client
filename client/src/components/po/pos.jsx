import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { getpos,deletepo } from '../../redux/actions/purchase-order';
import { createinvoice } from '../../redux/actions/invoice';
import TableLoader from '../common/table-loader';
import TableError from '../common/table-error';
import { useEffect } from 'react';
import {format,parseISO} from 'date-fns'
function PurchaseOrders({userData}) {
  const dispatch=useDispatch();
  const pos=useSelector((state)=>state.getPos);
  const contactPerson= userData.name + " " + userData.surname

  const {loading,data,error}=pos;
  console.log(pos);
let signature= userData.signature;

  useEffect(() => {
   
  dispatch(getpos(signature))
    
  }, [dispatch])
  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  return (
    <div class="table-responsive mt-5">
           <div class="d-flex">
       
       <div class="ms-auto text-secondary">
        
         <div class="ms-2 d-flex gap-2 mb-3" style={{display:"flex",gap:"1rem"}}>
         <Link to="/home/purchase-order/create-po" className='btn btn-primary d-none d-sm-inline-block'>
           Create Purchase Order
           </Link>
         <Link to="/home/products" className='btn btn-outline d-none d-sm-inline-block'>
            Home
           </Link>
        
           
       
           
          
         </div>
       </div>
     </div>
    <table class="table card-table table-vcenter text-nowrap datatable">
      <thead>
        <tr>
       
          <th>Purchase Order Number</th>
          <th>Supplier Name</th>
          <th>Supplier Number</th>
          <th>Total Price</th>
          <th>Date Created</th>
         
          <th>Actions</th>
       
        </tr>
      </thead>
      <tbody>
        {
          loading ? <TableLoader/> :
          error ? <TableError error={error}/> :
          data ? data.map((item)=>{
return   <tr>
         
<td><a  class="text-reset" tabindex="-1">{item.purchaseOrderNumber}</a></td>
<td>
 
  {item.supplierName}
</td>
<td>
{item.supplierNumber}
</td>
<td>

  {
  format(parseISO(item.createdAt),"dd.MM.yyyy")
  }
</td>

<td>{item.currency}   {
  item.products.reduce((item,{totalPrice})=>item+totalPrice,0)
}</td>
<td class="" style={{display:"flex",gap:"0.3rem"}}>
  {
userData.role!=="cashier" ?  <>
<Link to={`/home/purchase-order/get-po/${item._id}`} class="btn btn-green">
  View
  </Link>

<button  onClick={()=>{
dispatch(deletepo(item._id,signature))
  window.location.reload()
}} class="btn btn-red ">
Delete
</button>

</> :
<>
<Link to={`/home/purchase-order/get-po/${item._id}`} class="btn btn-green">
  View
  </Link>

</>


  }
  

 


</td>
</tr>
          }) : null
        }
      
     

      </tbody>
    </table>
  </div>
  )
}

export default PurchaseOrders