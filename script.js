
$(document).ready(function(){
    var rows = 4;
    var columns = 4; 
    var pieces = '';
    for (var i = 0, top = 0,order = 0; i<rows; i++, top -= 100){
        for (var j = 0, left = 0; j<columns;j++,left -= 100,order++){

            pieces += "<div style='background-position:"+left+"px "+top+"px;' class='piece' data-order=" + order + "></div>";
        }
    }
    $('#board').html(pieces)
    $('#start').click(function(){
        var pieces = $('#board div');
        pieces.each(function(){
            var leftPosition = Math.floor(Math.random()*290) + "px"
            var topPosition = Math.floor(Math.random()*290) + "px"
            $(this).addClass('draggablePieces').css({position:"absolute",
                        left:leftPosition,
                        top:topPosition})
            $("#pieces-grid").append($(this))
        })
       var emptyString = ''
        for (var i = 0; i<rows; i++){
            for (var j = 0; j<columns;j++){
    
                emptyString += "<div style = 'background-image:none;' class='piece droppablePiece'></div>";
            }
        }
        $('#board').html(emptyString)
        $(this).hide()
        $("#reset").show()
        gameStart()
    });
    function checkResult(){
        if($("#board .droppedPiece").length != 16 ){
            return false;
        }
        for (var k=0;k<16;k++){
            var item = $('#board .droppedPiece:eq(' + k + ')');
            var order = item.data('order');
            if( k!=order){
                alert("lost")
                $("#pieces-grid").text("Oops! You failed.");
                return false;
            }
            $("#pieces-grid").text("Congragulatios! You Win");
            return true;
        }
    }
    function gameStart (){
        $('.draggablePieces').draggable({
            revert:"invalid",
            start:function(){
                if($(this).hasClass("droppedPiece")){
                    $(this).removeClass("droppedPiece");
                    $(this).parent().removeClass("piecePresent")
                }
            }
        })
        $('.droppablePiece').droppable({

            hoverClass: "drop-hover",
            accept:function(){
                return !$(this).hasClass("piecePresent")

            },
        
            drop:function(event,ui){
                var draggableElement = ui.draggable;
                var droppedOn = $(this);
                droppedOn.addClass('piecePresent')
                $(draggableElement).addClass('droppedPiece').css({
                    top:0,left:0,position:'relative'
                }).appendTo(droppedOn)
                checkResult();
            }
        })
    }

})