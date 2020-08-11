//判断是否登录
if (cookies.get('username')) {
    $('.box').style.display = 'none';
    $('.login_top').style.display = 'block';
    $('.login_top span').innerHTML = cookies.get('username');
}

$('.login_top a').onclick = function() {
    $('.box').style.display = 'block';
    $('.login_top').style.display = 'none';
    cookies.remove('username');
    // localStorage.removeItem('username');
}