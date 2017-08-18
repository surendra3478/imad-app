var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
//var crypto=require('crypto');
var config={
    user:'surendrakakinada',
    database:'surendrakakinada',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD,
};

var app = express();
app.use(morgan('combined'));
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

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}
app.get('/hash/:input', function (req, res) {
  var hashedString=hash(req.params.input,'this-is-some-random-string');
  res.send(hashedString);
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
