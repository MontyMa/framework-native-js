<template>
    <div id="pagination">
        <div>{{list_current}}</div>
        <div>{{list_totalPages}}</div>
        <ul class="pagesize_box">
            <li @click="list_current-1>0?onPrevClick(list_current-1):null"
                v-if="getLegitimateData.prevBtnTxt"
                class="pagination_list"
                :class="{no_user_list:list_current-1<=0}">
                {{getLegitimateData.prevBtnTxt}}
            </li>
            <template v-for="(pageNo,index) in template_arr">
                <li :class="{current_active:pageNo===list_current,pagination_list:pageNo!=='...'}"
                    @click="pageNo!=='...'?onPageClick(pageNo):null">
                    {{pageNo}}
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
                    current: 1,     //当前页,选填
                    groups: 3,        //中间显示多少个 选填
                    prevBtnTxt: '上一页',   //上一页按钮字段:若为false，则不显示上一页  选填
                    nextBtnTxt: '下一页',   //下一页按钮字段:若为false，则不显示下一页  选填
                    first: '首页',           //控制首页。值支持三种类型。如：first: '首页',如果不传则默认为'1' 选填
                    last: '尾页',            //控制尾页。值支持三种类型。如：last: '尾页',如果不传则默认为总页数  选填
                    hash: false,             //布尔类型，用于刷新还是在当前页面,默认为undefined     选填
                    param: null,          //向服务器传的参数
                    url: null,             //请求地址
                },
                template_arr: [],
                list_current: null,
                list_totalPages: null,
            }
        },

        computed: {
            //验证参数是否合法
            getLegitimateData(){
                let option = this.option;

                let must_keys = ['url', 'param'];
//                let is_must = true;     //上锁 如果必填字段没有传那么以后的程序将不会执行

                must_keys.some(must_keys_elem => {

                    let is_hasOwnProperty = option.hasOwnProperty(must_keys_elem);
                    let url_prototype_toString = Object.prototype.toString.call(option['url']);
                    let param_prototype_toString = Object.prototype.toString.call(option['param']);

                    if (!is_hasOwnProperty ||
                        url_prototype_toString !== '[object String]' ||
                        param_prototype_toString !== '[object Object]' ||
                        option['url'] === '' ||
                        Object.keys(option['param']).length === 0) {
                        console.log('***********有必填配置没有配置，请检查配置参数***********');
                        console.log('***********有必填配置没有配置，请检查配置参数***********');
                        throw '***********有必填配置没有配置，请检查配置参数***********'
//                        is_must = false;
//                        return is_must;
                    }
                });

//                if (!is_must) return;       //开锁

                let option_keys = Object.keys(option);
                let default_option = Object.keys(this.default_option);
                let new_option = {};
                let num_keys = ['current', 'groups'];


                default_option.forEach(default_option_keys_elem => {
                    if (option_keys.indexOf(default_option_keys_elem) < 0) {
                        new_option[default_option_keys_elem] = this.default_option[default_option_keys_elem]
                    } else if (num_keys.indexOf(default_option_keys_elem) >= 0) {
                        if (parseInt(option[default_option_keys_elem])) {
                            new_option[default_option_keys_elem] = parseInt(option[default_option_keys_elem]);
                        } else {
                            throw `${default_option_keys_elem}:类型不对,请修改...`
                        }
                    } else {
                        new_option[default_option_keys_elem] = option[default_option_keys_elem];
                    }
                });
                return new_option;
            },

            getCurrent: {
                get(){
                    return '';
                },
                set(current){
                    this.getRequest(current);
                }
            }

        },

        methods: {
            //获取分页需要的渲染内容
            getPagingNoList(current, totalPages){
                totalPages = parseInt(totalPages);
                current = parseInt(current);

                this.list_current = current;
                this.list_totalPages = totalPages;

                if (totalPages <= 1) {
                    this.default_option.prevBtnTxt = this.default_option.nextBtnTxt = false;
                    this.template_arr = [];
                    return
                }

                let [groups, hash, first, last] = [
                    this.getLegitimateData.groups,
                    this.getLegitimateData.hash,
                    this.getLegitimateData.first,
                    this.getLegitimateData.last,
                ];

                let template_arr = [];

                if (totalPages > 1 && totalPages <= 6) {
                    for (let i = 0; i < totalPages; i++) {
                        template_arr.push(i + 1);
                    }
                    this.template_arr = template_arr;
                    return
                }

                template_arr = [current];

                for (let i = 1; i < groups; i++) {
                    if (current + i <= totalPages) {
                        template_arr.push(current + i);
                    }
                }

                if (current + groups - 1 < totalPages) {
                    template_arr[groups - 1] = '...';
                    template_arr.push(totalPages);
                }

                for (let j = 1; j < groups; j++) {
                    if (current - j > 0) {
                        template_arr.unshift(current - j);
                    }
                }

                if (current - groups + 1 > 1) {
                    template_arr[0] = '...';
                    template_arr.unshift(1);
                }
                this.template_arr = template_arr;
            },

            //上一页
            onPrevClick(prev_index){
                this.getCurrent = prev_index
            },
            //下一页
            onNextClick(next_index){
                this.getCurrent = next_index
            },
            // 点击页码刷新数据
            onPageClick (index) {
                this.getCurrent = index
            },
            //发起请求
            getRequest(current){
                this.getLegitimateData.param.current = current;     //拼合参数
                console.log(this.getLegitimateData.param);

                $.get(this.getLegitimateData.url).done(response => {
                    this.getPagingNoList(current, response.totalPages);

                    //原封不动的导出请求数据
                    this.$emit('pagination_response', response)
                })
            }
        },
        beforeMount(){
            this.getRequest(this.getLegitimateData.current);
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
                border-color: #999;
                &.current_active {
                    color: #fb5353;
                    border-color: #fb5353;
                }
                &.no_user_list {
                    background-color: #f5f5f5;
                    border-color: #f5f5f5;
                    color: #fff;
                    &:hover {
                        color: #fff;
                        border-color: #f5f5f5;
                    }
                }
                &:hover {
                    color: #fb5353;
                    border-color: #fb5353;
                }
            }
        }
    }
</style>
