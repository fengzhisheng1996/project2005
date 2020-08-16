define(['jquery', 'sha1'], function($) {

    return {
        init: function() {
            const $name = $('.rg_name input');
            const $pass = $('.rg_pass input');
            const $tel = $('.rg_phone input');
            const $email = $('.rg_email input');
            const $oSpan = $('.lo_mod_box span');
            const $oEm = $('.lo_mod_box em');
            let $namenum = 0;
            let $passnum = 0;
            let $telnum = 0;
            let $emailnum = 0;

            // console.log($oSpan.eq(0).html());
            // 用户名验证
            $name.on('focus', function() {
                $oSpan.eq(0).html('请输入7位中文或者14位英文字母以内的名称');
                $oSpan.eq(0).css('color', '#999');
                $oSpan.eq(0).show();
            });
            $name.on('blur', function() {
                let $reguser = /[\u4e00-\u9fa5]/g;
                if ($(this).val() != '') {
                    let $strlen = $(this).val().replace($reguser, '**');
                    // console.log($strlen.length);
                    if ($strlen.length <= 14) {
                        $.ajax({
                            method: 'post',
                            url: 'http://10.31.152.18/js2005/project/php/registry.php',
                            data: {
                                name: $name.val()
                            }
                        }).done(function(data) {
                            if (!data) {
                                $oSpan.eq(0).hide();
                                $oEm.eq(0).show();
                                $namenum = 1;
                            } else {
                                $oSpan.eq(0).html('此用户名已存在');
                                $oSpan.eq(0).css('color', 'red');
                                $oSpan.eq(0).show();
                                $oEm.eq(0).hide();
                                $namenum = 0;
                            }
                        });
                    } else {
                        $oSpan.eq(0).html('请输入7位中文或者14位英文字母以内的名称');
                        $oSpan.eq(0).css('color', '#999');
                        $oEm.eq(0).hide();
                        $namenum = 0;
                    }
                } else {
                    $oSpan.eq(0).html('请输入用户名');
                    $oSpan.eq(0).css('color', 'red');
                    $oSpan.eq(0).show();
                    $oEm.eq(0).hide();
                    $namenum = 0;
                }
            });

            //密码验证
            $pass.on('focus', function() {
                if ($(this).val() != '') {
                    if ($(this).val().length >= 6 && $(this).val().length <= 12) {
                        $pass.on('input', function() {
                            var numreg = /\d/g;
                            var upstrreg = /[A-Z]/g;
                            var lestrreg = /[a-z]/g;
                            var ortherreg = /[\_\W]/g;
                            var numflag = 0;
                            if (numreg.test($(this).val())) {
                                numflag++;
                            }
                            if (upstrreg.test($(this).val())) {
                                numflag++;
                            }
                            if (lestrreg.test($(this).val())) {
                                numflag++;
                            }
                            if (ortherreg.test($(this).val())) {
                                numflag++;
                            }
                            if (numflag <= 1) {
                                $oSpan.eq(1).html('弱：有被盗风险,建议使用字母、数字和符号两种及以上组合');
                                $oSpan.eq(1).css('color', 'red');
                                $oEm.eq(1).hide();
                            } else if (numflag > 1 && numflag <= 3) {
                                $oSpan.eq(1).html('中：安全强度适中，可以使用三种以上的组合来提高安全强度');
                                $oSpan.eq(1).css('color', 'orange');
                            } else if (numflag === 4) {
                                $oSpan.eq(1).html('强：你的密码很安全');
                                $oSpan.eq(1).css('color', 'green');
                            }
                            numflag = 0;
                        })
                    } else if ($(this).val().length < 6) {
                        $oSpan.eq(1).html('密码太短请重新输入');
                        $oSpan.eq(1).css('color', 'red');
                    } else {
                        $oSpan.eq(1).html('请输入正确的密码');
                        $oSpan.eq(1).css('color', 'red');
                    }
                } else {
                    $oSpan.eq(1).html('请输入6-12位英文字母数字特殊字符');
                    $oSpan.eq(1).css('color', '#999');
                }
            });
            $pass.on('blur', function() {
                if ($(this).val() != '') {
                    if ($(this).val().length >= 6 && $(this).val().length <= 12) {
                        var numreg = /\d/g;
                        var upstrreg = /[A-Z]/g;
                        var lestrreg = /[a-z]/g;
                        var ortherreg = /[\_\W]/g;
                        var numflag = 0;
                        if (numreg.test($(this).val())) {
                            numflag++;
                        }
                        if (upstrreg.test($(this).val())) {
                            numflag++;
                        }
                        if (lestrreg.test($(this).val())) {
                            numflag++;
                        }
                        if (ortherreg.test($(this).val())) {
                            numflag++;
                        }
                        if (numflag > 1) {
                            $oSpan.eq(1).html('');
                            $oEm.eq(1).show();
                            $passnum = 1;
                        } else {
                            $oSpan.eq(1).html('密码强度弱');
                            $oSpan.eq(1).css('color', 'red');
                            $oEm.eq(1).hide();
                            $passnum = 0;
                        }
                        numflag = 0;
                    } else if ($(this).val().length < 6) {
                        $oSpan.eq(1).html('密码太短请重新输入');
                        $oSpan.eq(1).css('color', 'red');
                        $oEm.eq(1).hide();
                        $passnum = 0;
                    } else {
                        $oSpan.eq(1).html('请输入正确的密码');
                        $oSpan.eq(1).css('color', 'red');
                        $oEm.eq(1).hide();
                        $passnum = 0;
                    }
                } else {
                    $oSpan.eq(1).html('请输入密码');
                    $oSpan.eq(1).css('color', 'red');
                    $oEm.eq(1).hide();
                    $passnum = 0;
                }
                numflag = 0;
            });

            //手机号
            $tel.on('focus', function() {
                $oSpan.eq(2).html('请输入11位的手机号码');
                $oSpan.eq(2).css('color', '#999');
            });
            $tel.on('blur', function() {
                var regtel = /^1[3-9][0-9]{9}$/g;
                if ($(this).val() != '') {
                    if (regtel.test($(this).val())) {
                        $.ajax({
                            method: 'post',
                            url: 'http://10.31.152.18/js2005/project/php/registry.php',
                            data: {
                                tel1: $tel.val()
                            }
                        }).done(function(data) {
                            if (!data) {
                                $oSpan.eq(2).hide();
                                $oEm.eq(2).show();
                                $telnum = 1;
                            } else {
                                $oSpan.eq(2).html('此手机号已存在');
                                $oSpan.eq(2).css('color', 'red');
                                $oSpan.eq(2).show();
                                $oEm.eq(2).hide();
                                $telnum = 0;
                            }
                        });

                        $oSpan.eq(2).html('');
                        $oEm.eq(2).show();
                        $telnum = 1;
                    } else {
                        console.log('333');
                        $oSpan.eq(2).html('请输入正确的手机号码');
                        $oSpan.eq(2).css('color', 'red');
                        $oSpan.eq(2).show();
                        $oEm.eq(2).hide();
                        $telnum = 0;
                    }
                } else {
                    $oSpan.eq(2).html('请输入手机号码');
                    $oSpan.eq(2).css('color', '#999');
                    $oEm.eq(2).hide();
                    $telnum = 0;
                }
            });

            //电子邮箱
            $email.on('focus', function() {
                $oSpan.eq(3).html('请输入电子邮箱');
                $oSpan.eq(3).css('color', '#999');
            });
            $email.on('blur', function() {
                let regtel = /^\w+@\w+\.+\w+$/g;
                if ($(this).val() != '') {
                    if (regtel.test($(this).val())) {
                        $oSpan.eq(3).html('');
                        $oEm.eq(3).show();
                        $emailnum = 1;
                    } else {
                        $oSpan.eq(3).html('请输入正确的电子邮箱');
                        $oSpan.eq(3).css('color', 'red');
                        $oEm.eq(3).hide();
                        $emailnum = 0;
                    }
                } else {
                    $oSpan.eq(3).html('请输入电子邮箱');
                    $oSpan.eq(3).css('color', '#999');
                    $oEm.eq(3).hide();
                    $emailnum = 0;
                }
            });

            //注册按钮
            // console.log($('.rg_btn .sub').val());
            $('.rg_btn .sub').on('click', function() {
                console.log($('.rg_btn .sub').val());
                if ($namenum == 1 && $passnum == 1 && $telnum == 1 && $emailnum == 1) {
                    console.log('btn');
                    return true;
                } else {
                    return false;
                    console.log('1111');
                }
            });

        }
    };
})