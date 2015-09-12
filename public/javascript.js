var current_eli = 7;
var font_color = 'blue';

$(document).ready(function() {

  function getCanvasCtx(){
    return $('#e')[0].getContext('2d');
  }

  function getEliSource(number){
    return "public/elis/" + number + ".jpg"
  }

  function drawEli(ctx){
    var img = new Image();
    img.src = getEliSource(current_eli);
    img.onload = function(){
      ctx.drawImage(this,0,0,450,450);
    }
  }


  function typeMessage(ctx, message){
    ctx.fillStyle = font_color;
    ctx.font = '18px sans-serif';
    wrapText(ctx, message, 50, 50, 350, 27);
  }

  function clearMessage(ctx){
    ctx.clearRect(0,0,450,450);
    drawEli(ctx);
  }

  function splitLines(context, text, x, y, maxWidth, lineHeight){
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight){
    var paragraphs = text.split("\n");
    for (var p = 0; p < paragraphs.length; p++){
      var words = paragraphs[p].split(" ");
      var line = "";
      for (var n = 0; n < words.length; n++){
        var testLine = line + words[n] + " ";
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth) {
          context.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
      y += lineHeight;
    }
  }

  function newEli(ctx){
    var number = Math.floor(Math.random()*20)+1;
    current_eli = number;
    drawEli(ctx);
  }

  function saveEli(canvas){
    var url = canvas.toDataURL();
    window.location.href = url.replace('image/png', "image/octet-stream");
  }

  var ctx = getCanvasCtx();
  drawEli(ctx);

  // Bind typing enter in the text box to writing the message
  $('.add').on("click", function(){
    var ctx = getCanvasCtx();
    var message = $('.message').val();
    typeMessage(ctx, message);
  })

  // Bind clearing the message
  $('.clear').on('click', function(){
    var ctx = getCanvasCtx();
    clearMessage(ctx);
  })

  // Save the Eli
  $('.download').on('click', function(){
    var canvas = $('#e')[0];
    saveEli(canvas);
  })

  // Get a new Eli
  $('.new_eli').on('click', function(){
    var number = Math.floor(Math.random()*10)+1;
    current_eli = number;
    var ctx = getCanvasCtx()
    newEli(ctx)
  })

  // Change the font color
  $('.color').on('click', function(){
    $('.current_color').removeClass('current_color');
    font_color = this.text.trim();
    $(this).addClass('current_color');
    var ctx = getCanvasCtx();
    clearMessage(ctx);
  })
});
