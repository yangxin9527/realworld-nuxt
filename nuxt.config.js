module.exports={
  router:{
    base: '/realworld/',
    linkActiveClass:'active',
    extendRoutes(routes,resolve){
      routes.push(...[{
        path:'/register',
        name:'register',
        component:resolve(__dirname,'pages/login.vue')
      }])
    }
  },
  css: ['~/static/main'],
  server:{
    host:'0.0.0.0',
    port:3000
  },
  plugins:[
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ],
  build: {
    extractCSS: true
  },
}