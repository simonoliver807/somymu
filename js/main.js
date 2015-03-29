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
modules.init(15, 6);


var setButtonValue = function (id) { var buttonID = id.match(/[0-9]+/g); modules.setButtonValue(buttonID); };
var setSliderValue = function (ui, id) { var sliderID = id.match(/[0-9]+/g); modules.setSliderValue(ui.value, sliderID); };
var updateChartPosition = function(ui, id) { modules.updateChartPositions(id);};

$( document ).bind( 'mobileinit', function(){
	  $.mobile.loader.prototype.options.text = "";
	  $.mobile.loader.prototype.options.textVisible = false;
	  $.mobile.loader.prototype.options.theme = "a";
	  $.mobile.loader.prototype.options.html = "";
	  $.mobile.hidePageLoadingMsg();
	});

//window resize event so we change the slider for vertical to horizontal
window.onresize = changeSlider;
function changeSlider() {

    document.getElementById('screenSize').innerHTML = $(window).width();

    var classNames = document.getElementById('tabTap').className;
    var showHide = classNames.indexOf('selectBackground');
    if (showHide !== -1) {
        addHighLight('tabTap');
    }
    var classNames = document.getElementById('tabSlide').className;
    var showHide = classNames.indexOf('selectBackground');
    if (showHide !== -1) {
        addHighLight('tabSlide');
    }
    var windowWidth = $(window).width();
	if(windowWidth <= 992 && !modules.windowResizeBool){
		var orientation = $( ".slider" ).slider( "option", "orientation" );
		$('.slider').slider( "option", "orientation", "horizontal" );
		$('.handleStyle').addClass("fa-rotate-90 fa-lg");
		$('.handleStyle').removeClass("fa-2x");
		// update the grey outs
		var buttonArray = modules.getButtonArray();
		for(var i = 0; i < buttonArray.length; i++){
			if(buttonArray[i].disabledBool){
				setGreyOut(false, i);
				setGreyOut(true, i);
			}
		}
		modules.windowResizeBool = true;
	}
	if(windowWidth > 992){
		if(modules.windowResizeBool){
			var orientation = $( ".slider" ).slider( "option", "orientation" );
			$('.slider').slider( "option", "orientation", "vertical" );
			$('.handleStyle').removeClass("fa-rotate-90 fa-lg");
			$('.handleStyle').addClass("fa-2x");
		    // add and remove the transition class
			$('.sliderWrapper').removeClass('setTransition');
			setTimeout(function () { $('.sliderWrapper').addClass('setTransition'); }, 500);
	        // devide the set width of a slider row by the number of sliders giving the width per slider
			var containerWidth = (modules.sliderWidth * modules.numberOfSliders) + 30;
	        $('.sliderWrapper').css('width', containerWidth);
	        $('.sliderNavWrapper').css('width', containerWidth);
		    // collapse the navbar;
	        document.getElementById('navbarCollapse').className = "";
	        document.getElementById('navbarCollapse').className = "navbar-collapse collapse";
	        modules.windowResizeBool = false;
		}
		// update the grey outs
		var buttonArray = modules.getButtonArray();
		for(var i = 0; i < buttonArray.length; i++){
			if(buttonArray[i].disabledBool){
				setGreyOut(false, i);
				setGreyOut(true, i);
			}
		}
		window.scrollTo(0, 0);
	}	
}
//tooltip events show on hover
$('.sliderContainer').hover(function (event) {
    event.stopPropagation();
    var sliderID = this.children[1].id.match(/[0-9]+/g);

    var sliderArray = modules.getSliderArray();
    for (var i = 0; i < sliderArray.length; i++) {
        for (var j = 0; j < sliderArray[i].length; j++) {
            if (sliderArray[i][j].tooltipBool) {
                if (sliderArray[i][j].sliderID != sliderID[0] + '_' + sliderID[1]) {
                    $('#' + sliderArray[i][j].sliderID).tooltip('hide');
                    sliderArray[i][j].tooltipBool = false;
                }
            }
        }
    }
    if (!sliderArray[sliderID[0]][sliderID[1]].tooltipBool) {
        $('#' + sliderID[0] + '_' + sliderID[1]).tooltip({
            container: 'body',
            html: true,
            placement: 'right',
            trigger: 'manual',
            title: function () {
                //   here will be custom template
                var id = $(this).parent().attr('id');
                id = id.match(/[0-9]+/g);
                return '<div class="tooltipValue">' + sliderArray[id[0]][id[1]].sliderValue  +'</div>';
            }
        }).tooltip('show');
        if (modules.ie9) {
            var position = $('#' + sliderID[0] + '_' + sliderID[1]).offset();
            position.left = position.left + 4;
            position.top = position.top - 44;
            $('.tooltip').css({ left: position.left, top: position.top });
        }
        //$('.tooltip-inner').text(sliderArray[sliderID[0]][sliderID[1]].sliderValue);
        sliderArray[sliderID[0]][sliderID[1]].tooltipBool = true;
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
//$('.collapse').on('hidden.bs.collapse', function () {
//	  // do something…
//	var chartArray = modules.getChartArray();
//	var totalArray = [];
//	for(var i = 0; i < modules.numberOfSliders; i++){
//		totalArray[i] = document.getElementById('canvasContainer'+i).getAttribute('totalscore')+'_'+i;
//	}
//	//totalArray.sort(function(a.match(/[0-9]+/g),b.match(/[0-9]+/g)){return a-b;});
//	totalArray.sort(function(a,b){
//									var x = a.match(/[0-9]+/g);
//									x = parseInt(x[0]);
//									var y = b.match(/[0-9]+/g);
//									y = parseInt(y[0]);
//									 if (x < y) {
//									        return 1;
//									    }
//									    if (x > y) {
//									        return -1;
//									    }
//									    return 0;
//									});
//	for(var i = 0; i < totalArray.length; i++){
//		var thisIndex = totalArray[i].match(/[0-9]+/g)[1];
//		var ordinalPosition = modules.getOrdinalPosition(i+1);
//		$('#ordianlPosition' + thisIndex).text( ordinalPosition );
//		
//	}
//	var maxIndex = totalArray[0].match(/[0-9]+/g)[1];
//	$('#collapse'+maxIndex).collapse('show');
//    	chartArray[maxIndex].chartStatus = true;
//    	document.getElementById('caretToggle' + maxIndex).className = "fa fa-caret-down fa-lg";
//    	document.getElementById('sliderTotal' + maxIndex).style.visibility = "visible";
//});

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
$('.tab').click(function (event) {
    var id = event.currentTarget.id;
    addHighLight(id);
});
function addHighLight(id) {
    switch (id) {
        case "tabTap":
            var classNames = document.getElementById('tabTap').className;
            var showHide = classNames.indexOf('selectBackground');
            if (showHide === -1) {
                classNames = document.getElementById('tabSlide').className;
                showHide = classNames.indexOf('selectBackground');
                if (showHide !== -1) {
                    addHighLight('tabSlide');
                }
                document.getElementById('tabTap').className = classNames + ' selectBackground';
                $('.overlayDiv').addClass('bc');
                var tapTabWidth = document.getElementById('labelsFirstCol').getBoundingClientRect().width;
                var offsetPos = $('#modules').offset();
                var leftMinusPadding = offsetPos.left + getCSSint($('#labelsFirstCol').css('padding-left'));
                document.getElementById('sliderNav').style.background = '0';
                updateOverlay('highLightOverlay1', leftMinusPadding, tapTabWidth, 'tabTap', false);
                updateOverlay('highLightOverlay2', leftMinusPadding, tapTabWidth, 'tabTap', true);
            }
            else {
                $('#tabTap').removeClass('selectBackground');
                $('.buttonColumn').removeClass('selectBackground');
                document.getElementById('labelsFirstCol').className = removeClass('labelsFirstCol', 'selectBackground');
                $('.overlayDiv').removeClass('bc');
                updateOverlay('highLightOverlay1', 0, 0, 0, 0, '', false);
                updateOverlay('highLightOverlay2', 0, 0, 0, 0, '', false);
            }
            break;
        case "tabSlide":
            var classNames = document.getElementById('tabSlide').className;
            var showHide = classNames.indexOf('selectBackground');
            if (showHide === -1) {
                classNames = document.getElementById('tabTap').className;
                showHide = classNames.indexOf('selectBackground');
                if (showHide !== -1) {
                    addHighLight('tabTap');
                }
                $('.slider').addClass('bc');
                document.getElementById('tabSlide').className = classNames + ' selectBackground';
                var tapTabWidth = document.getElementById('labelsSecondCol').getBoundingClientRect().width;
                var offsetPosLeft = $('#sliderRow0').offset().left;
                var widthMinusPadding = tapTabWidth - getCSSint($('#labelsSecondCol').css('padding-left'));
                var leftMinusPadding = offsetPosLeft + getCSSint($('#labelsSecondCol').css('padding-left'));
                document.getElementById('sliderNav').style.background = '0';
                document.getElementById('button1').style.background = '0';
                document.getElementById('button2').style.background = '0';
                document.getElementById('sliderNavWrapper').className = addClass('sliderNavWrapper', 'selectedCBC');
                updateOverlay('highLightOverlay1', leftMinusPadding, widthMinusPadding, 'tabSlide', false);
                updateOverlay('highLightOverlay2', leftMinusPadding, widthMinusPadding, 'tabSlide', true);
            }
            else {
                $('#tabSlide').removeClass('selectBackground');
                $('.slider').removeClass('bc');
                document.getElementById('sliderNav').style.background = '#fff';
                document.getElementById('button1').style.background = '#fff';
                document.getElementById('button2').style.background = '#fff';
                document.getElementById('sliderNavWrapper').className = removeClass('sliderNavWrapper', 'selectedCBC');
                updateOverlay('highLightOverlay1', 0, 0, 0, 0, '', false);
                updateOverlay('highLightOverlay2', 0, 0, 0, 0, '', false);
            }
            break;
        case "tabDecide":

            break;
    }
}
function updateOverlay(id, posLeft, el_width, attrVal, withBG) {
    // calculate the height and top of the highlight which the same for all 3
    var posTop = $('#game-content').offset().top;
    var gamePadding = $('#game-content').css('padding-top');
    var el_height = $('#game-content').height() + parseInt(gamePadding.match(/[0-9]+/g)[0]);
    document.getElementById(id).style.left = posLeft + 'px';
    document.getElementById(id).style.top = posTop + 'px';
    document.getElementById(id).style.width = el_width + 'px';
    document.getElementById(id).style.height = el_height + 'px';
    if (withBG) {
        document.getElementById(id).style.background = '#73c1ca';
        document.getElementById(id).style.zIndex = '-1';
    }
    document.getElementById(id).setAttribute(id, attrVal);

}
document.getElementById('highLightOverlay1').addEventListener('click',
    function () {
        var attrVal = document.getElementById('highLightOverlay1').getAttribute('highLightOverlay1');
        addHighLight(attrVal);
    });