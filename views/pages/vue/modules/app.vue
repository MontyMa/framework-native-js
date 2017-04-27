<template>
    <div id="app_wrap">
        <!--<div class="title">我是基于Vue的分页插件</div>-->
        <!--分页插件-->
        <!--<div class="paging_box">-->
        <!--<paging-plugin :callback="getRequst"></paging-plugin>-->
        <!--</div>-->
        <directives-test></directives-test>
    </div>
</template>

<script>


    import Vue from 'vue';
    import PagingPlugin from './paging.vue';
    import directivesTest from './directivesTest.vue';

    export default {
        data(){
            return {
                name: '12131',
            }
        },
        components: {PagingPlugin, directivesTest},
        methods: {
            getRequst(){
//                $.post()
            }
        },
        watch: {},
        mounted(){
            this.getRequst()
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