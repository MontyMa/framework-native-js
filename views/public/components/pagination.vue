<template>
    <div id="pagination">
        <div>{{total}}</div>
        <div>{{list_current}}</div>
        <div>{{list_totalPages}}</div>
        <ul class="pagesize_box" v-if="list_totalPages!==1">
            <li @click="list_current-1>0?onPrevClick(list_current-1):null" v-if="prev_btn_txt" class="pagination_list"
                :class="{no_user_list:list_current-1<=0}">
                {{prev_btn_txt}}
            </li>
            <template v-for="(pageNo,index) in getPagingNoList">
                <li :class="{current_active:pageNo.parameter===list_current,pagination_list:pageNo.txt!=='...'}"
                    @click="pageNo!=='...'?onPageClick(pageNo.parameter):null">
                    {{pageNo.txt}}
                </li>
            </template>
            <li @click="list_current<list_totalPages?onNextClick(list_current+1):null" v-if="next_btn_txt"
                class="pagination_list" :class="{no_user_list:list_current>=list_totalPages}">
                {{next_btn_txt}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'pagination',
        props: {
            total: {                // 总页数 必传
                type: [String, Number],
                required: true,
            },
            current: {               //当前页   仅支持number类型和可以转化number类型的字符串类型，推荐直接传number类型 必须尾正整数
                type: Number,
                default: 1
            },
            groups: {               //中间显示多少个 仅支持number类型和可以转化number类型的字符串类型，推荐直接传number类型 （必须大于3，小于总页数，推荐 大于3小于等于6，必须尾正整数）
                type: Number,
                default: 3
            },
            first: {                //控制首页。仅支持字符串类型。如：first: '首页',如果不传则默认为'1'     可选参数
                type: [String, Boolean],
                default: false
            },
            last: {                 //控制尾页。值支持三种类型。如：last: '尾页',如果不传则默认为总页数      可选参数
                type: [String, Boolean],
                default: false
            },
            prev_btn_txt: {         //上一页按钮字段:若为false，则不显示 必须为字符串类型；可选参数。
                type: [String, Boolean],
                default: '<'
            },
            next_btn_txt: {         //下一页按钮字段:若为false，则不显示 必须为字符串类型；可选参数。
                type: [String, Boolean],
                default: '>'
            },
            hash: {                 //布尔类型，用于刷新还是在当前页面,默认为false,不记住当前页 可选参数
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                list_current: 1,         //获取当前页
                list_totalPages: null,      //获取总页数
            }
        },
        computed: {
            //得到当前页
            getCurrent: {
                get() {
                    return this.list_current;
                },
                set(current) {
                    this.$emit('current', current);
                    this.list_current = current;
                }
            },

            // 生成分页渲染需要的数据
            getPagingNoList() {

                let current = parseInt(this.getCurrent),
                    totalPages = parseInt(this.total);

                this.list_totalPages = totalPages;
                this.list_current = current;

                if (totalPages <= 1) {
                    this.prev_btn_txt = this.next_btn_txt = false;
                    return []
                }

                let [groups, first, last] = [
                    this.groups,
                    this.first,
                    this.last,
                ];

                if (!first) first = 1;
                if (!last) last = totalPages;

                let template_arr = [];

                if (totalPages > 1 && totalPages <= 6) {
                    for (let i = 0; i < totalPages; i++) {
                        if (i + 1 === 1) {
                            template_arr.push({
                                txt: first,
                                parameter: 1
                            });
                        } else if (i + 1 === totalPages) {
                            template_arr.push({
                                txt: last,
                                parameter: i + 1
                            });
                        } else {
                            template_arr.push({
                                txt: i + 1,
                                parameter: i + 1
                            });
                        }
                    }

                    return template_arr;
                }
                if (current === totalPages) {
                    template_arr = [{
                        txt: last,
                        parameter: current
                    }];
                } else if (current === 1) {
                    template_arr = [{
                        txt: first,
                        parameter: current
                    }];
                } else {
                    template_arr = [{
                        txt: current,
                        parameter: current
                    }];
                }

                for (let i = 1; i < groups; i++) {
                    if (current + i <= totalPages) {
                        if (current + i === totalPages) {
                            template_arr.push({
                                txt: last,
                                parameter: current + i
                            });
                        } else {
                            template_arr.push({
                                txt: current + i,
                                parameter: current + i
                            });
                        }
                    }
                }

                if (current + groups - 1 < totalPages) {
                    template_arr[groups - 1] = {
                        txt: '...',
                        parameter: null
                    };
                    template_arr.push({
                        txt: last,
                        parameter: totalPages
                    });
                }

                for (let j = 1; j < groups; j++) {
                    if (current - j > 0) {
                        if (current - j === 1) {
                            template_arr.unshift({
                                txt: first,
                                parameter: current - j
                            });
                        } else {
                            template_arr.unshift({
                                txt: current - j,
                                parameter: current - j
                            });
                        }
                    }
                }

                if (current - groups + 1 > 1) {
                    template_arr[0] = {
                        txt: '...',
                        parameter: null
                    };
                    template_arr.unshift({
                        txt: first,
                        parameter: 1
                    });
                }

                return template_arr;
            },
        },
        methods: {
            //通过事件获取刷新当前页
            refreshCurrent(new_current) {
                if (new_current === this.getCurrent) return;
                this.getCurrent = new_current;
            },

            //上一页
            onPrevClick(prev_index) {
                this.refreshCurrent(prev_index);
            },
            //下一页
            onNextClick(next_index) {
                this.refreshCurrent(next_index);
            },
            // 点击页码刷新数据
            onPageClick(index) {
                this.refreshCurrent(index);
            }
        },

        created() {
            this.$emit('current', this.list_current);
        }
    }
</script>

<style lang="less" scoped>
    #pagination {
        .pagesize_box {
            font-size: 0;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            li {
                line-height: 20px;
                font-size: 12px;
                color: #666;
                padding: 0 6px;
                border-radius: 2px;
                border: 1px solid transparent;
                display: inline-block;
                vertical-align: middle;
                &:not(:first-child) {
                    margin-left: 6px;
                }
            }
            .pagination_list {
                cursor: pointer;
                border-color: #ddd;
                &.current_active {
                    color: #f33e33;
                    border-color: #f33e33;
                }
                &.no_user_list {
                    background-color: #f8f8f8;
                    color: #aaa;
                    border-color: #f8f8f8;
                    &:hover {
                        color: #aaa;
                        border-color: #f8f8f8;
                    }
                }
                &:hover {
                    color: #f33e33;
                    border-color: #f33e33;
                }
            }
        }
    }
</style>
