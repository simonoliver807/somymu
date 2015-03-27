"use strict";

function l(output){	
	console.log('the output is '+ output);
}
function removeClass(id,className){
	var allClassNames = document.getElementById(id).className;
	return allClassNames.replace(' ' + className,'');
}
function addClass(id,className){
	var allClassNames = document.getElementById(id).className;
	return allClassNames + ' ' +  className;
}
function getCSSint(el) {
    var strVal = el.replace('px', '');
    return parseInt(strVal);
}

var modules = new UIModule();
modules.init(5);

var setSliderValue = function (ui, id) {
    var sliderID = id.match(/[0-9]+/g); modules.setSliderValue(ui.value, sliderID);
};
var updateChartPosition = function (ui, id) {
    //modules.updateChartPositions(id);
};

$( document ).bind( 'mobileinit', function(){
	  $.mobile.loader.prototype.options.text = "";
	  $.mobile.loader.prototype.options.textVisible = false;
	  $.mobile.loader.prototype.options.theme = "a";
	  $.mobile.loader.prototype.options.html = "";
	  $.mobile.hidePageLoadingMsg();
	});

//window resize event so we change the slider for vertical to horizontal
//window.onresize = changeSlider;
//function changeSlider() {

//    document.getElementById('screenSize').innerHTML = screen.width;



//    var classNames = document.getElementById('tabTap').className;
//    var showHide = classNames.indexOf('selectBackground');
//    if (showHide !== -1) {
//        addHighLight('tabTap');
//    }
//    var classNames = document.getElementById('tabSlide').className;
//    var showHide = classNames.indexOf('selectBackground');
//    if (showHide !== -1) {
//        addHighLight('tabSlide');
//    }
//	var screenWidth = window.outerWidth;
//	if(screenWidth <= 992 && !modules.windowResizeBool){
//		var orientation = $( ".slider" ).slider( "option", "orientation" );
//		$('.slider').slider( "option", "orientation", "horizontal" );
//		$('.handleStyle').addClass("fa-rotate-90 fa-lg");
//		$('.handleStyle').removeClass("fa-2x");
//		// update the grey outs
//		var buttonArray = modules.getButtonArray();
//		for(var i = 0; i < buttonArray.length; i++){
//			if(buttonArray[i].disabledBool){
//				setGreyOut(false, i);
//				setGreyOut(true, i);
//			}
//		}
//		modules.windowResizeBool = true;
//	}
//	if(screenWidth > 992){
//		if(modules.windowResizeBool){
//			var orientation = $( ".slider" ).slider( "option", "orientation" );
//			$('.slider').slider( "option", "orientation", "vertical" );
//			$('.handleStyle').removeClass("fa-rotate-90 fa-lg");
//			$('.handleStyle').addClass("fa-2x");

//			 // set up the width of the slider container
//		    //var rowWidth = modules.sliderRowWidth;

