$(function () {
    function pgScale() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth > 750) deviceWidth = 750;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';

    }

    pgScale();
    window.onresize = pgScale;

    // 学员性别值
    var sex
    // 各项目 所得分数
    var xiangmu1S, xiangmu2S, xiangmu3S, xiangmu4S
    $('.tijiao').click(function () {

        // 1男，2女
        sex = $('input[name=sex]:checked').val()
        var xiangmu1_val = Math.ceil($('input[name=xiangmu1]').val()) + "." + $('input[name=xiangmu1_1]').val();
        var xiangmu2_val = Math.ceil('0') + Math.ceil($('input[name=xiangmu2]').val()) + ":" + $('input[name=xiangmu2_2]').val() + "." + $('input[name=xiangmu2_3]').val();
        var xiangmu3_val = Math.ceil($('input[name=xiangmu3]').val()) + "." + $('input[name=xiangmu3_3]').val();
        var xiangmu4_val = Math.ceil($('input[name=xiangmu4]').val()) + "." + $('input[name=xiangmu4_4]').val();
        if ($('input[name=xiangmu1]').val() == ""
            ||$('input[name=xiangmu1_1]').val() == ""
            ||$('input[name=xiangmu2]').val() == ""
            ||$('input[name=xiangmu2_2]').val() == ""
            ||$('input[name=xiangmu2_3]').val() == ""
            || $('input[name=xiangmu3]').val() == ""
            || $('input[name=xiangmu3_3]').val() == ""
            || $('input[name=xiangmu4]').val() == ""
            || $('input[name=xiangmu4_4]').val() == "") {
            alert("请补全个人成绩！！")
            return false;
        }
        count(xiangmu1_val, xiangmu2_val, xiangmu3_val, xiangmu4_val)
    })

    // 计算 项目1 2值越小得分越高，3 4反之
    function count(xiangmu1V, xiangmu2V, xiangmu3V, xiangmu4V) {
        console.log(xiangmu1V, xiangmu2V, xiangmu3V, xiangmu4V)
        var userVal = {
            xiangmu1V,
            xiangmu2V,
            xiangmu3V,
            xiangmu4V
        }
        localStorage.setItem("userVal", JSON.stringify(userVal));
        console.log(score)

        // 获取项目1得分（用时、小于最小值 大于最大值）
        var getXiangmu1S = function (xiangmu1V) {
            if (xiangmu1V < score[sex - 1].xiangmu[0].xiangmu1) {
                xiangmu1S = 25
            } else if (xiangmu1V > score[sex - 1].xiangmu[score[sex - 1].xiangmu.length - 1].xiangmu1) {
                xiangmu1S = 0
            } else if (score[sex - 1].xiangmu.filter(item => item.xiangmu1 == xiangmu1V).length != 0) {
                xiangmu1S = score[sex - 1].xiangmu.filter(item => item.xiangmu1 == xiangmu1V)[0].score
            } else {
                return getXiangmu1S((xiangmu1V - 0.01).toFixed(2))
            }
            console.log(xiangmu1S)
        }
        if (xiangmu1V != '') getXiangmu1S(Number(xiangmu1V).toFixed(2))

        // 获取项目2得分
        var xiangmu2V_1 = xiangmu2V.split(':')[0]
        var xiangmu2V_2 = xiangmu2V.split(':')[1].split('.')[0]
        var xiangmu2V_3 = xiangmu2V.split(':')[1].split('.')[1]
        var getXiangmu2S = function (xiangmu2V) {
            if ((Number(xiangmu2V_1) * 600 + Number(xiangmu2V_2) * 10 + Number(xiangmu2V_3) < 1206 && sex == 1) || (Number(xiangmu2V_1) * 600 + Number(xiangmu2V_2) * 10 + Number(xiangmu2V_3) < 1456 && sex == 2)) {
                xiangmu2S = 25
            } else if ((Number(xiangmu2V_1) * 600 + Number(xiangmu2V_2) * 10 + Number(xiangmu2V_3) > 2300 && sex == 1) || (Number(xiangmu2V_1) * 600 + Number(xiangmu2V_2) * 10 + Number(xiangmu2V_3) > 2500 && sex == 2)) {
                xiangmu2S = 0
            } else if (score[sex - 1].xiangmu.filter(item => item.xiangmu2 == xiangmu2V).length != 0) {
                xiangmu2S = score[sex - 1].xiangmu.filter(item => item.xiangmu2 == xiangmu2V)[0].score
            } else {
                // 需要处理项目2的数据
                if (xiangmu2V_3 == 0) {
                    xiangmu2V_3 = 9
                    if (xiangmu2V_2 == 0) {
                        xiangmu2V_2 = 59
                        xiangmu2V_1 = '0' + xiangmu2V_1 - 1
                    } else {
                        // 判断第一位是不是 0
                        if (xiangmu2V_2.slice(0, 1) == 0) {
                            xiangmu2V_2 = '0' + xiangmu2V_2 - 1
                        } else {
                            xiangmu2V_2 = xiangmu2V_2 - 1
                        }
                    }
                } else {
                    xiangmu2V_3 = xiangmu2V_3 - 1
                }
                xiangmu2V = xiangmu2V_1 + ':' + xiangmu2V_2 + '.' + xiangmu2V_3
                console.log(xiangmu2V)
                return getXiangmu2S(xiangmu2V)
            }
            console.log(xiangmu2S)
        }
        if (xiangmu2V != 'mm:ss.hs') getXiangmu2S(xiangmu2V)

        // 获取项目3得分（成绩 大于最大值 小于最小值）
        var getXiangmu3S = function (xiangmu3V) {
            if (xiangmu3V > score[sex - 1].xiangmu[0].xiangmu3) {
                xiangmu3S = 25
            } else if (xiangmu3V < score[sex - 1].xiangmu[score[sex - 1].xiangmu.length - 1].xiangmu3) {
                xiangmu3S = 0
            } else if (score[sex - 1].xiangmu.filter(item => item.xiangmu3 == xiangmu3V).length != 0) {
                xiangmu3S = score[sex - 1].xiangmu.filter(item => item.xiangmu3 == xiangmu3V)[0].score
            } else {
                return getXiangmu3S((Number(xiangmu3V) + 0.01).toFixed(2))
            }
            console.log(xiangmu3S)
        }
        if (xiangmu3V != '') getXiangmu3S(Number(xiangmu3V).toFixed(2))

        // 获取项目4得分
        var getXiangmu4S = function (xiangmu4V) {
            if (xiangmu4V > score[sex - 1].xiangmu[0].xiangmu4) {
                xiangmu4S = 25
            } else if (xiangmu4V < score[sex - 1].xiangmu[score[sex - 1].xiangmu.length - 1].xiangmu4) {
                xiangmu4S = 0
            } else if (score[sex - 1].xiangmu.filter(item => item.xiangmu4 == xiangmu4V).length != 0) {
                xiangmu4S = score[sex - 1].xiangmu.filter(item => item.xiangmu4 == xiangmu4V)[0].score
            } else {
                return getXiangmu4S((Number(xiangmu4V) + 0.01).toFixed(2))
            }
            console.log(xiangmu4S)
        }
        if (xiangmu4V != '') getXiangmu4S(Number(xiangmu4V).toFixed(2))

        var userScore = {
            xiangmu1S,
            xiangmu2S,
            xiangmu3S,
            xiangmu4S
        }
        localStorage.setItem("userScore", JSON.stringify(userScore));
        window.location.href = 'sc.html';
        console.log("跳转")
    }
})