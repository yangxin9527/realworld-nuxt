module.exports={
  router:{
    linkActiveClass:'active',
    extendRoutes(routes,resolve){
      routes.push(...[{
        path:'/register',
        name:'register',
        component:resolve(__dirname,'pages/login.vue')
      }])
    }
  },
  server:{
    host:'0.0.0.0',
    port:3000
  },
  plugins:[
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ]
}