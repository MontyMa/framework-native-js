<template>
    <table>
        <tr v-for="item in render_list">
            <template v-if="item.rowspan">
                <td :rowspan="item.rowspan">{{item.time}}</td>
            </template>
            <td>{{item.txt1}}</td>
            <td>{{item.txt2}}</td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: 'computed',
        data() {
            return {
                request_data: [
                    {time: '123', txt1: 'werwe', txt2: '342343'},
                    {time: '123', txt1: 'werwe', txt2: '342343'},
                    {time: '123', txt1: 'werwe', txt2: '342343'},
                    {time: '1234', txt1: 'werwe', txt2: '342343'},
                    {time: '1235', txt1: 'werwe', txt2: '342343'},
                    {time: '1235', txt1: 'werwe', txt2: '342343'},
                ],
                render_list: [],
            }
        },
        components: {},
        computed: {},
        methods: {
            getRenderList() {
                let reference = '';
                let arr = JSON.parse(JSON.stringify(this.request_data));
                let obj = {};

                this.request_data.forEach((elem) => {
                    let a = elem.time;
                    let r = obj[a];

                    if (r) {
                        obj[a] += 1
                    } else {
                        obj[a] = 1
                    }
                });

                arr.forEach((elem, i) => {
                    if (reference !== elem.time) {
                        arr[i].rowspan = obj[elem.time];
                        reference = elem.time;
                    }
                });

                this.render_list = arr;
            }
        },
        beforeMount() {
            this.getRenderList()
        },
        beforeUpdate() {
        },
        updated() {
        },
        mounted() {
        }
    }
</script>
<style lang="less">
    table {
        margin-top: 30px;
        width: 400px;
        td {
            border: 1px solid #D7D7D7;
        }
    }
</style>