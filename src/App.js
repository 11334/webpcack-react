import React, { Component } from 'react'
import axios from 'axios'
import Img1 from './img/1.gif'
export default class App extends Component {
    render() {
        return (
            <div>
                <p>App组件</p>
                <img src={Img1}></img>
            </div>
        )
    }
    componentDidMount() {
        axios.get('/data')
            .then(res => {
                console.log(res);
            })
    }

}
