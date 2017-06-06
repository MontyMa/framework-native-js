/**
 * Created by monty on 2017/4/22.
 */

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Children from './components/children.jsx';
import Barrage from './components/barrage.jsx';
import DargLine from './components/darg_line/darg_line.jsx';
import Alert from './components/alert/alert.jsx'

import './react_demo.less'
class App extends Component {
    constructor(props, context) {
        super();

    }

    componentWillUpdate() {
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div className="main">
                <div className="title" ref={j_title => this.j_title = j_title}/>
                <div className="content" ref={j_content => this.j_content = j_content}>
                    <div className="right" ref={j_right => this.j_right = j_right}>
                        <div className="group_one" ref={j_group_one => this.j_group_one = j_group_one}>
                            <div className="group_three" ref={j_group_three => this.j_group_three = j_group_three}>
                                sdfsfsfsdf
                            </div>
                            <div className="group_four">
                                sdfsfsf
                            </div>
                        </div>
                        <div className="group_two" ref={j_group_two => this.j_group_two = j_group_two}/>
                    </div>
                    <div className="left" ref={j_left => this.j_left = j_left}>
                        <div className="group_five" ref={j_group_five => this.j_group_five = j_group_five}/>
                        <div className="group_six" ref={j_group_six => this.j_group_six = j_group_six}/>
                    </div>
                </div>
            </div>
        )
    }

    getSize() {
        $(this.j_content).height($(window).height() - $(this.j_title).height());
        $(this.j_group_one).height($(this.j_right).height() - $(this.j_group_two).height());
        $(this.j_left).width($(window).width() - $(this.j_right).width());
        $(this.j_group_five).height($(this.j_left).height() - $(this.j_group_six).height());
    }

    componentDidMount() {
        this.getSize();
        $(window).on('resize', () => {
            this.getSize()
        })
    }
}

ReactDom.render(<App app_data="haha"/>, document.querySelector('#j_app'));

