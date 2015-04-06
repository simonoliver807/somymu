//tooltip module to activate and disable the tooltip
var TooltipModulesto = (function() {
	return {
		disableTooltip: function() {
		    var elementArray = modules.getElementArray();
		    // is this ui1 or ui2
		    if (elementArray[0][0]) {
		        for (var i = 0; i < elementArray.length; i++) {
		            for (var j = 0; j < elementArray[i].length; j++) {
		                if (elementArray[i][j].tooltipBool) {
		                    elementArray[i][j].tooltipBool = false;
		                }
		            }
		        }
		    }
		    else {
		        for (var i = 0; i < elementArray.length; i++) {
		            if (elementArray[i].tooltipBool) {
		                elementArray[i].tooltipBool = false;
		            }
		        }
		    }
		    $('.tooltip').css('display','none');
		},
		tooltipActivate: function(el, id) {
		    var sliderElement;
		    if (id == '') {
		        var sliderID = el.children[1].id.match(/[0-9]+/g);
		    }
		    else {
		        var sliderID = id.match(/[0-9]+/g);
		    }
		    var elementArray = modules.getElementArray();
		    if(sliderID.length > 1) {
		        for (var i = 0; i < elementArray.length; i++) {
		            for (var j = 0; j < elementArray[i].length; j++) {
		                if (elementArray[i][j].tooltipBool) {
		                    if (elementArray[i][j].sliderID != sliderID[0] + '_' + sliderID[1]) {
		                        $('#' + elementArray[i][j].sliderID).tooltip('hide');
		                        elementArray[i][j].tooltipBool = false;
		                    }
		                }
		            }
		        }
		        sliderElement = elementArray[sliderID[0]][sliderID[1]];
		        sliderID = sliderID[0] + '_' + sliderID[1];
		    }
		    else {
		        for (var i = 0; i < elementArray.length; i++) {
		            if (elementArray[i].tooltipBool) {
		                if (elementArray[i].sliderID != sliderID[0]) {
		                	document.getElementById('tooltip' + elementArray[i].sliderID).style.display = 'none';
		                    elementArray[i].tooltipBool = false;
		                }
		            }
		        }
		        sliderElement = elementArray[sliderID[0]];
		      //  sliderID = 'sliderID' + sliderID[0];
		    }
		    var tooltipID = 'tooltip' + sliderID[0];
		    if (!sliderElement.tooltipBool) {
		    	
		    	
		    	document.getElementById(tooltipID).style.display = 'block';
		    }
		   
//
//		    if (!sliderElement.tooltipBool) {
//		        if (modules.windowResizeBool) {
//		            $('#' + sliderID).tooltip({
//		                container: 'body',
//		                html: true,
//		                placement: 'top',
//		                trigger: 'manual',
//		                title: function () {
//		                    //   here will be custom template
//		                    var id = $(this).parent().attr('id');
//		                    id = id.match(/[0-9]+/g);
//		                    return '<div class="tooltipValue">' + sliderElement.sliderValue + '</div>';
//		                }
//		            }).tooltip('show');
//		         }
//		        else {
//		            $('#' + sliderID).tooltip({
//		                container: 'body',
//		                html: true,
//		                placement: 'right',
//		                trigger: 'manual',
//		                title: function () {
//		                    //   here will be custom template
//		                    var id = $(this).parent().attr('id');
//		                    id = id.match(/[0-9]+/g);
//		                    return '<div class="tooltipValue">' + sliderElement.sliderValue + '</div>';
//		                }
//		            }).tooltip('show');
//		        }
//		        sliderElement.tooltipBool = true;
//		    }
		}

		
	};
});