import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getadmins,deleteadmin } from '../../redux/actions/admin';
import TableLoader from '../common/table-loader';
import TableError from '../common/table-error';
import { Link } from 'react-router-dom';
function Admins({userData}) {
    const dispatch=useDispatch();
    const admins=useSelector((state)=>state.getAdmins);
  
    const {loading,data,error}=admins;
    console.log(admins);
  let signature= userData.signature;
  console.log(signature);
    useEffect(() => {
     
    dispatch(getadmins(signature))
      
    }, [dispatch])
  return (
    <div class="page-wrapper">
    <div className="page-body">
  <div class="col-12">
     <div class="card">
       <div class="card-header">
         <h3 class="card-title">
          Admins
         </h3>
       </div>
       <div class="card-body border-bottom py-3">
         <div class="d-flex">
        
           <div class="ms-auto text-secondary">
            
             <div class="ms-2 d-inline-block">
               {
                 userData.role === "cashier" ? null :  <Link to="/home/users/register-admin" className='btn btn-primary d-none d-sm-inline-block'>
                 Add Admin
               </Link>
               }
              
             </div>
           </div>
         </div>
       </div>
       <div class="table-responsive">
       
    {
     loading ? <TableLoader/> : error ? <TableError/> :   <table class="table card-table table-vcenter text-nowrap datatable">
     <thead>
       <tr>
      
       
         <th>Name</th>
         <th>Surname</th>
         <th>Email</th>
         <th>Phone</th>
    
         <th>Actions</th>
       </tr>
     </thead>
     <tbody>
 
          
         
           {
  data ?            data.map((item)=>{
 return  <tr key={item._id}>
        
 <td><span class="text-secondary">{item.name}</span></td>
 <td><span class="text-secondary">{item.surname}</span></td>
 <td>
   <span class="text-secondary"></span>
   {item.email}
 </td>
 <td>
 {item.phone}
 </td>
 
 
 
 
 
 
 <td class="" style={{display:"flex",gap:"0.3rem"}}>
   {
 userData.role!=="cashier" ?  <> 
   <Link to={`/home/users/admin/${item._id}`} class="btn btn-green">
 View 
 </Link>
 <Link to={`/home/users/admin/update/${item._id}`} class="btn btn-azure ">
 Update
 </Link>
 <button  onClick={()=>{
   dispatch(deleteadmin(item._id,signature))
   window.location.reload()
 }} class="btn btn-red ">
 Delete
 </button>
 </> :
   <Link to={`home/get-product/${item._id}`} class="btn btn-green">
   View
   </Link>
 
   }
   
 
  
 
 
 </td>
 </tr>
 
             }) : null
           }
        
   
      
  
     
     </tbody>
   </table>
    } 
   
        
       </div>
       <div class="card-footer d-flex align-items-center">
         <p class="m-0 text-secondary">Showing <span>1</span> to <span>8</span> of <span>16</span> entries</p>
         <ul class="pagination m-0 ms-auto">
           <li class="page-item disabled">
             <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
           
               <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>
               prev
             </a>
           </li>
           <li class="page-item"><a class="page-link" href="#">1</a></li>
           <li class="page-item active"><a class="page-link" href="#">2</a></li>
           <li class="page-item"><a class="page-link" href="#">3</a></li>
           <li class="page-item"><a class="page-link" href="#">4</a></li>
           <li class="page-item"><a class="page-link" href="#">5</a></li>
           <li class="page-item">
             <a class="page-link" href="#">
               
               <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
             </a>
           </li>
         </ul>
       </div>
     </div>
   </div>
     </div>
 </div>
  )
}

export default Admins