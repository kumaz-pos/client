import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { createproduct} from '../../redux/actions/products-actions'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function AddProduct({userData}) {
    const navigate=useNavigate()
    const addProduct=useSelector((state)=>state.addProduct)
    const [name, setname] = useState("")
    const [brand, setbrand] = useState("")
    const [model, setmodel] = useState("")
    const [year, setyear] = useState("")
    const [showOnEcommerce, setshowOnEcommerce] = useState(null)
    const [quantityBought, setquantityBought] = useState(0)
    //const [quantityRemaining, setquantityRemaining] = useState(info[0].quantityRemaining)
    const [quantitySold, setquantitySold] = useState(0)
    const [buyingPrice, setbuyingPrice] = useState(0)
    const [barcode, setbarcode] = useState("")
  
    const [sellingPrice, setsellingPrice] = useState(0)
    const [image, setimage] = useState("")
    console.log(typeof(name));
    const [images, setImages] = useState([])
    const [imagesUrl, setImagesUrl] = useState([])
    const [productDescription, setproductDescription] = useState([''])
  
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
    let quantityInStock= quantityBought-quantitySold;
//console.log(image);
function imageHandler(e) {
    setImages([...images,e.target.files[0]])
    setImagesUrl((urlList)=>[
        ...urlList,
        URL.createObjectURL(e.target.files[0])
    ])

}
function deleteFile(e) {
    const s= images.filter((item,index)=>index!==e)
    const d= imagesUrl.filter((item,index)=>index!==e)
    setImages(s);
    setImagesUrl(d);
   
}

useEffect(() => {
console.clear();
images.length&& console.log(images)
imagesUrl.length&& console.log(imagesUrl)

}, [images,imagesUrl])


let inputData={name,brand,model,sellingPrice,buyingPrice,barcode,quantityBought,quantitySold,year,productDescription,showOnEcommerce,images,signature:userData.
    signature}
    console.log(typeof(sellingPrice));
const dispatch= useDispatch();
    function createProduct(e) {
      e.preventDefault();


    
        dispatch(createproduct(inputData))
       // navigate("/home/products") 
     
      
     

    }

    useEffect(() => {
      if (addProduct.success===true) {
       
     window.location.href="http://localhost:3000/home/products" 
     
        }
    }, [addProduct.success])
    
  return (
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
                     <input required onChange={(e)=>setname(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Brand</label>
                   <div>
                     <input required onChange={(e)=>setbrand(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Model</label>
                   <div>
                     <input required type="text" onChange={(e)=>setmodel(e.target.value)} class="form-control" aria-describedby="emailHelp" />
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Year</label>
                   <div>
                     <input required onChange={(e)=>setyear(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Show on Ecommerce</label>
                   <div>
                   <select required onChange={(e)=>setshowOnEcommerce(e.target.value)} class="form-select">
                    
                        <>
                         <option  >
                       Select The Option
                        </option>
                         <option value={true} >
                       Yes
                        </option>
                         <option value={false} >
                       No
                        </option>
                        </>
                          
                        
                     
                    </select>
                   
                     
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Barcode</label>
                   <div>
                     <input required onChange={(e)=>setbarcode(e.target.value)} type="text" class="form-control" aria-describedby="emailHelp" />
                   
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
                     <input required onChange={(e)=>setquantityBought(parseInt(e.target.value))} type="text" class="form-control" aria-describedby="emailHelp" />
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Quantity Sold</label>
                   <div>
                     <input required onChange={(e)=>setquantitySold(parseInt(e.target.value))} type="text" class="form-control" aria-describedby="emailHelp" />
                   
                   </div>
                 </div>
               
                 <div class="mb-3">
                   <label class="form-label ">Buying Price</label>
                   <div>
                     <input required onChange={(e)=>setbuyingPrice(parseFloat(e.target.value))} type="text" class="form-control" aria-describedby="emailHelp" />
                   
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Selling Price</label>
                   <div>
                     <input required onChange={(e)=>setsellingPrice(parseFloat(e.target.value))} type="text" class="form-control" aria-describedby="emailHelp" />
                    
                   </div>
                 </div>
                 <div class="mb-3">
                   <label class="form-label ">Product Description</label>
                   <div>
                    {
                        productDescription.map((description,index)=>{
                        return      <input key={index} type="text" 
                        onChange={(e)=>handleProductDescription(index,e.target.value)}
                        value={description}
                        class="form-control"
                        name="" id="" />
                        })
                    }
                   
                   </div>
                 </div>
              
               </div>
             
             </form>
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
                   <div  className="container-xl mt-4">
             
             
           
                   <button onClick={createProduct} className='btn btn-primary d-none d-sm-inline-block'>
               Submit
              </button>
                    
                   
                      
                   
                   
            
                 
                  </div>
                </div>
  )
}

export default AddProduct