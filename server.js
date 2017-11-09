
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;


var app = express();
//middleware for using static html pages
// tell express which view engine you are going to use



hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
})

hbs.registerHelper('CapsLockit',(text)=>{
  return text.toUpperCase;
})

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
// this is an example of express middleware


// unless next is called, the app is not going to proceed further
// the request object contains everything that is coming from the client
app.use((req,res,next)=>{

  var now = new Date().toString();
  var log = `${now}  ${req.method} ${req.url} `;
  // async functions without error handling has been deprecated which is why we were unable to use then without catch
  fs.appendFile('server.log',log+'\n',(error)=>{
    console.log(error);
  })

  console.log(log);
  next();
})

//rendering the maintenance page without the next call so that the user doesnt proceed further

// app.use((req,res,next)=>{
//   res.render('maintanence.hbs')
//   //next();
// })
app.use(express.static(__dirname+'/Public'));// to render the html page


app.get('/',(req,res)=>{
  //res.send('<h1>Hello we are using express</h1>');


  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage: 'Welcome to my node.js page that i am rendering dynamically'
  })

});


app.get('/about',(req,res)=>{
  //res.send('This is the about page');
  res.render('about.hbs',{
    pageTitle:'About Page'
  });

});

app.get('/badpage',(req,res)=>{
  res.send({
  "array": [
    1,
    2,
    3
  ],
  "boolean": true,
  "null": null,
  "number": 123,
  "object": {
    "a": "b",
    "c": "d",
    "e": "f"
  },
  "string": "Hello World"
});

});




app.listen(port,()=>{
  console.log('Server is up on port 3000');
});
