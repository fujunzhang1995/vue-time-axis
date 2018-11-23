import vueTimeAxis from './timeAxis'
const timeAxis = {
    install (Vue, options) {
        Vue.component(vueTimeAxis.name, vueTimeAxis)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(paykeyboard);
}
export default timeAxis