//	        // devide the set width of a slider row by the number of sliders giving the width per slider
//			var containerWidth = (this.sliderWidth * this.numberOfSliders) + 30;
//	        $('.sliderWrapper').css('width', containerWidth);
//	        $('.sliderNavWrapper').css('width', containerWidth);
//		    // collapse the navbar;
//	        document.getElementById('navbarCollapse').className = "";
//	        document.getElementById('navbarCollapse').className = "navbar-collapse collapse";
//	        modules.windowResizeBool = false;
//		}
//		// update the grey outs
//		var buttonArray = modules.getButtonArray();
//		for(var i = 0; i < buttonArray.length; i++){
//			if(buttonArray[i].disabledBool){
//				setGreyOut(false, i);
//				setGreyOut(true, i);
//			}
//		}
//		window.scrollTo(0, 0);
//	}	
//}
//tooltip events show on hover
$('.sliderContainer').hover(function (event) {
    event.stopPropagation();
    var sliderID = this.children[0].id.match(/[0-9]+/g);

    var sliderArray = modules.getSliderArray();
    for (var i = 0; i < sliderArray.length; i++) {
        if (sliderArray[i].tooltipBool) {
            if (sliderArray[i].sliderID != 'sliderID' + sliderID[0]) {
                $('#sliderID' + sliderArray[i].sliderID).tooltip('hide');
                sliderArray[i].tooltipBool = false;
            }
        }
    }
    if (!sliderArray[sliderID[0]].tooltipBool) {
        $('#sliderID' + sliderID[0]).tooltip({
            container: 'body',
            html: true,
            trigger: 'manual',
            title: function () {
                //   here will be custom template
                var id = $(this).parent().attr('id');
                id = id.match(/[0-9]+/g);
                var sliderValue = sliderArray[id[0]].setSliderValue;
                return '<div>'+sliderValue+'</div>';
            }
        }).tooltip('show');
        if (modules.ie9) {
            var position = $('#' + sliderID[0] + '_' + sliderID[1]).offset();
            position.left = position.left + 4;
            position.top = position.top - 44;
            $('.tooltip').css({ left: position.left, top: position.top });
        }
        //$('.tooltip-inner').text(sliderArray[sliderID[0]][sliderID[1]].sliderValue);
        sliderArray[sliderID[0]].tooltipBool = true;
    }
});
//tooltip events hide when leave the slider row
$('#modules').mouseleave(function () {
    var sliderArray = modules.getSliderArray();
    for (var i = 0; i < sliderArray.length; i++) {
        for (var j = 0; j < sliderArray[i].length; j++) {
            if (sliderArray[i][j].tooltipBool) {
                sliderArray[i][j].tooltipBool = false;
            }
        }
    }
    $('.tooltip').tooltip('hide');
});
// tooltip hide when over the button columns
$('.buttonColumn').mouseover(function () {
    var sliderArray = modules.getSliderArray();
    for (var i = 0; i < sliderArray.length; i++) {
        for (var j = 0; j < sliderArray[i].length; j++) {
            if (sliderArray[i][j].tooltipBool) {
                sliderArray[i][j].tooltipBool = false;
            }
        }
    }
    $('.tooltip').tooltip('hide');
});
// hide the tool tip at the top
document.getElementById('fixedHeader').addEventListener('mouseover',
    function () {
        var sliderArray = modules.getSliderArray();
        for (var i = 0; i < sliderArray.length; i++) {
            for (var j = 0; j < sliderArray[i].length; j++) {
                if (sliderArray[i][j].tooltipBool) {
                    sliderArray[i][j].tooltipBool = false;
                }
            }
        }
        $('.tooltip').tooltip('hide');
    }, false);
$('.leftRightButton').on('mouseOver', function() { 
	$('.tooltip').tooltip('hide'); });
