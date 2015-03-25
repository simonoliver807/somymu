'use strict';

var TemplateModuleIphone = (function () {
    return {
        createButton: function (buttonID, buttonLabel) {
            $('#modules').append(
            		 '<div class="row moduleRow' + buttonID + ' smallModule">' +
                     '<div class="col-md-4 buttonColumn">' +
                                 '<div class= "row"><div class="col-md-5"><i class="fa fa-minus fa-lg greyOutClick" id="greyOut' + buttonID + '"></i></div><div class="col-md-7"></div></div>'+
                                 '<div class="row factorOverlay">'+
                              	'<div class="column-md-12">'+
		                                 '<div class="row factorWrapper">' +
		                                     '<div class="col-md-5 buttonColumn">' +
		                                         '<div class="moduleButtonContainer">' +
		                                             '<div id="moduleButton' + buttonID + '" class="factorIcon"><div class="overlayDiv overlayDiv1"></div></div>' +
		                                         '</div>' +
		
		                                     '</div>' +
		                                     '<div class="col-md-7 labelColumn">' +
		                                         '<span id="moduleButtonLabel' + buttonID + '" class="moduleButtonLabel">' + buttonLabel + '</span>' +
		                                     '</div>' +
		                                  '</div>' +
	                                '</div>'+
	                              '</div>'+

                     '</div>' +
                     '<div class="col-md-8 sliderRow"><ul class="sliderWrapper" id="sliderColumns' + buttonID + '"></ul>' +
                     '</div>' +
                  '</div>');

            var moduleButton = document.getElementById('moduleButton' + buttonID);
            moduleButton.onclick = function () { setButtonValue(this.id); }
        },
        createSlider: function (sliderID, slider, label) {
	            $('#sliderColumns' + slider).append('<li class="sliderContainer" id="sliderStyle'+slider+'">' +
									            		'<div class="sliderLabelMobile">' + label + '</div>'+
								                        '<div id="slider' + sliderID + '" class="slider"></div>' +
                									'</li>');
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
            $('#slider'+sliderID).append('<div class="maxMin"><div class="sliderScale"></div><div class="scaleMiddle"></div></div>');
            $('#slider' + sliderID).find('span').attr('id', sliderID);
        },
        createDoughnut: function (doughnutID, data, sliderLabel, ordinalPosition) {
            $('.chartContainer').append('<li class="canvasContainer" id="canvasContainer' + doughnutID + '" totalScore="' + doughnutID + '">' +
                                                '<div id="chartHeader'+doughnutID+'" class="chartHeader" >'+
                                                    '<div class="row">'+
                                                            '<div id="ordianlPosition' + doughnutID + '" class="col-md-2">'+ ordinalPosition + '</div>'+
                                                            '<div class="col-md-4">'+ sliderLabel +'</div>'+
                                                            '<div class="col-md-3">'+
                                                            	'<span class="fa-stack fa-lg">'+
                                                            		'<i class="fa fa-circle fa-stack-2x"></i>'+
                                                            		'<div class="sliderTotalSmall fa-stack-1x" id="sliderTotalSmall' + doughnutID + '"></div> '+
                                                            	'<span>'+
                                                            '</div>' +
                                                            '<div class="col-md-3"><i class="fa fa-caret-down fa-lg" id="caretToggle' + doughnutID + '"S></i></div>'+
                                                    '</div>' +
                                                '</div>'+
                                                '<div class="sliderTotal" id="sliderTotal'+doughnutID+'"></div>'+
                                          '</li>');
            $('#canvasContainer' + doughnutID).append('<div id="collapse' + doughnutID + '" class="canvasBackground collapse in">' +
                                                            '<div class="sliderTotal" id="sliderTotal' + doughnutID + '"></div>' +
                                                            '<canvas style="width:100px; height:100px" id=chart' + doughnutID + '></canvas>' +
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
                responsive: true,
                maintainAspectRatio: true,
                showTooltips: false
                });
        }
    }
});