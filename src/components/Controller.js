import React from 'react';
class ControllerUnit extends React.Component{
    handleClick(){
        if(this.props.arrange.isCenter){
            this.props.inverse();
        } else {
            this.props.center();
        }

    }

    render(){
        let controllerUnitClassName = 'controller-unit'

        //如果对应是居中的图片，显示控制按钮的居中态
        if(this.props.arrange.isCenter) {
            controllerUnitClassName += ' is-center ';

            //如果同时是翻转态，则显示对应控制按钮的翻转态
            if(this.props.arrange.isInverse){
                controllerUnitClassName += 'is-inverse';
            }
        }
        return(
            <span className={controllerUnitClassName} onClick={()=>this.handleClick()}></span>
        )
    }
}


export default ControllerUnit;