<template>
    <div id="paging">
        <ul class="paging_ul">
            <li>上一页</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>下一页</li>
        </ul>
    </div>
</template>

<script>
    export default{
        name: 'paging',
        props: ['callback'],

        methods: {
            runPaging(){
//                this.callback()
            }
        }

    }
</script>

<style lang="less" scoped>
    #paging {
        .paging_ul {
            font-size: 0;
            li {
                cursor: pointer;
                font-size: 14px;
                line-height: 20px;
                padding: 0 10px;
                border: 1px solid #d7d7d7;
                color: #666;
                display: inline-block;
                vertical-align: middle;
                &:hover {
                    border-color: #fb5353;
                }
                &:not(:first-child) {
                    margin-left: 5px;
                }
            }
        }
    }
</style>
