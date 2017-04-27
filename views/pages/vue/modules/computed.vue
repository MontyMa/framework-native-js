<template>
    <div>
        <div>计算后{{_computed}}</div>
        <input v-model="_computed"/>
    </div>
</template>

<script>
    export default{
        name: 'computed',
        data(){
            return {}
        },
        computed: {
            _computed: {
                get(){
//                    return this.computed_result
                    console.log(this);
                },
                set(val){
                    console.log(val);
                }
            }
        }

    }
</script>
