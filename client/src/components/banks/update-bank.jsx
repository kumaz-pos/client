import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updatebank,getbanks } from '../../redux/actions/banks'
import SingleErrorProduct from '../products/single-product-error';
import SingleProductLoader from '../products/single-product-loader'
function UpdateBank({userData}) {
    const id= useParams().id
    console.log(id);
    const navigate=useNavigate()
    const banks=useSelector((state)=>state.getBanks);
    let {loading,success,data,error}=banks
    let info=loading ? "loading" : error ? "error": data.filter((item)=>item._id===id);
    console.log(info);
    const [accountName, setaccountName] = useState(info[0].accountName)
    const [bankName, setbankName] = useState(info[0].bankName)
    const [accountNumber, setaccountNumber] = useState(info[0].accountCurrency)
    const [accountCurrency, setaccountCurrency] = useState(info[0].accountCurrency)
    const [country, setcountry] = useState(info[0].country)
    const [SWIFTCode, setSWIFTCode] = useState(info[0].SWIFTCode)
    const [branchCode, setbranchCode] = useState(info[0].branchCode)
    let signature= userData.signature
    const dispatch= useDispatch();
    function updateBank(e) {
      e.preventDefault();
      dispatch(updatebank(bankName,accountName,accountNumber,accountCurrency,country,SWIFTCode,branchCode,id,signature))
     
  navigate("/home/banks") 
    }
    useEffect(() => {
     
        dispatch(getbanks(signature))
          
        }, [dispatch])
  return (
    <div class="page-body">
    <div class="container-xl">
    <div class="row row-cards">
    <div class="card-body border-bottom py-3">
    <div class="d-flex">
   
      <div class="ms-auto text-secondary">
       
        <div class="ms-2 d-inline-block">
         <Link to="/home/banks" className='btn btn-primary d-none d-sm-inline-block'>
           Return to Banks
          </Link>
          
         
        </div>
      </div>
    </div>
  </div>
    <div class="col-md-6">
    <div class="ms-auto text-secondary">
       
      
     </div>
    {
        loading ? <SingleProductLoader/> : error ? <SingleErrorProduct/> : data ? <form class="card">
        <div class="card-header">
          <h3 class="card-title">Add Bank  </h3>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label class="form-label ">Account Name</label>
            <div>
              <input value={accountName} onChange={(e)=>setaccountName(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
            
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label ">Acount Number</label>
            <div>
              <input value={accountNumber} onChange={(e)=>setaccountNumber(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
            
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label ">Bank Name</label>
            <div>
              <input value={bankName} onChange={(e)=>setbankName(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
            
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label ">Account Currency</label>
            <div>
              <input value={accountCurrency} type="text" onChange={(e)=>setaccountCurrency(e.target.value)} class="form-control" aria-describedby="emailHelp" />
            
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label ">Account Branch Code</label>
            <div>
              <input value={branchCode} onChange={(e)=>setbranchCode(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
            
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label ">SWIFT Code</label>
            <div>
              <input value={SWIFTCode} onChange={(e)=>setSWIFTCode(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
            
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label ">Country</label>
            <div>
              <input value={country} onChange={(e)=>setcountry(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
            
            </div>
          </div>
          <div  className="mb-3">
         
         
       
         <button onClick={updateBank} className='btn btn-primary d-none d-sm-inline-block'>
     Submit
    </button>
          
         
            
         
         
  
       
        </div>
        </div>
      
      
      </form> : null
    }
         
       </div>
  
     
    </div>
 
    </div>

               
            
              
              
            </div>
  )
}

export default UpdateBank