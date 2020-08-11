function $ajax(obj) {
    let promise = new Promise(function (resolve, reject) {
        let aj = new XMLHttpRequest();
        // 请求方式,默认get
        obj.method = obj.method || 'get';
        // 是否异步，默认是异步true
        if (obj.async === false || obj.async === 'false') {
            obj.async = false;
        } else {
            obj.async = true;
        }
        // 地址不能为空
        if (! obj.url) { // obj.eorr('地址不能为空');
            reject('地址不能为空');
        }
        // obj.data为真
        if (obj.data) {
            let arr = [];
            for (index in obj.data) {
                arr.push(index + '=' + obj.data[index]);
            }
            obj.data = arr.join('&');
        }
        // obj.data为真，传输了数据，且传输方式位get
        if (obj.data && obj.method === 'get') {
            obj.url += '?' + obj.data;
        }
        // console.log(obj.async);
        aj.open(obj.method, obj.url, obj.async);
        // obj.data为真，传输了数据，且传输方式位post
        if (obj.data && obj.method === 'post') {
            aj.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            aj.send(obj.data);
        } else {
            aj.send();
        }
        // 异步执行代码
        if (obj.async) {
            aj.onreadystatechange = function () {
                if (aj.readyState === 4) {
                    if (aj.status === 200) { // obj.datatype为json时则返回json数据
                        if (obj.datatype === 'json') {
                            aj.responseText = JSON.stringify(aj.responseText)
                        };
                        resolve(aj.responseText);
                        // if (obj.success && typeof obj.success === 'function') {
                        //     obj.success(aj.responseText);
                        // }
                    } else {
                        reject('地址错误，请重新输入');
                        // if (obj.eorr && typeof obj.eorr === 'function') {
                        //     obj.eorr('地址错误，请重新输入');
                        // }
                    }
                }
            }
        } else { // 同步执行代码
            if (aj.status === 200) { // obj.datatype为json时则返回json数据
                if (obj.datatype === 'json') {
                    aj.responseText = JSON.stringify(aj.responseText)
                };
                resolve(aj.responseText);
                // if (obj.success && typeof obj.success === 'function') {
                //     obj.success(aj.responseText);
                // }
            } else {
                reject('地址错误，请重新输入');
                // if (obj.eorr && typeof obj.eorr === 'function') {
                //     obj.eorr('地址错误，请重新输入');
                // }
            }
        }
    });
    return promise;
}
