import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { updatemanager} from '../../redux/actions/manager';
import { useNavigate,useParams } from 'react-router-dom';
import SingleProductLoader from '../products/single-product-loader';
import SingleErrorProduct from '../products/single-product-error';
import {Link} from "react-router-dom"


function UpdateManager({userData}) {
  const navigate= useNavigate();
  const id= useParams().id
    const managers= useSelector((state)=>state.getManagers);
    const updateManager= useSelector((state)=>state.updateManager);
    let {loading,success,data,error}=managers
    let info=loading ? "loading" : error ? "error": data.filter((item)=>item._id===id);
    const [name, setname] = useState(info[0].name)
    const [surname, setsurname] = useState(info[0].surname)
    const [email, setemail] = useState(info[0].email)
    const [phone, setphone] = useState(info[0].phone);
    const dispatch= useDispatch();
let signature= userData.signature
    function submit(e) {
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
    else if(typeof(email)!=='string'){
      alert("Please the name should be words not numbers")
    } 
    else if(typeof(phone)!=='string'){
      alert("Please the name should be words not numbers")
    } 
   else{
    dispatch(updatemanager(id,signature,name,email,phone,surname))
   }
      
     
//  navigate("/home/products") 
    }

    useEffect(() => {
      if (updateManager.success===true) {
       
     window.location.href="http://localhost:3000/home/users/managers" 
     
        }
    }, [updateManager.success])
    


  return (
     loading ? <SingleProductLoader/> : error ? <SingleErrorProduct/> : 
    data ?  
    
    <div class="page-body">
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
  <form  onSubmit={submit}>
  <div class="col-md-6">


  <div class="card-header">
    <h3 class="card-title">Manager Information </h3>
  </div>
  <div class="card-body">
    <div class="mb-3">
      <label class="form-label ">Name</label>
      <div>
        <input required  value={name} type="text" onChange={(e)=>setname(e.target.value)}   class="form-control" aria-describedby="emailHelp" />
      
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label ">Surname</label>
      <div>
        <input  required value={surname} type="text" onChange={(e)=>setsurname(e.target.value)}  class="form-control" aria-describedby="emailHelp" />
      
      </div>
    </div>
   

  
  </div>



</div>
<div className="col-md-6">

  <div class="card-header">
    <h3 class="card-title">Manager Information </h3>
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
   
  
  </div>


</div>
<div style={{display:"flex",justifyContent:"center"}}>
<button >
  Update
</button>
  </div>
  </form>
  


     
    </div>
 
    </div>
   
 
  
    
         
            
               <div  className="container-xl mt-4">
         
       
                
               
                  
               
               
        
             
              </div>
            </div> 
    
: null
  )
}

export default UpdateManager