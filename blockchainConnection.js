const path=require('path')
const Web3=require('web3');
const shopContract=require(path.join(__dirname,'./contract'));
const Infura="https://goerli.infura.io/v3/622ff760689d467f989c2ebb7a84bb20"
const web3=new Web3(Infura);
const contract=new web3.eth.Contract(shopContract.abi,shopContract.address);

const getProduct=(addr,id)=>{
    return contract.methods.returnProduct(addr,id).call()
}

module.exports={getProduct}