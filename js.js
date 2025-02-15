let largestRem=0
for(let x=11;x<99999;x++){
    const rev=+(x.toString().split('').reverse().join(''))
    let bigger
    let smaller
    bigger=rev>x?rev:x
    smaller=rev>x?x:rev
    const rem=bigger%smaller
    if(rem>largestRem)largestRem=rem
}








console.log(largestRem)