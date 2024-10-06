import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { getinvoices,deleteinvoice } from '../../redux/actions/invoice';
import { createinvoice } from '../../redux/actions/invoice';
import TableLoader from '../common/table-loader';
import TableError from '../common/table-error';
import { useEffect } from 'react';
import {format,parseISO} from 'date-fns'
function Invoices({userData}) {
  const dispatch=useDispatch();
  const invoices=useSelector((state)=>state.getInvoices);
  const contactPerson= userData.name + " " + userData.surname

  const {loading,data,error}=invoices;
  console.log(invoices);
let signature= userData.signature;

  useEffect(() => {
   
  dispatch(getinvoices(signature))
    
  }, [dispatch])
  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
 console.log(currencyFormat(2665));

  return (
    <div class="table-responsive mt-5">
           <div class="d-flex">
       
       <div class="ms-auto text-secondary">
        
         <div class="ms-2 d-flex gap-2" style={{display:"flex",gap:"1rem"}}>
        
         <Link to="/home/products" className='btn btn-outline d-none d-sm-inline-block'>
            Home
           </Link>
        
           
       
           
          
         </div>
       </div>
     </div>
    <table class="table card-table table-vcenter text-nowrap datatable">
      <thead>
        <tr>
       
          <th>Invoice Number</th>
          <th>Client Name</th>
          <th>Client  Number</th>
          <th>Date Created</th>
         
          <th>Total Price</th>
          <th>Actions</th>
       
        </tr>
      </thead>
      <tbody>
        {
          loading ? <TableLoader/> :
          error ? <TableError error={error}/> :
          data ? data.map((item)=>{
return   <tr>
         
<td><a  class="text-reset" tabindex="-1">{item.invoiceNumber}</a></td>
<td>
 
  {item.clientName}
</td>
<td>
{item.clientNumber}
</td>
<td>

  {
  format(parseISO(item.createdAt),"dd.MM.yyyy")
  }
</td>

<td>{item.currency}   {item.totalPriceWithVat}</td>
<td class="" style={{display:"flex",gap:"0.3rem"}}>
  {
userData.role!=="cashier" ?  <>
  <Link to={`/home/invoice-template/${item._id}`} class="btn btn-green">
View 
</Link>

<button  onClick={()=>{
dispatch(deleteinvoice(item._id,signature))
  window.location.reload()
}} class="btn btn-red ">
Delete
</button>
{
    /**<button  onClick={()=>{

dispatch(createinvoice(item.prospectName,item.prospectNumber,item.products,item.quotationNumber,item.bankDetails,item.vatRate,item.vatDue,item.totalPriceWithoutVat,item.currency,contactPerson,item.totalPriceWithVat,signature))
  
//window.location.reload()
}} class="btn btn-blue ">
Make Invoice
</button> */
}

</> :
<>
<Link to={`/home/template/${item._id}`} class="btn btn-green">
  View
  </Link>
  <button  onClick={()=>{
//dispatch(deletequotation(item._id,signature))
  window.location.reload()
}} class="btn btn-blue ">
Make Invoice
</button>
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

export default Invoices