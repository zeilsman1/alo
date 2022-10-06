const main=document.getElementById('main');
let account;
const xd= document.getElementById('xds')
window.ethereum.request({method:'eth_requestAccounts'}).then((acc)=>{
    account=acc[0];
    contract.methods.returnStore().call({from:account}).then(
        (products)=>{
            let i=0;
            for(product of products){
                let myproduct = document.createElement('div');
                myproduct.classList.add('myproduct');
                let img=document.createElement('img');
                img.src=product['img'];
                myproduct.appendChild(img);
                let div2 = document.createElement('div');
                myproduct.appendChild(div2);
                p1=document.createElement('p')
                p2=document.createElement('p')
                p1.textContent+='id : '+i;
                p2.textContent+='status : ';
                if(product['buyerAddress']==emptyAddress){
                    p2.textContent+="Not Sold"
                }else{
                    p2.textContent+="Sold"
                }
                div2.appendChild(p1);
                div2.appendChild(p2)
                main.appendChild(myproduct)
                i++;
            }
        }
    ).catch(console.log)
    
}).catch(console.log)