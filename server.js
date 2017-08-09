var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles= {
  `article-one´ : {
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
  `article-two´ : {
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
  `article-three´ : {
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
                    ${heading};
                </div>
                <div>
                   ${date}
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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get(':articleName', function (req, res) {
    var articleName=req.params.articleName;
 res.send(createTemplate(articles[articleName]));
});
app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

 
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
