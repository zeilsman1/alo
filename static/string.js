function getAddress(url){
    let x= url.slice(url.indexOf('?')+1);
    return x.slice(0,42)
}

function getId(url){
    let x= url.slice(url.indexOf('?')+1);
    let y=x.slice(43);
    return y
}

function shortBalance(string){
    return string.slice(0,string.indexOf('.')+3)
}