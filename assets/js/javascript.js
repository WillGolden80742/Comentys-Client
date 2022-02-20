
$(document).ready(function(){

      
      function urlTreat (url) {
            var urlT = "";
            if (url.indexOf('www.google.com.br/maps/') > -1) {
                  urlT = url.split("@")[0];
            } else if (url.indexOf('www.google.com') > -1) {
                  urlT = url.split("&")[0];
            } else {
                  urlT = url;
            }
            return urlT;
      }

      var tablink="";

      chrome.tabs.getSelected(null,function(tab) {
            tablink = tab.url;
            tablink = urlTreat(tablink);
            Message();
            function Message () {
            $.ajax({
                  url: 'http://192.168.0.108/Comentys/messages.php',
                  method: 'POST',
                  data: {url:tablink},
                  dataType: 'json'
            }).done(function(result) {
                  document.getElementById('messages').src="http://192.168.0.108/Comentys/index.php?url="+tablink;
            });
          }
      });

      $('#comentTextBox').on("input", function(e) {
            var count = document.getElementById('comentTextBox').value.length;
            max = 500;
            if (count <= max && count > 0) {
                  document.getElementById('countText').innerHTML="("+addZeros(count,3)+"/500)";
            } else {
                  document.getElementById('comentTextBox').value=document.getElementById('comentTextBox').value.substring(0,max+1);
            }
      });

      function addZeros(num, len) {
            var numberWithZeroes = String(num);
            var counter = numberWithZeroes.length;
              
            while(counter < len) {
                  numberWithZeroes = "0" + numberWithZeroes;
                  counter++;
            }   
          return numberWithZeroes;
      }

      $('.send').on("click", function(e) {
            
            chrome.tabs.getSelected(null,function(tab) {
                  var message = document.getElementById('comentTextBox').value;
                  sendMessage();
                  function sendMessage () {
                        $.ajax({
                              url: 'http://192.168.0.108/Comentys/createMessage.php?url='+tablink,
                              method: 'POST',
                              data: {url:tablink, message:message},
                              dataType: 'json'
                        }).done(function(result) {
                              document.getElementById('comentTextBox').value="";
                              document.getElementById('messages').src="http://192.168.0.108/Comentys/index.php?url="+tablink;
                        });
                  }
            });
      });

});

   

