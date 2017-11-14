'use strict';


var index = 2;

var couponList = [
  {'title': '$2 off New Apple Flavored Toothpaste', 'expdate': '2018-01-04', 'tags': ['My Favorites']},
  {'title': '$2 off Kelloggs Fruit Loops', 'expdate': '2017-12-16', 'tags': ['My Favorites', 'Groceries']}
]


function scanFile(event) {
  var resImage = document.getElementById("fileInput");
  document.getElementById("fileInput").click();
  var file = resImage.files[0];
  window.location.replace("../addcoupon.html");
}

function goBack(event){
  window.location.replace("../coupon.html");
}

function save_data(){
	var list= null;
  if (localStorage.getItem('customCoupons') != null){
    list = JSON.parse(localStorage.getItem('customCoupons'));
  } else {
  	list = couponList;
  }

  var form1 = document.getElementById("frm");
  console.log(form1.elements[0].value);
  console.log(form1.elements[1].value);
  console.log(form1.elements[2].checked);
  console.log(form1.elements[3].checked);
  var arr = [];

  for (var i = 2; i < form1.elements.length-2; i++) {
    if(form1.elements[i].checked){
    	arr.push(form1.elements[i].value);
    }
  }

  
  list.push({'title': form1.elements[0].value, 'expdate': form1.elements[1].value, 'tags': arr, 'comments':frm2.elements[0].value});
  localStorage.setItem('customCoupons', JSON.stringify(list));

}
