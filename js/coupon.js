
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

  document.getElementById("sb").textContent="Exp Date";
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

  $("#myTable tr").remove();

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
    //curData.title="EXPIRED";
    var curHtml = template(curData);
    parentDiv.append(curHtml);
    document.getElementById(expired[i].title).className = "expired";
  }
}

function byupload(){
  document.getElementById("sb").textContent="Upload Date";
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

  $("#myTable tr").remove();

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
        //curData.title="EXPIRED";
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
  var input, filter, table, td, i;
  input = document.getElementById("myInput"); //grabs input from search bar
  filter = input.value.toUpperCase(); //does not distinguish whether user input is lower or upper case bc changes every input to uppercase
  table = document.getElementById("myTable"); //defined so we can get all the td
  td = table.getElementsByTagName("td"); //asisgns td variable to every td tag
  for (i = 0; i < td.length; i++) { //for all items that have td tag
    if (td[i]) { //td[i] refers to a single td
      if (td[i].className.toUpperCase().indexOf(filter) > -1) { // -1 means no match
        td[i].style.display = ""; //if returns > -1 (match), do nothing (aka keep showing the item)
      } else {
        td[i].style.display = "none"; //if returns -1 (no match), then hide it
      }
    }
  }
}

//tags LEFT OFF @ HOW TO GRAB TAGNAME CLICKED ON AS A VARIABLE
function displayTaggedCoupon(tag) {
  var input, filter, table, tr, td, tag;
  filter = tag.className.toUpperCase();
  // list = document.getElementsByTagName("li");
  // filter = list.className.toUpperCase() //tag name stored as filter
  tagList = JSON.parse(localStorage.getItem('customCoupons'))
  table = document.getElementById("myTable"); //defined so we can get all the td
  td = table.getElementsByTagName("td"); //asisgns td variable to every td tag
  for (i = 0; i < td.length; i++) { //for all items that have td tag
    for (i = 0; i < tagList.length; i++) { //for each coupon
      couponSpecificTags = tagList[i].tags
      for (i=0; i<couponSpecificTags.length; i++){  //search through all tags in tagList array
        if (couponSpecificTags[i].toUpperCase().indexOf(filter) > -1) { // -1 means no match
          td[i].style.display = ""; //if returns > -1 (match), do nothing (aka keep showing the item)
        } else {
          td[i].style.display = "none"; //if returns -1 (no match), then hide it
        }
      }
    }
  }
}


// var input, filter, ul, li, a, i;
//    input = document.getElementById("myInput");
//    filter = input.value.toUpperCase();
//    ul = document.getElementById("myUL");
//    li = ul.getElementsByTagName("li");
//    for (i = 0; i < li.length; i++) {
//        a = li[i].getElementsByTagName("a")[0];
//        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//            li[i].style.display = "";
//        } else {
//            li[i].style.display = "none";

//Auto ads new tags to filter tag list
var tags = [
  {'tagname': 'My Favorites', 'color': 'orange', 'index':0},
  {'tagname': 'Ralphs', 'color': 'pink', 'index':1}
]
// compile the template
var source   = $("#filterTags-template").html();
var template = Handlebars.compile(source);

var parentDiv = $("#tagsUL");

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


//Change select to delete buttons
$('#select').click(changeText); //when click select


function changeText(event){
  var x = document.getElementById("select");
  var txt = x.textContent;
  alert(txt);
  if (txt === "Delete"){
    var form = document.getElementById("deletechecklist");
    var len = form.length;

    var cl = JSON.parse(localStorage.getItem('customCoupons'));
    console.log("check1");
    console.log(cl.length);
    //iterate through checklist to see if coupons are checked
    for (var i=0; i< len; i++){
      if(form.elements[i].checked){
        var temp = form.elements[i];
        for(var j=0; j<len; j++){
          if (temp.name === cl[j].title){
            cl.splice(j, 1);
            console.log("check2");
            console.log(cl.length);
            localStorage.setItem('customCoupons', JSON.stringify(cl));
            window.location.reload(true);
            break;
          }
        }
      }
    }
  }

 $(this).text("Delete"); //changes select to delete
 $('#cancelDelete').show(); //shows select option
 $('.checks').show(); //shows checkboxes to select coupons to delete
}


$('#cancelDelete').click(function(){ //when click cancel
  $('#cancelDelete').hide(); //hides cancel option
   $('#select').html("Select"); //changes delete to select
   var z = document.getElementsByClassName('.checks')
   $('.checks').hide();
});
