import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { updateproduct,getproduct ,getproducts} from '../../redux/actions/products-actions'

import { useNavigate,Link } from 'react-router-dom'
import SingleProductLoader from './single-product-loader';
import SingleErrorProduct from './single-product-error';

import { useParams } from 'react-router-dom'
function UpdateProduct({userData}) {
const id= useParams().id;

console.log(id);
  const navigate= useNavigate();
  const products= useSelector((state)=>state.getProducts);
  const product= useSelector((state)=>state.getProduct);
  let editProduct=useSelector((state)=>state.updateProduct);
  console.log(product);
  let {loading,success,data,error}=products
  console.log(data);
  let info=loading ? "loading" : error ? "error": data.filter((item)=>item._id===id);
  console.log(info);


  const [name, setname] = useState(info[0].name)
  const [brand, setbrand] = useState(info[0].brand)
  const [model, setmodel] = useState(info[0].model)
  const [year, setyear] = useState(info[0].year)
  const [showOnEcommerce, setshowOnEcommerce] = useState(info[0].showOnEcommerce)
  const [quantityBought, setquantityBought] = useState(info[0].quantityBought)
  //const [quantityRemaining, setquantityRemaining] = useState(info[0].quantityRemaining)
  const [quantitySold, setquantitySold] = useState(info[0].quantitySold)
  const [buyingPrice, setbuyingPrice] = useState(info[0].buyingPrice)
  const [productDescription, setproductDescription] = useState(info[0].description)
  const [sellingPrice, setsellingPrice] = useState(info[0].sellingPrice)
  let quantityInStock= quantityBought-quantitySold;
  let valueOfStock= quantityInStock*buyingPrice
  const [images, setImages] = useState([])
  const [imagesUrl, setImagesUrl] = useState(info[0].imagesUrl ? info[0].imagesUrl : [] ) ;
  console.log(info);
  function handleProductDescription(index,value) {
    setproductDescription((prev)=>{
        const updatedAnswers=[...prev];
        updatedAnswers[index]=value
        if (index=== updatedAnswers.length-1&&value.trim()!=='') {
            updatedAnswers.push('')
            return updatedAnswers
        }
        if (value.trim()==='') {
            updatedAnswers.splice(index,1)
            console.log(updatedAnswers);
            return updatedAnswers
        }
        if (index===updatedAnswers.length-1&&value.trim()!=='') {
            updatedAnswers.push('')
         
            return updatedAnswers
        }
        if (index!==updatedAnswers.length-1&&value.trim()==='') {
            updatedAnswers.splice(index,1)
            return updatedAnswers
        }
        return updatedAnswers
    })
}
  function imageHandler(e) {
    setImages([...images,e.target.files[0]])
    setImagesUrl((urlList)=>[
        ...urlList,
        URL.createObjectURL(e.target.files[0])
    ])

}
console.log(images);
function deleteFile(e) {
  const s= images.filter((item,index)=>index!==e)
  const d= imagesUrl.filter((item,index)=>index!==e)
  setImages(s);
  setImagesUrl(d);
  console.log(s);
}
let quantityRemaining =quantityInStock
 console.log(quantityRemaining);


const dispatch= useDispatch();
let signature= userData.signature
    function updateProduct(e) {
      e.preventDefault();
      dispatch(updateproduct(name,brand,model,sellingPrice,buyingPrice,quantityBought,quantitySold,quantityRemaining,year,productDescription,showOnEcommerce,images,id,signature))
     
//  navigate("/home/products") 
    }
console.log(imagesUrl);
useEffect(() => {
    dispatch(getproduct(id))
    dispatch(getproducts())
    console.clear();
images.length&& console.log(images)
imagesUrl.length&& console.log(imagesUrl)

}, [getproducts,getproduct,images,imagesUrl])

      useEffect(() => {
      if (editProduct.success===true) {
       
     window.location.href="http://147.79.101.199:3000/home/products" 
     
        }
    }, [editProduct.success])
    
  return (
    
        loading ? <SingleProductLoader/> : error ? <SingleErrorProduct/> :  data ?  
    <div class="page-body">
          <div class="container-xl">
    
          <form class="card" onSubmit={updateProduct}>
                <div class="card-header">
                  <h3 class="card-title">Update Shop</h3>
                </div>
                
          <div class="ms-auto text-secondary">
           
           <div class="ms-2 d-inline-block">
            <Link to="/home/products" className='btn btn-primary d-none d-sm-inline-block'>
              Return to Products
             </Link>
             
            
           </div>
         </div>
                <div class="card-body">
              
                       
                  <div class="mb-3 col">
                    <label class="col-3 col-form-label required"> Name</label>
                    <div class="col">
                      <input value={name} type="text" onChange={(e)=>setname(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter product name"/>
                    
                    </div>
                  </div>
                  <div class="mb-3 col">
                    <label class="col-3 col-form-label required">Brand</label>
                    <div class="col">
                      <input value={brand} type="text" onChange={(e)=>setbrand(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter unit"/>
                    
                    </div>
                  </div>
                  <div class="mb-3 col">
                    <label class="col-3 col-form-label required">Model</label>
                    <div class="col">
                      <input value={brand} type="text" onChange={(e)=>setmodel(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter unit"/>
                    
                    </div>
                  </div>
                  <div class="mb-3 col">
                    <label class="col-3 col-form-label required">Year</label>
                    <div class="col">
                      <input value={year} type="text" onChange={(e)=>setyear(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter unit"/>
                    
                    </div>
                  </div>
                  <div class="mb-3 col">
                    <label class="col-3 col-form-label required">Show on Ecommerce</label>
                    <div class="col">
                    <select onChange={(e)=>setshowOnEcommerce(e.target.value)}class="form-select">
                      {
                        showOnEcommerce ?  
                        <>
                         <option value={true} >
                       Yes
                        </option>
                         <option value={false} >
                       No
                        </option>
                        </>
                          :
                          <>
                          <option value={true} >
                        Yes
                         </option>
                          <option value={false} >
                        No
                         </option>
                         </>
                         
    
    
                    
                      }
                     
                    </select>
                      
                    
                    </div>
                  </div>
                  <div class="mb-3 col">
                    <label class="col-3 col-form-label required">Quantity Bought</label>
                    <div class="col">
                      <input value={quantityBought} type="text" onChange={(e)=>setquantityBought(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Quantity bought"/>
                    
                    </div>
                  </div>
                  <div class="mb-3 col">
                    <label class="col-3 col-form-label required">Quantities Sold</label>
                    <div class="col">
                      <input value={quantitySold} type="text" onChange={(e)=>setquantitySold(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Quantity sold"/>
                    
                    </div>
                  </div>
                  <div class="mb-3 col">
                    <label class="col-3 col-form-label required">Buying Price</label>
                    <div class="col">
                      <input value={buyingPrice} type="text" onChange={(e)=>setbuyingPrice(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter buying price"/>
                    
                    </div>
                  </div>
                  <div class="mb-3 col">
                    <label class="col-3 col-form-label required">Selling Price</label>
                    <div class="col">
                      <input value={sellingPrice} type="text" onChange={(e)=>setsellingPrice(e.target.value)} class="form-control" aria-describedby="emailHelp" placeholder="Enter selling price"/>
                    
                    </div>
                  </div>
                  <div class="mb-3">
                   <label class="form-label ">Product Description</label>
                   <div>
                    {
                        productDescription?  productDescription.map((description,index)=>{
                        return      <input key={index} type="text" 
                        onChange={(e)=>handleProductDescription(index,e.target.value)}
                        value={description}
                        class="form-control"
                        name="" id="" />
                        }) : null
                    }
                   
                   </div>
                 </div>
              
                  <div class="mb-3 col">
                    <label class="col-3 col-form-label required">Stock Left </label>
                    <div class="col">
                      <input disabled value={quantityInStock} type="text"  class="form-control" aria-describedby="emailHelp" />
                    
                    </div>
                  </div>
                
                
                </div>
                <div className="container-xl">
             
             <div class="row row-cards">
             <div class="card-header" style={{
            marginBottom:"2rem",marginTop:"1rem"
         }}>
                  <h3 class="card-title">Product Images </h3>
                </div>
        
             </div>
             </div>
     
      
        
             
              <div className="container-xl">
             
             
              <input onChange={imageHandler} type="file" class="form-control" aria-describedby="emailHelp" />
                   
                     
                   
                     
                    
                       
                    
                    
             
                  
                   </div>
                   
                
                   <div style={{marginTop:"1rem",display:"flex",gap:"1.5rem"}} className="container-xl">
                   {
                        imagesUrl.map((item,index)=>{
    return    <div class="col-sm-6 col-lg-4">
    <div class="card card-lg">
    <a href="#" class="d-flex">
    <img src={item} width="100%" height="100%" class="card-img-top"/>
    </a>
    <button onClick={()=>deleteFile(index)} style={{
    position:"absolute",background:"black",color:"white",top:"-10px",right:"-12px",borderRadius:"100%"
    
    }}>
    x
    </button>
    </div>
    </div>
                        })
                    }
                  
                    
                   </div>
                <div class="card-footer text-end">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
          </div>
      
    </div>
        
    : null
    
  
   
  )
}

export default UpdateProduct


