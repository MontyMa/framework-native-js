<template>
    <div>
        <div>计算后{{computeds}}</div>
        <input v-model="_computed"/>
        <input v-model="computeds"/>
    </div>
</template>

<script>
    export default{
        name: 'computed',
        data(){
            return {
                computeds: ''
            }
        },
        computed: {
            _computed: {
                get(){
                    return this.computeds;
                },
                set(val){
                    this.computeds = val;
                    console.log(val);
                }
            }
        },
        methods: {},
        ready(){
            console.log(this._computed);
        },
        mounted(){
        }

    }
</script>
