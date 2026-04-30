exports.fact=function (x){
    let j=1;
    for(let i=1;i<=x;i++){
        j*=i;
    }
    return j;
}


exports.avg=function(x){
    let sum =0;
    for(let d of x){
        sum+=d;
    }
    return sum/x.length;
}