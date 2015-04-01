//tooltip events show on hover
$('.sliderContainer').hover(function (event) {
    event.stopPropagation();
    tooltipActivate(this, '');
});

function disableTooltip() {
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
    $('.tooltip').tooltip('hide');
}
function tooltipActivate(el, id) {
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
                    $('#sliderID' + elementArray[i].sliderID).tooltip('hide');
                    elementArray[i].tooltipBool = false;
                }
            }
        }
        sliderElement = elementArray[sliderID[0]];
        sliderID = 'sliderID' + sliderID[0];
    }



    if (!sliderElement.tooltipBool) {
        if (!modules.windowResizeBool) {
            $('#' + sliderID).tooltip({
                container: 'body',
                html: true,
                placement: 'top',
                trigger: 'manual',
                title: function () {
                    //   here will be custom template
                    var id = $(this).parent().attr('id');
                    id = id.match(/[0-9]+/g);
                    return '<div class="tooltipValue">' + sliderElement.sliderValue + '</div>';
                }
            }).tooltip('show');
         }
        else {
            $('#' + sliderID).tooltip({
                container: 'body',
                html: true,
                placement: 'right',
                trigger: 'manual',
                title: function () {
                    //   here will be custom template
                    var id = $(this).parent().attr('id');
                    id = id.match(/[0-9]+/g);
                    return '<div class="tooltipValue">' + sliderElement.sliderValue + '</div>';
                }
            }).tooltip('show');
        }
        sliderElement.tooltipBool = true;
    }
}

//tooltip events hide when leave the slider row
$('#modules').mouseleave(function () {
    disableTooltip();
});
// tooltip hide when over the button columns
$('.buttonColumn').mouseover(function () {
    disableTooltip();
});
// hide the tool tip at the top
document.getElementById('fixedHeader').addEventListener('mouseover',
    function () {
        disableTooltip();
    }, false);
$('.leftRightButton').on('mouseOver', function () {
    $('.tooltip').tooltip('hide');
});