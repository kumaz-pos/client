import React from 'react'
import { useState ,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getproducts,deleteproduct } from '../../redux/actions/products-actions';
import CartCard from './cart-card';
import { addToCart , removeFromCart} from '../../redux/actions/cart';
import {getbanks,getbank}  from '../../redux/actions/banks';
import {createquotation,updatequotation}  from '../../redux/actions/quotation';
import AddButton from './add-button';
import Template from "./template"
import Cookies from "js-cookie";
import { useNavigate , useParams} from 'react-router-dom';
function UpdateQuotation({userData}) {
const navigate=useNavigate()
  const dispatch=useDispatch();
  const id= useParams().id;

  const info=useSelector((state)=>state.getProducts);
  const banks=useSelector((state)=>state.getBanks);
  const bankRedux=useSelector((state)=>state.getBank);
  const createQuotation=useSelector((state)=>state.createQuotation)

  const [bankstate, setbankstate] = useState(banks.loading ? "loading":banks.error? "error" : banks.data? banks.data : [])

 console.log(bankstate);

  let signature=userData.signature;
 
  let cart=useSelector((state)=>state.cart);
  let cartItems=cart.cartItems;
  let products= cartItems
  let totalPriceWithoutVat=cartItems&& cartItems.reduce((item,{total})=>item+total,0);
  let totalPriceWithVat= cartItems&& cartItems.reduce((item,{grandTotal})=>item+grandTotal,0);
  let vatDue=(15/100)*totalPriceWithVat;
  const {loading,data,error}=info;





  useEffect(() => {
   
  dispatch(getproducts())
  dispatch(getbanks(signature))

    
  }, [dispatch])

 
  const [bankId,setbankId]=useState("")

console.log(bankId);

  
  const [prospectName,setProspectName]=useState("")
  const [prospectNumber,setProspectNumber]=useState("")
  const [currency,setcurrency]=useState("")
  const [paymentMethod,setpaymentMethod]=useState("")
 
  const [vat,setvat]=useState("")
  const [rate,setRate]=useState(0)
  const [bank,setbank]=useState([])
 
  const [count, setcount] = useState(0)
const [items,setitems]=useState([])
let quote="Quotation"
let quotationNumber=`Quotation ${Math.floor(Math.random()*(999-100+1)+100).toFixed(0)}`
 console.log(quotationNumber);


  function removeItemFromCart(id) {
    
    setitems([...items,items.filter((item)=>item._id!==id)])
  }
  function addItems() {
    setcount(count+1)
  }



function getBank() {

dispatch(getbank(bankId,signature))
}
let contactPerson= userData.name + " " + userData.surname
console.log(contactPerson);

let singleBank=banks.loading ? "loading" : banks.error? "error": banks.data? banks.data.find((item)=>item._id===bankId): null;
let bankDetails=singleBank;
let vatRate="15%";


function saveQuote() {
   dispatch(createquotation(prospectName,prospectNumber,products,quotationNumber,bankDetails,vatRate,vatDue,totalPriceWithoutVat,currency,contactPerson,totalPriceWithVat,signature ))

  }
  console.log(createQuotation);

  useEffect(() => {
    if (createQuotation.success===true) {
      //  console.log(createQuotation.data._id);
      Cookies.remove("cartItems")
    navigate(`/template/${createQuotation.data._id}`)

     //window.open(`/template/${createQuotation.data._id}`,'_blank','rel=noopener noreferrer')
      }
  }, [createQuotation.success])
  


  return (
    <div class="page-wrapper">
          <div class="page-header d-print-none">
          <div class="container-xl">
            <div class="row g-2 align-items-center">
              <div class="col">
                <h2 class="page-title">
                  Invoice
                </h2>
              </div>
            
              <div style={{display:"flex",gap:"1rem"}} class="col-auto ms-auto d-print-none">
                <button onClick={()=>saveQuote()} type="button" class="btn btn-outline" onclick="javascript:window.print();">
                 
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" /></svg>
                  Save Quotation
                </button>
                <button type="button" class="btn btn-primary" onclick="javascript:window.print();">
                 
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" /></svg>
                  Print Invoice
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
        <a href=".">
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
                  prospectName && prospectNumber === "" ?       <div class="col-6 text-end">
                   
                  <p class="h3">Client</p>
                  <address>
                    Street Address<br/>
                    State, City<br/>
                    Region, Postal Code<br/>
                    ctr@example.com
                  </address>
                  <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modal-report">
                 Edit Client Details
                </a>

                </div> : 
                 <div class="col-6 text-end">
                   
                 <p class="h3">{prospectName}</p>
                 <address>
                   {prospectNumber}<br/>
                 
                 </address>
                 <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modal-report">
                Edit Client Details
               </a>

               </div> 
                    }

<div class="col-6">
    
                   
                  
                
                  </div>
               
                  <div class="modal modal-blur fade" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Client Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Client Name</label>
              <input onChange={(e)=>setProspectName(e.target.value)} type="text" class="form-control" name="example-text-input" />
            </div>
            <div class="mb-3">
              <label class="form-label">Client Contact Number</label>
              <input onChange={(e)=>setProspectNumber(e.target.value)}  type="text" class="form-control" name="example-text-input" />
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
             {
                          currency === "ZIG" ?          
                          <div class="mb-3" style={{marginTop:"1rem"}}>
                            <label class="form-label">Enter rate</label>
                           <input onChange={(e)=>setRate(e.target.value)}  type="text" class="form-control" name="example-text-input" />
                          
                          </div>
                                
                                 : null
                        }
            </div>
            <div class="mb-3">
              <label class="form-label">Select Bank</label>
           
             <select name="" onChange={
          
         (e)=>{
          setbankId(e.target.value)
          console.log(bankId);
          console.log(bankId);
          dispatch(getbank(bankId,signature))
         
          
       
        }
              } class="form-select" id="">
             <option>
                    Select Bank
                  </option>
              {
                banks.loading ? "Loading..." :
                banks.error ? "error" :
                banks.data? banks.data.map((item)=>{
                
              return     <option value={item._id} >
             {item.accountCurrency} {item.bankName} 
                 </option>
                }) : null
              }
            </select>
            
         
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
                  <div class="col-12 my-5">
                    <h1>{quotationNumber}</h1>
                  </div>
                  <a href="#" class="btn" data-bs-toggle="modal" data-bs-target="#modal-scrollable">
                {
                  cartItems.length=== 0 ? "Add products" : "Add More Products" 
                }   
                  </a>
                  <div class="modal modal-blur fade" id="modal-scrollable" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select Products</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
        {
          loading ? "Loading....." : error ? "Error in loading products" :
          data ? data.map((item)=>{
    return     <div key={item._id} class="card" >
  
    <div style={{
      display:"flex",
     justifyContent:"space-between"

    }}  class="card-header">
      
    <h3 class="card-title"> {item.name} {item.brand} {item.model} {item.year}   - {item.sellingPrice}
    </h3>
 {
  item.stockLeft <= 0 ? <p>Item out of stock</p> : <AddButton removeFromCart={removeFromCart} dispatch={dispatch}  addToCart={addToCart} productId={item._id}  addItems={addItems}/>
 }
      
    
   
  </div> 
  </div>  
    
  ///  <CartCard item={item} data={data} addToCart={addToCart} removeItemFromCart={removeItemFromCart}/>
    
   
          }) : null
        }
               
               
           
      
         
          </div>
          <div class="modal-footer">
            <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
                  <table class="table table-transparent table-responsive">
                  <thead>
                    <tr>
                     
                      <th>Product</th>
                      <th class="text-center" >Qnt</th>
                      <th class="text-end" >Unit Price</th>
                      <th class="text-end" >Vat</th>
                      <th class="text-end" >Amount</th>
                    </tr>
                  </thead>
                
                  {
                    cartItems.map((item)=>{
                      return                            <tr className='mb-3'>
                     
                      <td style={{marginTop:"1rem"}}>
                  {item.name} {item.brand} {item.model} {item.year}
                      </td>
                      <td class="text-center">
                        {item.quantity}
                      </td>
                      <td class="text-end">{ 
                      currency === "ZIG" ?   item.price * Number(rate) : item.price
                      }</td>
                      <td class="text-end">{item.taxes === "15%" ? "15%" : null}</td>

                      <td class="text-end">
                        {
                          currency === "ZIG" ? "ZIG" : "$"
                        }
                        
                      {
                         currency === "ZIG" ?
                      item.grandTotal * Number(rate) : item.grandTotal
                      }
                      </td>
                    </tr>
                    })
                  }
             
                
                  <tr>
                    <td colspan="4" class="strong text-end">Subtotal</td>
                    <td class="text-end">
                    {
                          currency === "ZIG" ? "ZIG" : "$"
                        }
                      {
                      
                      currency === "ZIG" ?
                      totalPriceWithoutVat * Number(rate) : totalPriceWithoutVat
                      }</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="strong text-end">Vat Rate</td>
                    <td class="text-end">15%</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="strong text-end">Vat Due</td>
                    <td class="text-end">
                    {
                          currency === "ZIG" ? "ZIG" : "$"
                        }
                      {

currency === "ZIG" ?
vatDue * Number(rate) :  vatDue        
                     
                      
                      }</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="font-weight-bold text-uppercase text-end">Total Due</td>
                    <td class="font-weight-bold text-end">
                    {
                          currency === "ZIG" ? "ZIG" : "$"
                        }
                      {
currency === "ZIG" ?
totalPriceWithVat * Number(rate) : 
totalPriceWithVat
                  
                    
                    }</td>
                  </tr>
                </table>
        </div>
        <div style={{marginTop:"1.5rem"}}>
          <ul>
         
{
banks.loading ? "loading" : banks.error? "error": banks.data? banks.data.filter((item)=>item._id===bankId).map((item)=>{
 return <>
  <li>{item.bankName}</li>
          <li> Account Name : {item.accountName}</li>
          <li>Account Numbers: Zmw{item.accountNumber}</li>
          <li>Branch: Manda Hill Branch</li>
          <li>Branch Code: {item.branchCode}</li>
  </> 
})
 
  
    : 
    null

}


          </ul>
        </div>
        </div>
      
        </div>
       
        </div>
      
        </div>
      
    </div>
  )
}

export default UpdateQuotation
