<template>
    <div id="app_wrap">
        <div class="title">我是基于Vue的分页插件</div>
        <!--分页插件-->
        <div class="paging_box">
            <pagination :option="paging_option" :total="totalPages" :ajax='runAjax'></pagination>
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
                paging_option: {},
                totalPages: null,         //***必传参数***    并且默认值为null
            }
        },

        components: {pagination, computedAttributes},
        methods: {
            runAjax(current){
                let param = {
                    pageSize: 10,
                    pageNo: current
                };
                console.log(param);

                let request = $.get('/static/json/pagination.json');

                request.done(res => {
                    console.log(res);
//                    this.paging_option.totalPages = res.totalPages;
                    this.totalPages = res.totalPages;
                });

                return request;
            }
        },
        beforeMount(){
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