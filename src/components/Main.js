require('normalize.css/normalize.css');
require('styles/App.css');
import React from 'react';

//获取图片相关数据
var imageData = require('../data/imageData.json');

// function genImageURL(imageDataArr){
//   for(var i in imageDataArr){
//     var singleImageData = imageDataArr[i];

//      singleImageData.imageURL = require('../images/' + singleImageData.fileName);

//         imageDataArr[i] = singleImageData;
//   }

//   return imageDataArr;
// }
//利用自值形函数，将图片名信息转为图片url路径信息
imageData = (function genImageURL(imageDataArr){
  for(var i in imageDataArr){
    var singleImageData = imageDataArr[i];

     singleImageData.imageURL = require('../images/' + singleImageData.fileName);

        imageDataArr[i] = singleImageData;
  }

  return imageDataArr;
})(imageData);



class AppComponent extends React.Component {
  render() {
    return (
       <section className="stage">
          <section className="img-src"></section>
          <nav className="controller-nav"></nav>
       </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
