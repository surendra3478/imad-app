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
    var request=new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE) {
        // Everything is good, the response was received.
          if(request.status==200)
          {
            var counter=request.responseText;
            var span=document.getElementById("count");
            span.innerHTML=counter.toString();
          }
        }  
    };
    request.open('GET', 'http://surendrakakinada.imad.hasura-app.io/counter', true);
    request.send(null);
};

//submit


var submit=document.getElementById("submit_btn");

submit.onclick=function(){
   
    
    var request=new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE) {
        // Everything is good, the response was received.
          if(request.status==200)
          {
            
            var list=``;
           names=JSON.parse(request.responseText);
         // alert(names);
          for(var i=0;i<names.length;i++)
          {
              list+='<li>'+names[i]+'</li>';
          }
          var ui=document.getElementById('namelist');
           
           ui.innerHTML=list;
          }
        }  
    };
     var username=document.getElementById("username").value;
     var password=document.getElementById("password").value;
    request.open('POST', 'http://surendrakakinada.imad.hasura-app.io/submit-btn/?name='+name1, true);
    request.send(null);
  
};