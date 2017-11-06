const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs');

// my schema goes here!
const Image = new Schema({
  caption:  String,
  url: String
});

const ImagePost = new Schema({
  title:  String,
  images: [Image]
});

ImagePost.plugin(URLSlugs('title', {field: mySlug}));

mongoose.model('Image', Image);
mongoose.model('ImagePost', ImagePost);

mongoose.connect('mongodb://localhost/hw06');