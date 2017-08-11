console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML="new text";


var img=document.getElementById("modi");


var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+10;
    img.style.marginLeft=maxlength+'px';
}
img.onclick=function(){
    var Interval=setInterval(moveRight,50);
    
}