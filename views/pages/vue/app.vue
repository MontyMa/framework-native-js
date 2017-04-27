<template>
    <div id="app_wrap">
        <div class="title">我是基于Vue的分页插件</div>
        <!--分页插件-->
        <div class="paging_box">
            <pagination :option="paging_option" @getPageData="pagination_data"></pagination>
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
                    currentPage: 'pageNum', //当前页
                    totalPages: 'totalPage', //总页数
                    param: {},          //向服务器传的参数
                    url: ''             //请求地址
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