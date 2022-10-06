const deposit=document.getElementById('deposit');
const withdraw=document.getElementById('withdraw');
const amount=document.getElementById('amount');
const balance=document.getElementById('balance');
const tokenBalance=document.getElementById('tokenBalance');

const title=document.getElementById('title');
const price=document.getElementById('price');
const image=document.getElementById('image');
const description=document.getElementById('description');
const create=document.getElementById('create');

const searchChat=document.getElementById('searchChat');
const findChat=document.getElementById('findChat');

const Chat=document.getElementById('Chat');
const inputChat=document.getElementById('inputChat');
const productID=document.getElementById('productID');
const myproducts=document.getElementById('myproducts');
let account,id,store;

window.ethereum.request({method:'eth_requestAccounts'}).then((acc)=>{
    account=acc[0];
    contract.methods.balance(account).call().then((value)=>{
        balance.textContent+=" "+shortBalance(web3.utils.fromWei(value,'ether'))+"USD";
    }).catch(console.log);
    token.methods.balanceOf(account).call().then((value)=>{
        tokenBalance.textContent+=" "+shortBalance(web3.utils.fromWei(value,'ether'))+"USD";
    })
})

deposit.addEventListener('click',()=>{
    window.ethereum.request({method:'eth_requestAccounts'}).then((acc=>{
        account=acc[0];
        token.methods.allowance(account,contractAddr).call().then(
            (allowance)=>{
                if(allowance==0){
                    token.methods.approve(contractAddr,bigNum).send({from:account}).then(()=>{
                        contract.methods.deposit(amount.value).send({from:account})
                    })
                }else{
                    contract.methods.deposit(amount.value).send({from:account})
                }
            }
        )
    }))
});

withdraw.addEventListener('click',()=>{
    window.ethereum.request({method:'eth_requestAccounts'}).then((acc)=>{
        account=acc[0];
        contract.methods.withdraw(amount.value).send({from:account})
    })
})

create.addEventListener('click',()=>{
    window.ethereum.request({method:'eth_requestAccounts'}).then((acc)=>{
        account=acc[0];
        contract.methods.createProduct(title.value,price.value,image.value,description.value).send({
            from:account
        }).then().catch(console.log)
    })
})

findChat.addEventListener('click',()=>{
    window.ethereum.request({method:'eth_requestAccounts'}).then((acc)=>{
        account=acc[0];
        let url=searchChat.value;
        store=getAddress(url);
        id=getId(url);
        contract.methods.returnProductChat(store,id).call({from:account}).then((chatArray)=>{
            chatContreller=false
            for(i of chatArray){
                let user;
                if(i['userAddress'].toUpperCase()!=account.toUpperCase()){
                    user='user';
                }else{
                    user='You';
                }
                let element=document.createElement('span');
                Chat.appendChild(element);
                element.classList.add('chat-span');
                element.textContent=user+' : '+i['text'];
            }
            
        }).catch(console.log)
    })
})

inputChat.addEventListener('keypress',(e)=>{
    if(e.key=='Enter'){
        window.ethereum.request({method:'eth_requestAccounts'}).then((acc)=>{
            account=acc[0];
            contract.methods.writeProductChat(store,id,inputChat.value).send({from:account})
        })
    }
})


myproducts.addEventListener('click',()=>{
    window.location.href="/myproducts"
})
