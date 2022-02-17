$(document).ready(function(){
    chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;
         document.getElementById('messages').src = "http://192.168.0.108/Comentys/index.php?url="+tablink;
    });
});

