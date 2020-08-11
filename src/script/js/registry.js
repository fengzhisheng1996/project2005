// 1.表单验证
const oInputs = document.querySelectorAll('p input');
const oSpan = document.querySelectorAll('span');
const oEm = document.querySelectorAll('em');
const yzInput = document.querySelector('.yz input');
const yzSpan = document.querySelector('.yz div');
const btn = document.querySelector('.btn');
let usernum = 0;
let passnum = 0;
let passnum2 = 0;
let telnum = 0;
let emailnum = 0;
let yznum = 0;

// 用户名验证
oInputs[0].onfocus = function() {
    oSpan[0].innerHTML = '请输入7位中文或者14位英文字母以内的名称';
    oSpan[0].style.color = '#666';
}
oInputs[0].onblur = function() {
    let reguser = new RegExp('[\u4e00-\u9fa5]', 'g');
    if (this.value != '') {
        let strlen = this.value.replace(reguser, '**');
        // console.log(strlen.length);
        if (strlen.length <= 14) {
            // 验证用户名是否已存在
            // let aj = new XMLHttpRequest();
            // aj.open('post', 'http://localhost/js2005/project/php/registry.php', true);
            // aj.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            // aj.send('name=' + this.value);
            // aj.onreadystatechange = function() {
            //     if (aj.readyState === 4) {
            //         if (!aj.responseText) {
            //             oSpan[0].innerHTML = '';
            //             oEm[0].style.display = 'block';
            //             usernum = 1;
            //         } else {
            //             // console.log('11');
            //             oSpan[0].innerHTML = '此用户名已存在';
            //             oSpan[0].style.color = 'red';
            //             oEm[0].style.display = 'none';
            //         }
            //     }
            // }
            $ajax({
                method: 'post',
                url: 'http://localhost/js2005/project/php/registry.php',
                datatype: 'json',
                data: { name: this.value }
            }).then(function(data) {
                console.log(data);
                if (!data) {
                    oSpan[0].innerHTML = '';
                    oEm[0].style.display = 'block';
                    usernum = 1;
                } else {
                    oSpan[0].innerHTML = '此用户名已存在';
                    oSpan[0].style.color = 'red';
                    oEm[0].style.display = 'none';
                }
            })
        } else {
            oSpan[0].innerHTML = '请输入7位中文或者14位英文字母以内的名称';
            oSpan[0].style.color = 'red';
            oEm[0].style.display = 'none';
            usernum = 0;
        }
    } else {
        oSpan[0].innerHTML = '';
        oSpan[0].style.color = '#666';
        oEm[0].style.display = 'none';
        usernum = 0;
    }
}

//密码验证
oInputs[1].onfocus = function() {
    if (this.value != '') {
        if (this.value.length >= 6 && this.value.length <= 12) {
            oInputs[1].oninput = function() {
                var numreg = /\d/g;
                var upstrreg = /[A-Z]/g;
                var lestrreg = /[a-z]/g;
                var ortherreg = /[\_\W]/g;
                var numflag = 0;
                if (numreg.test(this.value)) {
                    numflag++;
                }
                if (upstrreg.test(this.value)) {
                    numflag++;
                }
                if (lestrreg.test(this.value)) {
                    numflag++;
                }
                if (ortherreg.test(this.value)) {
                    numflag++;
                }
                if (numflag <= 1) {
                    oSpan[1].innerHTML = '弱：有被盗风险,建议使用字母、数字和符号两种及以上组合';
                    oSpan[1].style.color = 'red';
                    oEm[1].style.display = 'none';
                } else if (numflag > 1 && numflag <= 3) {
                    oSpan[1].innerHTML = '中：安全强度适中，可以使用三种以上的组合来提高安全强度';
                    oSpan[1].style.color = 'orange';
                } else if (numflag === 4) {
                    oSpan[1].innerHTML = '强：你的密码很安全';
                    oSpan[1].style.color = 'green';
                }
                numflag = 0;
            }
        } else if (this.value.length < 6) {
            oSpan[1].innerHTML = '密码太短请重新输入';
            oSpan[1].style.color = 'red';
        } else {
            oSpan[1].innerHTML = '请输入正确的密码';
            oSpan[1].style.color = 'red';
        }
    } else {
        oSpan[1].innerHTML = '请输入6-12位英文字母数字特殊字符';
        oSpan[1].style.color = '#666';
    }

}
oInputs[1].onblur = function() {
    var reguser = new RegExp('[\u4e00-\u9fa5]', 'g');
    if (this.value != '') {
        if (this.value.length >= 6 && this.value.length <= 12) {
            var numreg = /\d/g;
            var upstrreg = /[A-Z]/g;
            var lestrreg = /[a-z]/g;
            var ortherreg = /[\_\W]/g;
            var numflag = 0;
            if (numreg.test(this.value)) {
                numflag++;
            }
            if (upstrreg.test(this.value)) {
                numflag++;
            }
            if (lestrreg.test(this.value)) {
                numflag++;
            }
            if (ortherreg.test(this.value)) {
                numflag++;
            }
            if (numflag > 1) {
                oSpan[1].innerHTML = '';
                oEm[1].style.display = 'block';
                passnum = 1;
            } else {
                oSpan[1].innerHTML = '密码强度弱';
                oSpan[1].style.color = 'red';
                oEm[1].style.display = 'none';
                passnum = 0;
            }
            numflag = 0;
        } else if (this.value.length < 6) {
            oSpan[1].innerHTML = '密码太短请重新输入';
            oSpan[1].style.color = 'red';
            oEm[1].style.display = 'none';
            passnum = 0;
        } else {
            oSpan[1].innerHTML = '请输入正确的密码';
            oSpan[1].style.color = 'red';
            oEm[1].style.display = 'none';
            passnum = 0;
        }
    } else {
        oSpan[1].innerHTML = '';
        oSpan[1].style.color = '#666';
        oEm[1].style.display = 'none';
        passnum = 0;
    }
    numflag = 0;
}

