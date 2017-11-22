'use strict';


var index = 3;

var couponList = [
  {'title': 'GET any Pantene shampoo or conditioner of lesser or equal value FREE', 'expdate': '2017-12-16', 'tags': ['My Favorites', 'Ralphs'], 'imag': 'http://4.bp.blogspot.com/-kWnz8Wgpbeo/T9yuxz9YZ6I/AAAAAAAAAp8/EkICGGwEPWM/s1600/Pantene-Shampoo-Coupon1.jpg'},
  {'title': 'Save 50 cents On any Mens Speed Stick Antipersperant/Deodorant', 'expdate': '2017-11-25', 'tags': ['My Favorites'], 'imag': 'http://i2.wp.com/thcmmarketplace.com/wp-content/uploads/2017/11/Mens-Speed-Stick-Antiperspirant-or-Deodorant.jpg?resize=500%2C500'},
  {'title': '$1 off any Meow Mix dry product', 'expdate': '2017-10-31', 'tags': [], 'imag': 'http://couponscodesblog.com/wp-content/uploads/2015/05/Meow-Mix-coupons-free-Printable-Codes.bmp'},
  {'title': 'Save $1 OPTI-FREE PureMoist Contact Lens Solution 10oz or larger', 'expdate': '2013-12-31', 'tags': ['Ralphs'], 'imag': 'http://www.printcouponking.com/wp-content/uploads/2013/07/OptiFree-PureMoist-Contact-Lens-Solution-Coupon-2013.jpg'}
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
  var arr = [];

  for (var i = 3; i < form1.elements.length; i++) {
    console.log("value");
    console.log(form1.elements[i].value);
    if(form1.elements[i].checked){
    	arr.push(form1.elements[i].value);
    }
  }

  
  list.push({'title': form1.elements[0].value, 'expdate': form1.elements[1].value, 'tags': arr, 'comments':frm2.elements[0].value, 'imag': 'http://www.livingrichwithcoupons.com/wp-content/uploads/2017/06/neutrogena-2.jpg'});
  localStorage.setItem('customCoupons', JSON.stringify(list));

  alert("Coupon Added!");

}
