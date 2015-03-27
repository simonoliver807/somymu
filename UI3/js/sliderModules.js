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
var scorerModule = (function () {
	var scorerValue;
    var totalValue;
    var scorerID;
    var disabledBool;
    var tooltipBool;
    var setscorerValue;
    return {
        setscorerID: function (scorerID) {
    		this.scorerValue = 		0;
    	 	this.totalValue = 		0;
            this.scorerID = 		scorerID;
            this.disabledBool = 	false;
            this.tooltipBool = 		false;
            this.overscrollStatus = false;
            this.setScorerValue	   = 0;
        },
        setValues: function (scorerValue, buttonValue) {
            if (scorerValue !== '') {
                this.setScorerValue += 1
                if (this.setScorerValue == 6) {
                    this.setScorerValue = 0;
                }
                this.scorerValue = this.setScorerValue * 20;
            }
            this.totalValue = buttonValue * this.scorerValue;
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
        }
    }
});
var UIModule = (function () {
    var scorerArray = [];
    var buttonArray = [];
    var doughnutArray = [];
    var numberOfscorers;
    var numberOfButtons;
    var currentscorer;
    var scorerWidth;
    var templateModule;
    var id;
    var ie9 = false;
    var windowWidth;
    var windowResizeBool;

    return {
        init: function (numberOfscorers, numberOfButtons) {
            if (document.getElementsByTagName("body")[0].getAttribute("browser") == 'ie9') {
                document.getElementsByTagName("body")[0].className = 'cms-bootstrap ie9';
                this.ie9 = 'ie9';
            };
            // set up screen size
             this.windowWidth = window.outerWidth;
            //this.windowWidth = 900;
            var templateModule = new TemplateModule();
            var self = this;
            this.numberOfscorers = numberOfscorers;
            this.numberOfButtons = numberOfButtons;
            this.currentscorer = 0;
            this.windowResizeBool = false;
            ///////////////////////////////////////////////////////////////////////////////////////
            // have hard code the width of the sider row and the scorer container maybe get from hidden input on index page
            ///////////////////////////////////////////////////////////////////////////////////////
            this.scorerWidth = 110;
            //this.scorerRowWidth = 525;
            
            
            
            //$.getJSON("js/doughnutData.json", function (data) {
            //    for (i = 0; i < data.length; i++) {
            //        doughnutArray[i] = new DoughNutModule;
            //        doughnutArray[i].setDoughnutID(i);
            //        doughnutArray[i].doughnutObject = templateModule.createDoughnut(i, data);
            //    }
            //});

            //lets create an array of buttons and a array of doughnuts to start
            var scorerLabels = ['Arsenal', 'Chelsea', 'Liverpool', 'Portsmouth', 'Man United', 'Man City', 'Leeds', 'Bournemouth'];
            var buttonLabels = ['Manager', 'Goal Keeper & Defence', 'Midfield', 'league Position & Recent Form', 'Attack'];


            // add a label for each scorer
            for (var i = 0; i < this.numberOfscorers; i++) {
                $('#sliderNavWrapper').append('<li class="sliderLabelContainer">' + scorerLabels[i] + '</li>');
            }


            for (var i = 0; i < numberOfButtons; i++) {
                buttonArray[i] = new ButtonModule();
                buttonArray[i].setButtonID(i);
                templateModule.createButton(i, buttonLabels[i]);
            }
            for (var scorerColumn = 0; scorerColumn < numberOfButtons; scorerColumn++) {
                // for each column of scorers, one for each button, create a column
                var scorerColumnArray = [];
                for (var i = 0; i < numberOfscorers; i++) {
                    scorerColumnArray[i] = new scorerModule();
                    var scorerID = scorerColumn + '_' + i;
                    scorerColumnArray[i].setscorerID(scorerID);
                    templateModule.createScorer(scorerID, scorerColumn, scorerLabels[i], this.windowWidth);
                }
                scorerArray.push(scorerColumnArray);
            }
            var chartData = document.getElementById('jsonInput').value;
            chartData = JSON.parse(chartData);
            for (var i = 0; i < numberOfscorers; i++){
            	// create a chart for each scorerColumn
                doughnutArray[i] = new DoughNutModule();
                var jsonItems = document.getElementById('jsonInput').value;
     
            	var ordinalPosition = this.getOrdinalPosition(i+1);
            	doughnutArray[i].setDoughnutID(i, ordinalPosition);
            	doughnutArray[i].doughnutObject = templateModule.createDoughnut(i, chartData, scorerLabels[i], ordinalPosition);
            }
            // bind click events to all the buttons
            $('.scorer').on('click', function () {
                self.setScorerValue(this.id);
            });
            // resize all the charts
            $('canvas').css({width:'95%',height:'95%'});
            // don't need to do this for iphone
            if(this.windowWidth > 992){
                // multiply the number of scorers by the width of the scorers to give the scorer container width
                var containerWidth = (this.scorerWidth * this.numberOfscorers) + 30;
                $('.scorerWrapper').css('width', containerWidth);
                $('.sliderNavWrapper').css('width', containerWidth);    
            }
            // update the chart positions so only the css is updated
            this.updateChartPositions();
           
        },
        setButtonValue: function (buttonID) {
            var button = buttonArray[buttonID];
            button.setButtonValue();
            var buttonValue = buttonArray[buttonID].buttonValue;
            // update the total value for the scorer
            for (var i = 0; i < this.numberOfscorers; i++) {
                scorerArray[buttonID][i].setValues('', buttonValue);
            }
            if (buttonArray[buttonID].buttonValue === 1) {
                $('#moduleButton' + buttonID).children().removeClass('overlayDiv' + 5);
            }
            else { $('#moduleButton' + buttonID).children().removeClass('overlayDiv' + (buttonArray[buttonID].buttonValue - 1)); }
            $('#moduleButton' + buttonID).children().addClass('overlayDiv' + buttonArray[buttonID].buttonValue);
            // this update the total value
            this.updateButtonValue(buttonID);

        },
        setScorerValue: function (scorerID) {
            var scorerID = scorerID.match(/[0-9]+/g);
            // update the scorer module values each time the scorer moves
            scorerArray[scorerID[0]][scorerID[1]].setValues(scorerValue, buttonArray[scorerID[0]].buttonValue);
            var op = this.getOrdinalPosition(scorerArray[scorerID[0]][scorerID[1]].setScorerValue);
            if (scorerArray[scorerID[0]][scorerID[1]].setScorerValue !== 0) {
                document.getElementById('scorerValue' + scorerID[0] + '_' + scorerID[1]).innerHTML = op;
            }
            else {
                document.getElementById('scorerValue' + scorerID[0] + '_' + scorerID[1]).innerHTML = '';
            }
           
            this.updateTotal(scorerID[[1]]);
            var chartObject = doughnutArray[scorerID[1]].doughnutObject;
            var segment1 =  (parseInt(scorerID[0]) * 2 ); 
            var segment2  = segment1 + 1;
            
            var scorerValue = scorerArray[scorerID[0]][scorerID[1]].totalValue / 10;
            var buttonValue = (buttonArray[scorerID[0]].buttonValue * 10) - scorerValue;
            
            chartObject.segments[segment1].value = buttonValue;
            chartObject.segments[segment2].value = scorerValue;
            chartObject.update();

        },
        updateButtonValue: function (buttonNumber) {
        	var updateDoughnut = false;
            for (var scorerNumber = 0; scorerNumber < this.numberOfscorers; scorerNumber++) {
                var chartObject = doughnutArray[scorerNumber].doughnutObject;
                var scorerValue = scorerArray[buttonNumber][scorerNumber].totalValue / 10;
                var buttonValue = (buttonArray[buttonNumber].buttonValue * 10) - scorerValue;             
	        	var segment1 =  (parseInt(buttonNumber) * 2 ); 
	            var segment2  = segment1 + 1;
	            chartObject.segments[segment1].value = buttonValue;
	            chartObject.segments[segment2].value = scorerValue;
	            chartObject.update();
	            this.updateTotal(scorerNumber); 
            }
        	this.updateChartPositions();
        },
        updateTotal: function (labelNumber) {
        	// then update the total value
            var scorerTotal = 0;
            var weightTotal = 0;
            var verticleNumber = 0; 
            for (var rowNumber = 0; rowNumber < this.numberOfButtons; rowNumber++) {
            	if(!buttonArray[rowNumber].disabledBool){
            		scorerTotal = scorerTotal + scorerArray[rowNumber][labelNumber].totalValue;
                	weightTotal += buttonArray[rowNumber].buttonValue;
            	}
            }
            var chartTotalHTML = Math.round(100 * (scorerTotal / (weightTotal * 100)));
            doughnutArray[labelNumber].totalScore  = chartTotalHTML;
            if(chartTotalHTML < 10){
            	 document.getElementById('scorerTotal' + labelNumber).style.left = "67px";
            }
            else {
            	document.getElementById('scorerTotal' + labelNumber).style.left = "66px";
            }
            document.getElementById('scorerTotal' + labelNumber).innerHTML = chartTotalHTML;
            document.getElementById('scorerTotalSmall' + labelNumber).innerHTML = chartTotalHTML;
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
        	
        	for(var i = 0; i < this.numberOfscorers; i++){
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
        getscorerArray: function () {
            return scorerArray;
        },
        getChartArray: function () {
            return doughnutArray;
        },
        getButtonArray: function () {
            return buttonArray;
        }
    }
});
