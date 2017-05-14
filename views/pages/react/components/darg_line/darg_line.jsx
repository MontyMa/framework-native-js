import React, {Component} from 'react';
import $ from 'jquery';
import './darg_line.less';
class DargLine extends Component {
    constructor(props) {
        super(props);
        // this.percent = 100;
        this.drag_lock = false;     ////拖动锁

        this.state = {
            percent: 100,
        };

        this.old_x = 0;             //点击时候的鼠标x轴位置
    }

    componentDidMount() {
        $(document).on('mouseup.drag', (e) => {
            this.drag_lock = false;
        });

        $(document).on('mousemove.drag', (e_move) => {
            if (!this.drag_lock) return;

            let $back_line = $(this.j_back_line);
            let $left = $back_line.offset().left;
            let $width = $back_line.width();
            let cur_x = e_move.clientX - $left;

            // console.log(cur_x);

            // let percent = ((cur_x / $width) * 100).toFixed(2);
            let percent = Math.floor((cur_x / $width) * 100);

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
        console.log(this.state.percent, 999);
    }

    mouseDown(e_down) {
        this.drag_lock = true;
        this.old_x = e_down.clientX;

    }

    mouseMove(e_move, old_x) {
        let cur_x = e_move.clientX - old_x;

        let left = this.state.percent + cur_x;

        this.setState({
            percent: left
        })
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