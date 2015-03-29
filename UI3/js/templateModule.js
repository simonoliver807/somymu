'use strict';

var TemplateModule = (function () {
	var firstscorer;
    return {
        createButton: function (buttonID, buttonLabel) {
    		this.firstscorer = true;
            $('#modules').append(
            		 '<div class="row moduleRow' + buttonID + ' smallModule">' +
                     '<div class="col-sm-4 col-md-4 col-lg-4">' +
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
                     '<div id="scorerRow' + buttonID + '" class="col-sm-8 col-md-8 col-lg-8 scorerRow"><ul class="scorerWrapper setTransition" id="scorerColumns' + buttonID + '"><li style="width:30px;display:inline-block;list-style:none;height:5px;"></li></ul>' +
                     '</div>' +
                  '</div>');

            var moduleButton = document.getElementById('moduleButton' + buttonID);
            moduleButton.onclick = function () { setButtonValue(this.id); };
        },
        createScorer: function (scorerID, scorer, label, windowWidth) {
	        $('#scorerColumns' + scorer).append('<li class="scorerContainer" id="scorerStyle'+scorer+'">' +
	               // '<div id="scorer' + scorerID + '" class="scorer"><div id="scorerBackground' + scorerID + '" class="scorerBackground' + scorer + '"></div></div>' +
                     '<div id="scorer' + scorerID + '" class="scorer"><div id="scorerValue' + scorerID + '" class="scorerValue"></div></div>' +
            '</li>');
	            
        },
        createDoughnut: function (doughnutID, data, scorerLabel, ordinalPosition) {
        	var liClass = "";
        	if(this.firstscorer) { liClass = "first";}
            $('.results').append('<li class="' + liClass +'" id="canvasContainer' + doughnutID + '" totalScore="' + doughnutID + '">' +
            		'<div id="chartHeader'+doughnutID+'" class="result-header factor">'+
			            '<div id="ordianlPosition' + doughnutID + '" class="col-sm-2 col-md-2 col-lg-2 position">' + ordinalPosition + '</div>' +
			            '<div class="col-sm-8 col-md-8 col-lg-8 custom-col-md-8 position">' + scorerLabel + '</div>' +
			            '<div class="col-sm-2 col-md-2 col-lg-2 postionWidth">' +
			            	'<span id="scorerTotalSmall' + doughnutID + '" class="badge">1</span>'+
			            '</div>'+
			        '</div>'+                   
		
  				 '</li>');
			this.firstscorer = false;
			$('#canvasContainer' + doughnutID).append('<div id="canvas' + doughnutID + '" class="canvasBackground">' +
										'<div class="row">'+
											'<div class="col-sm-4 col-md-4 col-lg-4 chartWidth-sm">' +
												'<div class="chartContainer">'+
                                                	'<div class="scorerTotal" id="scorerTotal' + doughnutID + '"></div>' +
                                                    '<div class="heightFiller10"></div>'+
                                                	'<canvas id=chart' + doughnutID + ' width="600" height="400"></canvas>' +
                                                '</div>'+
                                            '</div>'+
											'<div class="col-sm-8 col-md-8 col-lg-8">' +
                                            	'<div class="row" style="height: 10%">'+
                                            		'<div class="col-sm-12 col-md-12 col-lg-12 leftPadding15">' +
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
            document.getElementById('scorerTotal' + doughnutID).innerHTML = '0';
            document.getElementById('scorerTotalSmall' + doughnutID).innerHTML = '0';
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