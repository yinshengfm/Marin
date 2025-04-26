$(function(){
    function pgScale(){
        var deviceWidth = document.documentElement.clientWidth;
        if(deviceWidth > 750) deviceWidth = 750;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    }
    pgScale();
    window.onresize=pgScale;

    var userVal = JSON.parse(localStorage.getItem("userVal"))
    var userScore = JSON.parse(localStorage.getItem("userScore"))
    console.log(userVal,userScore)
    if(userVal && userScore){
        $('.xiangmu1V').html(userVal.xiangmu1V==''?'':userVal.xiangmu1V+'s')
        $('.xiangmu2V').html(userVal.xiangmu2V=='mm:ss.hs'?'':userVal.xiangmu2V)
        $('.xiangmu3V').html(userVal.xiangmu3V==''?'':userVal.xiangmu3V+'米')
        $('.xiangmu4V').html(userVal.xiangmu4V==''?'':userVal.xiangmu4V+'米')
        $('.xiangmu1S').html(userScore.xiangmu1S)
        $('.xiangmu2S').html(userScore.xiangmu2S)
        $('.xiangmu3S').html(userScore.xiangmu3S)
        $('.xiangmu4S').html(userScore.xiangmu4S)

        var zongS = Number(userScore.xiangmu1S==undefined?0:userScore.xiangmu1S) + Number(userScore.xiangmu2S==undefined?0:userScore.xiangmu2S) + Number(userScore.xiangmu3S==undefined?0:userScore.xiangmu3S) + Number(userScore.xiangmu4S==undefined?0:userScore.xiangmu4S)
        console.log(zongS)
        var zheS = ((zongS/100*750)*0.6).toFixed(2)

        $('.zongS').html(zongS)
        $('.zheS').html(zheS)

        var index =localStorage.getItem("zongfen");
        console.log(index)
        $("#wenkeS").html(index);
        var wenkeZongS=Number(zheS)+(index*0.4);
        $("#wenkeZongS").html(wenkeZongS);

        localStorage.setItem("zongS", JSON.stringify(zongS));
    }else{
        alert('请先提交您的成绩')
        setTimeout(window.location.replace('/'),500)
    }


})