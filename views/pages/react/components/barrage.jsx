import React, {Component} from 'react'
import './barrage.less';

import $ from 'jquery';
class Barrage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_data: []
        }
    }

    click() {
        this.state.list_data.push('hshsh');


        this.setState({
            list_data: this.state.list_data
        })
    }

    getList() {
        return this.state.list_data.map((elem, i) => {
            return <li key={i}>{elem},{i}</li>
        })

    }

    componentDidUpdate(pp) {
        console.log(pp, 1212);
        let ul_list = document.querySelector('.ul_list');
        console.log(ul_list.offsetHeight);

        let dddd = document.getElementById("ddd");
        dddd.scrollTop = dddd.scrollHeight;

        // if (ul_list.offsetHeight < 300)return;
        // console.dir(ul_list);
        //document.getElementByIdx_x('textarea').scrollTop = document.getElementByIdx_x('textarea').scrollHeight
        // console.log(ul_list.scrollTop, ul_list.scrollHeight);
        // $(ul_list).scrollTop($(ul_list).scrollHeight());
        // ul_list.marginTop = ul_list.offsetHeight - 300;
    }

    render() {
        return (
            <div>
                <div className="list_box">
                    <ul className="ul_list" id="ddd">{this.getList()}</ul>
                </div>
                <input type="button" value='点我' onClick={this.click.bind(this)}/>
            </div>
        )
    }

}

export default Barrage;