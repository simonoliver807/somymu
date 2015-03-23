"use strict";

var ButtonModule = (function () {
	var buttonValue;
    var buttonID;
    var buttonUpdateID;
    var disabledBool;
    return {
        setButtonID: function (buttonID) {
            this.buttonID = buttonID;
            this.buttonUpdateID = buttonID;
            this.disabledBool = false;
            this.buttonValue = 1;
        },
        //getButtonID: function (){
        //    return this.buttonID;
        //},
        setButtonValue: function () {
            if (this.buttonValue === 5) { this.buttonValue = 1; }
            else { this.buttonValue += 1; }
        }
    };
});
var SliderModule = (function () {
	var sliderValue;
    var totalValue;
    var sliderID;
    var disabledBool;
    var tooltipBool;
    var setSliderValue;
    return {
        setSliderID: function (sliderID) {
    		this.sliderValue = 		0;
    	 	this.totalValue = 		0;
            this.sliderID = 		sliderID;
            this.disabledBool = 	false;
            this.tooltipBool = 		false;
            this.overscrollStatus = false;
            this.setSliderValue	   = '000';
        },
        setValues: function (sliderValue, buttonValue) {
            if (sliderValue !== '') {
                this.sliderValue = sliderValue - 1;
                //  update the tooltip
                var position = $('#' + this.sliderID).offset();
                position.left = position.left;
                position.top = position.top - 35;
                $('.tooltip').css({ left: position.left, top: position.top });
                if(this.sliderValue < 10){this.setSliderValue = '00'+this.sliderValue;}
                else if(this.sliderValue < 100){this.setSliderValue = '0' + this.sliderValue;}
                else { this.setSliderValue = 100;}
                $('.tooltip-inner').text(this.setSliderValue);
                // update the width of the slider background
                document.getElementById('sliderBackground' + this.sliderID).style.width = this.sliderValue + '%';
            }
            this.totalValue = buttonValue * this.sliderValue;
        }
    };
});
var DoughNutModule = (function () {
    var doughnutID;
    var doughnutObject;
    var chartStatus;
    var ordinalPosition;
    var totalScore;
    return {
        setDoughnutID: function (doughnutID, ordinalPosition) {
            this.doughnutID = doughnutID;
            this.doughnutObject = {};
            this.chartStatus = true;
            this.ordialPosition = ordinalPosition;
            this.totalScore = 0;
        },
        data: [
                {
                    value: 10,
                    color: "#ca97af",
                },
                {

                    value: 0,
                    color: "#883682",
                },
                {
                    value: 10,
                    color: "#76A3A8",
                },
                {
                    value: 0,
                    color: "#1F74C9",
                },
                {
                    value: 10,
                    color: "#FFE680",
                },
                {
                    value: 0,
                    color: "#FDC732",
                },
                {
                    value: 10,
                    color: "#F5BF93",

                },
                {
                    value: 0,
                    color: "#E2282F",
                },
                 {
                     value: 10,
                     color: "#D8E8AE",
                 },
                 {
                     value: 0,
                     color: "#4FBD55",
                 }
//                 ,
//                 {
//                     value: 10,
//                     color: "#d10b49",
//                 },
//                 {
//                     value: 0,
//                     color: "#acdcaa",
//                 }
        ]
    }
});
var UIModule = (function () {
    var sliderArray = [];
    var buttonArray = [];
    var doughnutArray = [];
    var numberOfSliders;
    var numberOfButtons;
    var currentSlider;
    var sliderWidth;
    var templateModule;
    var id;
    var ie9 = false;
    var windowWidth;
    var windowResizeBool;

    return {
        init: function (numberOfSliders, numberOfButtons) {
            if (document.getElementsByTagName("body")[0].getAttribute("browser") == 'ie9') {
                document.getElementsByTagName("body")[0].className = 'cms-bootstrap ie9';
                this.ie9 = 'ie9';
            };
            // set up screen size
             this.windowWidth = window.outerWidth;
            //this.windowWidth = 900;
            var templateModule = new TemplateModule();
            
            this.numberOfSliders = numberOfSliders;
            this.numberOfButtons = numberOfButtons;
            this.currentSlider = 0;
            this.windowResizeBool = false;
            ///////////////////////////////////////////////////////////////////////////////////////
            // have hard code the width of the sider row and the slider container maybe get from hidden input on index page
            ///////////////////////////////////////////////////////////////////////////////////////
            this.sliderWidth = 110;
            this.sliderRowWidth = 525;
            
            
            
            //$.getJSON("js/doughnutData.json", function (data) {
            //    for (i = 0; i < data.length; i++) {
            //        doughnutArray[i] = new DoughNutModule;
            //        doughnutArray[i].setDoughnutID(i);
            //        doughnutArray[i].doughnutObject = templateModule.createDoughnut(i, data);
            //    }
            //});

            //lets create an array of buttons and a array of doughnuts to start
            var sliderLabels = ['Arsenal', 'Chelsea', 'Liverpool', 'Portsmouth', 'Man United', 'Man City', 'Leeds', 'Bournemouth'];
            var buttonLabels = ['Manager', 'Goal Keeper & Defence', 'Midfield', 'league Position & Recent Form', 'Attack'];


            // add a label for each slider
            for (var i = 0; i < sliderLabels.length; i++) {
                $('#sliderNavWrapper').append('<li class="sliderLabelContainer">' + sliderLabels[i] + '</li>');
            }


            for (var i = 0; i < numberOfButtons; i++) {
                buttonArray[i] = new ButtonModule();
                buttonArray[i].setButtonID(i);
                templateModule.createButton(i, buttonLabels[i]);
            }
            for (var sliderColumn = 0; sliderColumn < numberOfButtons; sliderColumn++) {
                // for each column of sliders, one for each button, create a column
                var sliderColumnArray = [];
                for (var i = 0; i < numberOfSliders; i++) {
                    sliderColumnArray[i] = new SliderModule();
                    var sliderID = sliderColumn + '_' + i;
                    sliderColumnArray[i].setSliderID(sliderID);
                    templateModule.createSlider(sliderID, sliderColumn, sliderLabels[i], this.windowWidth);
                }
                sliderArray.push(sliderColumnArray);
            }
            for (var i = 0; i < numberOfSliders; i++){
            	// create a chart for each sliderColumn
            	doughnutArray[i] = new DoughNutModule();
            	var ordinalPosition = this.getOrdinalPosition(i+1);
            	doughnutArray[i].setDoughnutID(i, ordinalPosition);
            	doughnutArray[i].doughnutObject = templateModule.createDoughnut(i, doughnutArray[i].data, sliderLabels[i], ordinalPosition);
    		}
            	// resize all the charts
            $('canvas').css({width:'100%',height:'100%'});
//            for (var slider = 0; slider < numberOfSliders; slider++) {
//                for (var sliderRow = 0; sliderRow < numberOfSliders; sliderRow++) {
//                    var sliderID = sliderRow + '_' + slider;
//                    templateModule.createSlider(sliderID, slider, sliderLabels[sliderRow], this.windowWidth);
//                }
//            }
            // update the handle style and the height of the button colmuns
            var e = document.getElementsByClassName('ui-slider-handle');
            for (var i = 0; i < e.length; i++) {
            	if(this.windowWidth < 1024){
            		e[i].className = e[i].className + ' fa fa-minus-square fa-lg fa-rotate-90 handleStyle';
            	}
            	else {
            		e[i].className = e[i].className + ' fa fa-minus-square fa-2x handleStyle';
            	}
            }
            // don't need to do this for iphone
            if(this.windowWidth > 992){
                // set up the width of the slider container
                var rowWidth = this.sliderRowWidth;
                // devide the set width of a slider row by the number of sliders giving the width per slider
                var containerWidth = (rowWidth / 5) * numberOfSliders;
                $('.sliderWrapper').css('width', containerWidth);
                $('.sliderNavWrapper').css('width', containerWidth);
                this.sliderWidth = $('.sliderContainer').outerWidth();
              
            }
            // update the chart positions so only the css is updated
            this.updateChartPositions();
           
        },
        setButtonValue: function (buttonID) {
            var button = buttonArray[buttonID];
            button.setButtonValue();
            var buttonValue = buttonArray[buttonID].buttonValue;
            // update the total value for the slider
            for (var i = 0; i < this.numberOfSliders; i++) {
                sliderArray[buttonID][i].setValues('', buttonValue);
            }
            if (buttonArray[buttonID].buttonValue === 1) {
                $('#moduleButton' + buttonID).children().removeClass('overlayDiv' + 5);
            }
            else { $('#moduleButton' + buttonID).children().removeClass('overlayDiv' + (buttonArray[buttonID].buttonValue - 1)); }
            $('#moduleButton' + buttonID).children().addClass('overlayDiv' + buttonArray[buttonID].buttonValue);


            // var buttonSize = ['0.5em', '0.75em', '1em', '1.2em', '2em'];
            // var fontSize = buttonSize[buttonValue - 1];
            //$('.buttonInner' + buttonID).animate({
            //    fontSize: fontSize
            //   }, 30, function() {
            //    // Animation complete.
            //});
            //$('.buttonInner' + buttonID).css({ 'font-size': fontSize });


            // this update the total value
            this.updateButtonValue(buttonID);

        },
        setSliderValue: function (sliderValue, sliderID) {
            // update the slider module values each time the slider moves
            sliderArray[sliderID[0]][sliderID[1]].setValues(sliderValue, buttonArray[sliderID[0]].buttonValue);
           
            this.updateTotal(sliderID[[1]]);
            var chartObject = doughnutArray[sliderID[1]].doughnutObject;
            var segment1 =  (parseInt(sliderID[0]) * 2 ); 
            var segment2  = segment1 + 1;
            
            var sliderValue = sliderArray[sliderID[0]][sliderID[1]].totalValue / 10;
            var buttonValue = (buttonArray[sliderID[0]].buttonValue * 10) - sliderValue;
            
            chartObject.segments[segment1].value = buttonValue;
            chartObject.segments[segment2].value = sliderValue;
            chartObject.update();

        },
        updateButtonValue: function (buttonNumber) {
        	var updateDoughnut = false;
            for (var sliderNumber = 0; sliderNumber < this.numberOfSliders; sliderNumber++) {
                var chartObject = doughnutArray[sliderNumber].doughnutObject;
                var sliderValue = sliderArray[buttonNumber][sliderNumber].totalValue / 10;
                var buttonValue = (buttonArray[buttonNumber].buttonValue * 10) - sliderValue;             
	        	var segment1 =  (parseInt(buttonNumber) * 2 ); 
	            var segment2  = segment1 + 1;
	            chartObject.segments[segment1].value = buttonValue;
	            chartObject.segments[segment2].value = sliderValue;
	            chartObject.update();
	            this.updateTotal(sliderNumber); 
            }
        	this.updateChartPositions();
        },
        updateTotal: function (labelNumber) {
        	// then update the total value
            var sliderTotal = 0;
            var weightTotal = 0;
            var verticleNumber = 0; 
            for (var rowNumber = 0; rowNumber < this.numberOfButtons; rowNumber++) {
            	if(!buttonArray[rowNumber].disabledBool){
            		sliderTotal = sliderTotal + sliderArray[rowNumber][labelNumber].totalValue;
                	weightTotal += buttonArray[rowNumber].buttonValue;
            	}
            }
            var chartTotalHTML = Math.round(100 * (sliderTotal / (weightTotal * 100)));
            doughnutArray[labelNumber].totalScore  = chartTotalHTML;
            if(chartTotalHTML < 10){
            	 document.getElementById('sliderTotal' + labelNumber).style.left = "67px";
            }
            else {
            	document.getElementById('sliderTotal' + labelNumber).style.left = "66px";
            }
            document.getElementById('sliderTotal' + labelNumber).innerHTML = chartTotalHTML;
            document.getElementById('sliderTotalSmall' + labelNumber).innerHTML = chartTotalHTML;
        },
        removeChartSegment: function (id) {
        	var deleteSegment = buttonArray[id].buttonUpdateID * 2;
        	for(var i = 0; i < doughnutArray.length; i ++){
        		doughnutArray[i].doughnutObject.removeData(deleteSegment);
        		doughnutArray[i].doughnutObject.removeData(deleteSegment);
        	}
        },
        addChartSegment: function (id) {
        	id = parseInt(id) * 2;
        	var idPlus1 = id + 1;
        	for(var i = 0; i < doughnutArray.length; i ++){
        		var data = doughnutArray[i].data; 
        		doughnutArray[i].doughnutObject.addData({
            		value: 1,
                    color: data[id].color
            	}, String(id));
        		doughnutArray[i].doughnutObject.addData({
            		value: 0,
                    color: data[idPlus1].color
            	}, idPlus1);
        	}
        },
        updateChartPositions: function () {
        	
        	for(var i = 0; i < this.numberOfSliders; i++){
        		document.getElementById('canvasContainer'+i).setAttribute('totalScore', doughnutArray[i].totalScore);	
        	}
        	tinysort('ul.results>li',{attr:'totalScore',order:'desc'}); 
        	$('.results').children('li').each(function () {
        	    this.className = "";
        	});
        	var count = 1;
        	self = this;
        	$('.results').children('li').each(function () {
        		var op = self.getOrdinalPosition(count);
        		var thisID = this.id;
        		thisID = thisID.match(/[0-9]+/g);
        		$('#ordianlPosition'+thisID[0]).text(op);
        		if(count == 1){
        			$('#canvas'+thisID[0]).css('display','block');
        		}
        		else {
        			$('#canvas'+thisID[0]).css('display','none');
        		}
        		count = count + 1;

        	});
        	var firstLi = $('.results');
        	firstLi.children(":first").addClass("first");
        },
        getOrdinalPosition: function (n) {
        	var s=["th","st","nd","rd"],
            v=n%100;
        	return n+(s[(v-20)%10]||s[v]||s[0]);
        },
        getSliderArray: function () {
            return sliderArray;
        },
        getChartArray: function () {
            return doughnutArray;
        },
        getButtonArray: function () {
            return buttonArray;
        }
    }
});
