require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import ReactDOM from 'react-dom';
import ControllerUnit from './Controller.js'

//获取图片相关数据
let imageData = require('../data/imageData.json');

// function genImageURL(imageDataArr){
//   for(let i in imageDataArr){
//     let singleImageData = imageDataArr[i];

//      singleImageData.imageURL = require('../images/' + singleImageData.fileName);

//         imageDataArr[i] = singleImageData;
//   }

//   return imageDataArr;
// }
//利用自值形函数，将图片名信息转为图片url路径信息
imageData = ((imageDataArr) => {
  for(let i in imageDataArr){
    let singleImageData = imageDataArr[i];

     singleImageData.imageURL = require('../images/' + singleImageData.fileName);

        imageDataArr[i] = singleImageData;
  }

  return imageDataArr;
})(imageData);


//获取区间内的随机值
let getRangeRandom=(low,high) => Math.floor(Math.random() * (high - low) + low);
let get30DegRandom=() => ((Math.random()>0.5?'':'-') + Math.ceil(Math.random() * 30))
//旋转角度0-30 任意正负

class ImgFigure extends React.Component{
   constructor(props){
     super(props);
   }

  /*
  *imgFigure的点击处理函数
  */
  handleClick(e){
    if(this.props.arrange.isCenter){
      this.props.inverse()
    } else {
      this.props.center()
    }
e.stopPropagation();
e.preventDefault();

  }
  render(){

    var styleObj = {};

    // 如果props属性中指定了这张图片的位置，则使用
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }

    //如果图片的旋转角度有值且不为0，添加旋转角度
    if(this.props.arrange.rotate){
          styleObj['transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      
    }
    if(this.props.arrange.isCenter){
      styleObj.zIndex = 11;
    }

    var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse ': '';
      return(
          <figure className={imgFigureClassName} style={styleObj} onClick={()=>this.handleClick()}>
            <img src={this.props.data.imageURL}
                  alt={this.props.data.title}
                  />

                  
            <figcaption>
              <h2 className="img-title">{this.props.data.title}</h2>
              <div className="img-back" onClick={()=>this.handleClick()}>
                  <p>
                    {this.props.data.des}
                  </p>
              </div>
            </figcaption>
          </figure>
      );
  }
}


class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.Constant={
      centerPos :
      {
        left:0,
        top:0
      },
      hPosRange://水平方向取值范围
        {
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
        },
      vPosRange://垂直方向的取值范围
        {
          x:[0,0],
          topY:[0,0]
        }

    };

    this.state={
      imgsArrangeArr:[
        /*{
          pos:{
            left:'0',
            top:'0'
          },
          rotate: 0,//旋转角度
          isInverse:false, //图片正反面
          isCenter:false //图片是否居中
        }*/
      ]
    };
  }



/*翻转图片
*@param index 输入当前被执行inverse操作的图片对应的图片信息的数组的index值
*闭包函数，返回的是真正被执行的函数
/*/
 inverse(index){
    return ()=>{
      let imgsArrangeArr = this.state.imgsArrangeArr;

        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

        this.setState({
          imgsArrangeArr:imgsArrangeArr
        })
    }
 }
      


  // 封装一个函数，重新布局所有图片
 reArrange(centerIndex){
      let imgsArrangeArr = this.state.imgsArrangeArr,
          Constant = this.Constant,
          centerPos = Constant.centerPos,
          hPosRange = Constant.hPosRange,
          vPosRange = Constant.vPosRange,
          hPosRangeLeftSecX = hPosRange.leftSecX,
          hPosRangeRightSecX = hPosRange.rightSecX,
          hPosRangeY = hPosRange.y,
          vPosRangeTopY = vPosRange.topY,
          vPosRangeX = vPosRange.x,

          imgsArrangeTopArr = [],
          topImgNum = Math.floor(Math.random() * 2), //取一个或者不取
          topImgSpliceIndex = 0,
          imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
          // 首先居中 centerIndex 的图片
          imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter:true
          }
          // 取出要布局上侧图片的状态信息
          topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));// 取出随机的索引
          imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

          //布局位于上册的图片
          imgsArrangeTopArr.forEach((value,index)=>{
            imgsArrangeTopArr[index] = {
              pos:{
                  top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
                  left: getRangeRandom(vPosRangeX[0],vPosRangeX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
             
            }
          });

          //布局左右两侧的
            for(let i = 0,j = imgsArrangeArr.length,k = j / 2;i<j;i++){
              let hPosRangeLORX = null;

              //前半部分布局左边，后半部分布局右边
              if(i < k){
                  hPosRangeLORX = hPosRangeLeftSecX;
              } else {
                  hPosRangeLORX = hPosRangeRightSecX;
              }

              imgsArrangeArr[i] = {
                pos:{
                    top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                    left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
                },
                rotate:get30DegRandom(),
                isCenter: false
               
              }
            }
            if (imgsArrangeTopArr && imgsArrangeTopArr[0]){
              imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
            }

            imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

            this.setState({
              imgsArrangeArr: imgsArrangeArr
            });
    }
    
center(index){
  return ()=>this.reArrange(index);
}


//组件加载以后，为每张图片计算其位置的范围
  componentDidMount(){//渲染后调用函数

    //拿到舞台的大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

        //拿到imageFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

        //重新设置状态
        // 计算中心图片的位置点

      
         this.Constant.centerPos = {
            left:halfStageW - halfImgW,
            top:halfStageH - halfImgH
        }
       
          //计算水平方向位置点
       
          this.Constant.hPosRange.leftSecX[0] = -halfImgW;
          this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
          this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
          this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
          this.Constant.hPosRange.y[0] = -halfImgH;
          this.Constant.hPosRange.y[1] = stageH - halfImgH;
          //计算垂直方向的位置点
        
          this.Constant.vPosRange.x[0] = halfStageW - imgW;
          this.Constant.vPosRange.x[1] = halfStageW;
          this.Constant.vPosRange.topY[0] = -halfImgH;
          this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

        this.reArrange(0)
  }
 


  render() {
    let controllerUnits = [],
        imgFigures = [];

        imageData.forEach((value,index) => {//初始化状态对象，都放在左上角
          if(!this.state.imgsArrangeArr[index]){
            this.state.imgsArrangeArr[index]={
              pos:{
                left:0,
                top:0
              },
              rotate: 0,
              isInverse: false,
              isCenter:false
            }
          }
         imgFigures.push(<ImgFigure data={value} key={index}
          ref={'imgFigure' + index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse={this.inverse(index)}
          center={this.center(index)}
          />);

           controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}
           inverse={this.inverse(index)}
           center={this.center(index)}
           />)
        });

    return (
       <section className="stage" ref="stage">
          <section className="img-sec">
            {imgFigures}
          </section>
          <nav className="controller-nav">
            {controllerUnits}
          </nav>
       </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
