import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import {adminregister} from '../../redux/actions/admin'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function AdminRegister() {
  const navigate=useNavigate()
  const [name, setname] = useState("")
  const [surname, setsurname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const adminSignup=useSelector((state)=>state.adminSignup)
  const dispatch= useDispatch();
  function addAdmin(e) {
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
          dispatch(adminregister(email,phone,password,name,surname))
     
    
      }
      
     
    }


    useEffect(() => {
      if (adminSignup.success===true) {
       
     window.location.href="http://localhost:3000/home/users/admins" 
     
        }
    }, [adminSignup.success])
    
  
  
return (
  <div class="page-body">
      <div class="container-xl">
      <div class="row row-cards">
      <div class="card-body border-bottom py-3">
      <div class="d-flex">
     
        <div class="ms-auto text-secondary">
         
          <div class="ms-2 d-inline-block">
           <Link to="/home/users/admins" className='btn btn-primary d-none d-sm-inline-block'>
             Return to Admins
            </Link>
            
           
          </div>
        </div>
      </div>
    </div>
    <form onSubmit={addAdmin} class="" style={{gap:"1rem"}}>
      <div class="d-flex" style={{gap:"2rem"}}>
      <div class="col-md-6">
      <div class="ms-auto text-secondary">
         
        
       </div>
           <div class="card">
             <div class="card-header">
               <h3 class="card-title">Admin Informtion </h3>
             </div>
             <div class="card-body">
               <div class="mb-3">
                 <label class="form-label ">Name</label>
                 <div>
                   <input  value={name} type="text" onChange={(e)=>setname(e.target.value)}   class="form-control" aria-describedby="emailHelp" />
                 
                 </div>
               </div>
               <div class="mb-3">
                 <label class="form-label ">Surname</label>
                 <div>
                   <input  value={surname} type="text" onChange={(e)=>setsurname(e.target.value)}  class="form-control" aria-describedby="emailHelp" />
                 
                 </div>
               </div>
              
         
             
             </div>
           
           </div>
          
         </div>
    <div className="col-md-6">
    <div class="card">
             <div class="card-header">
               <h3 class="card-title">Admin Information </h3>
             </div>
             <div class="card-body">
          
               <div class="mb-3">
                 <label class="form-label ">Phone</label>
                 <div>
                   <input value={phone} type="text" onChange={(e)=>setphone(e.target.value)} class="form-control" aria-describedby="emailHelp" />
                 
                 </div>
               </div>
               <div class="mb-3">
                 <label class="form-label ">Email</label>
                 <div>
                   <input value={email} type="email" onChange={(e)=>setemail(e.target.value)} class="form-control" aria-describedby="emailHelp" />
                 
                 </div>
               </div>
              
             
             </div>
         
           </div>

    </div>
      </div>
    
 
    <div style={{display:"grid",justifyContent:"center",marginTop:"1rem"}}>
  <button className='btn btn-primary d-none d-sm-inline-block' >
    Update
  </button>
    </div>
 
   
  </form>
       
      </div>
   
      </div>
     
   
    
      
           
              
                 <div  className="container-xl mt-4">
           
         
                  
                 
                    
                 
                 
          
               
                </div>
              </div> 
          
          
          )
}

export default AdminRegister