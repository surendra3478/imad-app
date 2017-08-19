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
   
    alert("submit_btn");
    var request=new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE) {
        // Everything is good, the response was received.
          if(request.status===200)
          {
            console.log('user logged in');
            alert('logged in succesfully');
          }
          else if(request.status===403)
          {
              alert('user name and passwords are correct');
          }
          else if(request.status===500)
          {
              alert('some thing went wrong');
          }
        }  
    };
     var username=document.getElementById("username").value;
     var password=document.getElementById("password").value;
     console.log(username);
     console.log(password);
    request.open('POST', 'http://surendrakakinada.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username, password:password}));
  
};