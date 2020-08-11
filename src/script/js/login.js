$('.btn').onclick = function() {
    $ajax({
        method: 'post',
        url: 'http://localhost/js2005/project/php/login.php',
        datatype: 'json',
        data: {
            name: $('.username').value,
            pass: hex_sha1($('.password').value)
        }
    }).then(function(data) {
        console.log(data);
        if (data == 1) {
            location.href = 'mk_index.html';
            cookies.set('username', $('.username').value, 7);
        } else {
            $('.password').value = '';
            alert('用户名或者密码错误');
        }
    })
}