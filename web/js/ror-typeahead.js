var ROR_API_URL = "https://api.ror.org/organizations?query="

function callTypeahead () {
$('#container .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 3
  },
  {
    limitget: 50,
	limitview : 5,
    async: true,
    source: function (query, processSync, processAsync) {
        url = ROR_API_URL + encodeURIComponent(query);
        return $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                orgs = json.items
                return processAsync(orgs);
            }
        });
    },
    templates: {
      pending: [
        '<div class="empty-message tt-Loading">',
          'Wait while fetching organizations list ...',
        '</div>'
      ].join('\n'),
      suggestion: function (data) {
          altNames = ""
          if(data.aliases.length > 0) {
            for (let i = 0; i < data.aliases.length; i++){
                altNames += data.aliases[i] + ", ";
            }
          }
          if(data.acronyms.length > 0) {
            for (let i = 0; i < data.acronyms.length; i++){
                altNames += data.acronyms[i] + ", ";
            }
          }
          if(data.labels.length > 0) {
            for (let i = 0; i < data.labels.length; i++){
                altNames += data.labels[i].label + ", ";
            }
          }
          altNames = altNames.replace(/,\s*$/, "");
          return '<p>' + data.name + '<br><small>' + data.types[0] + ', ' + data.country.country_name + '<br><i>'+ altNames + '</i></small></p>';
      }
    },
    display: function (data) {
      return data.name;
    },
    value: function(data) {
      return data.identifier;
    }
});
}