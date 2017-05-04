<template>
    <div @click="_onclick(1)">惦记我</div>
</template>

<script>
    export default {
        name: 'test',
        methods: {
            _onclick(i){
                i++;
                this.$emit('hello_world', i)
            }
        }

    }
</script>
