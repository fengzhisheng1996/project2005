! function() {
    class Detail {
        constructor() {
            this.sid = location.search.split('=')[1];
            this.xpic = document.querySelector('#xpic');
            this.xt = document.querySelector('#xt');
            this.xf = document.querySelector('#xf');
            this.df = document.querySelector('#df');
            this.dt = document.querySelector('#dt');
            this.bili = this.dt.offsetWidth / this.df.offsetWidth;
        }
        init() {
                this.render();
                this.cart_add();
                this.scale_pic();
                this.piclist_on();
                // console.log(this.xpic, this.xpic);
                // console.log(this.xpic.offsetWidth, this.xpic.offsetHeight);
                // console.log(this.xpic.offsetLeft, this.xpic.offsetTop);
                // console.log(this.xpic.getBoundingClientRect().left, this.xpic.getBoundingClientRect().top);
            }
            //渲染数据
        render() {
            $ajax({
                method: 'post',
                url: 'http://localhost/js2005/lll/cart/php/detail.php',
                data: {
                    sid: this.sid
                }
            }).then((data) => {
                // console.log(data);
                // console.log(JSON.parse(data)[0]);
                let value = JSON.parse(data)[0];
                let pic_list = value.piclisturl.split(',');
                let str_pic = '';
                $('#xt').src = value.url;
                $('#dt').src = value.url;
                $('.p_title a').innerHTML = value.title;
                $('.p_pice i').innerHTML = value.price;

                for (let i = 0; i < pic_list.length; i++) {
                    // console.log(pic_list[i]);
                    str_pic += `
                        <li><img src="${pic_list[i]}" alt=""></li>
                    `;
                }
                $('#list ul').innerHTML = str_pic;

            })
        }

        //将商品id和数量存入cookie
        cart_add() {
            let arrsid = [];
            let arrnum = [];
            $('.p_btn a').onclick = () => {
                let num2 = $('#cout').value;
                // console.log(cookies.get('sid'));
                try {
                    arrsid = cookies.get('cookiesid').split(',');
                    arrnum = cookies.get('cookienum').split(',');
                } catch {
                    arrsid = [];
                    arrnum = [];
                }
                if (arrsid.indexOf(this.sid) === -1) {
                    arrsid.push(this.sid);
                    cookies.set('cookiesid', arrsid, 7);
                    arrnum.push(num2);
                    cookies.set('cookienum', arrnum, 7);
                } else {
                    let index = arrsid.indexOf(this.sid);
                    arrnum[index] = parseInt(arrnum[index]) + parseInt(num2);
                    cookies.set('cookienum', arrnum, 7);
                }
            }
        }

        //放大镜效果
        scale_pic() {
            $('#xpic').onmouseover = () => {
                let bili2 = this.dt.offsetWidth / this.xt.offsetWidth;
                //显示大放和小放
                this.df.style.visibility = 'visible';
                this.xf.style.visibility = 'visible';
                // console.log(this.xt.offsetWidth);
                //设置小放的宽高
                this.xf.style.width = parseInt(this.xt.offsetWidth / this.bili) + 'px';
                this.xf.style.height = parseInt(this.xt.offsetHeight / this.bili) + 'px';
                document.onmousemove = (et) => {
                    let ev = et || window.event;
                    let left = parseInt(ev.clientX - this.xpic.getBoundingClientRect().left - this.xf.offsetWidth / 2);
                    let top = parseInt(ev.clientY - this.xpic.getBoundingClientRect().top - this.xf.offsetHeight / 2);
                    if (left <= 0) {
                        left = 0;
                    } else if (left >= this.xpic.offsetWidth - this.xf.offsetWidth) {
                        left = this.xpic.offsetWidth - this.xf.offsetWidth;
                    }
                    if (top <= 0) {
                        top = 0;
                    } else if (top >= this.xpic.offsetHeight - this.xf.offsetHeight) {
                        top = this.xpic.offsetHeight - this.xf.offsetHeight;
                    }
                    this.xf.style.left = left + 'px';
                    this.xf.style.top = top + 'px';
                    this.dt.style.left = -left * bili2 + 'px';
                    this.dt.style.top = -top * bili2 + 'px';
                }

            }
            $('#xpic').onmouseout = () => {
                this.df.style.visibility = 'hidden';
                this.xf.style.visibility = 'hidden';
            }
        }

        //图片切换
        piclist_on() {
            let num = 6;
            //图片切换 事件委托
            $('#list ul').onclick = (et) => {
                let ev = et || window.event;
                let element = ev.target || ev.srcElement;
                if (element.nodeName === 'IMG') {
                    console.log(element.src);
                    this.xt.src = element.src;
                    this.dt.src = element.src;
                }
            }

            //左右箭头
            $('#ulist .right').onclick = function() {
                let liwidth = $('#list li', true)[0].offsetWidth;
                // console.log(liwidth);
                if ($('#list li', true).length > num) {
                    num++;
                    $('#ulist .left').style.color = '#333';
                    $('#ulist .left').style.cursor = 'pointer';
                    if ($('#list li', true).length == num) {
                        $('#ulist .right').style.color = '#fff';
                        $('#ulist .right').style.cursor = 'default';
                    }
                    bufferMove($('#list ul'), { 'left': -(liwidth * (num - 6)) })
                }
            }
            $('#ulist .left').onclick = function() {
                let liwidth = $('#list li', true)[0].offsetWidth;
                // console.log(liwidth);
                if (num > 6) {
                    num--;
                    $('#ulist .right').style.color = '#333';
                    $('#ulist .right').style.cursor = 'pointer';
                    if (num == 6) {
                        $('#ulist .left').style.color = '#fff';
                        $('#ulist .left').style.cursor = 'default';
                    }
                    bufferMove($('#list ul'), { 'left': -(liwidth * (num - 6)) })
                }
            }
        }

    };

    new Detail().init();
}();