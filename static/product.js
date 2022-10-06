const btnBuy = document.getElementById('buy');
const balance = document.getElementById('balance');
const tokenBalance=document.getElementById('tokenBalance');
const status=document.getElementById('status');
let _account;
let store;
let id;
let url=window.location.href;
store=getAddress(url);
id=getId(url);
btnBuy.addEventListener('click',()=>{

    window.ethereum.request({method:'eth_requestAccounts'}).then(accounts=>{
        _account=accounts[0];
        console.log(account);

        
        token.methods.allowance(_account,contractAddr).call().then(allowance=>{
            if(allowance==0){
                token.methods.approve(contractAddr,bigNum).send({from:_account}).then(
                    ()=>{
                        contract.methods.buyProduct(store,id).send({from:_account}).then().catch(console.log)
                    }
                )
            }else{
                contract.methods.buyProduct(store,id).send({from:_account}).then().catch(console.log)
            }
        })
    }).catch(console.log);
})

window.ethereum.request({method:'eth_requestAccounts'}).then(
    (acc)=>{
        _account=acc[0];
        console.log(_account)    
        contract.methods.balance(_account).call().then((_balance)=>{
            balance.textContent+=" "+shortBalance(web3.utils.fromWei(_balance,'ether'))+"USD";
        });   
        token.methods.balanceOf(_account).call().then((value)=>{
            tokenBalance.textContent+=" "+shortBalance(web3.utils.fromWei(value,'ether'))+"USD";
        });
        contract.methods.returnProduct(store,id).call().then(
            (product)=>{
                if(product.buyerAddress==emptyAddress){
                    status.textContent+=" Avaible"
                }else{
                    status.textContent+=" Sold";
                    
                }
            }
        )
    }
)

