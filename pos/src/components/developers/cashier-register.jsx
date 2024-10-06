import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import {cashierregister} from '../../redux/actions/cashier'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function CashierRegister({userData}) {
  const navigate=useNavigate()
  const [name, setname] = useState("")
  const [surname, setsurname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const cashierSignup=useSelector((state)=>state.cashierSignup)
  const dispatch= useDispatch();
  const signature=userData.signature
  function addCashier(e) {
      e.preventDefault();
      if (password!==confirmPassword) {
          alert("Password and confirm password are not matching")
      }
      else if(typeof(name)!=='string'){
        alert("Please the name should be words not numbers")
      } 
      else if(typeof(surname)!=='string'){
        alert("Please the name should be words not numbers")
      } 
      else if(typeof(phone)!=='string'){
        alert("Please the name should be words not numbers")
      } 
      else if(typeof(email)!=='string'){
        alert("Please the name should be words not numbers")
      } 
      else if(typeof(password)!=='string'){
        alert("Please the name should be words not numbers")
      } 
      else{
          dispatch(cashierregister(email,phone,password,name,surname,signature))
     
    
      }
      
     
    }


    useEffect(() => {
      if (cashierSignup.success===true) {
       
     window.location.href="http://localhost:3000/home/users/cashiers" 
     
        }
    }, [cashierSignup.success])
    
  
  
return (
  <div class="page-body">
  <div class="container-xl">
  <div class="row row-cards">
  <div class="card-body border-bottom py-3">
  <div class="d-flex">
 
    <div class="ms-auto text-secondary">
     
      <div class="ms-2 d-inline-block">
       <Link to="/home/cashiers" className='btn btn-primary d-none d-sm-inline-block'>
         Return to Cashiers
        </Link>
        
       
      </div>
    </div>
  </div>
</div>
<form onSubmit={addCashier} class="" style={{gap:"1rem"}}>
      <div class="d-flex" style={{gap:"2rem"}}>
      <div class="col-md-6">
      <div class="ms-auto text-secondary">
         
        
       </div>
           <div class="card">
             <div class="card-header">
               <h3 class="card-title">Cashier Information </h3>
             </div>
             <div class="card-body">
               <div class="mb-3">
                 <label class="form-label ">Name</label>
                 <div>
                   <input  required value={name} type="text" onChange={(e)=>setname(e.target.value)}   class="form-control" aria-describedby="emailHelp" />
                 
                 </div>
               </div>
               <div class="mb-3">
                 <label class="form-label ">Surname</label>
                 <div>
                   <input required  value={surname} type="text" onChange={(e)=>setsurname(e.target.value)}  class="form-control" aria-describedby="emailHelp" />
                 
                 </div>
               </div>
               <div class="mb-3">
                 <label class="form-label ">Password</label>
                 <div>
                   <input  required value={password} type="text" onChange={(e)=>setpassword(e.target.value)}  class="form-control" aria-describedby="emailHelp" />
                 
                 </div>
               </div>
              
         
             
             </div>
           
           </div>
          
         </div>
    <div className="col-md-6">
    <div class="card">
             <div class="card-header">
               <h3 class="card-title">Cashier Information </h3>
             </div>
             <div class="card-body">
          
               <div class="mb-3">
                 <label class="form-label ">Phone</label>
                 <div>
                   <input required value={phone} type="text" onChange={(e)=>setphone(e.target.value)} class="form-control" aria-describedby="emailHelp" />
                 
                 </div>
               </div>
               <div class="mb-3">
                 <label class="form-label ">Email</label>
                 <div>
                   <input required value={email} type="email" onChange={(e)=>setemail(e.target.value)} class="form-control" aria-describedby="emailHelp" />
                 
                 </div>
               </div>
              
               <div class="mb-3">
                 <label class="form-label ">Confirm Password</label>
                 <div>
                   <input required value={confirmPassword} type="text" onChange={(e)=>setconfirmPassword(e.target.value)} class="form-control" aria-describedby="emailHelp" />
                 
                 </div>
               </div>
              
             
             </div>
         
           </div>

    </div>
      </div>
    

 
    <div style={{display:"flex",justifyContent:"center"}}>
<button  className='btn btn-primary d-none d-sm-inline-block'>
         Submit
        </button>
</div>
  </form>



   
  </div>

  </div>
 


  
       
          
             <div  className="container-xl mt-4">
       
     
              
             
                
             
             
      
           
            </div>
          </div>)
}

export default CashierRegister