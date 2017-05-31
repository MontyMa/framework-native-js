/**
 * Created by monty.ma on 17/5/31.
 */
import React, {Component} from 'react';
import './alert.less';
class Alert extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    componentWillMount() {
        if (!this.props.content) {
            throw 'content 为必传参数!'
        }
    }

    componentWillReceiveProps(props) {

    }

    componentWillUpdate() {

    }

    render() {
        return (
            <div className="alert_box">
                <div className="alert">
                    {
                        this.props.title ?
                            <div className="title">{this.props.title}</div> :
                            null
                    }
                    <div className="content">{this.props.content}</div>
                    {
                        this.props.callback ?
                            <div className="btn_box">
                                <div className="cancel" onClick={() => this.props.callback(0)}>取消</div>
                                <div className="ok" onClick={() => this.props.callback(1)}>确定</div>
                            </div> : null
                    }
                    <div className="close"
                         onClick={this.props.callback ?
                             () => this.props.callback(0) :
                             () => this.props.closeCallback(0)}/>

                </div>
            </div>
        )
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }
}

export default Alert;