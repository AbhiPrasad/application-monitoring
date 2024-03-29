import productImg from '../../assets/mood-planter.jpg';
import productImgCropped from '../../assets/mood-planter-cropped.jpg';

// 06/03/21 this data is served to product.js. This data is also in Cloudsql, for serving to products.js
const product1 = {
  id: 1,
  title: 'Plant Mood',
  description: 'The mood ring for plants.',
  descriptionFull:
    "This is an example of what you can do with just a few things, a little imagination and a happy dream in your heart. I'm a water fanatic. I love water. There's not a thing in the world wrong with washing your brush. Everybody needs a friend. Here we're limited by the time we have.",
  price: 155,
  img: productImg,
  imgCrop: productImgCropped,
};

export default product1;
