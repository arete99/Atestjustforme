SearchSource.defineSource('posts', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 20};
  
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {title: regExp},
      {content: regExp}
    ]};
    
    return Posts.find(selector, options).fetch();
  } else {
    return Posts.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
};
