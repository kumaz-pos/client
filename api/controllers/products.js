const Customer = require("../models/Admin");
const Product= require("../models/Products");
const {S3Client,PutObjectCommand} =require("@aws-sdk/client-s3")
const fs=require("fs")
async function uploadToS3(path,originalFilename,mimetype) {
  const client= new S3Client({
      region:"eu-north-1",

      credentials:{ 
          accessKeyId:process.env.S3_ACCESS_KEY,
          secretAccessKey:process.env.S3_SECRET_ACCESS_KEY
      }
  })
  const parts= originalFilename.split(".");
  const ext= parts[parts.length-1]
 const newFilename= Date.now()+"."+ext
await client.send(new PutObjectCommand({
  Bucket:process.env.bucket,
  Body:fs.readFileSync(path),
  Key:newFilename,
  ContentType:mimetype,
  ACL:"public-read"
 })) 

 return `https://${process.env.bucket}.s3.amazonaws.com/${newFilename}`

}

const CreateProduct=async(req,res)=>{
  console.log(req.files);

    const {name,brand,model,sellingPrice,buyingPrice,barcode,quantityBought,quantitySold,year,productDescription,showOnEcommerce}= req.body;
 let description=[productDescription]
      const product= await Product.findOne({barcode:barcode});
      let images=[]
 
      if (product) {
        res.status(200).json({msg:"The product containing the barcode already exists."})
      }
    
         
          
      else if(!product){
        let url
        for (let i = 0; i < req.files.length; i++) {
          const {originalname,path,mimetype}=req.files[i];
          url=     await  uploadToS3(path,originalname,mimetype)
          
          images.push(url)
          
      console.log(originalname,path,mimetype);
      console.log("originalname,path,mimetype");
  }
  console.log(images);
       
        const newProduct= await Product.create({
            name,
            brand,
            model,
            sellingPrice,
            buyingPrice,
            barcode,
            quantityBought,
            quantitySold,
            quantityRemaining:quantityBought-quantitySold,
          images,
            year,
            description,
            showOnEcommerce
            });
            
    res.status(201).json(newProduct)
      }else{
        res.status(500).json({msg:"cannot create product"})
      }
  


 



}
const UpdateProduct=async(req,res)=>{

try {
    const id = req.params.id;
const product= await Product.findByIdAndUpdate(id,{$set:req.body},{new:true});

if (product) {
  if (!req.files) {
    console.log(product);
    res.status(201).json(product)
    
  }else{
    let getProduct= await Product.findOne({_id:id});
    let url
    for (let i = 0; i < req.files.length; i++) {
      const {originalname,path,mimetype}=req.files[i];
      url=     await  uploadToS3(path,originalname,mimetype)
      console.log(url);
      await   getProduct.images.push(url)
      await getProduct.save()
    }
    res.status(201).json(getProduct)
    
  }
    
} else {
    res.status(201).json({msg:"product not found"})
}

} catch (error) {
    res.status(500).json({msg:"server error"})
}
}
const DeleteProduct=async(req,res)=>{
    try {
        const id= req.params.id;
const product= await Product.findByIdAndDelete(id);
res.status(200).json({msg:"product deleted succesfully"})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }

}
const GetProduct=async(req,res)=>{
    try {
        const id= req.params.id;
const product= await Product.findById(id);
if (product) {
    res.status(200).json(product);

}else{
    res.status(200).json({message:"product not found"})
}
    } catch (error) {
        res.status(500).json({message:"server error"})
    }


}
const GetProducts=async(req,res)=>{
try {
  const {name,brand,model,year,barcode}= req.query
  const queryObject= {};
  if (name) {
    queryObject.name={$regex:name,$options:'i'}
  }
  if (brand) {
    queryObject.brand= {$regex:brand,$options:'i'}
  }
  if (model) {
    queryObject.model= {$regex:model,$options:'i'}
  }
  if (year) {
    queryObject.year={$regex:year,$options:'i'}
  }
  if (barcode) {
    queryObject.barcode={$regex:barcode,$options:'i'}
  }

    const products= await Product.find(queryObject).sort({_id:-1}) ;

    if (!products) {
        res.status(200).json({msg:"no products available"})
    }else{
        res.status(200).json(products)
    }
} catch (error) {
    res.status(500).json({msg:"server error"})
}
}




module.exports={
    CreateProduct,UpdateProduct,DeleteProduct,GetProduct,GetProducts
}