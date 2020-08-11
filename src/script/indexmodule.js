define(['jquery', 'jquerycookie'], function($) {
    return {
        init: function() {
            //判断是否登录
            if ($.cookie('username')) {
                $('.box').css('display', 'none');
                $('.login_top').css('display', 'block');
                $('.login_top span').html($.cookie('username'));
                // $('.login_top span').html(cookies.get('username'));
            };

            $('.login_top a').on('click', function() {
                $('.box').css('display', 'block');
                $('.login_top').css('display', 'none');
                $.cookie('username', '', { expires: -1, path: '/' });
                // cookies.remove('username');
            });
        }
    }
})