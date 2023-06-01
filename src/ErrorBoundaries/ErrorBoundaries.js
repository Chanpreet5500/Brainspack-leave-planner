import React , { Component } from 'react';

class ErrorBoundaries extends Component{
    constructor(props){
        super(props)

        this.state = {
            hasError : false
        }
    }

    static getDerievedStateFromError(){
        this.state = {
            hasError : true
        }
    }

    render(){
        if(this.state.hasError){
            return(
                <>
                <img src='green-vintage-alarm-clock-standing-floor-with-bright-black-background-3d-render-illustration_116124-7363.jpg' />
                </>
            )
            
        } 
       return  this.props.children
    }
}

export default ErrorBoundaries;