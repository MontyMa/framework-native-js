/**
 * Created by monty on 2017/4/22.
 */

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import Children from './modules/children.jsx';
import Barrage from './components/barrage.jsx';
import DargLine from './components/darg_line/darg_line.jsx';


let getAge = () => {
    return 26;
};

let getName = () => {
    return 'Monty'
};

class App extends Component {
    constructor(props, context) {
        super();
        // console.log(props);
        this.name = getName();
        this.age = getAge();

        this.state = {
            isName: true,
            content_txt: '初始化加载'
        };

    }

    parentClick() {
        this.setState({
            content_txt: '我改变了'
        })
    }

    componentWillUpdate() {
        // console.log('我也被执行了');
    }

    shouldComponentUpdate() {
        return true
    }


    componentWillMount() {
        // console.log('我被执行了');
        this.name = '贾兰影';
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    render() {
        return (
            <div ref='divs' className="div_class" onClick={this.parentClick.bind(this)}>
                Hello,{this.name} {this.state.isName ? 'Monty' : 'haha'},你今年{this.age}岁了
                <Children content_txt={this.state.content_txt}/>
                <Barrage/>
                <DargLine/>
            </div>
        )
    }

    componentDidMount() {

    }
}

ReactDom.render(<App app_data="haha"/>, document.querySelector('#j_app'));

