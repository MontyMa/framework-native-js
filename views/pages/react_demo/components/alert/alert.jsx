/**
 * Created by monty.ma on 17/5/31.
 */
import React, {Component} from 'react';
import './alert.less';
class Alert extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentWillReceiveProps(props) {

    }

    componentWillUpdate() {

    }

    render() {
        return (
            <div className="alert_box">
                <div className="alert">
                    <div className="title">下单提醒</div>
                    <div className="content">

                    </div>
                    <div className="btn_box">
                        <div className="cancel" onClick={() => this.props.callback(0)}>取消</div>
                        <div className="ok" onClick={() => this.props.callback(1)}>确定</div>
                    </div>
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