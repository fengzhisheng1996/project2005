define(['jquery', 'jquerycookie', 'jquerylazyload', 'public'], function($) {
    //搜索框关键词搜索-数据渲染
    function search_render() {
        $('.ts_txt').on('change', function() {
            $.ajax({
                method: 'get',
                url: 'https://list.mogu.com/search?cKey=pc-search-entry&searchKey=' + $('.ts_txt').val()
            }).done(function(data) {
                console.log(data);
                for (let value of JSON.parse(data).result.list) {
                    console.log(value);
                }
            })
        });
    }
    //女鞋&包包商品数据渲染
    function women_dress_render() {
        $.ajax({
            method: 'post',
            url: 'http://10.31.152.18/js2005/project/php/indexdata.php'
        }).done(function(data) {
            let $data = JSON.parse(data);
            console.log($data.length);
            let num1 = 0;
            // let num1 = ranNum(0, $data.length - 6);
            $('.women_shoes .mslide_banners').html('');
            $('.women_shoes .mslide_dot_box').html('');
            for (let $j = 0; $j < 5; $j++) {
                let strhtml = '<li class="mslide_banner clearfix left">';
                for (let $i = 0; $i < 6; $i++) {
                    // console.log($data[num1 + $i]);
                    // console.log($data[num1 + $i].title);
                    console.log('num1:' + num1);
                    strhtml += ` 
                    <div class="mslide_banner_item left">
                        <a class="pic_css1" href="detail.html" target="_blank">
                            <div class="swiper_img_wrap">
                                <img class="pic_css1 lazy" data-original="${$data[num1 + $i].url}" alt="">
                            </div>
                            <p class="title">${$data[num1 + $i].title}</p>
                            <p class="goods_price">
                                <span>¥</span>${$data[num1 + $i].price}
                            </p>
                        </a>
                    </div>`;
                }
                strhtml += '</li>'
                $('.women_shoes .mslide_banners').append(strhtml);
                num1 += 6;
            }
            $('.women_shoes .mslide_banners').append($('.women_shoes .mslide_banner').eq(0).clone());
            // $('.women_shoes .mslide_banner').html(strhtml);
            // console.log('banner:' + $('.women_shoes .mslide_banner').length);
            //图片懒加载
            $(function() { //和拼接的元素放在一起。
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式 谈入
                });
            });

            let strA = '';
            for (let $k = 0; $k < $('.women_shoes .mslide_banner').length - 1; $k++) {
                strA += '<a class="dot_default inline_block" href="javascript:;"></a>';
            }
            $('.women_shoes .mslide_dot_box').html(strA);
            //给第一个商品数据添加mslide_banner_show类
            // $('.women_shoes .mslide_banner').eq(0).addClass('mslide_banner_show');
            $('.women_shoes .dot_default').eq(0).addClass('dot_default_show');

            lunbo($('.women_shoes .dot_default'), $('.women_shoes .mslide_banners'));
        })
    }


    //轮播效果
    function lunbo(elent1, elent2) {
        let $num = 0;
        let $num3 = 0;
        // console.log('000');
        let $time1 = null;
        let $time2 = null;
        // console.log(elent2.children().first().outerWidth());
        let $liwidth = elent2.children().first().outerWidth();
        //鼠标划入小圆点商品tab切换
        elent1.on('mouseover', function() {
            // console.log('111');
            $num = $(this).index();
            $time1 = setTimeout(() => {
                // console.log('222');
                // lunbocss($num);
                lunbotab($num, $liwidth);
            }, 300);
        });
        elent1.on('mouseout', function() {
            clearTimeout($time1);
        });
        //自动轮播效果
        $time2 = setInterval(() => {
            $num++;
            // console.log(elent1.length);
            // if ($num == elent1.length) {
            //     $num = 0;
            // }
            if ($num == $('.women_shoes .dot_default').length + 1) {
                $('.women_shoes .mslide_banners').css('left', '0px');
                $num = 1;
            }
            // console.log('$num:' + $num);
            lunbotab($num, $liwidth);
        }, 3500);
        $('.women_shoes .topSwiper').on('mouseover', function() {
            clearInterval($time2);
        });
        $('.women_shoes .topSwiper').on('mouseout', function() {
            $time2 = setInterval(() => {
                $num++;
                // if ($num == elent1.length) {
                //     $num = 0;
                // }
                if ($num == $('.women_shoes .dot_default').length + 1) {
                    $('.women_shoes .mslide_banners').css('left', '0px');
                    $num = 1;
                }
                // console.log('$num2:' + $num);
                lunbotab($num, $liwidth);
            }, 3500);
        });
        //左边大图自动轮播效果
        setInterval(() => {
            $num3++;
            if ($num3 == 2) {
                $num3 = 0;
            }
            // console.log('$num3:' + $num3);
            // console.log($('.women_shoes .leftBanner img').attr('src'));
            if ($num3 == 1) {
                $('.women_shoes .leftBanner img').attr('src', 'https://s10.mogucdn.com/mlcdn/c45406/180516_4cki65bidl5hbi40jg9529j2dkfb9_690x1665.jpg_750x9999.v1c7E.81.webp');
            } else if ($num3 == 0) {
                $('.women_shoes .leftBanner img').attr('src', 'https://s10.mogucdn.com/mlcdn/c45406/180516_2dj56ekc3gkb16566gdahb1d3i996_690x1665.jpg_750x9999.v1c7E.81.webp');
            }
        }, 3500);
    };

    function lunbotab($num, $liwidth) {

        if ($num == $('.women_shoes .dot_default').length) {
            $('.women_shoes .dot_default').eq(0).addClass('dot_default_show').siblings().removeClass('dot_default_show');
        } else {
            $('.women_shoes .dot_default').eq($num).addClass('dot_default_show').siblings().removeClass('dot_default_show');
        }
        $('.women_shoes .mslide_banners').stop().animate({ left: -$num * $liwidth });

    }

    //搜索框悬浮效果
    function search_xh() {
        $box = $('.header_wrap_box');
        $top2 = $('.content_top').offset().top;
        console.log('$top2:' + $top2);
        $(window).on('scroll', function() {
            $top = $(window).scrollTop();
            if ($top >= $top2) {
                $box.css({
                    position: 'fixed',
                    left: '0px',
                    top: '0px',
                    zIndex: 9999
                })
            } else {
                $box.css({
                    position: 'absolute',
                    left: '0px',
                    top: '50px',
                    zIndex: 99
                })
            }
        })
    }


    return {
        init: function() {


            search_render();

            women_dress_render();
            // lunbo($('.women_shoes .mslide_banner'), $('.women_shoes .mslide_dot_box'));
            search_xh();
        }

    }
})