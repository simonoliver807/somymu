var SliderModule = (function () {
    var sliderValue;
    var totalValue;
    var sliderID;
    var disabledBool;
    var tooltipBool;
    var setSliderValue;
    return {
        setSliderID: function (sliderID) {
            this.sliderValue = 0;
            this.totalValue = 0;
            this.sliderID = sliderID;
            this.disabledBool = false;
            this.tooltipBool = false;
            this.overscrollStatus = false;
        },
        setValues: function (sliderValue, buttonValue) {
            if (sliderValue !== '') {
                this.sliderValue = sliderValue - 1;
                //  update the tooltip
                var position = $('#' + this.sliderID).offset();
                if (modules.windowResizeBool) {
                    // update horizontal
                    $('.tooltip').css({ left: position.left + 'px' });
                }
                else {
                    //update vertically
                    $('.tooltip').css({ top: position.top + 'px' });
                }
                $('.tooltipValue').text(this.sliderValue);
                document.getElementById('sliderBackground' + this.sliderID).style.width = this.sliderValue + '%';
            }
            this.totalValue = buttonValue * this.sliderValue;
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
            this.scorerValue = 0;
            this.totalValue = 0;
            this.scorerID = scorerID;
            this.disabledBool = false;
            this.tooltipBool = false;
            this.overscrollStatus = false;
            this.setScorerValue = 0;
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