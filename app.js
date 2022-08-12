const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes =require('./routes/blogRoutes');
//express app
const app=express();
//connect to mongo
const dbURI='mongodb+srv://net123:blogs1234@nodett.9awds.mongodb.net/nodett?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(result=>{app.listen(3000)}) //after connect to db sin listen call
        .catch(err =>{console.log(err)});
//register view engine
app.set('view engine','ejs');//default using 'views' folder
//app.set('views','viewfolder')

//listen for requests
//app.listen(3000);



//mongoose and mongo sandbox routes
// app.get('/add-blog',(req,res)=>{
//     const blog=new Blog({
//         title:'new blog 2',
//         snippet:'about my new blog',
//         body:'more about my new blog'
//     });
//     blog.save()
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err);
//         });
// })

// app.get('/all-blog',(req,res)=>{
//     Blog.find() //directly on Blog instead of instance
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// })

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('61128b468f3b294b44c6f914')
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// })

//middleware 
app.use(morgan('dev'));
app.use(express.static('publics'));
app.use(express.urlencoded({extended:true} ));

// app.use((req,res,next)=>{
//     console.log('new request made:');
//     console.log('host:',req.hostname);
//     console.log('path:',req.path);
//     console.log('method:',req.method);
//     next();
// })
// app.use((req,res,next)=>{
//     console.log('in middleware');
//     next();
// })

//routes
app.get('/',(req,res)=>{
    res.redirect('/blogs');
   // res.send('<p>home page</p>');
   // res.sendFile('./views/index.html',{ root:__dirname});
   //passing array data
//    const blogs =[
//        //{title:'abc',snippet:'bcccc'},
//        //{title:'abc',snippet:'bcccc'},
//        //{title:'abc',snippet:'bcccc'}
//    ]
//    res.render('index',{ title:'Home',blogs:blogs});
});

app.get('/about',(req,res)=>{

   // res.send('<p>about page</p>');
   //res.sendFile('./views/about.html',{ root:__dirname});
   res.render('about',{title:'About'});
});
//redirect
// app.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// })

//blogroutes
app.use('/blogs',blogRoutes);


//404 page * go to bottum
  app.use((req,res)=>{
      res.status(404).render('404',{title:'404'});
  })