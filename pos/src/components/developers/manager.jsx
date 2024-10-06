import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getmanager} from '../../redux/actions/manager';
import { useNavigate,useParams } from 'react-router-dom';
import SingleProductLoader from '../products/single-product-loader';
import SingleErrorProduct from '../products/single-product-error';
import {Link} from "react-router-dom"

function Manager({userData}) {

    const id= useParams().id;
console.log(id);
    const dispatch=useDispatch();
    const manager=useSelector((state)=>state.getManager);
 
    const {loading,data,error}=manager;
    console.log(userData);
  let signature= userData.signature;
  console.log(data);
    console.log(userData)
    useEffect(() => {
     
        dispatch(getmanager(id,signature))
          
        }, [getmanager])
  return (
    loading ? <SingleProductLoader/> : error ? <SingleErrorProduct/> : 
    data ?  <div class="page-body">
    <div class="container-xl">
    <div class="row row-cards">
    <div class="card-body border-bottom py-3">
    <div class="d-flex">
   
      <div class="ms-auto text-secondary">
       
        <div class="ms-2 d-inline-block">
         <Link to="/home/users/managers" className='btn btn-primary d-none d-sm-inline-block'>
           Return to Managers
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
             <h3 class="card-title">Manager Informtion </h3>
           </div>
           <div class="card-body">
             <div class="mb-3">
               <label class="form-label ">Name</label>
               <div>
                 <input  value={data? data.name:null}  disabled type="text" class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
             <div class="mb-3">
               <label class="form-label ">Surname</label>
               <div>
                 <input value={data? data.surname:null} disabled type="text" class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
            
       
           
           </div>
         
         </form>
        
       </div>
  <div className="col-md-6">
  <form class="card">
           <div class="card-header">
             <h3 class="card-title">Manager Informtion </h3>
           </div>
           <div class="card-body">
        
             <div class="mb-3">
               <label class="form-label ">Phone</label>
               <div>
                 <input type="text" value={data? data.phone:null} disabled class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
             <div class="mb-3">
               <label class="form-label ">Email</label>
               <div>
                 <input disabled type="text" value={data? data.email:null} class="form-control" aria-describedby="emailHelp" />
               
               </div>
             </div>
            
           
           </div>
       
         </form>
  </div>
  <div style={{display:"flex",justifyContent:"center"}}>

  </div>

     
    </div>
 
    </div>
   
 
  
    
         
            
               <div  className="container-xl mt-4">
         
       
                
               
                  
               
               
        
             
              </div>
            </div> 
    
: null
  )
}

export default Manager