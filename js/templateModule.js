'use strict';

var TemplateModule = (function () {
	var firstSlider;
    return {
        createButton: function (buttonID, buttonLabel) {
    		this.firstSlider = true;


            //$('#modules').append(
            //                    '<div class="row">' +
            //                        '<div class="col-md-3">'+
                                            
            //                                    '<div class="row">' +
            //                                        '<div class="col-md-5">' +
            //                                            '<div class="moduleButtonContainer">' +
            //                                                '<div id="moduleButton' + buttonID + '" class="factorIcon">'+
            //                                                                                                            '<div class="fa-stack fa-2x">'+
            //                                                                                                            '<i class="fa fa-circle-thin fa-stack-2x buttonOuter"'+buttonID+'></i>'+
            //                                                                                                           '<i class="fa fa-circle fa-stack-1x buttonInner' + buttonID + '">' +
            //                                                                                                           '</div>'+
            //                                                 '</div>' +
            //                                            '</div>' +
                                                              
            //                                        '</div>' +
            //                                        '<div class="col-md-7">' +
            //                                            '<span id="a' + buttonID + '" class="moduleButtonLabel"></span>' +
            //                                        '</div>' +
            //                                        '</div>' +

                                            
            //                        '</div>' +
            //                        '<div class="col-md-6"><ul id="sliderColumns' + buttonID + '"></ul>' +
            //                        '</div>'+
            //                        '<div class="col-md-3">'+
            //                            '<div class="collapse in" id="doughnutContainer' + buttonID + '"></div>' +
            //                        '</div>'+
            //                        '</div>');
            $('#modules').append(
            		 '<div class="row moduleRow' + buttonID + ' smallModule">' +
                     '<div class="col-md-4 buttonColumn">' +
                                 '<div class= "row"><div class="col-md-5"><i class="fa fa-minus fa-lg greyOutClick" id="greyOut' + buttonID + '"></i></div><div class="col-md-7"></div></div>'+
                                 '<div class="row factorOverlay factorOverlay'+buttonID+'">'+
                                 	'<div class="column-md-12">'+
                                    '</div>'+
  	                              '</div>'+
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
	                        


                     '</div>' +
                     '<div class="col-md-8 sliderRow"><ul class="sliderWrapper" id="sliderColumns' + buttonID + '"></ul>' +
                     '</div>' +
                  '</div>');

            var moduleButton = document.getElementById('moduleButton' + buttonID);
            moduleButton.onclick = function () { setButtonValue(this.id); }
        },
        createSlider: function (sliderID, slider, label, windowWidth) {
	        $('#sliderColumns' + slider).append('<li class="sliderContainer" id="sliderStyle'+slider+'">' +
	        		'<div class="sliderLabelMobile">' + label + '</div>'+
	                '<div id="slider' + sliderID + '" class="slider"></div>' +
	        '</li>');
	            
	        if(windowWidth < 700){
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
            //$('#' + sliderID).mouseover(function () {
            //    modules.updateTooltip(this.id,'show');
            //}).mouseout(function () {
            //    modules.updateTooltip(this.id, 'hide');
            //});



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