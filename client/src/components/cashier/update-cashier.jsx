import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { updatecashier,getcashiers} from '../../redux/actions/cashier';
import { useNavigate,useParams } from 'react-router-dom';
import SingleProductLoader from '../products/single-product-loader';
import SingleErrorProduct from '../products/single-product-error';
import {Link} from "react-router-dom"


function UpdateCashier({userData}) {
    const navigate= useNavigate();
    const id= useParams().id
      const cashiers= useSelector((state)=>state.getCashiers);
      const updateCashier= useSelector((state)=>state.updateCashier);
      let {loading,success,data,error}=cashiers
      let info=loading ? "loading" : error ? "error": data.filter((item)=>item._id===id);
      const [name, setname] = useState(info[0].name)
      const [surname, setsurname] = useState(info[0].surname)
      const [email, setemail] = useState(info[0].email)
      const [phone, setphone] = useState(info[0].phone);
      const dispatch= useDispatch();
  let signature= userData.signature
      function submit(e) {
        e.preventDefault();
        dispatch(updatecashier(email,phone,name,surname,id,signature))
       
  //  navigate("/home/products") 
      }
  
      useEffect(() => {
        if (updateCashier.success===true) {
     
    
        window.location.href=`/home/users/cashiers`
     
          }
      }, [updateCashier.success])
      
    
  console.log(updateCashier);
  
    return (
       loading ? <SingleProductLoader/> : error ? <SingleErrorProduct/> : 
      data ?  <div class="page-body">
      <div class="container-xl">
      <div class="row row-cards">
      <div class="card-body border-bottom py-3">
      <div class="d-flex">
     
        <div class="ms-auto text-secondary">
         
          <div class="ms-2 d-inline-block">
           <Link to="/home/users/cashiers" className='btn btn-primary d-none d-sm-inline-block'>
             Return to Cashiers
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
               <h3 class="card-title">Cashier Information </h3>
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
           
           </form>
          
         </div>
    <div className="col-md-6">
    <form class="card">
             <div class="card-header">
               <h3 class="card-title">Cashier Information </h3>
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
         
           </form>
    </div>
    <div style={{display:"flex",justifyContent:"center"}}>
  <button className='btn btn-primary d-none d-sm-inline-block' onClick={submit}>
    Update
  </button>
    </div>
  
       
      </div>
   
      </div>
     
   
    
      
           
              
                 <div  className="container-xl mt-4">
           
         
                  
                 
                    
                 
                 
          
               
                </div>
              </div> 
      
  : null
    )
  }
  
  export default UpdateCashier