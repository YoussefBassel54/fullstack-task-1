const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();



// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://netninja:test1234@net-ninja-tuts-del96.mongodb.net/node-tuts";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');

//listening
//app.listen(3000);

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  })

app.get('/', (req,res) => {

   res.redirect('/blogs');
})

app.get('/about', (req,res) => {

    res.render('about', {title: 'About'});
})

app.get('/blogs', blogRoutes);

//404

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});

})