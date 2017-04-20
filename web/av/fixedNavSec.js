/****************************************************************/
/*					Time Control: fixed local					*/
/****************************************************************/
// Input:
//	string stringInputId: the id of a (text) input for the set of values required
//		(syntax: value1;value2;value3)
// 	string fixedNavPreviousId: the id of the node to fill move backward buttoms
// 	string fixedNavNextId: the id of the node to fill move forward  buttoms
// Effect: create fixed navigations buttoms in the respective containers
function createFixedNavButtons(stringInputId, fixedNavPreviousId, fixedNavNextId, playerHtmlId) {
	var inputNode = document.getElementById(stringInputId);
	var patt = new RegExp("^" + inputNode.getAttribute('pattern') + "$");
	if (patt.test(inputNode.value)) {
		$("#" + fixedNavPreviousId).empty();
		$("#" + fixedNavNextId).empty();
		var valueSplit = inputNode.value.split(";");
		if (valueSplit.length) {
			for (var i = 0; i < valueSplit.length; i++) {
				if (valueSplit[i] < 0 || valueSplit[i] > 0) {
					var insideButtonText = "";
					if (valueSplit[i] > 0) {
						insideButtonText = "+";
					}
					insideButtonText = insideButtonText + valueSplit[i];
					var newButton = document.createElement("a");
					newButton.appendChild(document.createTextNode(insideButtonText));
					newButton.setAttribute("class", "btn btn-default active");
					//var jsOnclick = "javascript:forward('constant'," + valueSplit[i] + ")";
					var jsOnclick = "javascript:document.getElementById('"
						+ playerHtmlId
						+ "').ttgForward('constant',"
						+ valueSplit[i]
						+ ")";
					newButton.setAttribute("onclick", jsOnclick);
					var groupButton;
					if (valueSplit[i] < 0) {
						groupButton = document.getElementById(fixedNavPreviousId);
					} else {
						groupButton = document.getElementById(fixedNavNextId);
					}
					groupButton.appendChild(newButton);
				}
			}
		}
	}
}

// Input: string stringInputId: the id of a (text) input for the set of values required
//	 (syntax: value1; value2; value3)
// Effect: create fixed navigations buttoms:
//	example with fixed ids ('fixedNavTimes', 'fixedNavPrevious', 'fixedNavNext')
function forceFixedNav(valueToSet,playerHtmlId) {
	$('#fixedNavTimes' + playerHtmlId).val(valueToSet);
	createFixedNavButtons('fixedNavTimes' + playerHtmlId,
		'fixedNavPrevious'+ playerHtmlId,
		'fixedNavNext'+ playerHtmlId,
		playerHtmlId);
}