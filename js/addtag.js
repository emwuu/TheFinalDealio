
var tags = [
  {'tagname': 'My Favorites', 'color': 'orange'},
  {'tagname': 'Ralphs', 'color': 'pink'}
]

function add_tag(){
  var ls= null;
  if (localStorage.getItem('customTags') != null){
    ls = JSON.parse(localStorage.getItem('customTags'));
  } else {
    ls = tags;
  }

  var f1 = document.getElementById("customtag");
  console.log(form1.elements[0].value);

  ls.push({'tagname': f1.elements[0].value, 'color': green});
  localStorage.setItem('customTags', JSON.stringify(ls));
}

$(document).ready(function() {
  console.log('hello world');

  // compile the template
  var src   = $("#tag-template").html();
  var tplate = Handlebars.compile(src);

  var pDiv = $("customTag");

  var htl = null;
  var clist = null;
  // start with a simple template
  if (localStorage.getItem('customTags') != null){
    htl = template((JSON.parse(localStorage.getItem('customTags')))[0]);
    clist = JSON.parse(localStorage.getItem('customTags'));
  } else {
    htl = template(tags[0]);
    clist = tags;
  }
  
  console.log(htl);
  pDiv.append(htl);

  for (var i = 1; i < clist.length; i++) {
    var cData = clist[i];
    var curHtl = template(cData);
    pDiv.append(curHtl);
  }
});