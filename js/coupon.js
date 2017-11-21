
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
      var str = "expired ";
      document.getElementById(cl[i].title).className = str.concat(cl[i].title);
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
    var curHtml = template(curData);
    parentDiv.append(curHtml);
    //document.getElementById(expired[i].title).className = "expired";

    var str = "expired ";
      document.getElementById(cl[i].title).className = str.concat(cl[i].title);
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
      var curHtml = template(curData);
      parentDiv.append(curHtml);
      if (today > cl[i].expdate){
          var str = "expired ";
      document.getElementById(cl[i].title).className = str.concat(cl[i].title);
        //document.getElementById(cl[i].title).className = "expired";
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
function displayTaggedCoupon() {
  //show everything again
  myFunction();

  table = document.getElementById("myTable"); //defined so we can get all the td
  td = table.getElementsByTagName("td"); //asisgns td variable to every td tag
  form = document.getElementById("tagdpd");
  var i, j, k, p = 0;

  var checkedtags = [];
  var listofcoups = JSON.parse(localStorage.getItem('customCoupons'));
  if (listofcoups == null){
    listofcoups = couponList;
  }

  console.log(form.elements[0]);

  //add tags from submission form to checked tags array
  for(i = 0; i < form.length; i++){
    if (form.elements[i].checked){
      checkedtags.push(form.elements[i].name);
    }
  }

  console.log("checkedtags");
  console.log(checkedtags);

  //iterate through table
  for (i = 0; i < td.length; i++) { 
    //don't bother with the ones that aren't visible
    if(td[i].style.display == "none"){
      continue;
    } else {
      var temp = null;
      //find corresponding item in localStorage
      console.log(listofcoups);
      for (k = 0; k < listofcoups.length; k++){
        console.log("title");
        console.log(listofcoups[k].title);
        if (td[i].id === listofcoups[k].title){
          temp = listofcoups[k];
        }
      }
      console.log("temp");
      console.log(temp);

      //0 for no, 1 for yes
      var check = 0;

      //check if the coupon has any checked tag
      for (j = 0; j <checkedtags.length; j++){
        console.log("temp tags"); 
        console.log(temp.tags);
        for (p = 0; p < temp.tags.length; p++){
          if (checkedtags[j] === temp.tags[p]){
            check = 1;
            break;
          }
        }
      }

      if (check == 0){
        td[i].style.display == "none";
        console.log("INVISIBLE!");
        console.log(td[i].name);
        document.getElementById(td[i].id).style.display="none";
      }
    } // else
  } //for loop
  return false;
}


//Auto ads new tags to filter tag list
var tags = [
  {'tagname': 'My Favorites', 'color': 'orange', 'index':0},
  {'tagname': 'Ralphs', 'color': 'pink', 'index':1}
]
// compile the template
var source   = $("#filterTags-template").html();
var template = Handlebars.compile(source);

var parentDiv = $("#tagdpd");

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
  if (txt === "Delete"){
    alert("Are you sure you want to delete?");
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
