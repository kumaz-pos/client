import React from 'react'
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {developerregister} from "../../redux/actions/developer"
import { baseUrlFrontend } from '../../frontend-url';
import { useNavigate } from 'react-router-dom';
import AuthLoader from '../common/AuthLoader';
function DeveloperRegister() {

    const [name, setname] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")

    const [confirmPassword, setconfirmPassword] = useState("")
    const [password, setpassword] = useState("");
    const [phone, setphone] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const devRegister = useSelector(state => state.devSignup);
    const {devInfo,loading,error}=devRegister ;
 
    function developerRegister(e) {
        e.preventDefault();
        if (confirmPassword !== password) {
          alert("Passwords are not matching")
        }
      
          dispatch(developerregister(email,phone,password,name,surname));
      
        }
        useEffect(() => {
            if (devInfo) {
             
              //navigate("/home")
              window.location.replace(`${baseUrlFrontend}/home`)
              
            }
        
            return () => {
              //
            };
            
           }, [devInfo,navigate])
        
  return (
    <div class=" d-flex flex-column">
    <div class="page page-center">
      <div class="container container-tight py-4">
        <div class="text-center mb-4">
          <a href="." class="navbar-brand navbar-brand-autodark"><img src="https://zpuplawsjodqxxfqxchz.supabase.co/storage/v1/object/public/Car%20parts/japan_direct_logo_w_background.png" height="100" alt=""/></a>
        </div>
        <form class="card card-md" onSubmit={developerRegister}  autocomplete="off" novalidate>
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Create new account</h2>
     {
        loading && <AuthLoader/>
     }
        {
          error &&      <div class="danger" style={{display:"flex","justifyContent":"center","color":"red"}}> {
            error
          }</div>  
            }
             
            
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input onChange={(e)=>setname(e.target.value)} type="text" class="form-control" placeholder="Enter name"/>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Surname</label>
              <input  onChange={(e)=>setSurname(e.target.value)} type="text" class="form-control" placeholder="Enter surname"/>
            </div>
            <div class="mb-3">
              <label class="form-label">
                Phone Number
              </label>
              <input  onChange={(e)=>setphone(e.target.value)} type="text" class="form-control" placeholder="Enter Phone Number"/>
            </div>
            <div class="mb-3">
              <label class="form-label">
              Email 
              </label>
              <input onChange={(e)=>setEmail(e.target.value)}  type="text" class="form-control" placeholder="Enter email"/>
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <div class="input-group input-group-flat">
                <input  onChange={(e)=>setpassword(e.target.value)} type="password" class="form-control"  placeholder="Password"  autocomplete="off"/>
                <span class="input-group-text">
                  <a href="#" class="link-secondary" title="Show password" data-bs-toggle="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                  </a>
                </span>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Confirm password</label>
              <div class="input-group input-group-flat">
                <input onChange={(e)=>setconfirmPassword(e.target.value)} type="password" class="form-control"  placeholder="Password"  autocomplete="off"/>
                <span class="input-group-text">
                  <a href="#" class="link-secondary" title="Show password" data-bs-toggle="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                  </a>
                </span>
              </div>
            </div>
           
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100">Create new account</button>
            </div>
          </div>
        </form>
        <div class="text-center text-muted mt-3">
          Already have account? <Link to="/developer-signin" tabindex="-1">Sign in</Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default DeveloperRegister