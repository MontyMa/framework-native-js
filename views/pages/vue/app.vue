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
                    current: 2,     //当前页
                    groups: 3,        //中间显示多少个
                    prevBtnTxt: '<',   //上一页按钮字段:若为false，则不显示上一页
                    nextBtnTxt: '>',   //下一页按钮字段:若为false，则不显示下一页
//                    first: '首页',           //控制首页。值支持三种类型。如：first: '首页',如果不传则默认为'1'
//                    last: '尾页',            //控制尾页。值支持三种类型。如：last: '尾页',如果不传则默认为总页数
//                    hash: true,             //布尔类型，用于刷新还是在当前页面,默认为undefined
                    param: {
                        pageSize: 10
                    },          //向服务器传的参数
                    url: '/static/json/pagination.json'             //请求地址
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