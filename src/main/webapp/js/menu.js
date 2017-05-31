var mr = true;
function menu(){
    $('#btmenu').click(function(){
        abrirFechar();
    });
}

function abrirFechar(){
        if(mr){
            $('#menu').animate({left:'0'},150, function (){$('#btmenu').addClass('gira180');})
            $('#listamenu').removeClass('invisivel');
            mr = false;
        }else{
            $('#menu').animate({left:'-235px'},150, function (){$('#btmenu').removeClass('gira180');})
            $('#listamenu').addClass('invisivel');
            mr = true;
        }
}
