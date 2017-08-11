console.log('Loaded!');


/* var img=document.getElementById("modi");


var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
    var Interval=setInterval(moveRight,50);
    
}*/
var btn=document.getElementById("counter");
 
btn.onclick=function(){
    var request=XMLHttpRequest;
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
        // Everything is good, the response was received.
          if(request.status==200)
          {
            var counter=request.responseText;
            var span=document.getElementById("count");
            span.innerHTML=counter.toString();
          }
        } else {
            // Not ready yet.
        }
    };

    
};