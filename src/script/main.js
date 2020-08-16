require.config({
    paths: { //配置名称和路径。
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery',
        'jquerycookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie',
        'jquerylazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload',
        'sha1': './sha1',
        'public': './public',
        // 'jquerylazyload': './jquery.lazyload',
        'jqueryPagination': './jquery.pagination',
    },
    shim: {
        'jquerycookie': { //让不支持amd的模块，支持amd
            deps: ['jquery']
        },
        'jquerylazyload': {
            deps: ['jquery']
        },
        'jqueryPagination': {
            deps: ['jquery']
        },
    }
});

require(['jquery', 'jquerycookie'], function($) { //引入jquery模块
    let $currentpage = $('#currentpage'); //获取元素
    let currentmodule = $currentpage.attr('targetpage'); //获取元素的自定义的属性。
    if (currentmodule) { //模块是否存在
        require([currentmodule], function(cmodule) { //加载模块
            cmodule.init();

        });
    }
    //判断是否登录
    if ($.cookie('username')) {
        $('.header_user_info').css('display', 'none');
        $('.header_user_info_login').css('display', 'block');
        // console.log($.cookie('username'));
        $('.user_meta .name').html($.cookie('username'));
        $('.user_meta').on('mouseover', function() {
            $('.ext_mode').css('display', 'block');
        });
        $('.user_meta').on('mouseout', function() {
            $('.ext_mode').css('display', 'none');
        });
        $('.ext_mode').on('mouseover', function() {
            $('.ext_mode').css('display', 'block');
        });
        $('.ext_mode').on('mouseout', function() {
            $('.ext_mode').css('display', 'none');
        });
    };
    $('.ext_mode .logout').on('click', function() {
        $('.header_user_info').css('display', 'block');
        $('.header_user_info_login').css('display', 'none');
        $.cookie('username', '', { expires: -1, path: '/' });
        // cookies.remove('username');
    });


    //右侧回到顶部
    function right_to_top() {
        let $btn = $('.sideBottom');
        let $top = $(window).scrollTop();
        if ($top >= 150) {
            $btn.show();
        } else {
            $btn.hide();
        }
        $(window).on('scroll', function() {
            $top = $(window).scrollTop();
            if ($top >= 150) {
                $btn.show();
            } else {
                $btn.hide();
            }
        })
        $btn.on('click', function() {
            $('html').stop().animate({
                scrollTop: 0
            });
        })
    }
    right_to_top();

});