

const http = {
  getMore: function (url, data) {
    return axios({
      methods: 'post',//若无此项，默认get
      url: url,
      data: data//get-params
    })
  },
  getUserList: function (url, data) {
    return axios({
      methods: 'get',
      url: url,
      params: data
    })
  }
}

