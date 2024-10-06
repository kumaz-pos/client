import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import {adminsignin} from "../../redux/actions/admin"
import { baseUrlFrontend } from '../../frontend-url';
import { useNavigate } from 'react-router-dom';
import AuthLoader from '../common/AuthLoader';

function AdminSignin() {
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("");
  const adminSignin = useSelector(state => state.adminSignin);
  const {adminInfo,loading,error}=adminSignin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function adminLogin(e) {
      e.preventDefault();
     
    
        dispatch(adminsignin(email,password));
    
      }
      useEffect(() => {
          if (adminInfo) {
           
            //navigate("/home")
            window.location.replace(`${baseUrlFrontend}/home`)
            
          }
      
          return () => {
            //
          };
          
         }, [adminInfo,navigate])
  return (
    <div class=" d-flex flex-column">
    <div class="page page-center">
      <div class="container container-tight py-4">
        <div class="text-center mb-4">
          <a href="." class="navbar-brand navbar-brand-autodark"><img src="https://zpuplawsjodqxxfqxchz.supabase.co/storage/v1/object/public/Car%20parts/japan_direct_logo_w_background.png" height="100" alt=""/></a>
        </div>
        <form class="card card-md"  onSubmit={adminLogin} autocomplete="off" novalidate>
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Admin Login</h2>
            {
        loading && <AuthLoader/>
     }
        {
          error &&      <div class="danger" style={{display:"flex","justifyContent":"center","color":"red"}}> {
            error
          }</div>  
            }
             
            <div class="mb-3">
              <label class="form-label">
              Email 
              </label>
              <input  onChange={(e)=>setEmail(e.target.value)}  type="email" class="form-control" placeholder="Email"/>
            </div>
         
      
          
            <div class="mb-3">
              <label class="form-label">Password</label>
              <div class="input-group input-group-flat">
                <input  onChange={(e)=>setpassword(e.target.value)}  type="password" class="form-control"  placeholder="Password"  autocomplete="off"/>
                <span class="input-group-text">
                  <a href="#" class="link-secondary" >
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                  </a>
                </span>
              </div>
            </div>
           
           
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </div>
          </div>
        </form>
    
      </div>
    </div>
    </div>
  )
}

export default AdminSignin