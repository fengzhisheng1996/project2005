//1.随机数如何设定范围（封装函数）
function ranNum(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}