import {UPDATE_ADMIN_SUCCESS,UPDATE_ADMIN_REQUEST,UPDATE_ADMIN_FAIL,DELETE_ADMIN_SUCCESS,DELETE_ADMIN_REQUEST,DELETE_ADMIN_FAIL,GET_ADMIN_SUCCESS,GET_ADMIN_REQUEST,GET_ADMIN_FAIL,GET_ADMINS_SUCCESS,GET_ADMINS_REQUEST,GET_ADMINS_FAIL,ADMIN_LOGIN_FAIL,ADMIN_LOGIN_REQUEST,ADMIN_LOGIN_SUCCESS,ADMIN_LOGOUT_SUCCESS,ADMIN_REGISTER_FAIL,ADMIN_REGISTER_REQUEST,ADMIN_REGISTER_SUCCESS} from "../constants/admin";

import Cookie from 'js-cookie';
import { Axios } from "axios";
import axios from "axios";
import { baseUrl } from "./baseUrl";
export const  adminsignin = (email, password) => async (dispatch) => {
    dispatch({ type: ADMIN_LOGIN_REQUEST, payload: { email, password } });
    try {
      
      const { data } = await axios.post(`${baseUrl}admin/signin`, {  email, password  });
      dispatch({ type:ADMIN_LOGIN_SUCCESS, payload: data });
     
      localStorage.setItem("adminInfo",JSON.stringify(data))
      
    } catch (error) {
      
      dispatch({ type: ADMIN_LOGIN_FAIL, payload: error.response.data.message });
    }
  }
  
 export const adminregister = (email,phone,password,name,surname) => async (dispatch) => {
    dispatch({ type: ADMIN_REGISTER_REQUEST, payload: { email,phone,password,name,surname } });
    try {
      const { data } = await axios.post(`${baseUrl}admin/signup`, { email,phone,password,name,surname});
    
      dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });

   
    
     
      
      
    } catch (error) {
  
  let payload=error.response.data.message
      dispatch({ type:  ADMIN_REGISTER_FAIL, payload});
    }
  }
  
 export const adminLogout = () => (dispatch) => {
  localStorage.removeItem("adminInfo")
    dispatch({ type: ADMIN_LOGOUT_SUCCESS })
  }


  export const getadmins =(signature)=>async(dispatch,getState)=>{

    dispatch({
        type:GET_ADMINS_REQUEST
    });
 

    try {
      const {data}  = await axios.get(`${baseUrl}admin/get-admins`,{headers:{        
           
            
        "Authorization":`Bearer ${signature}`
}
    })  
         
    
    
 
   
          
dispatch({type:GET_ADMINS_SUCCESS,payload:data});
     } catch (error) {
      
    const message=  error
 
        dispatch({type:GET_ADMINS_FAIL,payload:message})
}

   
}
  export const getadmin =(id,signature)=>async(dispatch,getState)=>{

    dispatch({
        type:GET_ADMIN_REQUEST
    });
 

    try {
      const {data}  = await axios.get(`${baseUrl}admin/get-admin/${id}`,{
        headers:{
          Authorization:`Bearer ${signature}`
        }
      })  
         
    
    
 
   
          
dispatch({type:GET_ADMIN_SUCCESS,payload:data});
     } catch (error) {
      
    const message=  error
 
        dispatch({type:GET_ADMIN_FAIL,payload:message})
}

   
}
  export const deleteadmin =(id,signature)=>async(dispatch,getState)=>{

    dispatch({
        type:DELETE_ADMIN_REQUEST
    });
 

    try {
      const {data}  = await axios.get(`${baseUrl}admin/delete-admin/${id}`,{
        headers:{
          Authorization:`Bearer ${signature}`
        }
      })  
         
    
    
 
   
          
dispatch({type:DELETE_ADMIN_SUCCESS,payload:data});
     } catch (error) {
      
    const message=  error
 
        dispatch({type:DELETE_ADMIN_FAIL,payload:message})
}

   
}
export const updateadmin = (email,phone,name,surname,id,signature) => async (dispatch) => {
  dispatch({ type: UPDATE_ADMIN_REQUEST, payload: { email,phone,name,surname } });
  try {
    const { data } = await axios.patch(`${baseUrl}admin/update-profile/${id}`, { email,phone,name,surname},
    {
      headers:{
        Authorization:`Bearer ${signature}`
      }
    }
    );
  
    dispatch({ type: UPDATE_ADMIN_SUCCESS, payload: data });

 
  
   
    
    
  } catch (error) {

let payload=error.response.data.message
    dispatch({ type:  UPDATE_ADMIN_FAIL, payload});
  }
}