define(['jquery', 'jquerycookie', 'jquerylazyload', 'public'], function($) {

    //数据渲染
    function showlist_render(sidStyleSize, num) {
        $.ajax({
            method: 'post',
            url: 'http://10.31.152.18/js2005/project/php/indexdata.php',
            dataType: 'json'
        }).done(function(data) {
            // let $data = JSON.parse(data);
            let sid = sidStyleSize.split(':')[0];
            let style = sidStyleSize.split(':')[1];
            let size = sidStyleSize.split(':')[2];
            let $num1 = ranNum(1, 7);
            $.each(data, function(index, value) {
                if (sid == value.sid) {
                    let $clonebox = $('.new_cart_conent_item:hidden').clone(true, true); //克隆隐藏元素
                    $clonebox.find('.cart_goods_img').find('img:first').attr('src', value.url);
                    $clonebox.find('.cart_goods_img').find('img:first').attr('sid', value.sid);
                    $clonebox.find('.cart_goods_t').html(value.title);
                    $clonebox.find('.cart_goods_t').attr('title', value.title);
                    $clonebox.find('.sku').find('p:first b').html(style);
                    $clonebox.find('.sku').find('p:last b').html(size);
                    $clonebox.find('.cart_lightgray').html((Number(value.price) + $num1 * 10).toFixed(2));
                    $clonebox.find('.cart_data_sprice').html(value.price);
                    $clonebox.find('.cart_num').find('input').val(num);
                    //计算单个商品的价格
                    $clonebox.find('.total').find('.item_sum').html((value.price * num).toFixed(2));
                    $clonebox.css('display', 'block'); //显示克隆的盒子
                    $('.new_cart_conent').append($clonebox); //追加
                }
            });
            calcprice(); //计算总价
        });
    };
    //计算总价
    function calcprice() {
        let $sum = 0;
        let $cont = 0;
        $('.new_cart_conent_item:visible').each(function(index, element) {
            if ($(element).find('.item_check').prop('checked')) {
                $sum += parseInt($(element).find('.cart_num_input').val());
                $cont += parseFloat($(element).find('.total .item_sum').html());
                // console.log($(element).find('.item_check').prop('checked'));
            }
        });
        //赋值
        // console.log($sum, $cont);
        $('.cart_paybar_info .goodsNum').html($sum);
        $('.cart_paybar_info_cost').html('¥' + $cont.toFixed(2));
    };
    //计算每个商品的总价
    function calcsingleprice(obj) { //obj元素对象
        let $dj = parseFloat($(obj).parents('.new_cart_conent_item').find('.cart_data_sprice').html());
        let $num = parseInt($(obj).parents('.new_cart_conent_item').find('.cart_num_input').val());
        return ($dj * $num).toFixed(2);
    };

    //获取cookie
    function getcookie() {
        let $arrsid = [];
        let $arrnum = [];
        if ($.cookie('sidStyleSize') && $.cookie('goodnum')) {
            $arrsid = $.cookie('sidStyleSize').split(',');
            $arrnum = $.cookie('goodnum').split(',');
        }
        return {
            arrsid: $arrsid,
            arrnum: $arrnum
        }
    };
    //设置cookie
    function setcookie(obj) {
        let arrsid = getcookie().arrsid;
        let arrnum = getcookie().arrnum;
        let $sid = obj.parents('.new_cart_conent_item').find('img').attr('sid');
        let $style = obj.parents('.new_cart_conent_item').find('.sku p:first b').html();
        let $size = obj.parents('.new_cart_conent_item').find('.sku p:last b').html();
        $.each(arrsid, function(index, value) {
            if ($sid == value.split(':')[0] && $style == value.split(':')[1] && $size == value.split(':')[2]) {
                arrnum[index] = obj.parents('.new_cart_conent_item').find('.cart_num_input').val();
            }
        })
        $.cookie('goodnum', arrnum, { expires: 7, path: '/' })
    };
    //6.删除cookie
    function delcookie(sidStyleSize) { //sid:当前删除的sid = 5  arrsid:存放sid的数组[3,5,6,7]
        let $index = -1; //删除的索引位置
        let arrsid = getcookie().arrsid;
        let arrsum = getcookie().arrnum;
        $.each(arrsid, function(index, value) {
            if (value == sidStyleSize) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrsum.splice($index, 1);
        $.cookie('sidStyleSize', arrsid, { expires: 7, path: '/' });
        $.cookie('goodnum', arrsum, { expires: 7, path: '/' });
    };

    return {
        init: function() {

            //获取cookie渲染数据
            if ($.cookie('sidStyleSize')) {
                let $arrsid2 = $.cookie('sidStyleSize').split(',');
                let $arrnum2 = $.cookie('goodnum').split(',');
                // console.log($arrsid2);
                // console.log($arrnum2);
                $('.cart_page_wrap').show();
                $('.cart_empty_page').hide();
                $.each($arrsid2, function(index, value) {
                    showlist_render(value, $arrnum2[index]);
                    // console.log(value, $arrnum2[index]);
                })
            } else {
                $('.cart_page_wrap').hide();
                $('.cart_empty_page').show();
            }

            //全选
            $('.s_all').on('click', function() {
                $('.new_cart_conent_item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.s_all').prop('checked', $(this).prop('checked'));
                calcprice();
            });

            //列表的复选框添加事件 - 事件委托
            let $inputs = $('.new_cart_conent_item:visible').find(':checkbox'); //获取渲染的复选框
            $('.item_check').on('click', $inputs, function() {
                // console.log('222');
                // console.log($('.new_cart_conent_item:visible').find(':checkbox').length);
                // console.log($('.new_cart_conent_item:visible').find('input:checked').length);
                if ($('.new_cart_conent_item:visible').find(':checkbox').length == $('.new_cart_conent_item:visible').find('input:checked').length) {
                    $('.s_all').prop('checked', true);
                } else {
                    $('.s_all').prop('checked', false);
                }
                calcprice(); //计算总价
            });

            //数量加
            $('.cart_num_add').on('click', function() {
                let $num1 = $(this).parents('.new_cart_conent_item').find('.cart_num_input').val();
                $(this).parents('.new_cart_conent_item').find('.cart_num_input').val(++$num1);
                $(this).parents('.new_cart_conent_item').find('.total .item_sum').html(calcsingleprice($(this)));
                calcprice(); //计算总价
                setcookie($(this));
            });
            //数量减
            $('.cart_num_reduce').on('click', function() {
                console.log('111');
                let $num1 = $(this).parents('.new_cart_conent_item').find('.cart_num_input').val();
                $num1--;
                if ($num1 <= 1) {
                    $num1 = 1;
                }
                console.log($num1);
                $(this).parents('.new_cart_conent_item').find('.cart_num_input').val($num1);
                $(this).parents('.new_cart_conent_item').find('.total .item_sum').html(calcsingleprice($(this)));
                calcprice(); //计算总价
                setcookie($(this));
            });
            //数量输入
            $('.cart_num_input').on('input', function() {
                let $reg = /^\d+$/g; //只能输入数字
                let $value = $(this).val(); //获取数量
                if (!$reg.test($value)) { //不是数字，赋值1
                    $(this).val(1);
                }
                $(this).parents('.new_cart_conent_item').find('.total .item_sum').html(calcsingleprice($(this)));
                calcprice(); //计算总价
                setcookie($(this));
            });
            //商品后删除操作
            $('.edit .delete').on('click', function() {
                // let arrsid = getcookie().arrsid;
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.new_cart_conent_item').remove(); //移除整块列表
                    let $sid = $(this).parents('.new_cart_conent_item').find('img').attr('sid');
                    let $style = $(this).parents('.new_cart_conent_item').find('.sku p:first b').html();
                    let $size = $(this).parents('.new_cart_conent_item').find('.sku p:last b').html();
                    let $sidStyleSize = $sid + ':' + $style + ':' + $size;
                    delcookie($sidStyleSize);
                    calcprice(); //计算总价
                }
            })

            //删除
            $('#cartRemoveChecked').on('click', function() {
                if (window.confirm('你确定要删除所有选中的吗?')) {
                    $('.new_cart_conent_item:visible').each(function() {
                        if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                            $(this).remove(); //逐个移除
                            let $sid = $(this).find('img').attr('sid');
                            let $style = $(this).find('.sku p:first b').html();
                            let $size = $(this).find('.sku p:last b').html();
                            let $sidStyleSize = $sid + ':' + $style + ':' + $size;
                            delcookie($sidStyleSize); //设置cookie
                        }
                    });
                    calcprice(); //计算总价
                }
            });


            //去付款框悬浮
            $(window).on('scroll', function() {
                let $top = $(window).scrollTop();
                let $itemtop1 = $('.cart_table').offset().top;
                let $itemheight1 = $('.cart_table').outerHeight();
                let $clientheight = document.documentElement.clientHeight;
                if ($top < $itemtop1 + $itemheight1 - $clientheight) {
                    $('.cart_paybar').css({
                        position: 'fixed',
                        bottom: '0px',
                        zIndex: '8000'
                    })
                } else {
                    $('.cart_paybar').css({
                        position: 'relative',
                    })
                }
                // console.log('top:' + $itemtop1);
                // console.log('height:' + $itemheight1);
                // console.log('clientheight:' + $clientheight);
            });

        }
    };
})