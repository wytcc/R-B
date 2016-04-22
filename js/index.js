$(function(){
  //二维数组
  var matrixArray = new Array();
  var count = 2;
  refreshPanel(count);
  for(var i = 0; i < count; i++){
    matrixArray[i] = new Array();
    for(var j = 0; j < count; j++){
      matrixArray[i][j] = 0;
    }
  }
  
  var row, col, isSuccess = false;
  
  $('#panel').on('click', 'td', function(e){
    row = parseInt($(this).data('y')) + 1;
    col = parseInt($(this).data('x')) + 1;

    for(var i = 0; i < count; i++){
      matrixArray[col-1][i]++;
      matrixArray[i][row-1]++;
    }
    matrixArray[col-1][row-1]--;
    $(this).trigger('modify');
  });
  
  $('#panel').on('modify', function(e){
    //修改表象
    if(!isSuccess){
      modifyColor.call(e.target, matrixArray[col-1][row-1]);

      for(var i = 1; i < count; i++){
        (function(j) {
          setTimeout(function(){
            if((row-1-j) >= 0){
              modifyColor.call($('tr').eq(col-1).children('td').eq(row-1-j), matrixArray[col-1][row-1-j]);
            }
            if((row-1+j) < count){
              modifyColor.call($('tr').eq(col-1).children('td').eq(row-1+j), matrixArray[col-1][row-1+j]);
            }
            if(col-1-j >= 0){
              modifyColor.call($('tr').eq(col-1-j).children('td').eq(row-1), matrixArray[col-1-j][row-1]);
            }
            if(col-1+j < count){
              modifyColor.call($('tr').eq(col-1+j).children('td').eq(row-1), matrixArray[col-1+j][row-1]);
            }

          }, 100);
        }(i));
      }
    }
    
  });
  
  $('#panel').on('modify', function(e){
    //判断是否结束
    var oddCount = 0;
    for(var i = 0; i < count; i++){
      for(var j = 0; j < count; j++){
        if(matrixArray[i][j] % 2 != 0){
          oddCount++;
        }
      }
    }
    if(oddCount == count*count){
      isSuccess = true;
      count++;
      refreshPanel(count);
      refreshMatrix(count);
      resetStatus();
    }
  });

  function modifyColor(num){
    if(num % 2 === 0){
      $(this).removeClass('cell-red');
      $(this).addClass('cell-black');
    }
    else if(num % 2 != 0){
      $(this).removeClass('cell-black');
      $(this).addClass('cell-red');
    }
  }

  function refreshPanel(count){
    $('#panel').empty();
    for(var i = 0; i < count; i++){
      $('#panel').append('<tr></tr>');
      for(var j = 0; j < count; j++){
        $('tr').eq(i).append('<td data-x="'+i+'" data-y="'+j+'"></td>');
      }
    }
  }

  function refreshMatrix(count){
    matrixArray = new Array();
    for(var i = 0; i < count; i++){
      matrixArray[i] = new Array();
      for(var j = 0; j < count; j++){
        matrixArray[i][j] = 0;
      }
    }
  }

  function resetStatus(){
    isSuccess = false;
  }

});