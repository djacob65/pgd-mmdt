var ols_api="https://www.ebi.ac.uk/ols4/api/search"
var ols_options="exact=false&obsoletes=false&local=false&rows=100&format=json&lang=en"
var ols_ontology=''

// EBI OLS Search API with help of Typeahead
function ols_typeahead () {
	$('#ols .typeahead').typeahead({
		hint: true,
		highlight: true,
		minLength: 3
	},
	{
		limitget: 50,
		limitview : 30,
		async: true,
		source: function (query, processSync, processAsync) {
			onto='?'
			if (ols_ontology.length>0 && ols_ontology != 'all') {
				items=ols_ontology.split(':')
				items.forEach((item) => { onto = onto + 'ontology='+item.toLowerCase()+'&'; });
			}
			url = ols_api+onto+ols_options+'&start=0&q='+query+'*'
			return $.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				success: function (json) {
					return processAsync(json.response.docs);
				}
			});
		},
		templates: {
			header: [
				// EBI Logo : https://avatars.githubusercontent.com/u/31919308?v=4
				'<div class="empty-message" style="display: inline-block;">',
				'<img src="https://www.ebi.ac.uk/ols4/logo.svg" style="width:30px;"/>&nbsp;&nbsp;'+
				'<b><i><font color="grey" size=-1>&nbsp;'+ols_ontology+'</font></i></b>',
				'</div>'
			].join('\n'),
			pending: [
				'<div class="empty-message" style="display: inline-block;">',
				'<img src="https://www.ebi.ac.uk/ols4/logo.svg" style="width:30px;"/>&nbsp;&nbsp;'+
				'<b><i>&nbsp;... wait ...</i></b>',
				'</div>'
			].join('\n'),
			empty: [
				'<div class="empty-message" style="display: inline-block;">',
				'<img src="https://www.ebi.ac.uk/ols4/logo.svg" style="width:30px;"/>&nbsp;&nbsp;'+
				'<b><i>&nbsp; this term seems not exist !! </i></b>',
				'</div>'
			].join('\n'),
			suggestion: function (data) {
				return '<p>'+data.label+'</p>';
			}
		},
		display: function (data) {
			return data.label;
		},
		value: function(data) {
			return data.label;
		}
	});
}