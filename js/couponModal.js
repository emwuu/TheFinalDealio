// Get the modal
var modal = document.getElementById('coupModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
/*function popupcoupon() {
    modal.style.display = "block";
}*/



function coupmodalfunc(clickable){
	 //$(".coupon.modalClickable").on('click', function(){
	 	console.log(clickable);
		modal.style.display="block";

		var source   = $("#coupon-modal-template").html();
  		var template = Handlebars.compile(source);

  		var parentDiv = $(".info");

  		var html = null;
  		var cl = null;

  		if (localStorage.getItem('customCoupons') != null){
    		html = template((JSON.parse(localStorage.getItem('customCoupons')))[0]);
    		cl = JSON.parse(localStorage.getItem('customCoupons'));
  		} else {
    		html = template(couponList[0]);
    		cl = couponList;
  		}

  		var today = moment().format('YYYY-MM-DD');

  		//search for a match
  		for (var i = 0; i < cl.length; i++) {
  			console.log(clickable.id);
  			if (clickable.id == (cl[i].title).concat(0)){
          console.log((cl[i].title).concat(0));
  				$("#infomo").empty();
    			var curData = cl[i];
				  var curHtml = template(curData);
    			parentDiv.append(curHtml);
    			break;
    		}
  		}
}

// When the user clicks on <span> (x), close the modal
$(".close").onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}