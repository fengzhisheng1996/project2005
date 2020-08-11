! function() {
    let list = document.querySelector('.list ul');
    $ajax({
        type: 'post',
        url: 'http://localhost/js2005/lll/cart/php/list.php',
    }).then(function(data) {
        console.log(data);
        let strHtml = '';
        for (let value of JSON.parse(data)) {
            console.log(value);
            strHtml += `
                <li sid=${value.sid}>
                    <img src="${value.url}" alt="">
                    <h4>${value.title}</h4>
                    <p>
                        <span>价格:￥<em>${value.price}</em></span>
                        <span>销量:<em>${value.sailnumber}</em></span>
                    </p>
                </li>
            `;
        }
        list.innerHTML = strHtml;
    })
    list.onclick = function(et) {
        let ev = et || window.event;
        let elen = ev.target || ev.srcElement;
        if (elen.nodeName === 'IMG' || elen.nodeName === 'H4') {
            let sid = elen.parentNode.getAttribute('sid');
            location.href = 'http://localhost/js2005/project/src/html/detail.html?sid=' + sid;
        }
    }
}();