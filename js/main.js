"use strict";

function l(output){
	
	console.log('the output is '+ output);
}

var modules = new UIModule();
modules.init(8, 5);


//filler row i was using to push the sliders down below the nav bar
//var setHeight =  $('#headerRow').height(); 
//document.getElementById('fillerRow').style.height = setHeight+'px';
var iHeight = window.screen.height;
$('.leftRightButton').css('top', iHeight/3);

//alert(window.screen.width);

var setButtonValue = function (id) { var buttonID = id.match(/[0-9]+/g); modules.setButtonValue(buttonID); }
var setSliderValue = function (ui, id) { var sliderID = id.match(/[0-9]+/g); modules.setSliderValue(ui.value, sliderID); }
var updateChartPosition = function(ui, id) { modules.updateChartPositions(id);}

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
	var screenWidth = window.outerWidth;
	if(screenWidth <= 1024 ){
		var orientation = $( ".slider" ).slider( "option", "orientation" );
		$('.slider').slider( "option", "orientation", "horizontal" );
		$('.handleStyle').addClass("fa-rotate-90");
	}
	if(screenWidth > 1024){
		var orientation = $( ".slider" ).slider( "option", "orientation" );
		$('.slider').slider( "option", "orientation", "vertical" );
		$('.handleStyle').removeClass("fa-rotate-90");
		window.scrollTo(0, 0);
	}
//	var setHeight =  $('#headerRow').height(); 
//	document.getElementById('fillerRow').style.height = setHeight+'px';
	
	
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
            trigger: 'manual',
            title: function () {
                //   here will be custom template
                var id = $(this).parent().attr('id');
                id = id.match(/[0-9]+/g);
                var sliderValue = sliderArray[id[0]][id[1]].setSliderValue;
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
document.getElementById('tabs').addEventListener('mouseover',
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
	$('.tooltip').tooltip('hide'); })
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

})

// grey out the sliders, button and chart
$('.greyOutClick').click(function () {
	var id = this.id.match(/[0-9]+/g);
	var greyOutWidth = $('.moduleRow'+id ).outerWidth();
	var greyOutHeight = $('.moduleRow'+id ).outerHeight();
	var rowOffset = $('.moduleRow'+id ).offset();
	var buttonArray = modules.getButtonArray();
	var buttonUpdateID = 0;
	document.getElementById('greyOut'+id).setAttribute('class','fa fa-plus fa-lg greyOutClick');
	$('body').append('<div class="greyOut" id="greyOutOverlay'+id+'" style="width:'+greyOutWidth+'px;height:'+greyOutHeight+'px;top:'+rowOffset.top+'px;left:'+rowOffset.left+'px;">'+
					 '<div class="greyOutPlus" id="greyOutPlus'+id+'" onclick="turnOffGrey(this.id)"></div>'+
					 '</div>');
	// set the disabled bool for sliders to true
	var sliderArray = modules.getSliderArray();
	for(var i = 0; i < sliderArray.length; i++){
		sliderArray[i][id].disabledBool = true
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
		else { buttonArray[i].buttonUpdateID = undefined;}
	}
	modules.updateButtonValue(id);
	
});
function turnOffGrey(id){
	var id = id.match(/[0-9]+/g);
	var plusMinusSignID = 'greyOut' + id;
	var buttonArray = modules.getButtonArray();
	var buttonUpdateID = 0;
	$('#greyOutOverlay'+id).remove();
	document.getElementById(plusMinusSignID).setAttribute('class','fa fa-minus fa-lg greyOutClick');
	buttonArray[id].disabledBool = false;
	for(var i = 0; i < modules.numberOfButtons; i++){
		if(!buttonArray[i].disabledBool){
			buttonArray[i].buttonUpdateID = buttonUpdateID;
			buttonUpdateID += 1;
		}
		else { buttonArray[i].buttonUpdateID = undefined;}	
	}
	// set the disabled bool for sliders to true
	var sliderArray = modules.getSliderArray();
	for(var i = 0; i < sliderArray.length; i++){
		sliderArray[i][id].disabledBool = false
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
	//var elem = document.getElementById('sliderColumns0');
	//elem.style.right = "100px";
	
	var currentPos = $('.sliderWrapper').css('right');
	currentPos = currentPos.match(/[0-9]+/g);
	if(direction == 'right' && (modules.currentSlider + 5) < modules.numberOfSliders){
		document.getElementById(buttonID).disabled = true;
		var newPos =  parseInt(currentPos[0]) + modules.sliderWidth + 'px';
		modules.currentSlider += 1;
		setTimeout(function(){ l('sdfs'); document.getElementById(buttonID).disabled = false; }, 1000);

	}
	else if(direction == 'left' && modules.currentSlider > 0) {
		document.getElementById(buttonID).disabled = true;
		var newPos =  parseInt(currentPos[0]) - modules.sliderWidth + 'px';
		modules.currentSlider -= 1;
		setTimeout(function(){ l('sdfs'); document.getElementById(buttonID).disabled = false; }, 1000);
		//a = setInterval(function(){ updateSliderPostion('left'); }, 1000);
	}
	//else {clearInterval(a);}
	$('.sliderWrapper').css({right: newPos});
	
}
$('.slider').on("taphold",function(){
	  console.log('lsdkjf');
});
	