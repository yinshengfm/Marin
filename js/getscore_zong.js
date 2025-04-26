$(function(){
	
	$("#submit_zong").click(function(){
		var wenkecj=Number($("#wenkechengji").val()).toFixed(2 );
		window.location.href = 'zong.html';
		localStorage.setItem('zongfen', wenkecj);
		
	})

    $("#shengpaiming").click(function(){

        window.location.href = 'index.html';


    })

    function pgScale(){
        var deviceWidth = document.documentElement.clientWidth;
        if(deviceWidth > 750) deviceWidth = 750;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    }
    pgScale();
    window.onresize=pgScale;


	
	
})