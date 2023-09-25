import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
    render() {
        return (
            <div>
                App组件
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
