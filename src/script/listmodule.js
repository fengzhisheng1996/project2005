define(['jquery', 'jquerycookie', 'jquerylazyload', 'public', 'jqueryPagination'], function($) {

    return {
        init: function() {
            //排序的初始值
            let array_default = []; //排序前的数组，默认的
            let array = []; //排序中的数组
            let prev = null; //当前的li里面的价格。
            let next = null; //下一个li里面的价格。

            //渲染数据
            $.ajax({
                method: 'post',
                url: 'http://10.31.152.18/js2005/project/php/list.php'
            }).done(function(data) {
                let $data = JSON.parse(data);
                console.log('渲染数据量:' + $data.length);
                //清空list中之前的内容
                $('.goods_list_mod').html('');
                let $strhtml = '';
                for (let value of $data) {
                    // console.log(value);
                    let $num1 = ranNum(1, 7);
                    $strhtml += `
                    <div class="goods_item">
                        <a class="likeLink " href="list.html" target="_blank">找相似</a>
                        <a class="pagani_log_link" href="detail.html?sid=${value.sid}" target="_blank"><img class="pic_css1 lazy" data-original="${value.url}" alt=""></a>
                        <a class="goods_info_container" href="detail.html?sid=${value.sid}" target="_blank">
                            <p class="title">${value.title}</p>
                            <div class="goods_info clearfix">
                                <b class="price_info left">¥${value.price}</b>
                                <p class="org_price left">¥<del>${(Number(value.price) + $num1*10).toFixed(2)}</del></p>
                                <span class="fav_num right">
                                    <img src="https://s18.mogucdn.com/p2/160908/upload_27g4f1ch6akie83hacb676j622b9l_32x30.png" alt="">
                                    599
                                </span>
                            </div>
                        </a>
                    </div>`;
                };
                $('.goods_list_mod').html($strhtml);

                //图片懒加载
                $(function() { //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式 谈入
                    });
                });
                //先清空数组原来的值。
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面默认渲染的li元素加载到两个数组中
                $('.goods_list_mod .goods_item').each(function(index, element) { //index:下标索引 element:元素对象 $(this):元素对象
                    array[index] = $(this); //赋值给数组
                    array_default[index] = $(this); //赋值给数组
                });
            });

            //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
            $('.page').pagination({
                pageCount: 4, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                // coping: true, //是否开启首页和尾页，布尔值。
                // homePage: '首页',
                // endPage: '尾页',
                callback: function(api) { //api:对象，包含分页信息。
                    //点击分页页码将页码传给后端。
                    //获取的页码给后端
                    console.log(api.getCurrent());
                    $.ajax({
                        url: 'http://10.31.152.18/js2005/project/php/list.php',
                        data: { //将分页对象返回的页码传输给后端
                            page: api.getCurrent()
                        },
                        dataType: 'json'
                    }).done(function(data) { //根据页码重新获取接口数据，进行渲染。
                        let $strhtml = '';
                        let $num1 = ranNum(1, 7);
                        $.each(data, function(index, value) {
                            $strhtml += `
                            <div class="goods_item">
                            <a class="likeLink " href="list.html" target="_blank">找相似</a>
                            <a class="pagani_log_link" href="detail.html?sid=${value.sid}" target="_blank"><img class="pic_css1 lazy" data-original="${value.url}" alt=""></a>
                            <a class="goods_info_container" href="detail.html?sid=${value.sid}" target="_blank">
                                <p class="title">${value.title}</p>
                                <div class="goods_info clearfix">
                                    <b class="price_info left">¥${value.price}</b>
                                    <p class="org_price left">¥<del>${(Number(value.price) + $num1*10).toFixed(2)}</del></p>
                                    <span class="fav_num right">
                                        <img src="https://s18.mogucdn.com/p2/160908/upload_27g4f1ch6akie83hacb676j622b9l_32x30.png" alt="">
                                        599
                                    </span>
                                </div>
                            </a>
                        </div>
                    `;
                        });
                        // $strhtml += '</ul>';
                        $('.goods_list_mod').html($strhtml); //新的数据覆盖前面默认的数据。
                        //分页结束了。
                        //图片懒加载
                        $(function() { //和拼接的元素放在一起。
                            $("img.lazy").lazyload({
                                effect: "fadeIn" //图片显示方式 谈入
                            });
                        });

                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;
                        //将页面默认渲染的li元素加载到两个数组中
                        $('.goods_list_mod .goods_item').each(function(index, element) { //index:下标索引 element:元素对象 $(this):元素对象
                            array[index] = $(this); //赋值给数组
                            array_default[index] = $(this); //赋值给数组

                        });
                    })
                }
            });


            $('.sort_container a').eq(3).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price_info').html().substring(1)); //当前li的价格
                        next = parseFloat(array[j + 1].find('.price_info').html().substring(1)); //下一个li的价格
                        //通过价格的判断，改变的是li的位置。
                        //如果第一个li里面的价格>第二个li的价格。 交换的是li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                //清空原来的列表，将排序后的数据添加上去。
                //empty() : 删除匹配的元素集合中所有的子节点。
                $('.goods_list_mod').empty(); //清空原来的列表
                $.each(array, function(index, value) { //重新渲染，追加
                    $('.goods_list_mod').append(value);
                });
            });
            $('.sort_container a').eq(4).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price_info').html().substring(1));
                        next = parseFloat(array[j + 1].find('.price_info').html().substring(1));
                        //通过价格的判断，改变的是li的位置。
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                //清空原来的列表，将排序后的数据添加上去。
                //empty() : 删除匹配的元素集合中所有的子节点。
                $('.goods_list_mod').empty(); //清空原来的列表
                $.each(array, function(index, value) {
                    $('.goods_list_mod').append(value);
                });
            })

        }
    };

});