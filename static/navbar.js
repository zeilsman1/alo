const input = document.getElementById('navbar-input');
const btn=document.getElementById('btn-input');
const account=document.getElementById('account');

btn.addEventListener('click',()=>{
    console.log(input.value)
    window.location.href=`?${input.value}`;
})
input.addEventListener('keypress',(e)=>{
    if(e.key=='Enter'){
        window.location.href=`?${input.value}`;
    }
})

account.addEventListener('click',()=>{
    window.location.href="/account"
})