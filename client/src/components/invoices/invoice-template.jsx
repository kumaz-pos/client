import React from 'react'

import { getinvoice } from '../../redux/actions/invoice';
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import SingleProductLoader from '../products/single-product-loader';
import SingleErrorProduct from '../products/single-product-error';
import generatePDF,{Resolution,Margin} from 'react-to-pdf';
import { PDFExport } from '@progress/kendo-react-pdf';
import { useEffect } from 'react';
import html2pdf from 'html2pdf.js'

import { saveAs } from 'file-saver';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import jsPDF from 'jspdf';
function InvoiceTemplate({userData}) {
   
    const ref= React.createRef()
    const id= useParams().id;
    const signature=userData.signature
console.log(id);
    const dispatch=useDispatch();
    const invoice=useSelector((state)=>state.getInvoice);
  
    const {loading,data,error}=invoice;
    console.log(invoice);
    ///console.log(userData);
  //let signature= userData.signature;
  console.log(data);
  const componentRef= useRef();
  let handlePrint= useReactToPrint({
    content:()=>componentRef.current
  })
const generatePDF=()=>{


}

    useEffect(() => {
     
    dispatch(getinvoice(id,signature))
      
    }, [getinvoice])
    

function goHome() {
  window.location.href="http://localhost:3000/home/invoices"
}
  return (
loading ? <SingleProductLoader/> 
: 
error ? <SingleErrorProduct/> :
<div className="page">
<div class="page-wrapper">

<div class="page-header d-print-none">
  <div class="container-xl">
    <div class="row g-2 align-items-center">
      <div class="col">
        <h2 class="page-title">
          Invoice
        </h2>
      </div>
    
      <div style={{
        display:"flex",gap:"1rem"
      }} class="col-auto ms-auto d-print-none">
        <button
        onClick={

            handlePrint
        }
        type="button" class="btn btn-primary" >
       
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" /><path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" /><path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" /></svg>
          Print Invoice
        </button>

        <button class="btn btn-outline" onClick={()=>goHome()}>
          Back 
        </button>
      </div>
    </div>
  </div>
</div>



<div  ref={componentRef} class="page-body">
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
          <div class="col-6 text-end">
                   
                   <p class="h3">{data? data.clientName : null}</p>
                   <address>
                     {data? data.clientNumber : null}<br/>
                   
                   </address>
                  
  
                 </div> 
          <div class="col-12 my-5">
            <h1>{data? data.invoiceNumber :null}</h1>
          </div>
        </div>
        <table class="table table-transparent table-responsive">
          <thead>
            <tr>
            
              <th>Product</th>
              <th class="text-center" style={{width: "1%"}}>Quantity</th>
              <th class="text-end" style={{width: "1%"}}>Unit Price</th>
              <th class="text-end" style={{width: "1%"}}>Vat</th>
              <th class="text-end" style={{width: "1%"}}>Amount</th>
            </tr>
          </thead>
{
  data?   data.products.map((item)=>{
  return       <tr>
     
        <td>
        
          <div class="text-secondary">
          {item.name} {item.brand} {item.model} {item.year}  
          </div>
        </td>
        <td class="text-center">
        {item.quantity}
        </td>
        <td class="text-end">{item.price}</td>
        <td class="text-end">15%</td>
        <td class="text-end">{item.grandTotal}</td>
      </tr>
    }) : null
}
        
        
          <tr>
            <td colspan="4" class="strong text-end">Subtotal</td>
            <td class="text-end">
                {data? data.currency:null}{data? Number(data.totalPriceWithoutVat).toFixed(2):null}</td>
          </tr>
          <tr>
            <td colspan="4" class="strong text-end">Vat Rate</td>
            <td class="text-end">15%</td>
          </tr>
          <tr>
            <td colspan="4" class="strong text-end">Vat Due</td>
            <td class="text-end">{data? data.currency : null}{data? Number(data.vatDue).toFixed(2): null}</td>
          </tr>
          <tr>
            <td colspan="4" class="strong  text-end">Total Due</td>
            <td class="font-weight-bold text-end">{data ?data.currency:null}{data? Number(data.totalPriceWithVat).toFixed(2):null}</td>
          </tr>
        </table> 
        <h3>Please Note:</h3>
        {


        data? data.bankDetails.map((item)=>{
return    <>

<li>{item.bankName}</li>
        <li> Account Name : {item.accountName}</li>
        <li>Account Numbers: Zmw{item.accountNumber}</li>
        <li>Branch: Manda Hill Branch</li>
        <li>Branch Code: {item.branchCode}</li>
</> 
        }) : null
        }
     

        <p class="text-secondary text-center mt-5">Thank you very much for doing business with us. We look forward to working with
          you again!</p>
      </div>
    </div>
  </div>
</div>

</div>
</div>

  )
}

export default InvoiceTemplate