$('.chartHeader').click(function () {
    var chartArray = modules.getChartArray();
    var id = this.id.match(/[0-9]+/g);
    var sliderTotalID = 'sliderTotal' + id;
    var collapseID = 'collapse' + id;
    if (chartArray[id].chartStatus) {
        document.getElementById(sliderTotalID).style.visibility = "hidden";
        chartArray[id].chartStatus = false;
        $('#' + collapseID).collapse('hide');
        document.getElementById('caretToggle' + id).className = "fa fa-caret-up fa-lg";
    }
    else {
        $('#' + collapseID).collapse('show');
        chartArray[id].chartStatus = true;
        document.getElementById('caretToggle' + id).className = "fa fa-caret-down fa-lg";
        document.getElementById(sliderTotalID).style.visibility = "visible";
    }

});
function setGreyOut(hideShow, id) {
	if(hideShow){
		var greyOutWidth = $('.moduleRow'+id ).outerWidth();
		var greyOutHeight = $('.moduleRow'+id ).outerHeight();
		var rowOffset = $('.moduleRow'+id ).offset();
		document.getElementById('greyOut'+id).setAttribute('class','fa fa-plus fa-lg greyOutClick');
		$('body').append('<div class="greyOut" id="greyOutOverlay'+id+'" style="width:'+greyOutWidth+'px;height:'+greyOutHeight+'px;top:'+rowOffset.top+'px;left:'+rowOffset.left+'px;">'+
						 '<div class="greyOutPlus" id="greyOutPlus'+id+'" onclick="turnOffGrey(this.id)"></div>'+
						 '</div>');
	}
	else {
		var element = document.getElementById("greyOutOverlay"+id);
		element.parentNode.removeChild(element);
	}
}
// grey out the sliders, button and chart
$('.greyOutClick').click(function () {
	var id = this.id.match(/[0-9]+/g);
//	var greyOutWidth = $('.moduleRow'+id ).outerWidth();
//	var greyOutHeight = $('.moduleRow'+id ).outerHeight();
//	var rowOffset = $('.moduleRow'+id ).offset();
//	var buttonArray = modules.getButtonArray();
//	var buttonUpdateID = 0;
//	document.getElementById('greyOut'+id).setAttribute('class','fa fa-plus fa-lg greyOutClick');
//	$('body').append('<div class="greyOut" id="greyOutOverlay'+id+'" style="width:'+greyOutWidth+'px;height:'+greyOutHeight+'px;top:'+rowOffset.top+'px;left:'+rowOffset.left+'px;">'+
//					 '<div class="greyOutPlus" id="greyOutPlus'+id+'" onclick="turnOffGrey(this.id)"></div>'+
//					 '</div>');
	var buttonArray = modules.getButtonArray();
	var buttonUpdateID = 0;
	setGreyOut(true, id);
	// set the disabled bool for sliders to true
	var sliderArray = modules.getSliderArray();
	for(var i = 0; i < sliderArray.length; i++){
		sliderArray[id][i].disabledBool = true;
	}
	// remove the segemnts disabled
	modules.removeChartSegment(id);
	//modules.numberNotDisable -= 1;
	
	// update the temp id's for the button so they match the new amount of segments
	buttonArray[id].disabledBool = true;
	for(var i = 0; i < modules.numberOfButtons; i++){
		if(!buttonArray[i].disabledBool){
			buttonArray[i].buttonUpdateID = buttonUpdateID;
			buttonUpdateID += 1;
		}
		else { buttonArray[i].buttonUpdateID = null;}
	}
	modules.updateButtonValue(id);
	
});
function turnOffGrey(id){
	var id = id.match(/[0-9]+/g);
	var plusMinusSignID = 'greyOut' + id;
	var buttonArray = modules.getButtonArray();
	var buttonUpdateID = 0;
	setGreyOut(false, id);
	//$('#greyOutOverlay'+id).remove();
	document.getElementById(plusMinusSignID).setAttribute('class','fa fa-minus fa-lg greyOutClick');
	buttonArray[id].disabledBool = false;
	for(var i = 0; i < modules.numberOfButtons; i++){
		if(!buttonArray[i].disabledBool){
			buttonArray[i].buttonUpdateID = buttonUpdateID;
			buttonUpdateID += 1;
		}
		else { buttonArray[i].buttonUpdateID = null;}	
	}
	// set the disabled bool for sliders to true
	var sliderArray = modules.getSliderArray();
	for(var i = 0; i < sliderArray.length; i++){
		sliderArray[id][i].disabledBool = false;
	}
	modules.addChartSegment(id);
	modules.updateButtonValue(id);
}
$('.collapse').on('hidden.bs.collapse', function () {
	  // do something…
	var chartArray = modules.getChartArray();
	var totalArray = [];
	for(var i = 0; i < modules.numberOfSliders; i++){
		totalArray[i] = document.getElementById('canvasContainer'+i).getAttribute('totalscore')+'_'+i;
	}
	//totalArray.sort(function(a.match(/[0-9]+/g),b.match(/[0-9]+/g)){return a-b;});
	totalArray.sort(function(a,b){
									var x = a.match(/[0-9]+/g);
									x = parseInt(x[0]);
									var y = b.match(/[0-9]+/g);
									y = parseInt(y[0]);
									 if (x < y) {
									        return 1;
									    }
									    if (x > y) {
									        return -1;
									    }
									    return 0;
									});
	for(var i = 0; i < totalArray.length; i++){
		var thisIndex = totalArray[i].match(/[0-9]+/g)[1];
		var ordinalPosition = modules.getOrdinalPosition(i+1);
		$('#ordianlPosition' + thisIndex).text( ordinalPosition );
		
	}
	var maxIndex = totalArray[0].match(/[0-9]+/g)[1];
	$('#collapse'+maxIndex).collapse('show');
    	chartArray[maxIndex].chartStatus = true;
    	document.getElementById('caretToggle' + maxIndex).className = "fa fa-caret-down fa-lg";
    	document.getElementById('sliderTotal' + maxIndex).style.visibility = "visible";
});

function updateSliderPostion(direction, buttonID){
	var currentPos = $('.sliderWrapper').css('right');
	currentPos = currentPos.match(/[0-9]+/g);
	if(direction == 'right' && (modules.currentSlider + 5) < modules.numberOfSliders){
		document.getElementById(buttonID).disabled = true;
		var newPos =  parseInt(currentPos[0]) + modules.sliderWidth + 'px';
		modules.currentSlider += 1;
		setTimeout(function(){ document.getElementById(buttonID).disabled = false; }, 1000);

	}
	else if(direction == 'left' && modules.currentSlider > 0) {
		document.getElementById(buttonID).disabled = true;
		var newPos =  parseInt(currentPos[0]) - modules.sliderWidth + 'px';
		modules.currentSlider -= 1;
		setTimeout(function(){ document.getElementById(buttonID).disabled = false; }, 1000);
	}
	$('.sliderNavWrapper').css({ right: newPos });
	$('.sliderWrapper').css({ right: newPos });
}

