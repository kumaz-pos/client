import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createbank } from '../../redux/actions/banks'

function AddBank({userData}) {
   
    const navigate=useNavigate()
    const [accountName, setaccountName] = useState("")
    const [bankName, setbankName] = useState("")
    const [accountNumber, setaccountNumber] = useState("")
    const [accountCurrency, setaccountCurrency] = useState("")
    const [country, setcountry] = useState("")
    const [SWIFTCode, setSWIFTCode] = useState("")
    const [branchCode, setbranchCode] = useState("")
    //bankName,accountName,accountNumber,accountCurrency,country,SWIFTCode,branchCode
    let signature= userData.signature
    const dispatch= useDispatch();
    function createBank(e) {
      e.preventDefault();
      dispatch(createbank(bankName,accountName,accountNumber,accountCurrency,country,SWIFTCode,branchCode,signature))
     
  navigate("/home/banks") 
    }
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
         <form class="card">
           <div class="card-header">
             <h3 class="card-title">Add Bank  </h3>
           </div>
           <div class="card-body">
             <div class="mb-3">
               <label class="form-label ">Account Name</label>
               <div>
                 <input onChange={(e)=>setaccountName(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
             <div class="mb-3">
               <label class="form-label ">Acount Number</label>
               <div>
                 <input onChange={(e)=>setaccountNumber(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
             <div class="mb-3">
               <label class="form-label ">Bank Name</label>
               <div>
                 <input onChange={(e)=>setbankName(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
             <div class="mb-3">
               <label class="form-label ">Account Currency</label>
               <div>
                 <input type="text" onChange={(e)=>setaccountCurrency(e.target.value)} class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
             <div class="mb-3">
               <label class="form-label ">Account Branch Code</label>
               <div>
                 <input onChange={(e)=>setbranchCode(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
             <div class="mb-3">
               <label class="form-label ">SWIFT Code</label>
               <div>
                 <input onChange={(e)=>setSWIFTCode(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
             <div class="mb-3">
               <label class="form-label ">Country</label>
               <div>
                 <input onChange={(e)=>setcountry(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
           
           </div>
         
         </form>
       </div>
  
     
    </div>
 
    </div>

               
            
              
               <div  className="container-xl mt-4">
         
         
       
               <button onClick={createBank} className='btn btn-primary d-none d-sm-inline-block'>
           Submit
          </button>
                
               
                  
               
               
        
             
              </div>
            </div>
  )
}

export default AddBank