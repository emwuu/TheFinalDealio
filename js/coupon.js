
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  console.log('hello world');

  // compile the template
  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source);

  var parentDiv = $("#myTable");

  var html = null;
  var cl = null;
  // start with a simple template
  if (localStorage.getItem('customCoupons') != null){
    html = template((JSON.parse(localStorage.getItem('customCoupons')))[0]);
    cl = JSON.parse(localStorage.getItem('customCoupons'));
  } else {
    html = template(couponList[0]);
    cl = couponList;
  }

  var today = moment().format('YYYY-MM-DD');

  for (var i = 0; i < cl.length; i++) {
    var curData = cl[i];
    if (today > cl[i].expdate){
       //curData.title="EXPIRED";
    }
    var curHtml = template(curData);
    parentDiv.append(curHtml);
    if (today > cl[i].expdate){
      document.getElementById(cl[i].title).className = "expired";
    }
  }
})

function byexpdate(){
  
  var res = null;
  var expired = [];
  var parentDiv = $("#myTable");
  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source);
  var html = null;
  var cl = null;
  var i;

  var table = document.getElementById("myTable");
  var td = table.getElementsByTagName("td");

  // start with a simple template
  if (localStorage.getItem('customCoupons') != null){
    html = template((JSON.parse(localStorage.getItem('customCoupons')))[0]);
    cl = JSON.parse(localStorage.getItem('customCoupons'));
  } else {
    html = template(couponList[0]);
    cl = couponList;
  }

  for (i = 0; i < td.length; i++) {
    td[i].style.display = "none";
  }

  var today = moment().format('YYYY-MM-DD');
  console.log(today);

  res = cl.sort(function(a, b) {
    return (a.expdate < b.expdate) ? -1 : ((a.expdate > b.expdate) ? 1 : 0);
  });


  for (i = 0; i < res.length; i++) {
      var curData = res[i];
      var curHtml = template(curData);
      if (today <= res[i].expdate){
        parentDiv.append(curHtml);
      }
      else{
        expired.push(res[i]);
      }
  }

  for (i = 0; i < expired.length; i++){
    var curData = expired[i];
    curData.title="EXPIRED";
    var curHtml = template(curData);
    parentDiv.append(curHtml);
    document.getElementById(expired[i].title).className = "expired";
  }
}

function byupload(){
  var res = null;
  var expired = [];
  var parentDiv = $("#myTable");
  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source);
  var html = null;
  var cl = null;
  var i;

  var table = document.getElementById("myTable");
  var td = table.getElementsByTagName("td");

  var today = moment().format('YYYY-MM-DD');

  // start with a simple template
  if (localStorage.getItem('customCoupons') != null){
    html = template((JSON.parse(localStorage.getItem('customCoupons')))[0]);
    cl = JSON.parse(localStorage.getItem('customCoupons'));
  } else {
    html = template(couponList[0]);
    cl = couponList;
  }

  for (i = 0; i < td.length; i++) {
    td[i].style.display = "none";
  }

  for (i = 0; i < cl.length; i++) {
      var curData = cl[i];
      if (today > cl[i].expdate){
        curData.title="EXPIRED";
      }
      var curHtml = template(curData);
      parentDiv.append(curHtml);
      if (today > cl[i].expdate){
        document.getElementById(cl[i].title).className = "expired";
      }
  }

}

// Search bar
function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  td = table.getElementsByTagName("td");
  for (i = 0; i < td.length; i++) {
    if (td[i]) {
      if (td[i].className.toUpperCase().indexOf(filter) > -1) {
        td[i].style.display = "";
      } else {
        td[i].style.display = "none";
      }
    }
  }
}
