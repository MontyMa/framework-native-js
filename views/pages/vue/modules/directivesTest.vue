<template>
    <div id="directives">
        <input v-model="age" v-isNumber="age" @keyup.enter="submit">
        <div>年龄{{age}}</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                name: '12131',
                age: ''
            }
        },
        components: {},
        methods: {
            submit(e){
                console.log(e);
                console.log(this.age, 123123);
            },
            getRequst(){
            }
        },
        watch: {
            age(val){
                console.log(val, 12312213);
            }
        },
        mounted(){
            this.getRequst()
        }
    }
</script>

<style lang="less" scoped>

</style>