//再次输入密码
oInputs[2].onfocus = function() {
    oSpan[2].innerHTML = '请再次输入密码';
}
oInputs[2].onblur = function() {
    // let passvalue = oInputs[1].value;
    if (oInputs[2].value != '') {
        if (oInputs[2].value === oInputs[1].value) {
            oSpan[2].innerHTML = '';
            oSpan[2].style.color = '#666';
            oEm[2].style.display = 'block';
            passnum2 = 1;
        } else {
            oSpan[2].innerHTML = '请输入正确的密码';
            oSpan[2].style.color = '#666';
            oEm[2].style.display = 'none';
            passnum2 = 0;
        }
    } else {
        oSpan[2].innerHTML = '';
        oSpan[2].style.color = '#666';
        oEm[2].style.display = 'none';
        passnum2 = 0;
    }

}

//手机号
oInputs[3].onfocus = function() {
    oSpan[3].innerHTML = '请输入11位的手机号码';
    oSpan[3].style.color = '#666';
}
oInputs[3].onblur = function() {
    var regtel = /^1[3-9][0-9]{9}$/g;
    if (this.value != '') {
        if (regtel.test(this.value)) {
            oSpan[3].innerHTML = '';
            oEm[3].style.display = 'block';
            telnum = 1;
        } else {
            oSpan[3].innerHTML = '请输入正确的的手机号码';
            oSpan[3].style.color = 'red';
            oEm[3].style.display = 'none';
            telnum = 0;
        }
    } else {
        oSpan[3].innerHTML = '';
        oSpan[3].style.color = '#666';
        oEm[3].style.display = 'none';
        telnum = 0;
    }
}

//电子邮箱
oInputs[4].onfocus = function() {
    oSpan[4].innerHTML = '请输入电子邮箱';
    oSpan[4].style.color = '#666';
}
oInputs[4].onblur = function() {
    var regtel = /^\w+@\w+\.+\w+$/g;
    if (this.value != '') {
        if (regtel.test(this.value)) {
            oSpan[4].innerHTML = '';
            oEm[4].style.display = 'block';
            emailnum = 1;
        } else {
            oSpan[4].innerHTML = '请输入正确的的电子邮箱';
            oSpan[4].style.color = 'red';
            oEm[4].style.display = 'none';
            emailnum = 0;
        }
    } else {
        oSpan[4].innerHTML = '';
        oSpan[4].style.color = '#666';
        oEm[4].style.display = 'none';
        emailnum = 0;
    }
}

//验证码
yzSpan.onclick = function() {
    let arr = [];
    let str = '';
    for (let i = 48; i <= 57; i++) {
        arr.push(String.fromCharCode(i))
    };
    for (let i = 65; i <= 90; i++) {
        arr.push(String.fromCharCode(i))
    };
    for (let i = 97; i <= 122; i++) {
        arr.push(String.fromCharCode(i))
    };
    // console.log(arr);
    for (let i = 0; i < 4; i++) {
        str += arr[Math.round(Math.random() * arr.length)]
    }
    yzSpan.innerHTML = str;
}
yzInput.onblur = function() {
    if (this.value != '') {
        if (yzInput.value === yzSpan.innerHTML) {
            oSpan[5].innerHTML = '';
            oEm[5].style.display = 'block'
            yznum = 1;
        } else {
            oSpan[5].innerHTML = '请输入正确的验证码';
            oEm[5].style.display = 'none'
            yznum = 0;
        }
    } else {
        oSpan[5].innerHTML = '';
        oSpan[5].style.color = '#666';
        yznum = 0;
    }
}

//注册按钮
btn.onclick = function() {
    if (usernum === 1 && passnum === 1 && passnum2 === 1 && telnum === 1 && emailnum === 1 && yznum === 1) {
        return true;
    } else {
        return false;
    }
}

// // 2.验证用户名是否已存在
// $('.username').onblur = function () {
//     let reguser = new RegExp('[\u4e00-\u9fa5]', 'g');
//     if (this.value != '') {
//         let aj = new XMLHttpRequest();
//         aj.open('post', 'http://localhost/js2005/login_registry/php/registry.php', true);
//         aj.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//         aj.send('name=' + this.value);
//         aj.onreadystatechange = function () {
//             if (aj.readyState === 4) {
//                 if (! aj.responseText) {
//                     $('span', 2)[0].innerHTML = '';
//                     $('em', 2)[0].style.display = 'block';
//                     usernum = 1;
//                 } else {
//                     console.log('11');
//                     $('span', 2)[0].innerHTML = '此用户名已存在';
//                     $('span', 2)[0].style.color = 'red';
//                     $('em', 2)[0].style.display = 'none';
//                 }
//             }
//         }
//     }
// }