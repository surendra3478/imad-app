console.log('Loaded!');


var img=document.getElementById("modi");


var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
    var Interval=setInterval(moveRight,50);
    
}