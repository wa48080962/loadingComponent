<template>
<div>
    异步组件测试
    点击按钮后
    第一个延迟3秒，从服务器加载
    第二个不延迟从服务器加载
    <template v-if="show">
        <later></later>
        <later2></later2>
    </template>
    <button @click="toggle">加载</button>
</div>
</template>
<script>
import Vue from 'vue';

//一些根据事件才能显示的组件，可以直接用异步组件，它会自动被webpack打包成一个独立的js文件，而不会打包到主文件中，当需要加载时才会显示
const later = Vue.component('later', function (resolve) {
    setTimeout(function () {
        require(['./later.vue'], resolve)
    }, 3000);
});
const later2 = Vue.component('later2', function (resolve) {
    require(['./later2.vue'], resolve)
});

// import later from './later'
// import later2 from './later2'
export default{
    data: function () {
        return {
            show: false
        };
    },
    components: {
        later,
        later2,
    },
    created: function () {

    },
    mounted: function () {
    },
    computed: {},
    methods: {
        toggle:function () {
            this.show = !this.show;
        }
    },
}
</script>
<style>
</style>