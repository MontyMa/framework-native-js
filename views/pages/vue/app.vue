<template>
    <div id="app_wrap">
        <div class="title">我是基于Vue的分页插件</div>
        <!--分页插件-->
        <div class="paging_box">
            <pagination @current='getResponse' :total="total_pages" :current='2'></pagination>
        </div>
        <div>{{getTest}}</div>

        <input type="button" value="click" @click="onClick">

        <div>{{getTxt}}</div>
        <input type="button" value="点我改变为'按钮1'" @click="onClick1('按钮1')">
        <input type="button" value="点我改变为'按钮2'" @click="onClick1('按钮2')">
        <!--计算器属性研究-->
        <computed-attributes></computed-attributes>
    </div>
</template>

<script>
    import $ from 'jquery';
    import computedAttributes from './modules/computed.vue';
    import pagination from '../../public/components/pagination.vue';  //分页
    export default {
        data() {
            return {
                total_pages: '',
            }
        },
        computed: {
            getTest(){
                return this.$store.getters.is_success;
            },
            getTxt(){
                return this.$store.getters.test_state;
            }
        },
        components: {pagination, computedAttributes},
        methods: {
            getResponse(current) {
                //向服务器传的参数
                let param = {
                    pageSize: 10,
                    pageNo: current
                };
                console.log(param);

                let url = '/static/json/pagination.json';

                $.get(url).done(res => {
                    this.total_pages = res.totalPages;
                })
            },
            onClick(){
                this.$store.dispatch('sub_is_success', !this.getTest);
            },
            onClick1(txt){
                this.$store.dispatch('sub_test_state', txt);
            }
        },
        mounted(){
            console.log(this.$store.getters.is_success);
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