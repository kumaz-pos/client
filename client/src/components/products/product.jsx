import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getproduct} from '../../redux/actions/products-actions';
import { useNavigate,useParams } from 'react-router-dom';
import SingleProductLoader from './single-product-loader';
import SingleErrorProduct from './single-product-error';
import {Link} from "react-router-dom"
function Product({userData}) {
    const id= useParams().id;
console.log(id);
    const dispatch=useDispatch();
    const product=useSelector((state)=>state.getProduct);
  
    const {loading,data,error}=product;
    console.log(userData);
  let signature= userData.signature;
  console.log(data);
    useEffect(() => {
     
    dispatch(getproduct(id))
      
    }, [getproduct])
    
  return (
    
       loading ? <SingleProductLoader/> : error ? <SingleErrorProduct/> :  data ?  
       <div class="page-body">
        <div class="container-xl">
        <div class="row row-cards">
        <div class="card-body border-bottom py-3">
        <div class="d-flex">
       
          <div class="ms-auto text-secondary">
           
            <div class="ms-2 d-inline-block">
             <Link to="/home/products" className='btn btn-primary d-none d-sm-inline-block'>
               Return to Products
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
                 <h3 class="card-title">Product Information </h3>
               </div>
               <div class="card-body">
                 <div class="mb-3">
                   <label class="form-label ">Name</label>
                   <div>
                     <input value={data.name} type="text" class="form-control" aria-describedby="emailHelp" disabled/>
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Brand</label>
                   <div>
                     <input value={data.brand} type="text" class="form-control" aria-describedby="emailHelp" disabled/>
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Model</label>
                   <div>
                     <input type="text" value={data.model} class="form-control" aria-describedby="emailHelp" disabled/>
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Year</label>
                   <div>
                     <input value={data.year} type="text" class="form-control" aria-describedby="emailHelp" disabled/>
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Show on Ecommerce</label>
                   <div>
                    {
                      data.showOnEcommerce ?  <input type="text" value="Yes" class="form-control" aria-describedby="emailHelp" disabled/> :
                      <input type="text" value="No" class="form-control" aria-describedby="emailHelp" disabled/>
                    }
                     
                   
                   </div>
                 </div>
              
               </div>
             
             </form>
           </div>
        <div class="col-md-6">
             <form class="card">
               <div class="card-header">
                 <h3 class="card-title">Product Information </h3>
               </div>
               <div class="card-body">
                 <div class="mb-3">
                   <label class="form-label ">Quantity Bought</label>
                   <div>
                     <input value={ data.quantityBought} type="text" class="form-control" aria-describedby="emailHelp" disabled/>
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Quantity Sold</label>
                   <div>
                     <input value={ data.quantitySold} type="text" class="form-control" aria-describedby="emailHelp" disabled/>
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Quantity Remaining</label>
                   <div>
                     <input value={ data.quantityRemaining} type="text" class="form-control" aria-describedby="emailHelp" disabled/>
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Buying Price</label>
                   <div>
                     <input value={ data.buyingPrice} type="text" class="form-control" aria-describedby="emailHelp" disabled/>
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Selling Price</label>
                   <div>
                     <input value={ data.sellingPrice} type="text" class="form-control" aria-describedby="emailHelp" disabled/>
                   
                   </div>
                 </div>
              
               </div>
             
             </form>
           </div>
         
        </div>
     
        </div>
        <div className="container-xl">
             
             <div class="row row-cards">
             {
           data.images.length === 0 ? null :   <div class="card-header" style={{
            marginBottom:"2rem",marginTop:"1rem"
         }}>
                  <h3 class="card-title">Product Images </h3>
                </div>
        }
             </div>
             </div>
     
      
        
             
              <div className="container-xl">
             
             
                  
                     
                      {
                        data.images ?  data.images.map((item)=>{
                                          
                          return        <div class="container-xl">
  <div class="row row-cards">
                             <div class="col-sm-6 col-lg-4">
                <div class="card card-sm">
                  <a href="#" class="d-block"><img src={item} class="card-img-top"/></a>
                
                </div>
              </div>
                          </div>

                          </div>
                          
                        

                      
                            
                         }) : null
                      }
                     
                    
                       
                    
                    
             
                  
                   </div>
                </div>
             

       
      : null
     
    
      

   


      
  
  )
}

export default Product