
var tags = [
  {'tagname': 'My Favorites', 'color': 'orange', 'index':0},
  {'tagname': 'Ralphs', 'color': 'pink', 'index':1}
]

function add_tag(){
  var ls= null;
  if (localStorage.getItem('customTags') != null){
    ls = JSON.parse(localStorage.getItem('customTags'));
  } else {
    ls = tags;
  }

  var f1 = document.getElementById("frm3");

  ls.push({'tagname': f1.elements[0].value, 'color': 'green', 'index': 9});
  localStorage.setItem('customTags', JSON.stringify(ls));
}

/* for handle bars to autopopulate user entered tags */
$(document).ready(function() {
  console.log('hello world');

  // compile the template
  var source   = $("#tag-template").html();
  var template = Handlebars.compile(source);

  var parentDiv = $("#couplist");

  var html = null;
  var cl = null;

  // start with a simple template
  if (localStorage.getItem('customTags') != null){
    html = template((JSON.parse(localStorage.getItem('customTags')))[0]);
    cl = JSON.parse(localStorage.getItem('customTags'));
  } else {
    html = template(tags[0]);
    cl = tags;
  }

  for (var i = 0; i < cl.length; i++) {
    var curData = cl[i];
    var curHtml = template(curData);
    parentDiv.append(curHtml);
  }
})
