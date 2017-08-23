var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser = require('body-parser');
var config={
    user:'surendrakakinada',
    database:'surendrakakinada',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD,
};

var app = express();
//app.use(morgan('combined'));
//app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(bodyParser.json());
var articles= {
   'article-one' : {
    title:`Article one heading`,
    heading:`Article one`,
    date:`aug 05-2017 `,
    content:`<p> This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.
        </p>
        <p> This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.
        </p>
        <p> This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.
        </p>`
    
    },
  'article-two' : {
    title:`Article Two heading`,
    heading:`Article Two`,
    date:`aug 08-2017 `,
    content:`<p> This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.
        </p>
        <p> This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.
        </p>
        <p> This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.
        </p>`
    
    },
  'article-three' : {
    title:`Article three heading`,
    heading:`Article three`,
    date:`aug 10-2017 `,
    content:`<p> This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.
        </p>
        <p> This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.
        </p>
        <p> This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.This is content for my first Article.
        </p>`
    
    }
};
function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmlTemplate=`
<html>
    <head>
         <title>${title};</title>
          <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
                
                 
                <div>
                    <a href="/">home</a>
                </div>
                <hr>
                <div>
                    ${heading}
                </div>
                <div>
                   ${date.toDateString()}
                </div>
                <div>
                   ${content}
                    
                </div>
    </div>
    </body>
</html>`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
 res.send(counter.toString());
}); 
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
var names=[];
app.get('/submit-btn',function (req,res){
    
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

 var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    
 pool.query("select * from test",function(err,result){
     if(err)
     {
         res.status(500).send(err.toString());
     }
     else
     {
         res.send(JSON.stringify(result.rows));
     }
 });
    
 
});

app.get('/articles/:articleName', function (req, res) {
    var articleName=req.params.articleName;
    //res.send( "select * from article where title='"+ articleName+"'");
  
    pool.query("select * from article where title=$1",[articleName],function(err,result){
         if(err)
         {
            
             res.status(500).send(err.toString());
         }
         else
         {
             if(result.rows.length===0)
             {
                 res.status(404).send("article not found");
                 
             }
             else
             {
             var articleData=result.rows[0];
             res.send(createTemplate(articleData));
             }
         }
         
        
    });
 
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

function hash1(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join("$");
}
app.get('/hash/:input', function (req, res) {
  var hashedString=hash1(req.params.input,'This-is-some-random-string');
  res.send(hashedString);
});
app.post('/create-user', function (req, res) {
 var username=req.body.username;
 var password=req.body.password;
 //var salt=crypto.randomBytes(128).toString('hex');
 var salt='This-is-some-random-string';
 var dbString=hash1(password,salt);
 // dbString='hex';
 pool.query('insert into "user" values($1,$2)',[username,dbString],function(err,result){
      //res.send("user");
     if(err)
     {
         
         res.status(500).send(err.toString());
     }
     else
     {
         res.send("user Created successfully",username);
     }
 });
   
});

app.post('/login', function (req, res) {
 var username=req.body.username;
 var password=req.body.password;
  
 pool.query('select * from "user" where username= $1',[username],function(err,result){
      if (err)
    {
    res.status(500).send(err.toString());
    }
    else {
    if (result.rows.length===0)
    {
        res.send("user Created successfully",username);
        //res.send('select * from "user" where username= $1',[username]);
   // res.send(403).send('1 username/password invalid'+username);
    //res.send(403).send('select * from "user" where username= $1',[username]);
    }
    else 
    {
    // console.log('before dbstring'+result.rows[0].password);
    var dbString=result.rows[0].password;
    var salt=dbString.spilt('$')[2];
    
              //hash the user entered password after adding SALT & check this with what was stored in table
              //console.log('before calling hash fn');
    
              var hashedString=hash(password,salt);
              //console.log('before comparing'+hashedString+":"+dbString);
    
              if (hashedString === dbString){
    
                 res.send('credentials are corrrect');
              }
              else 
              {
                  res.send(403).send('2 username/password invalid');
              }
          }   
        }
 });
   
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
