import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { updatemanager} from '../../redux/actions/manager';
import { useNavigate,useParams } from 'react-router-dom';
import SingleProductLoader from '../products/single-product-loader';
import SingleErrorProduct from '../products/single-product-error';
import {Link} from "react-router-dom"


function UpdateManager({userData}) {
  const id= useParams().id;
  const navigate= useNavigate()
    const managers= useSelector((state)=>state.getManagers);
    const updateManager= useSelector((state)=>state.updateManager);
    let {loading,success,data,error}=managers;
console.log(managers);
    let info=loading ? "loading" : error ? "error": data ? data.filter((item)=>item._id===id): null;
    const [name, setname] = useState(info[0].name)
    const [surname, setsurname] = useState(info[0].surname)
    const [email, setemail] = useState(info[0].email)
    const [phone, setphone] = useState(info[0].phone);
    const dispatch= useDispatch();
    let signature= userData.signature
    function submit(e) {
      e.preventDefault();
      dispatch(updatemanager(name,surname,email,phone,id,signature))
     
//  navigate("/home/products") 
    }

    useEffect(() => {
      if (updateManager.success===true) {
   
      navigate(`/home/users/managers`)
      
   
        }
    }, [updateManager.success])

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
             <h3 class="card-title">Manager Information </h3>
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
<button onClick={submit} className='btn btn-primary d-none d-sm-inline-block'>
  Submit
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

export default UpdateManager