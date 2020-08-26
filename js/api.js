const server = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 5000, // 请求超时时间

})
// 添加请求拦截器
server.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config.method = config.method.toLowerCase();
  // if (config.method === "post") {
  //   config.headers = {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   };

  //   config.data = Qs.stringify(config.data);
  // }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})
// 添加响应拦截器
server.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})

const http = {
  addUser: function (url, data) {
    return server({
      method: 'post',
      url: url,
      data: data 
    })
  },
  updateUser: function (url, data) {
    return server({
      method: 'post', 
      url: url,
      data: data 
    })
  },
  getUserList: function (url, data) {
    return server({
      method: 'get',
      url: url,
      params: data
    })
  }
}