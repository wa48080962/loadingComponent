<template>
<div>
    异步组件测试
    点击按钮后
    第一个延迟3秒，从服务器加载
    第二个不延迟从服务器加载
    <template v-if="show">
        <later></later>
        <later2></later2>
        <later3></later3>
        <later4></later4>
        <later5></later5>  
        <later6></later6>
        <later7></later7>
    </template>
    <button @click="toggle">加载</button>
</div>
</template>
<script>
import Vue from 'vue';
import loadable from './loadable'
//一些根据事件才能显示的组件，可以直接用异步组件，它会自动被webpack打包成一个独立的js文件，而不会打包到主文件中，当需要加载时才会显示
const later = Vue.component('later', function (resolve,reject) {
    setTimeout(function () {
         // 这个特殊的 `require` 语法将会告诉 webpack
        // 自动将你的构建代码切割成多个包，这些包
        // 会通过 Ajax 请求加载
        require(['./later.vue'], resolve)
    }, 3000);
});
const later2 = Vue.component('later2', function (resolve,reject) {
    require(['./later2.vue'], resolve)
});
const later3 = Vue.component('later3', function (resolve,reject) {
    // 这样写会异步加载但是不会切割单个包
    resolve({
        template:'<div>later3</div>'
    })
});

const later4 = Vue.component(
    // 这样也可以异步加载组件，返回一个Promise对象
     // 自动将你的构建代码切割成多个包，这些包
        'later4',
        (resolve,reject) => import('./later4')
)


// console.dir(later4()) // 返回Promise对象
// later4().then(console.log("123"))
import LoadingComponent from './loadingComponent'
import ErrorComponent from './ErrorComponent'

// 这里的异步组件工厂函数也可以返回一个如下格式的对象
const later6 = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./later6.vue'),
  // 异步组件加载时使用的过渡组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 5000,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})

// console.dir(later6);

export default{
    data: function () {
        return {
            show: false
        };
    },
    components: {
        later,
        later2,
        later3,
        later4,
        'later5': () => import('./later5'), // 也可以在注册时将组件注册为异步组件，也会单独打包
        later6,
        'later7':loadable(() => import('./later7')) // 使用通用方法来传入异步组件，并在过渡或出错的时候显示通用组件
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