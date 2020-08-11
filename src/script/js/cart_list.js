! function() {
    class CartList {
        constructor() {}
        init() {
            this.render()
        }
        render() {
            $ajax({
                type: 'post',
                url: 'http://localhost/js2005/lll/cart/php/list.php',
            }).then(function(data) {
                let strHtml = '';
                let arrsid = cookies.get('cookiesid').split(',');
                let arrnum = cookies.get('cookienum').split(',');
                // console.log(arrsid);
                // console.log(arrnum);
                for (let value of JSON.parse(data)) {
                    for (let i = 0; i < arrsid.length; i++) {
                        if (value.sid == arrsid[i]) {
                            strHtml += `
                            <li>
                                <p class="checkbox"><input type="checkbox"></p>
                                <p class="pic"><img src="${value.url}" alt=""></p>
                                <p class="title">${value.title}</p>
                                <p class="pice">${value.price}</p>
                                <p class="cout">${arrnum[i]}</p>
                                <p class="cout_pice">${(Number(value.price)*Number(arrnum[i])).toFixed(2)}</p>
                                <p class="operation"></p>
                            </li>
                            `;
                        }
                    }
                }
                $('#list ul').innerHTML = strHtml;
            })
        }
    }
    new CartList().init();
}();