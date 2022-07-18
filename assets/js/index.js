$(function () {
  //调用getUserInfo获取用户基本信息
  getUserInfo()

  var layer = layui.layer

  $('#btnLogout').on('click', function () {
    //提示用户是否确认退出
    layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
      //do something
      //清空token
      localStorage.removeItem('token')
      //重新跳转到登录页面
      location.href = '/login.html'
      //关闭confirm询问框
      layer.close(index);
    });
  })
})

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败')
      }
      //调用渲染用户头像的函数
      renderAvatar(res.data)
    }
    //无论成功或者失败，最终都会调用complete函数

  })
}

//渲染用户头像
function renderAvatar(user) {
  //获取用户名称，昵称优先级高
  var name = user.nickname || user.username
  //设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  //按需渲染用户头像
  if (user.user_pic !== null) {
    //渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    //渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}