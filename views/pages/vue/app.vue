<template>
    <div id="app_wrap">
        <div class="title">我是基于Vue的分页插件</div>
        <!--分页插件-->
        <div class="paging_box">
            <pagination :option="paging_option" @current="getCurrent"></pagination>
        </div>

        <!--计算器属性研究-->
        <computed-attributes></computed-attributes>
    </div>
</template>

<script>
    import $ from 'jquery';
    import computedAttributes from './modules/computed.vue';
    import pagination from './modules/pagination.vue';  //分页

    export default {
        data(){
            return {
                //分页配置项
                paging_option: {
//                    current: 1,             //当前页   仅支持number类型和可以转化number类型的字符串类型，推荐直接传number类型 必须尾正整数
//                    groups: 3,              //中间显示多少个 仅支持number类型和可以转化number类型的字符串类型，推荐直接传number类型 （必须大于3，小于总页数，推荐 大于3小于等于6，必须尾正整数）
//                    prevBtnTxt: '<',        //上一页按钮字段:若为false，则不显示 必须为字符串类型；可选参数。
//                    nextBtnTxt: '>',        //下一页按钮字段:若为false，则不显示 必须为字符串类型；可选参数。
//                    first: 1,           //控制首页。仅支持字符串类型。如：first: '首页',如果不传则默认为'1'
//                    last: '尾页',            //控制尾页。值支持三种类型。如：last: '尾页',如果不传则默认为总页数
                    hash: true,             //布尔类型，用于刷新还是在当前页面,默认为false,不记住当前页
                    totalPages: null,         //***必传参数***    并且默认值为null
                },
            }
        },
        components: {pagination, computedAttributes},
        methods: {
            //这里得到的数据是分页返回的当前页
            getCurrent(current){
                this.runAjax(current)
            },

            runAjax(current){
                let param = {
                    pageSize: 10,
                    pageNo: current
                };
                console.log(param);

                $.get('/static/json/pagination.json').done(res => {
                    console.log(res);
                    this.paging_option.totalPages = res.totalPages;
                })
            }
        },
        beforeMount(){
            this.runAjax(this.paging_option.current)
        }
    }
</script>

<style lang="less" scoped>
    #app_wrap {
        .title {
            text-align: center;
        }
        .paging_box {
            text-align: center;
            padding: 50px;
        }
    }
</style>