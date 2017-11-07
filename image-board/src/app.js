//todo
//fix slugs/titles for punctuation
//eslint

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


//displays all image posts
app.get('/image-posts', (req, res) => {
	ImagePost.find({}, function(err, imageposts, count) {
    if(err) {
      res.send("ERRORzzzzzzzz\n\n", err); 
    }
  res.render('home', {posts: imageposts});
  });
});

//post new images
app.post('/image-posts/add', function(req, res) {
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
		if (err){
			console.log("ERROR", err);
		}
		res.redirect('/image-posts');
	});
	
});

//slugs
app.get('/image-posts/:slug', function(req, res){
	ImagePost.findOne({slug: req.params.slug}, function(err, imageposts, count) {
		res.render('slug', {imgPost: imageposts, 'slug': req.params.slug});
	});

});

app.post('/image-posts/:slug', function(req, res){
	console.log("yes");
	ImagePost.findOne({slug: req.params.slug}, function(err, imageposts, count) {
		imageposts.images.push(new Image({
			caption: req.body.updatedCaption,
			url: req.body.updatedUrl
		}));
		imageposts.save(function(err, imageposts, count) {
			res.redirect('/image-posts/'+req.params.slug);
		});
	});
	
});



app.listen(3000);