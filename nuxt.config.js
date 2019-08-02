
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "闲云旅游网",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_1168872_ehvuah8v57g.css'} // 新增全局字体样式
    ] 
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/main.css' // 新增自定义的页面过渡样式（文件来自3.4.1）
  ],
  /*
  ** Plugins to load before mounting the App
  */
//  plugins文件下的js文件需要通过该对象配置，所有插件在页面生成前都会调用
  plugins: [
    '@/plugins/element-ui',//配置element-ui，创建项目自动生成
    '@/plugins/axios',//调用axios插件
    { src: '~/plugins/localStorage.js', ssr: false }//调用本地存储的插件，ssr: false ，使得插件只会在客户端运行。
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: "http://127.0.0.1:1337" // 新增axios默认请求路径 
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
