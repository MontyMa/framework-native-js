<template>
    <div>
        <!-- <transition name="fade" mode="out-in" appear>
             &lt;!&ndash;<component :is="view"></component>&ndash;&gt;
             <input v-isNumber="name" type="password"/>
             <p>是的范德萨防辐射服</p>
         </transition>-->

        <!--<button v-on:click="show = !show">-->
        <!--Toggle-->
        <!--</button>-->
        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>

        <text @hello_world="getIndex"></text>
    </div>
</template>

<script>
    import text from './test.vue';
    export default{
        name: 'computed',
        data(){
            return {
                name: '',
                show: false
            }
        },
        components: {text},
        computed: {},
        methods: {
            getIndex(val){
                console.log(val)
            },
            transitionComplete: function (el) {
                // 传入 'el' 这个 DOM 元素作为参数。
            }
        },
        beforeMount(){
            console.log('beforeMount')
        },
        beforeUpdate(){
            console.log(this.name, 'beforeUpdate');
        },
        updated(){
            console.log('updated');
        },
        mounted(){
            this.show = true;
            console.log('mounted');
            this.name = 'Monty'
        }

    }
</script>
<style lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: opacity 10s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>