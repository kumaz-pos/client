import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getbanks,deletebank} from '../../redux/actions/banks';
import SingleProductLoader from '../products/single-product-loader';
import SingleErrorProduct from '../products/single-product-error';
import { Link } from 'react-router-dom';

function Banks({userData}) {
    const dispatch=useDispatch();
    const banks=useSelector((state)=>state.getBanks);
  
    const {loading,data,error}=banks;
    console.log(banks);
  let signature= userData.signature;

  
    useEffect(() => {
     
    dispatch(getbanks(signature))
      
    }, [dispatch])
  return (
    <div class="page-body">
       <div class="d-flex">
       
       <div class="ms-auto text-secondary">
        
         <div style={{marginRight:"1rem",display:"flex",gap:"1rem"}} class="ms-2 d-inline-block">
          {
            userData.role === "cashier" ? null :  <Link to="/home/banks/add-bank" className='btn btn-outline d-none d-sm-inline-block'>
            Add Bank
           </Link>
          }
         
          <Link to="/home/products" className='btn btn-primary d-none d-sm-inline-block'>
            Home
           </Link>
           
          
         </div>
       </div>
     </div>
    <div style={{display:"flex",gap:"1rem"}} class="container-xl">
        {
            loading ? <SingleProductLoader/> : error ? <SingleErrorProduct /> : 
            data ? data.map((item)=>{
return <div  class="col-md-6 col-lg-4">
              
<div class="card">
  <div class="card-body">
    <h3 class="card-title">Account Name : {item.accountName}</h3>
    <ul>
        
        <li>Account Number: {item.accountNumber}</li>
        <li>Account Currency: {item.accountCurrency}</li>
        <li>Account Branch Code : {item.branchCode}</li>
        <li>Account Branch Name : {item.bankName}</li>
        <li>Country: {item.country}</li>
    </ul>
    <p class="text-secondary"></p>
  </div>

  {
userData.role!=="cashier" ?  

 <div class="card-footer">
 <div class="d-flex">
   <button onClick={()=>{
  dispatch(deletebank(item._id,signature))
  window.location.reload()
}}  class="btn btn-link">Delete Bank</button>
   <Link to={`/home/banks/update-bank/${item._id}`} class="btn btn-primary ms-auto">Update Info</Link>
 </div>
</div> : null
  }
 
</div>
</div> 
            }) : null
            
        } 
   
    
    </div>
    </div>
  )
}

export default Banks