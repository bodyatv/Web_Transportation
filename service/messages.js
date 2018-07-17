let checkMessageArr=function(messageArr){
if(messageArr.length>98){
    messageArr.shift()
}
};

module.exports=checkMessageArr;