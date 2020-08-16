define(['jquery', 'jquerycookie', 'sha1'], function($) {
    //登录方式切换
    function login_type() {
        let $qrcode_wrapper = $('.qrcode_wrapper');
        let $formbox = $('.formbox');
        //手机号登录tab
        $('.phone_login').on('click', function() {
            // console.log('111');
            $('.eb_mod').addClass('tab_on');
            $('.eb_mod_account').addClass('tab_on');
            $('.qrcode_mod').removeClass('tab_on');
            $formbox.show();
            $qrcode_wrapper.hide();
        });
        //扫码登录tab
        $('.qrcode_mod').on('click', function() {
            $('.qrcode_mod').addClass('tab_on');
            $('.eb_mod').removeClass('tab_on');
            $('.eb_mod_account').removeClass('tab_on');
            $formbox.hide();
            $qrcode_wrapper.show();
        });
        //账号密码登录
        $('.switch_account_login').on('click', function() {
            $('.lo_mod_box').show();
            $('.lg_reg').show();
            $('.eb_mod_box').hide();
            $('.switch_phone_login').show();
            $('.switch_registry').show();
            $('.switch_account_login').hide();
            //tab中a标签切换
            $('.eb_mod_account').show();
            $('.eb_mod').hide();
        });
        //手机号登录
        $('.switch_phone_login').on('click', function() {
            $('.lo_mod_box').hide();
            $('.lg_reg').hide();
            $('.switch_account_login').show();
            $('.switch_phone_login').hide();
            $('.switch_registry').hide();
            $('.eb_mod_box').show();
            //tab中a标签切换
            $('.eb_mod_account').hide();
            $('.eb_mod').show();
            // $('.phone_login').html('<a class="eb_mod tab_on" href="javascript:;">手机号登录</a>');
        });

    }

    return {
        init: function() {
            const $err = $('.error_tip');
            const $tel = $('.eb_mod_box .item input');
            const $yzA = $('.get_tel_code'); //验证码
            const $yzInput = $('.lg_getcode input');
            const $usname = $('.lo_mod_box .lg_name input');
            const $pass = $('.lo_mod_box .lg_pass input');
            let $yznum = 0;
            let $telnum = 0;
            let $usnamenum = 0;
            let $passnum = 0;

            //点击按钮，随机生成验证码
            $yzA.on('click', function() {
                $yzA_click();
            });

            function $yzA_click() {
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
                $yzA.html(str);
            }
            //手机号输入框失去焦点时检测输入是否正确
            $tel.on('blur', function() {
                // console.log('333');
                let $telreg = /^1[3-9][0-9]{9}$/g;
                if ($tel.val() != '') {
                    // console.log($tel.val());
                    if ($telreg.test($tel.val())) {
                        $err.hide();
                        // console.log('55555');
                        $telnum = 1;
                    } else {
                        $err.html('请输入正确的手机号');
                        $err.show();
                        $telnum = 0;
                    }
                } else {
                    $err.html('手机号不能为空');
                    $err.show();
                    $telnum = 0;
                }
            });
            //验证码输入框失去焦点时检测输入是否正确
            $yzInput.on('blur', function() {
                if ($yzInput.val() != '') {
                    if ($yzInput.val() === $yzA.html()) {
                        // $oSpan.html('');
                        // $oEm.css('display', 'block');
                        $yznum = 1;
                        $err.hide();
                    } else {
                        $err.html('请输入正确的验证码');
                        $err.show();
                        // $oEm.css('display', 'none');
                        $yznum = 0;
                    }
                } else {
                    $err.html('验证码不能为空');
                    $err.show();
                    $yznum = 0;
                }
            });

            //账号/邮箱/手机号失去焦点时检测输入是否正确
            $usname.on('blur', function() {
                if ($usname.val() != '') {
                    $err.hide();
                    $usnamenum = 1;
                } else {
                    $err.html('账号不能为空');
                    $err.show();
                    $usnamenum = 0;
                }
            });
            //密码失去焦点时检测输入是否正确
            $pass.on('blur', function() {
                if ($pass.val() != '') {
                    $err.hide();
                    $passnum = 1;
                } else {
                    $err.html('密码不能为空');
                    $err.show();
                    $passnum = 0;
                }
            });

            //点击登录
            $('.lg_login .sub').on('click', function() {
                // console.log($usnamenum, $passnum);
                if ($usnamenum == 1 && $passnum == 1) {
                    //账号密码登录
                    $.ajax({
                        method: 'post',
                        url: 'http://10.31.152.18/js2005/project/php/login.php',
                        datatype: 'json',
                        data: {
                            name: $usname.val(),
                            pass: hex_sha1($pass.val())
                        }
                    }).done(function(data) {
                        console.log(data);
                        if (data == 1) {
                            location.href = 'index.html';
                            $.cookie('username', $usname.val(), { expires: 7, path: '/' });
                        } else {
                            $pass.val('');
                            alert('用户名或者密码错误');
                        }
                    });
                } else {
                    if ($('.switch_account_login:visible')) {
                        $err.html('请输入正确的手机号和验证码');
                        $yzA_click();
                        $yzInput.focus();
                    } else if ($('.switch_phone_login:visible')) {
                        $err.html('请输入正确用户名和密码');
                        $pass.val('');
                    }
                    return false;
                }
                // 手机号登录
                // if ($yznum == 1 && $telnum == 1) {
                //     $.ajax({
                //         method: 'post',
                //         url: 'http://10.31.152.18/js2005/project/php/login.php',
                //         datatype: 'json',
                //         data: {
                //             tel: $tel.val(),
                //         }
                //     }).done(function(data) {
                //         console.log(data);
                //         if (data == 1) {
                //             // location.href = 'index.html';
                //             // $.cookie('username', $('.username').val(), { expires: 7, path: '/' });
                //             // console.log(data);
                //             return false;
                //         } else {
                //             // $tel.val('');
                //             $err.html('该手机号未注册');
                //             return false;
                //         }
                //     });
                // } else 
            });
            login_type();
        }
    }
})