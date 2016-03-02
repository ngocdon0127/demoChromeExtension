document.addEventListener('DOMContentLoaded', function(){
	console.log('start');
	ob('btnTranslate').addEventListener('click', translate);
});

function ob(x) {
	return document.getElementById(x);
}

function translate() {
	$('#result').text('');
	$('#result').val('');
	ob('result').setAttribute('placeholder', 'Translating...');
	$.ajax({
		type: 'GET',
		url: 'https://www.evangelsenglish.com/ajax/bing?text=' + $('#text').val(),
		success: function(data){
			var value = $.parseXML(data);
			$('#result').val($(value).find('string').text());
			// console.log($(value).find('string').text());
		},
		error: function(){
			$('#error').text('error');
		}
	})
}