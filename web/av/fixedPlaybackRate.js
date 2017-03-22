/****************************************************************/
/*					playbackRate Control: fixed 				*/
/****************************************************************/
// Input:
//	string stringInputId: the id of a (text) input for the set of values required
//		(syntax: value1;value2;value3)
// 	string fixedContainerId: the id of the node to fill with playbackRate Control buttoms
// 	string playerHtmlId: the id of the html player node
function createFixedPRButtons(stringInputId, fixedContainerId, playerHtmlId) {
	var inputNode = document.getElementById(stringInputId);
	var patt = new RegExp("^" + inputNode.getAttribute('pattern') + "$");
	// console.log( "patt.test(inputNode.value)"); xxx a recaller
	// console.log( patt.test(inputNode.value));
	if ( true || patt.test(inputNode.value)) {
		$("#" + fixedContainerId).empty();
		var valueSplit = inputNode.value.split(";");
		if (valueSplit.length) {
			for (var i = 0; i < valueSplit.length; i++) {
				if (valueSplit[i] < 0 || valueSplit[i] > 0) {
					var insideButtonText = "";
					if (valueSplit[i] > 0) {
						// insideButtonText = "&times;";
						insideButtonText = "";
					}
					insideButtonText = insideButtonText + valueSplit[i];
					var newButton = document.createElement("a");
					newButton.appendChild(document.createTextNode(insideButtonText));
					newButton.setAttribute("class", "btn btn-primary active speedChange");
					var jsOnclick = "document.getElementById('"+playerHtmlId+"').ttgSetPlaybackRate(" + valueSplit[i] + ")";
					newButton.setAttribute("onclick", jsOnclick);
					var groupButton;
					if (valueSplit[i] < 0) {
						groupButton = document.getElementById(fixedContainerId);
					} else {
						groupButton = document.getElementById(fixedContainerId);
					}
					groupButton.appendChild(newButton);
				}
			}
		}
	}
}

// Input:
//	string stringInputId: the id of a (text) input for the set of values required
//		(syntax: value1;value2;value3)
// 	string fixedContainerId: the id of the node to fill with playbackRate Control buttoms
// 	string playerHtmlId: the id of the html player node
function createFixedPRRadio(stringInputId, fixedContainerId, playerHtmlId) {
	var inputNode = document.getElementById(stringInputId);
	var patt = new RegExp("^" + inputNode.getAttribute('pattern') + "$");
	if ( true || patt.test(inputNode.value)) { // xxxx a recaller
		$("#" + fixedContainerId).empty();
		var valueSplit = inputNode.value.split(";");
		if (valueSplit.length) {
			for (var i = 0; i < valueSplit.length; i++) {
				if (valueSplit[i] < 0 || valueSplit[i] > 0) {
					var insideButtonText = "";
					if (valueSplit[i] > 0) {
						// insideButtonText = "&times;";
						insideButtonText = "";
					}
					insideButtonText = insideButtonText + valueSplit[i];
					var newLabel = document.createElement("label");
					newLabel.setAttribute("for", 
						"pRBR" 
						+ fixedContainerId 
						+ "_"
						+  i);
					newLabel.appendChild(document.createTextNode(insideButtonText));
					var groupButton;
					if (valueSplit[i] < 0) {
						groupButton = document.getElementById(fixedContainerId);
					} else {
						groupButton = document.getElementById(fixedContainerId);
					}
					groupButton.appendChild(newLabel);
					var newInput = document.createElement("input");
					newInput.setAttribute("class", "radio-choice speedChange");
					newInput.setAttribute("type", "radio");
					newInput.setAttribute("value", valueSplit[i]);
					newInput.setAttribute("id", 
						"pRBR" 
						+ fixedContainerId 
						+ "_"
						+  i);
					newInput.setAttribute("name", 
						"pRBR" 
						+ fixedContainerId);	
					var jsOnclick = "document.getElementById('"+playerHtmlId+"').ttgSetPlaybackRate(" + valueSplit[i] + ")";
					newInput.setAttribute("onclick", jsOnclick);
					groupButton.appendChild(newInput);
				}
			}
		}
		$( "#" + fixedContainerId + " input.radio-choice" ).checkboxradio();
	}
}

// Input: string stringInputId: the id of a (text) input for the set of values required
//	 (syntax: value1; value2; value3)
// Effect: create fixed navigations buttoms:
//	example with fixed ids ('fixedNavTimes', 'fixedNavPrevious', 'fixedNavNext')
function forceFixedPRB(inputIdToSet,valueToSet,fixedContainerId, playerHtmlId) {
	$('#'+inputIdToSet).val(valueToSet);
	createFixedPRButtons(inputIdToSet, fixedContainerId, playerHtmlId);
}

// Input: string stringInputId: the id of a (text) input for the set of values required
//	 (syntax: value1; value2; value3)
// Effect: create fixed navigations buttoms:
//	example with fixed ids ('fixedNavTimes', 'fixedNavPrevious', 'fixedNavNext')
function forceFixedPRR(inputIdToSet,valueToSet,fixedContainerId, playerHtmlId) {
	$('#'+inputIdToSet).val(valueToSet);
	createFixedPRRadio(inputIdToSet, fixedContainerId, playerHtmlId);
}
