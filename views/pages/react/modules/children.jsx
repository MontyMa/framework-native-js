import React, {Component} from 'react';

class Children extends Component {

    constructor(props) {
        super(props);

        // this.content_txt = props.content_txt;

    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    componentWillMount() {
    }

    componentWillUpdate() {
        // console.log(this.props);
    }


    render() {
        return <div>我是子组件{this.props.content_txt}</div>
    }

}

export default Children;


