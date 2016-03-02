document.addEventListener('DOMContentLoaded', function(){
	console.log('start');
	$('body').text('hoho');
	$.ajax({
		type: 'GET',
		url: 'https://kids.evangelsenglish.com',
		success: function(data){
			$('body').text = data;
			console.log('ngon r');
		},
		error: function(){
			console.log('error r');
		}
	})
	// var xhr = new XMLHttpRequest();
 //    xhr.open("GET", "https://www.evangelsenglish.com/ajax/bing?text=Hello", true);
 //    xhr.onreadystatechange = function() {
	//     if (xhr.readyState == 4) {
	//     	$('body').text(xhr.responseText);
	//     }
 //    }
 //    xhr.send();
});