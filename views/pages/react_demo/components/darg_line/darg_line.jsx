import React, {Component} from 'react';
import $ from 'jquery';
import './darg_line.less';
class DargLine extends Component {
    constructor(props) {
        super(props);
        this.drag_lock = false;     ////拖动锁

        this.state = {
            percent: 100,
        };

    }

    componentDidMount() {
        $(document).on('mouseup.drag', (e) => {
            this.drag_lock = false;
        });

        $(document).on('mousemove.drag', (e_move) => {
            if (!this.drag_lock) return;

            let $back_line = $(this.j_back_line),
                $left = $back_line.offset().left,
                $width = $back_line.width(),
                cur_x = e_move.clientX - $left,
                percent = Math.floor((cur_x / $width) * 100);

            if (percent > 100) {
                percent = 100
            }

            if (percent < 0) {
                percent = 0
            }

            this.setState({percent: percent});
        });
    }

    componentDidUpdate() {
        // console.log(this.state.percent, 999);
    }

    mouseDown(e_down) {
        this.drag_lock = true;
    }

    render() {
        return (
            <div className="darg_line_box">
                <div className="back_line" ref={j_back_line => this.j_back_line = j_back_line}>
                    <div className="light_line j_light_line"
                         style={{width: `${this.state.percent}%`}}>{null}</div>
                    <div className="darg_round  j_darg_round"
                         onMouseDown={this.mouseDown.bind(this)}
                         style={{left: `${this.state.percent}%`}}>{null}</div>

                </div>
                <div className="opacity_num">{this.state.percent}%</div>
                <div>{this.drag_lock}</div>
            </div>
        )
    }
}

export default DargLine;