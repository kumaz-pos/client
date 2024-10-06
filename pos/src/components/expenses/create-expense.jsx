import React from 'react'
import { useState ,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getproducts,deleteproduct } from '../../redux/actions/products-actions';

import {getbanks,getbank}  from '../../redux/actions/banks';
import {createquotation}  from '../../redux/actions/quotation';

import {createexpense} from "../../redux/actions/expense"
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

function CreateExpense({userData}) {
const dispatch=useDispatch();
const createExpense=useSelector((state)=>state.createExpense)
  
    const [companyBought, setcompanyBought] = useState("")
    const [paymentMethod, setpaymentMethod] = useState("")
    const [buyer, setbuyer] = useState("")
    const [companyContact, setcompanyContact] = useState("")
    const [supplierNumber, setSupplierNumber] = useState("")

    const [currency, setcurrency] = useState("")
    const [city, setCity] = useState("")
    const [products, setproducts] = useState([])
    const [name, setname] = useState("")
    const [ quantity, setquantity] = useState(0)
    const [unitPrice, setunitPrice] = useState(0)
    
    let contactPerson= userData.name + " " + userData.surname
  // let totalPrice= quantity*unitPrice

function addProduct(e) {

  if (!name&&!quantity&&!unitPrice) {
    alert("There are fields that are not filled")
  }else{
    let newProduct={id:Math.floor(Math.random()*(999-100+1)+100).toFixed(0),name,quantity,unitPrice,totalPrice:quantity*unitPrice};
    setproducts([...products,newProduct])
    setname("")
    setunitPrice(0)
    setquantity(0)

  }
}
let signature=userData.signature;
function removeProduct(id) {
//products.filter((item)=>item.id!==id)
setproducts(...products,products.filter((item)=>item.id!==id))
}
let totalPrice=products.reduce((item,{totalPrice})=>item+totalPrice,0)

function addExpense() {
  dispatch(createexpense(products,currency,paymentMethod,totalPrice,companyBought,buyer,companyContact,signature))
}


useEffect(() => {
    if (createExpense.success===true) {
        window.location.href="http://localhost:3000/home/expenses" 

      }
  }, [createExpense.success])
 
  return (
    <div class="page-wrapper">
    <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <h2 class="page-title">
         Expenses
          </h2>
        </div>
      
        <div style={{display:"flex",gap:"1rem"}} class="col-auto ms-auto d-print-none">
          <button onClick={()=>addExpense()} type="button" class="btn btn-outline" onclick="javascript:window.print();">
           
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" /></svg>
            Save Expense
          </button>
        
        </div>
      </div>
    </div>
  </div>
  <div class="page-body">
  <div class="container-xl">
  <div class="card card-lg">
  <div class="card-body">
  <div class="row">
  <div class="col-6">
  <a href="">
      <img src="https://zpuplawsjodqxxfqxchz.supabase.co/storage/v1/object/public/Car%20parts/japan_direct_logo_w_background.png" class="navbar-brand-image" width="110" height="50" alt=""/>
      
      </a>
              <p class="h3">Japan Direct</p>
              <address>
              
              94 Prince Edward Street<br/>
              Milton Park<br/>
              Harare Zimbabwe<br/>
              
              </address>
            </div>
            {
            companyBought && companyContact && paymentMethod === "" ?       <div class="col-6 text-end">
             
            <p class="h3">Supplier Name</p>
            <address>
              Street Address<br/>
              State, City<br/>
              Region, Postal Code<br/>
              ctr@example.com
            </address>
            <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modal-report">
           Edit Supplier Details
          </a>

          </div> : 
           <div class="col-6 text-end">
           <p className='h3'>
            {companyBought} - {companyContact}
           </p>
          <address>
     
             
          </address>
           <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modal-report">
          Edit Supplier Details
         </a>

         </div> 
              }

<div class="col-6">

             
            
          
            </div>
         
            <div class="modal modal-blur fade" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true">
<div class="modal-dialog modal-lg" role="document">
  <div class="modal-content">
    <div class="modal-header">
   
      <h5 class="modal-title">Supplier Details</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="mb-3">
        <label class="form-label">Supplier Name</label>
        <input onChange={(e)=>setcompanyBought(e.target.value)} type="text" class="form-control" name="example-text-input" />
      </div>
      <div class="mb-3">
        <label class="form-label">Supplier Number</label>
        <input onChange={(e)=>setcompanyContact(e.target.value)} type="text" class="form-control" name="example-text-input" />
      </div>

    
  
      <div class="mb-3">
              <label class="form-label">Currency</label>
             <select name="" onChange={(e)=>setcurrency(e.target.value)} class="form-select" id="">
             <option value="" >
                   Select Currency
                        </option>
             <option value="USD" >
                     USD
                        </option>
                       
             <option value="ZIG" >
                     ZIG
                        </option>
             </select>
      
            </div>
      <div class="mb-3">
              <label class="form-label">Payment</label>
             <select name="" onChange={(e)=>setpaymentMethod(e.target.value)} class="form-select" id="">
             <option value="" >
                   Select Payment Method
                        </option>
             <option value="Ecocash" >
                    Ecocash
                        </option>
                       
             <option value="Cash" >
                    Cash
                        </option>
                       
             <option value="Bank Transfer" >
                    Bank Transfer
                        </option>
             </select>
      
            </div>
  
     
            <div class="mb-3">
        <label class="form-label">Buyer</label>
        <input onChange={(e)=>setbuyer(e.target.value)} type="text" class="form-control" name="example-text-input" />
      </div>
    </div>

    <div class="modal-footer">
      <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal">
        Cancel
      </a>
      <a href="#" class="btn btn-primary ms-auto" data-bs-dismiss="modal">
      
        Done
      </a>
    </div>
  </div>
</div>
</div>
     
  </div>

  <table class="table card-table table-vcenter text-nowrap datatable">
      <thead>
        <tr>
       
         
        <th>Product Name</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        
         
          <th>Actions</th>
       
        </tr>
      </thead>
      <tbody>
        {
          products.map((item)=>{
return    <>
<tr key={item.id}>
         
         <td>{item.name}</td>
         <td>{item.unitPrice}</td>
         <td>{item.quantity}</td>
         <td>{item.totalPrice}</td>
         <td>
          <button onClick={()=>removeProduct(item.id)}>
            Delete 
          </button>
         </td>
         <td></td>
         
         
         </tr>

</>   
          })
   
     
        }
      
      <tr >
         
         <td>
          <input onChange={(e)=>setname(e.target.value)} type='text'/>
         </td>
         <td>
         <input onChange={(e)=>setunitPrice(e.target.value)} type='number'/>
         </td>
         <td>
         <input onChange={(e)=>setquantity(e.target.value)} type='text'/>
         </td>
         <input disabled value={totalPrice} type='text'/>
    
         <td >
        <button onClick={()=>addProduct()}>
          Done
        </button>
         </td>
     
         
         
         </tr>

      </tbody>
    </table>
  </div>

  </div>
 
  </div>

  </div>

</div>
  )
}

export default CreateExpense