define(['jquery', 'jquerycookie', 'jquerylazyload', 'public', 'jqueryPagination'], function($) {

    //鼠标划入小图时效果
    function small_img_click() {
        // console.log('111');
        // console.log($('.small_img .list li').length);
        // console.log($('.small_img .list li'));
        $('.small_img .list li').on('mouseover', function() {
            // console.log('222');
            const $index = $(this).index();
            $('.small_img .list li').eq($index).css('opacity', '1').siblings().css('opacity', '0.5');
            $('.big_img img').attr('src', $('.small_img .list img').eq($index).attr('src'));
            //显示i标签
            $('.small_img .list i').each(function(index, element) {
                if (index == $index) {
                    $(element).css('display', 'block');
                } else {
                    $(element).css('display', 'none');
                }
            });

        });
    };

    //小图区域左右箭头的显示点击
    function leftRightBtnClick() {
        const $liwidth = $('.small_img .list li').outerWidth();
        const $num1 = Math.ceil($('.small_img .list ul').outerWidth() / $('.small_img .list').outerWidth());
        let $num2 = 0;
        // console.log($listwidth);

        leftRightBtn($num1, $num2);
        //右箭头点击效果
        $('.right_btn').on('click', function() {
            $num2++;
            $('.small_img .list ul').css('left', -$num2 * (+$liwidth + 10) * 5);
            leftRightBtn($num1, $num2);
        });
        //左箭头点击效果
        $('.left_btn').on('click', function() {
            $num2--;
            $('.small_img .list ul').css('left', -$num2 * (+$liwidth + 10));
            leftRightBtn($num1, $num2);
        });

    }
    //左右箭头的显示
    function leftRightBtn($num1, $num2) {
        const $ulleft = parseInt($('.small_img .list ul').css('left'));
        if ($num1 > $num2 + 1) {
            $('.right_btn').css('display', 'block');
        } else {
            $('.right_btn').css('display', 'none');
        }
        if ($ulleft != 0) {
            $('.left_btn').css('display', 'block');
        } else {
            $('.left_btn').css('display', 'none');
        }
    }

    //款式、尺寸选择
    function style_size_click() {
        // console.log('111');
        $('.style_list li').on('click', function() {
            console.log('style click');
            $(this).toggleClass('active').siblings().removeClass('active');
        });
        $('.size_list li').on('click', function() {
            console.log('size click');
            $(this).toggleClass('active').siblings().removeClass('active');
        });

    }

    //数量输入及加减效果
    function goods_num_change() {
        // console.log($num_stock);
        let $num1 = $('.num_input').val();
        //数量加
        $('.num_add').on('click', function() {
            $num1 = $('.num_input').val();
            $('.num_input').val(++$num1);
            num_reduce_show($num1);
            goods_stock_tip_show($num1);
        });
        //数量减
        num_reduce_show($num1);
        $('.num_reduce').on('click', function() {
            $num1 = $('.num_input').val();
            $num1--;
            if ($num1 <= 1) {
                $num1 = 1;
                $('.num_reduce').css('opacity', '0.3');
            } else {
                $('.num_reduce').css('opacity', '1');
            };
            $('.num_input').val($num1);
            goods_stock_tip_show($num1);
        });
        //数量输入
        $('.num_input').on('blur', function() {
            $num1 = $('.num_input').val();
            if (isNaN($num1) || $num1 == 0 || $num1 == '' || $num1 == ' ') {
                $num1 = 1;
            }
            $('.num_input').val($num1);
            num_reduce_show($num1);
            goods_stock_tip_show($num1);
        });
    }
    //判断数量减是否显示
    function num_reduce_show($num1) {
        if ($num1 <= 1) {
            $num1 = 1;
            $('.num_reduce').css('opacity', '0.3');
        } else {
            $('.num_reduce').css('opacity', '1');
        };
    }
    //判断数量是否超过库存量
    function goods_stock_tip_show($num1) {
        const $num_stock = +$('.goods_stock b').html();
        // $num1 = $('.num_input').val();
        // console.log('456');
        if ($num1 > $num_stock) {
            $('.goods_stock_tip').css('display', 'block');
        } else {
            $('.goods_stock_tip').css('display', 'none');
        }
    }

    //立即购买点击效果
    function buy_btn_click($sid) {
        let $style_active = $('.style_list .active').html();
        let $size_active = $('.size_list .active').html();
        //立即购买点击效果
        $('.buy_btn').on('click', function() {
            $style_active = $('.style_list .active').html();
            $size_active = $('.size_list .active').html();
            if (!$size_active || !$style_active) {
                $('.pannel_title').css('display', 'block');
                $('.pannel_action').css('display', 'block');
                $('.goods_buy').css('display', 'none');
                $('.goods_sku').addClass('goods_pannel');
            }
        });
        //加入购物车点击效果
        $('.buy_cart').on('click', function() {
            $style_active = $('.style_list .active').html();
            $size_active = $('.size_list .active').html();
            if (!$size_active || !$style_active) {
                $('.pannel_title').css('display', 'block');
                $('.pannel_action').css('display', 'block');
                $('.goods_buy').css('display', 'none');
                $('.goods_sku').addClass('goods_pannel');
            } else {
                buy_cart_click($sid)
            }
        });
        //关闭
        $('.pannel_close').on('click', function() {
            $('.pannel_title').css('display', 'none');
            $('.pannel_action').css('display', 'none');
            $('.goods_buy').css('display', 'block');
            $('.goods_sku').removeClass('goods_pannel');
        });



        //确认加入购物车
        $('.pannel_ok').on('click', function() {
            buy_cart_click($sid);
            $('.pannel_title').css('display', 'none');
            $('.pannel_action').css('display', 'none');
            $('.goods_buy').css('display', 'block');
            $('.goods_sku').removeClass('goods_pannel');
        });

        //关闭加入购物车弹出的窗口
        $('.module_cart_box .close_btn').on('click', function() {
            $('.module_cart_box').css('display', 'none');
        });
    }
    // 加入购物车
    function buy_cart_click($sid) {
        let $arrsid = [];
        let $arrnum = [];
        // console.log($.cookie('sidStyleSize'));
        // console.log($.cookie('goodnum'));
        if ($.cookie('sidStyleSize') && $.cookie('goodnum')) {
            $arrsid = $.cookie('sidStyleSize').split(',');
            $arrnum = $.cookie('goodnum').split(',');
            // console.log($.cookie('sidStyleSize'));
            // console.log($.cookie('goodnum'));
        } else {
            $arrsid = [];
            $arrnum = [];
        }
        $style_active = $('.style_list .active').html();
        $size_active = $('.size_list .active').html();
        $goods_num2 = $('.goods_num input').val();
        $sid_style_size = $sid + ':' + $style_active + ':' + $size_active;
        if ($size_active && $style_active) {
            if ($arrsid.indexOf($sid_style_size) === -1) {
                $arrsid.push($sid_style_size);
                $.cookie('sidStyleSize', $arrsid, { expires: 7, path: '/' });
                $arrnum.push($goods_num2);
                $.cookie('goodnum', $arrnum, { expires: 7, path: '/' });
            } else {
                let index = $arrsid.indexOf($sid_style_size);
                let count = parseInt($arrnum[index]) + parseInt($goods_num2);
                //一起存入cookie
                $arrnum[index] = count;
                $.cookie('goodnum', $arrnum, { expires: 7, path: '/' });
            }
        }
        $('.module_cart_box').css('display', 'block');
        // $('.size_list .active').removeClass('active');
    }




    return {
        init: function() {
            const $sid = window.location.search.split('=')[1];
            // console.log($sid);
            $.ajax({
                method: 'post',
                url: 'http://10.31.152.18/js2005/project/php/detail.php',
                datatype: 'json',
                data: {
                    sid: $sid
                }
            }).done(function(data) {
                let $data = JSON.parse(data);
                let $num1 = ranNum(1, 7);
                console.log($data);
                console.log($data[0]);
                if ($data[0]) {
                    console.log('333');
                    $('.big_img img').attr({
                        'data-original': $data[0].url,
                        'alt': $data[0].title
                    });
                    let strHtml = '';
                    for (let value of $data[0].piclisturl.split(',')) {
                        // console.log(value);
                        strHtml += ` <li>
                            <img class="lazy" data-original="${value}" alt="">
                            <i></i>
                        </li>`;
                    }
                    $('.small_img .list ul').html(strHtml);
                    $('.goods_title .title').html($data[0].title);
                    //原价
                    $('.property_box .price').html((Number($data[0].price) + $num1 * 10).toFixed(2));
                    //促销价
                    $('.property_cont .price').html($data[0].price);
                    //评价：
                    $('.property_cont .price').html($data[0].sailnumber);
                } else {
                    console.log('666');
                    if (!(window.confirm('未找到这条数据,你还要留在这个页面吗?'))) {
                        window.location.href = 'list.html';
                    }
                }

                //图片懒加载
                $(function() { //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式 谈入
                    });
                });
                small_img_click();
                leftRightBtnClick();
                style_size_click();
                goods_num_change();
                buy_btn_click($sid);
            });

        }
    }
})