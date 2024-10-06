import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { getexpenses,deleteexpense,getexpense } from '../../redux/actions/expense';
//import { createinvoice } from '../../redux/actions/invoice';
import TableLoader from '../common/table-loader';
import TableError from '../common/table-error';
import { useEffect } from 'react';
import {format,parseISO} from 'date-fns'
import { useNavigate,useParams } from 'react-router-dom';
import SingleProductLoader from '../products/single-product-loader';
import SingleErrorProduct from '../products/single-product-error';
function Expense({userData}) {
    const id= useParams().id;
    const dispatch=useDispatch();
    const expense=useSelector((state)=>state.getExpense);
    const contactPerson= userData.name + " " + userData.surname
  
    const {loading,data,error}=expense;
   console.log(expense);
  let signature= userData.signature;
  useEffect(() => {
   
    dispatch(getexpense(signature,id))
      
    }, [dispatch])
    function currencyFormat(num) {
      return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
   }
   console.log(currencyFormat(2665));
  return (
    loading ? <SingleProductLoader/> :
    error ? <SingleErrorProduct/> 
    : data ? 
    <div class="page-body">
    <div class="container-xl">
    <div class="row row-cards">
    <div class="card-body border-bottom py-3">
    <div class="d-flex">
   
      <div class="ms-auto text-secondary">
       
        <div class="ms-2 d-inline-block">
         <Link to="/home/expenses" className='btn btn-primary d-none d-sm-inline-block'>
           Return to Expenses
          </Link>
          
         
        </div>
      </div>
    </div>
  </div>
    <div class="col-md-6">
    <div class="ms-auto text-secondary">
       
      
     </div>
    
        <form class="card">
        <div class="card-header">
          <h3 class="card-title">Expense  </h3>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label ">
                Supplier Name
            </label>
            <div>
              <input value={data.companyBought} disabled  type="text" class="form-control" aria-describedby="emailHelp" />
            
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label ">Supplier Contact Person</label>
            <div>
              <input value={data.buyer} disabled type="text" class="form-control" aria-describedby="emailHelp" />
            
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label ">
            Supplier Contact Person Phone Number
            </label>
            <div>
              <input value={data.companyContact} disabled type="text" class="form-control" aria-describedby="emailHelp" />
            
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label ">Total Price</label>
            <div>
                {
                    data.currency === "ZIG" ? <input class="form-control"  value={`${data.totalPrice} ${data.currency}`} disabled aria-describedby="emailHelp" /> 
                    :
                    <input class="form-control"  value={`${data.currency} ${data.totalPrice} `} disabled aria-describedby="emailHelp" />
                }
              
            
            </div>
          </div>
         
          <div class="mb-3">
            <label class="form-label ">Products bought</label>
            <div>
             <ul>
                {
                    data.products.map((item)=>{
        return <>
        <li>Product Name: {item.name}</li>
        <li>Quantity Bought : {item.quantity}</li>
        <li>Unit Price : {item.unitPrice}</li>
       <br />
        </>
                    })
                }
             </ul>
            
            </div>
          </div>
         
          <div  className="mb-3">
         
         
     
          
         
            
         
         
  
       
        </div>
        </div>
      
      
      </form> 
    
         
       </div>
  
     
    </div>
 
    </div>

               
            
              
              
            </div> : null
  )
}

export default Expense