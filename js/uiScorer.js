var UIScorer = (function () {
    return {
        setScorerValue: function (scorerID) {
            var scorerID = scorerID.match(/[0-9]+/g);
            // update the scorer module values each time the scorer moves
            modules.scorerArray[scorerID[0]][scorerID[1]].setValues(scorerValue, modules.buttonArray[scorerID[0]].buttonValue);
            var op = this.getOrdinalPosition(scorerArray[scorerID[0]][scorerID[1]].setScorerValue);
            if (scorerArray[scorerID[0]][scorerID[1]].setScorerValue !== 0) {
                document.getElementById('scorerValue' + scorerID[0] + '_' + scorerID[1]).innerHTML = op;
            }
            else {
                document.getElementById('scorerValue' + scorerID[0] + '_' + scorerID[1]).innerHTML = '';
            }

            this.updateTotalScorer(scorerID[[1]]);
            var chartObject = doughnutArray[scorerID[1]].doughnutObject;
            var segment1 = (parseInt(scorerID[0]) * 2);
            var segment2 = segment1 + 1;

            var scorerValue = scorerArray[scorerID[0]][scorerID[1]].totalValue / 10;
            var buttonValue = (buttonArray[scorerID[0]].buttonValue * 10) - scorerValue;

            chartObject.segments[segment1].value = buttonValue;
            chartObject.segments[segment2].value = scorerValue;
            chartObject.update();

        },
        updateTotalScorer: function (labelNumber) {
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
                document.getElementById('sliderTotal' + labelNumber).style.left = "67px";
            }
            else {
                document.getElementById('sliderTotal' + labelNumber).style.left = "66px";
            }
            document.getElementById('sliderTotal' + labelNumber).innerHTML = chartTotalHTML;
            document.getElementById('sliderTotalSmall' + labelNumber).innerHTML = chartTotalHTML;
        }
    };
});