<template>
    <div id="app_wrap">
        <div class="title">我是基于Vue的分页插件</div>
        <!--分页插件-->
        <div class="paging_box">
            <pagination :option="paging_option" @pagination_response="getPageData"></pagination>
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
                    current: 1,             //当前页   仅支持number类型和可以转化number类型的字符串类型，推荐直接传number类型 必须尾正整数
                    groups: 3,              //中间显示多少个 仅支持number类型和可以转化number类型的字符串类型，推荐直接传number类型 （必须大于3，小于总页数，推荐 大于3小于等于6，必须尾正整数）
                    prevBtnTxt: '<',        //上一页按钮字段:若为false，则不显示 必须为字符串类型；可选参数。
                    nextBtnTxt: '>',        //下一页按钮字段:若为false，则不显示 必须为字符串类型；可选参数。
                    first: '首页',           //控制首页。仅支持字符串类型。如：first: '首页',如果不传则默认为'1'
                    last: '尾页',            //控制尾页。值支持三种类型。如：last: '尾页',如果不传则默认为总页数
                    hash: false,             //布尔类型，用于刷新还是在当前页面,默认为false,不记住当前页
                    param: {                //根据需要给后台传传递的参数    ***必须参数***
                        pageSize: 10
                    },          //向服务器传的参数
                    url: '/static/json/pagination.json'     //请求地址   ***必须参数***
                }
            }
        },
        components: {pagination, computedAttributes},
        methods: {
            //这里得到的数据是接口返回的原始数据
            getPageData(res){
                console.log(res);
            }
        },
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