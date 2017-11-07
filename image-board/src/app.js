const express = require('express');
require('./db');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const ImagePost = mongoose.model('ImagePost');
const Image = mongoose.model('Image');

app.use(express.static('public'))

app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.redirect('/image-posts');
});

app.get('/image-posts', (req, res) => {
	ImagePost.find({}, function(err, imageposts, count) {
    if(err) {
      res.send(err); 
    }
  res.render('home', {posts: imageposts});
  });
  // res.render('home');
});

app.post('/image-posts', function(req, res) {
		let imgs = []

		for (i=1; i<=3; i++){
			if (req.body['url'+i] !== ''){
				imgs.push(new Image({
					caption: req.body['comment'+i],
					url: req.body['url'+i]
				})
				);
			}
		}

		new ImagePost({
		title: req.body.title,
		images: imgs
	}).save(function(err, imageposts, count){
		if (err)
			console.log(err);
		//console.log("posts", posts);
		res.redirect('/image-posts');
	});
});

app.listen(3000);