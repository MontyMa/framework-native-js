<template>
	<div class="modal">
		<div class="shadow_box"></div>
	</div>
</template>

<script>

export default {
    name: 'shadowBox',
    props:['value'],
    components: {
    },
    methods: {
    },
    mounted () {
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.modal{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 500;
	.shadow_box{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
	}
}
</style>