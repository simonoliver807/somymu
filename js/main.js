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
function updateClassNames(getClassEl, theClassNames) {
    var e = document.getElementsByClassName(getClassEl);
    for (var i = 0; i < e.length; i++) {
        e[i].className = e[i].className + theClassNames;
    }
}
function getCSSint(el) {
    var strVal = el.replace('px', '');
    return parseInt(strVal);
}

var modules = new UIModule();
modules.init('', 6, 'ui3');
//modules.init(10, 6, 'ui1');


var setButtonValue = function (id) { var buttonID = id.match(/[0-9]+/g); modules.setButtonValue(buttonID); };
var setSliderValue = function (ui, id) {
    var sliderID = id.match(/[0-9]+/g);
    if (modules.uiType == 'ui1') {
        modules.setSliderValue(ui.value, sliderID);
    }
    else {
        modules.setSliderYNValue(ui.value, sliderID);
    }
};
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
    l($(window).width())

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
    var classNames = document.getElementById('tabDecide').className;
    var showHide = classNames.indexOf('selectBackground');
    if (showHide !== -1) {
        addHighLight('tabDecide');
    }
    var windowWidth = $(window).width();
    if (windowWidth <= 992 && !modules.windowResizeBool) {
        if (modules.uiType == 'ui1') {
            var orientation = $(".slider").slider("option", "orientation");
            $('.slider').slider("option", "orientation", "horizontal");
            $('.handleStyle').addClass("fa-rotate-90 fa-lg");
            $('.handleStyle').removeClass("fa-2x");
            $('.elementWrapper').addClass('elementWrapperWidth');
        }
        if (modules.uiType == 'ui3') {
            $('.handleStyle').addClass("fa-lg");
            $('.handleStyle').removeClass("fa-2x");
            $('.elementWrapper').addClass('elementWrapperWidth');
        }
		// update the grey outs
		var buttonArray = modules.getButtonArray();
		for(var i = 0; i < buttonArray.length; i++){
			if(buttonArray[i].disabledBool){
				setGreyOut(false, i);
				setGreyOut(true, i);
			}
		}
		$('.elementWrapper').removeClass('setTransition');
		document.getElementById('tabDecide').disabled = true;
		document.getElementById('tabSlide').disabled = true;
		document.getElementById('tabTap').disabled = true;
		modules.windowResizeBool = true;
	}
	if(windowWidth > 992){
	    if (modules.windowResizeBool) {
	        if (modules.uiType == 'ui1') {
	            var orientation = $(".slider").slider("option", "orientation");
	            $('.slider').slider("option", "orientation", "vertical");
	            $('.handleStyle').removeClass("fa-rotate-90 fa-lg");
	            $('.handleStyle').addClass("fa-2x");
	            $('.elementWrapper').removeClass('elementWrapperWidth');
	        }
	        if (modules.uiType == 'ui3') {
	            $('.handleStyle').removeClass("fa-lg");
	            $('.handleStyle').addClass("fa-2x");
	            $('.elementWrapper').removeClass('elementWrapperWidth');
	        }
	        // add and remove the transition class
	        setTimeout(function () {
	            $('.elementWrapper').addClass('setTransition');
	        }, 500);
	        if(modules.uiType !== 'ui3'){
	            // devide the set width of a slider row by the number of sliders giving the width per slider
			    var containerWidth = (modules.elementWidth * modules.numberOfElements) + 30;
	            $('.elementWrapper').css('width', containerWidth);
	            $('.sliderNavWrapper').css('width', containerWidth);
	        }
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
		document.getElementById('tabDecide').disabled = false;
		document.getElementById('tabSlide').disabled = false;
		document.getElementById('tabTap').disabled = false;
		window.scrollTo(0, 0);
	}	
}
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
    if (modules.numberOfGreyOuts > 1) {
        var id = this.id.match(/[0-9]+/g);
        var buttonArray = modules.getButtonArray();
        var buttonUpdateID = 0;
        setGreyOut(true, id);
        // set the disabled bool for sliders to true
        var elementArray = modules.getElementArray();
        for (var i = 0; i < modules.numberOfSliders; i++) {
            elementArray[id][i].disabledBool = true;
        }
        // remove the segemnts disabled
        modules.removeChartSegment(id);
        //modules.numberNotDisable -= 1;

        // update the temp id's for the button so they match the new amount of segments
        buttonArray[id].disabledBool = true;
        for (var i = 0; i < modules.numberOfButtons; i++) {
            if (!buttonArray[i].disabledBool) {
                buttonArray[i].buttonUpdateID = buttonUpdateID;
                buttonUpdateID += 1;
            }
            else { buttonArray[i].buttonUpdateID = null; }
        }
        modules.updateButtonValue(id);
        modules.numberOfGreyOuts -=1;
    }
	
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
	var elementArray = modules.getElementArray();
	for(var i = 0; i < modules.numberOfSliders; i++){
		elementArray[id][i].disabledBool = false;
	}
	modules.addChartSegment(id);
	modules.updateButtonValue(id);
	modules.numberOfGreyOuts += 1;
}
function updateSliderPostion(direction, buttonID){
	var currentPos = $('.elementWrapper').css('right');
	currentPos = currentPos.match(/[0-9]+/g);
	if (direction == 'right' && (modules.currentElement + 5) < modules.numberOfElements) {
		document.getElementById(buttonID).disabled = true;
		var newPos =  parseInt(currentPos[0]) + modules.elementWidth + 'px';
		modules.currentElement += 1;
		setTimeout(function(){ document.getElementById(buttonID).disabled = false; }, 1000);

	}
	else if(direction == 'left' && modules.currentElement > 0) {
		document.getElementById(buttonID).disabled = true;
		var newPos =  parseInt(currentPos[0]) - modules.elementWidth + 'px';
		modules.currentElement -= 1;
		setTimeout(function(){ document.getElementById(buttonID).disabled = false; }, 1000);
	}
	$('.sliderNavWrapper').css({ right: newPos });
	$('.elementWrapper').css({ right: newPos });
}
$('.tab').click(function (event) {
    var id = event.currentTarget.id;
    addHighLight(id);
});
function addHighLight(id) {
    var tabList = ['tabTap', 'tabSlide', 'tabDecide'];
    switch (id) {
        case "tabTap":
            var classNames = document.getElementById('tabTap').className;
            var showHide = classNames.indexOf('selectBackground');
            if (showHide === -1) {
                for (var i = 0; i < tabList.length; i++) {
                    var classNamesTabs = document.getElementById(tabList[i]).className;
                    showHide = classNamesTabs.indexOf('selectBackground');
                    if (showHide !== -1) {
                        addHighLight(tabList[i]);
                    }
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
                for (var i = 0; i < tabList.length; i++) {
                    var classNamesTabs = document.getElementById(tabList[i]).className;
                    showHide = classNamesTabs.indexOf('selectBackground');
                    if (showHide !== -1) {
                        addHighLight(tabList[i]);
                    }
                }
                $('.slider').addClass('bc');
                document.getElementById('tabSlide').className = classNames + ' selectBackground';
                var tapTabWidth = document.getElementById('labelsSecondCol').getBoundingClientRect().width;
                var offsetPosLeft = $('#tabSlide').offset().left;
                var widthMinusPadding = tapTabWidth - getCSSint($('#labelsSecondCol').css('padding-left'));
                document.getElementById('sliderNav').style.background = '0';
                document.getElementById('button1').style.background = '0';
                document.getElementById('button2').style.background = '0';
                document.getElementById('labelsBackground').className = '';
                document.getElementById('sliderNavWrapper').className = addClass('sliderNavWrapper', 'selectedCBC');
                updateOverlay('highLightOverlay1', offsetPosLeft, widthMinusPadding, 'tabSlide', false);
                updateOverlay('highLightOverlay2', offsetPosLeft, widthMinusPadding, 'tabSlide', true);
            }
            else {
                $('#tabSlide').removeClass('selectBackground');
                $('.slider').removeClass('bc');
                document.getElementById('button1').style.background = '#fff';
                document.getElementById('button2').style.background = '#fff';
                document.getElementById('labelsBackground').className = 'labelsBackground';
                document.getElementById('sliderNavWrapper').className = removeClass('sliderNavWrapper', 'selectedCBC');
                updateOverlay('highLightOverlay1', 0, 0, 0, 0, '', false);
                updateOverlay('highLightOverlay2', 0, 0, 0, 0, '', false);
            }
            break;
        case "tabDecide":
            var classNames = document.getElementById('tabDecide').className;
            var showHide = classNames.indexOf('selectBackground');
            if (showHide === -1) {
                for (var i = 0; i < tabList.length; i++) {
                    var classNamesTabs = document.getElementById(tabList[i]).className;
                    showHide = classNamesTabs.indexOf('selectBackground');
                    if (showHide !== -1) {
                        addHighLight(tabList[i]);
                    }
                }
                document.getElementById('tabDecide').className = classNames + ' selectBackground';
                document.getElementById('results').className = addClass('results', 'selectedCBC');
                $('.result-header').addClass('selectedCBC45');
                var firstBool = true;
                $('.results').children('li').each(function () {
                    if (firstBool) {
                        this.className = 'firstNoBackground';
                        firstBool = false;
                    }
                    else {
                        this.className = 'chartHeaderNoBackground';
                    }
                });
                var tapDecideWidth = document.getElementById('results').getBoundingClientRect().width;
                var offsetPos = $('#results').offset();
                updateOverlay('highLightOverlay1', offsetPos.left, tapDecideWidth, 'tabDecide', false);
            }
            else {
                $('#tabDecide').removeClass('selectBackground');
                removeClass('results', 'selecetedCBC');
                document.getElementById('results').className = removeClass('results', 'selectedCBC');
                $('.result-header').removeClass('selectedCBC45');
                var firstBool = true;
                $('.results').children('li').each(function () {
                    if (firstBool) {
                        this.className = 'first';
                        firstBool = false;
                    }
                    else {
                        this.className = 'defaultChartHeader';
                    }
                });
            }
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