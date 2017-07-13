<template>
    <div>
        <div>计算属性</div>
        <input @input="event1" v-model="input1Val"/>
        <input @input="event2" v-model="input2Val"/>
        <input @input="event3" v-model="input3Val"/>
    </div>
</template>

<script>
    import $ from 'jquery';
    export default{
        name: 'computed',
        data(){
            return {
                input1Val: '',
                input2Val: '',
                input3Val: ''
            }
        },
        components: {},
        watch: {
//            input1Val(val1){
////                this.input3Val = Number(val1) * Number(this.input2Val);
//            },
//            input2Val(val2){
//                console.log(val2);
//                this.input3Val = Number(val2) * Number(this.input1Val);
//            },
//            input3Val(val3){
//                this.input2Val = Number(val3) * Number(this.input1Val);
//                this.input2Val = Number(val3) * Number(this.input1Val);
//            },
        },
        computed: {
//            input1: {
//                get(){
//                    return this.input1Val;
//                },
//                set(val){
//                    this.input1Val = val;
//                }
//            },
//            input2: {
//                get(){
//                    return this.input2Val;
//                },
//                set(val){
//                    this.input2Val = val;
//                    this.input3 = Number(this.input1) * Number(val);
//                }
//            },
//            input3: {
//                get(){
//                    return this.input3Val;
//                },
//                set(val){
//                    this.input3Val = val;
//                    if (this.input1 === '' || !Number(this.input1))return;
//                    this.input2 = Number(val) / Number(this.input1)
//                }
//            },
        },
        methods: {
            event1(e){
                this.input3Val = Number($(e.target).val()) * Number(this.input2Val);
            },
            event2(e){
                this.input3Val = Number($(e.target).val()) * Number(this.input1Val);
            },
            event3(e){
                this.input2Val = Number($(e.target).val()) / Number(this.input1Val);
            },
        },
        beforeMount(){
        },
        beforeUpdate(){
        },
        updated(){
        },
        mounted(){
        }
    }
</script>
<style lang="less">

</style>