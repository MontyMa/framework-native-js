<template>
    <div id="pagination">
        <div>{{list_current}}</div>
        <div>{{list_totalPages}}</div>
        <ul class="pagesize_box" v-if="list_totalPages!==1">
            <li @click="list_current-1>0?onPrevClick(list_current-1):null"
                v-if="getLegitimateData.prevBtnTxt"
                class="pagination_list"
                :class="{no_user_list:list_current-1<=0}">
                {{getLegitimateData.prevBtnTxt}}
            </li>
            <template v-for="(pageNo,index) in template_arr">
                <li :class="{current_active:pageNo.parameter===list_current,pagination_list:pageNo.txt!=='...'}"
                    @click="pageNo!=='...'?onPageClick(pageNo.parameter):null">
                    {{pageNo.txt}}
                </li>
            </template>
            <li @click="list_current<list_totalPages?onNextClick(list_current+1):null"
                v-if="getLegitimateData.nextBtnTxt"
                class="pagination_list"
                :class="{no_user_list:list_current>=list_totalPages}">
                {{getLegitimateData.nextBtnTxt}}
            </li>
        </ul>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default{
        name: 'pagination',
        props: ['option'],
        data(){
            return {
                //默认分页配置项
                default_option: {
                    current: 1,             //当前页   仅支持number类型和可以转化number类型的字符串类型，推荐直接传number类型 必须尾正整数
                    groups: 3,              //中间显示多少个 仅支持number类型和可以转化number类型的字符串类型，推荐直接传number类型 （必须大于3，小于总页数，推荐 大于3小于等于6，必须尾正整数）
                    prevBtnTxt: '<',      //上一页按钮字段:若为false，则不显示 必须为字符串类型；可选参数。
                    nextBtnTxt: '>',      //下一页按钮字段:若为false，则不显示 必须为字符串类型；可选参数。
                    first: null,                //控制首页。仅支持字符串类型。如：first: '首页',如果不传则默认为'1'     可选参数
                    last: null,                 //控制尾页。值支持三种类型。如：last: '尾页',如果不传则默认为总页数      可选参数
                    hash: false,                //布尔类型，用于刷新还是在当前页面,默认为false,不记住当前页         可选参数
                    totalPages: '',         //***必传参数***    并且默认值为null
                },
                template_arr: [],           //渲染分页dom
                list_current: null,         //获取当前页
                list_totalPages: null,      //获取总页数
            }
        },

        computed: {
            //验证参数是否合法
            getLegitimateData(){
                let option = this.option;
                let totalPages = option.totalPages;
                let new_option = {};

//                return new_option;

//                if (!totalPages) return 'werwe';

                if (!option.hasOwnProperty('totalPages')) {
                    throw '****** totalPages 为必传参数，请务必传参******'
                }

//                if (!parseInt(totalPages)) {
//                    throw '****** totalPages 传入类型不对，请改正******'
//                }

                let option_keys = Object.keys(option);
                let default_keys = Object.keys(this.default_option);

                option_keys.forEach(elem => {
                    if (default_keys.indexOf(elem) < 0) {
                        throw `**** ${elem} 无效或错传，请检查****`
                    }

                    if (elem === 'hash' && Object.prototype.toString.call(option[elem]) !== '[object Boolean]') {
                        throw `**** ${elem} 类型为Boolean，请检查****`
                    }
                });

                default_keys.forEach(elem => {
                    new_option[elem] = option_keys.indexOf(elem) < 0 ? this.default_option[elem] : option[elem];
                });

                console.log(new_option);

                return new_option;
            },

            //得到当前页
            getCurrent: {
                get(){
                    return this.list_current;
                },
                set(current){
                    this.getRequest(current);
                }
            },

            //获取储存的当前页
            getSessionStorageCurrentPage(){
                let current_page = sessionStorage.getItem('current_page');
                let current = this.getLegitimateData.current;

                if (current_page) {
                    current = parseInt(current_page);
                } else {
                    current = parseInt(current);
                }

                return current
            },
        },

        methods: {
            //通过事件获取刷新当前页
            refreshCurrent(new_current){
                if (new_current === this.getCurrent)return;
                this.getCurrent = new_current;

                sessionStorage.setItem('current_page', new_current);
            },

            //获取分页需要的渲染内容
            getPagingNoList(current, totalPages){
                current = parseInt(current);
                totalPages = parseInt(totalPages);

                this.list_totalPages = totalPages;
                this.list_current = current;

                if (totalPages <= 1) {
                    this.default_option.prevBtnTxt = this.default_option.nextBtnTxt = false;
                    this.template_arr = [];
                    return
                }

                let [groups, first, last] = [
                    this.getLegitimateData.groups,
                    this.getLegitimateData.first,
                    this.getLegitimateData.last,
                ];


                if (first === null) first = 1;
                if (last === null) last = totalPages;

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

                    this.template_arr = template_arr;
                    return
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
                this.template_arr = template_arr;
            },

            //上一页
            onPrevClick(prev_index){
                this.refreshCurrent(prev_index);
            },
            //下一页
            onNextClick(next_index){
                this.refreshCurrent(next_index);
            },
            // 点击页码刷新数据
            onPageClick (index) {
                this.refreshCurrent(index);
            },
            //发起请求
            getRequest(current){
                this.getLegitimateData.param.current = current;     //拼合参数

                $.get(this.getLegitimateData.url).done(response => {
                    this.getPagingNoList(current, response.totalPages);

                    //原封不动的导出请求数据
                    this.$emit('pagination_response', response)
                })
            }
        },
        beforeMount(){
            let hash = this.getLegitimateData;

            console.log(hash);
//            return
//            if (hash) {
//                this.getRequest(this.getSessionStorageCurrentPage);
//            } else {
//                if (sessionStorage.getItem('current_page')) {
//                    sessionStorage.removeItem('current_page');
//                }
//                this.getRequest(this.getLegitimateData.current);
//            }
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
