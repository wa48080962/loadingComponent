import LoadingComponent from './loadingComponent'
import ErrorComponent from './ErrorComponent'
// 定义过渡，报错统一方法
export default (asyncComponent) => {//asyncComponent:传入要异步加载的组件
    return () => ({
        // 需要加载的组件 (应该是一个 `Promise` 对象)
        component: asyncComponent(),
        // 异步组件加载时使用的过渡组件
        loading: LoadingComponent,
        // 加载失败时使用的组件
        error: ErrorComponent,
        // 展示加载时组件的延时时间。默认值是 200 (毫秒)
        delay: 200,
        // 如果提供了超时时间且组件加载也超时了，
        // 则使用加载失败时使用的组件。默认值是：`Infinity`
        timeout: 3000
    })
}