const express=require('express');
const path=require('path')
const app=express();
const contract=require(path.join(__dirname,'./blockchainConnection'))

const port=process.env.PORT || 3000;

app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'/static')))

var product;

app.get('/',productMiddleware,(req,res)=>{
    
    res.render('index',{product});
})

app.get('/account',(req,res)=>{
    res.render('account')
})

app.get('/myproducts',(req,res)=>{
    res.render('myproducts')
})

async function productMiddleware(req,res,next){ 
    let url=req.url;
    let reqStore=url.slice(url.indexOf('?')+1,url.indexOf(':'));
    let productId=url.substr(url.indexOf(':')+1);
    try{
        contract.getProduct(reqStore,productId).then(
            (_product)=>{
                product=_product;
                next()
            }).catch(
                ()=>res.end()
            );
        }catch(error){
        console.log(error);
        product=false;
        next();
    }

    
}

app.listen(port);