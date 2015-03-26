'use strict';

var TemplateModule = (function () {
	var firstSlider;
    return {
        createButton: function (buttonID, buttonLabel) {
    		this.firstSlider = true;
            $('#modules').append(
            		 '<div class="row moduleRow' + buttonID + ' smallModule">' +
                     '<div class="col-sm-4 col-md-4 col-lg-4 buttonColumn">' +
                                 '<div class= "row"><div class="col-sm--5 col-md-5 col-lg-5"><i class="fa fa-minus fa-lg greyOutClick" id="greyOut' + buttonID + '"></i></div><div class="col-sm-7 col-md-7"></div></div>' +
                                 '<div class="row factorOverlay factorOverlay'+buttonID+'">'+
                                 	'<div class="col-sm-12 col-md-12 col-lg-12">' +
                                    '</div>'+
  	                              '</div>'+
		                                 '<div class="row factorWrapper">' +
		                                     '<div class="col-sm-5 col-md-5 col-lg-5 buttonColumn">' +
		                                         '<div class="moduleButtonContainer">' +
		                                             '<div id="moduleButton' + buttonID + '" class="factorIcon"><div class="overlayDiv overlayDiv1"></div></div>' +
		                                         '</div>' +
		
		                                     '</div>' +
		                                     '<div class="col-sm-7 col-md-7 col-lg-7 labelColumn">' +
		                                         '<span id="moduleButtonLabel' + buttonID + '" class="moduleButtonLabel">' + buttonLabel + '</span>' +
		                                     '</div>' +
		                                  '</div>' +
	                        


                     '</div>' +
                     '<div id="sliderRow' + buttonID + '" class="col-sm-8 col-md-8 col-lg-8 sliderRow"><ul class="sliderWrapper" id="sliderColumns' + buttonID + '"><li style="width:30px;display:inline-block;list-style:none;height:5px;"></li></ul>' +
                     '</div>' +
                  '</div>');

            var moduleButton = document.getElementById('moduleButton' + buttonID);
            moduleButton.onclick = function () { setButtonValue(this.id); };
        },
        createSlider: function (sliderID, slider, label, windowWidth) {
	        $('#sliderColumns' + slider).append('<li class="sliderContainer" id="sliderStyle'+slider+'">' +
	        		'<div class="sliderLabelMobile">' + label + '</div>'+
	                '<div id="slider' + sliderID + '" class="slider"><div id="sliderBackground' + sliderID + '" class="sliderBackground' + slider + '"></div></div>' +
	        '</li>');
	            
	        if(windowWidth <=992 ){
	            $('#slider' + sliderID).slider({
	                max: 101,
	                min: 1,
	                value: 0,
	                animate: 'fast',
	                orientation: "horizontal",
	                slide: function (event, ui) {
	                    setSliderValue(ui, this.id);
	                },
	                change: function (event, ui) {
	                    setSliderValue(ui, this.id);
	                },
	                stop: function (event, ui){
	                	updateChartPosition(ui, this.id);
	                }
	            });
	        }
	        else {
	        	 $('#slider' + sliderID).slider({
		                max: 101,
		                min: 1,
		                value: 0,
		                animate: 'fast',
		                orientation: "vertical",
		                slide: function (event, ui) {
		                    setSliderValue(ui, this.id);
		                },
		                change: function (event, ui) {
		                    setSliderValue(ui, this.id);
		                },
		                stop: function (event, ui){
		                	updateChartPosition(ui, this.id);
		                }
		            });
	        	
	        }
            $('#slider'+sliderID).append('<div class="maxMin"><div class="sliderScale"></div><div class="scaleMiddle"></div></div>');
            $('#slider' + sliderID).find('span').attr('id', sliderID);
        },
        createDoughnut: function (doughnutID, data, sliderLabel, ordinalPosition) {
        	var liClass = "";
        	if(this.firstSlider) { liClass = "first";}
            $('.results').append('<li class="' + liClass +'" id="canvasContainer' + doughnutID + '" totalScore="' + doughnutID + '">' +
				            		'<div id="chartHeader'+doughnutID+'" class="result-header factor">'+
							            '<div id="ordianlPosition' + doughnutID + '" class="col-sm-2 col-md-2 col-lg-2 position">' + ordinalPosition + '</div>' +
							            '<div class="col-sm-8 col-md-8 col-lg-8 position">' + sliderLabel + '</div>' +
							            '<div class="col-sm-8 col-md-8 col-lg-8 postionWidth">' +
							            	'<span id="sliderTotalSmall' + doughnutID + '" class="badge"></span>'+
							            '</div>'+
							        '</div>'+                   
						
                  				 '</li>');
            this.firstSlider = false;
            $('#canvasContainer' + doughnutID).append('<div id="canvas' + doughnutID + '" class="canvasBackground">' +
            											'<div class="row">'+
            												'<div class="col-sm-4 col-md-4 col-lg-4 chartWidth-sm">' +
	            												'<div style="width:102px;height:102px; position: relative;">'+
	                                                            	'<div class="sliderTotal" id="sliderTotal' + doughnutID + '"></div>' +
                                                                    '<div class="heightFiller10"></div>'+
	                                                            	'<canvas id=chart' + doughnutID + ' width="600" height="400"></canvas>' +
	                                                            '</div>'+
	                                                        '</div>'+
	            											'<div class="col-sm-8 col-md-8 col-lg-8">' +
	                                                        	'<div class="row" style="height: 10%">'+
	                                                        		'<div class="col-sm-12 col-md-12 col-lg-12">' +
            																'<table class="chartKey">' +
                                                                                '<tr class="heightFiller10"><td></td><td></td><td></td></tr>' +
                                                                                '<tr class="chartKeyRow"><td><div class="chartKeyDiv1"></div></td><td></td><td class="chartKeyText">Manager</td></tr>' +
                                                                                '<tr class="heightFiller5"><td></td><td></td><td></td></tr>' +
            															        '<tr class="chartKeyRow"><td><div class="chartKeyDiv2"></div></td><td></td><td class="chartKeyText">Goal Keeper</td></tr>' +
                                                                                '<tr class="heightFiller5"><td></td><td></td><td></td></tr>' +
                                                                                '<tr class="chartKeyRow"><td><div class="chartKeyDiv3"></div></td><td></td><td class="chartKeyText">Midfield</td></tr>' +
                                                                                '<tr class="heightFiller5"><td></td><td></td><td></td></tr>' +
                                                                                '<tr class="chartKeyRow"><td><div class="chartKeyDiv4"></div></td><td></td><td class="chartKeyText">League Position & Recent Form</td></tr>' +
                                                                                '<tr class="heightFiller5"><td></td><td></td><td></td></tr>' +
                                                                                '<tr class="chartKeyRow"><td><div class="chartKeyDiv5"></div></td><td></td><td class="chartKeyText">Attack</td></tr>' +
            																'</table>'+                                
                                            						'</div>'+
	                                                        		'</div>'+
	                                                        	'</div>'+
	                                                        '</div>'+
	            										'</div>'+
                                                       '</div>');
            document.getElementById('sliderTotal' + doughnutID).innerHTML = '0';
            document.getElementById('sliderTotalSmall' + doughnutID).innerHTML = '0';
            var ctx = document.getElementById('chart'+doughnutID).getContext("2d");
            return new Chart(ctx).Doughnut(data, {
            segmentShowStroke: false,
            animationEasing: "easeOutQuart",
            animateScale: true,
            animateRotate: false,
            animationSteps: 10,
            responsive: false,
            maintainAspectRatio: true,
            percentageInnerCutout : 40,
            showTooltips: false
                });
        }
    };
});