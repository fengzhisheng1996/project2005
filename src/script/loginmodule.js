define(['jquery', 'jquerycookie', 'hx_sha'], function($) {
    return {
        init: function() {

            //验证码
            $yzDiv = $('.yz div');
            $yzInput = $('.yz input');
            $oSpan = $('.yz span');
            $oEm = $('.yz em');
            $yznum = 0;
            //点击按钮，随机生成验证码
            $yzDiv.on('click', function() {
                $yzDiv_click();
            });

            function $yzDiv_click() {
                let arr = [];
                let str = '';
                for (let i = 48; i <= 57; i++) {
                    arr.push(String.fromCharCode(i))
                };
                for (let i = 65; i <= 90; i++) {
                    arr.push(String.fromCharCode(i))
                };
                for (let i = 97; i <= 122; i++) {
                    arr.push(String.fromCharCode(i))
                };
                // console.log(arr);
                for (let i = 0; i < 4; i++) {
                    str += arr[Math.round(Math.random() * (arr.length - 1))]
                }
                console.log('str:' + str);
                $yzDiv.html(str);
            }
            //验证码输入框失去焦点时检测输入是否正确
            $yzInput.on('blur', function() {
                if ($yzInput.val() != '') {
                    if ($yzInput.val() === $yzDiv.html()) {
                        $oSpan.html('');
                        $oEm.css('display', 'block');
                        $yznum = 1;
                    } else {
                        $oSpan.html('请输入正确的验证码');
                        $oEm.css('display', 'none');
                        $yznum = 0;
                    }
                } else {
                    $oSpan.html('验证码不能为空');
                    $oSpan.css('color', '#666');
                    $yznum = 0;
                }
            });

            //点击登录
            $('.btn').on('click', function() {
                if ($yznum == 1) {
                    $.ajax({
                        method: 'post',
                        url: 'http://localhost/js2005/project/php/login.php',
                        datatype: 'json',
                        data: {
                            name: $('.username').val(),
                            pass: hex_sha1($('.password').val())
                        }
                    }).done(function(data) {
                        console.log(data);
                        if (data == 1) {
                            location.href = 'mk_index.html';
                            $.cookie('username', $('.username').val(), { expires: 7, path: '/' });
                            // cookies.set('username', $('.username').val(), 7);
                        } else {
                            $('.password').val('');
                            alert('用户名或者密码错误');
                        }
                    });
                } else {
                    alert('请输入正确的验证码');
                    $yzDiv_click();
                    // console.log($yzDiv_click);
                    $yzInput.focus();
                }

            });

        }
    }
})