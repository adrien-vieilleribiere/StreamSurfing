/****************************************************************/
/****************************************************************/
/*					Temporary Junk								*/
/****************************************************************/
/****************************************************************/
/* 	testing function for waiting implementations */
function testNoParam() {
	console.log('!!! inside testNoParam');
}
/* 	testing function for waiting implementations with a parameter */
function testWithParam(paramExample) {
	console.log('!!!!!!!!!!!!! inside testWithParam');
	console.log(paramExample);
}
function showCurrentTime(thisDataObj, chartObj) {
	console.log('showCurrentTime: to do');
}
function getPathInfo(url) {
	var index = url.lastIndexOf("/") + 1;
	var filenameWithExtension = url.substr(index);
	var filename = filenameWithExtension.split(".")[0];
	return {
		'dirname': url.substr(0, index - 1),
		'basename': filenameWithExtension,
		'extension': url.substr(index + (filename.length)),
		'filename': filenameWithExtension
	};
}
function padLeft(str, max, prefix) {
	str = str.toString();
	return str.length < max ? padLeft(prefix + str, max, prefix) : str;
}
function padRight(str, max, suffix) {
	str = str.toString();
	return str.length < max ? padRight(str + suffix, max, suffix) : str;
}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
function resizeVideoContainer(inputSizeId,containerId){
	// console.log('resizeVideoContainer: '+$('#'+inputSizeId).val());
	$('#'+containerId).attr('height',parseInt($('#'+inputSizeId).val()));
}
/****************************************************************/
/****************************************************************/
/*					Geometry									*/
/****************************************************************/
/****************************************************************/
// Input: float centerX, float centerY, float radius, float angleInDegrees
// 	defines a point in the polar base
// Output: Object{'x','y'}: coordinates of the point in the carthesian base
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}
// Input: float x, float y, float radius, float startAngle, float endAngle,
// Output: string: the (svg) path description of an arc centered in (x,y)
// with a radius radius from startAngle (in degree) to endAngle (in degree)
function describeArc(x, y, radius, startAngle, endAngle) {
	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);
	var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
	var d = [
		"M", start.x, start.y,
		"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
	].join(" ");
	return d;
}
// Input: event e
// Output: float: the absolute x (horizontal) coordinate of this event
function relMouseCoordsX(e) {
	var posx = 0;
	if (!e)
		var e = window.event;
	if (e.pageX || e.pageY) {
		posx = e.pageX;
	} else if (e.clientX) {
		posx = e.clientX + document.body.scrollLeft
			 + document.documentElement.scrollLeft;
	}
	return posx;
}
/****************************************************************/
/****************************************************************/
/*						Colors									*/
/****************************************************************/
/****************************************************************/
// Inputs:
//	string hex1: color in hexa
// 	string hex2: color in hexa
// 	float alpha: in [0,1]
// Output: rgb of alpha*hex1+(1-alpha)hex2
function ColorInterpolation(hex1, hex2, alpha) {
	// validate hex strings
	hex1 = String(hex1).replace(/[^0-9a-f]/gi, '');
	hex2 = String(hex2).replace(/[^0-9a-f]/gi, '');
	if (hex1.length < 6) {
		hex1 = hex1[0] + hex1[0] + hex1[1] + hex1[1] + hex1[2] + hex1[2];
	}
	if (hex2.length < 6) {
		hex2 = hex2[0] + hex2[0] + hex2[1] + hex2[1] + hex2[2] + hex2[2];
	}
	alpha = alpha || 0;
	var rgb = "#",
	c,
	c1,
	c2,
	i;
	for (i = 0; i < 3; i++) {
		c1 = parseInt(hex1.substr(i * 2, 2), 16);
		c2 = parseInt(hex2.substr(i * 2, 2), 16);
		c =
			Math.round(
				Math.min(Math.max(0, (alpha * c1) + (1 - alpha) * c2), 255))
			.toString(16);
		rgb += ("00" + c).substr(c.length);
	}
	return rgb;
}
// Input: string hex: color in hexa
// Output: Object{'r','g','b'} of the corresponding color
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	}
	 : null;
}
/****************************************************************/
/*					Time, Date									*/
/****************************************************************/
// Input: float timesec: the number of seconds to convert
// Output: Object: the decomposition of timesec on the
//	{'hours','minutes','seconds','miliseconds'} base
//	(approximated to the closest milisecond)
function floatSeconds_2_HMSmS_Obj(timesec) {
	var hours = Math.floor(timesec / 3600);
	var minutes = Math.floor((timesec - (3600 * hours)) / 60);
	var seconds = Math.floor((timesec - ((3600 * hours) + (60 * minutes))));
	var miliseconds = Math.round(1000 * (timesec - Math.floor(timesec)));
	return {
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds,
		'miliseconds': miliseconds
	};
}
// Input: float timesec: the number of seconds to convert
// Output: Date: the date (2142, 0, 0) + the inputed seconds
//	(approximated to the closest milisecond)
function floatSeconds_2_HMSmS_Date(timesec) {
	var hours = Math.floor(timesec / 3600);
	var minutes = Math.floor((timesec - (3600 * hours)) / 60);
	var seconds = Math.floor((timesec - ((3600 * hours) + (60 * minutes))));
	var miliseconds = Math.round(1000 * (timesec - Math.floor(timesec)));
	return new Date(2142, 0, 0, hours, minutes, seconds, miliseconds);
}
// Input: float timesec: the number of seconds to convert
// Output: Date: the date (2142, 0, 0) + the inputed seconds
//	(approximated to the second)
function floatSeconds_2_HMS_Date(timesec) {
	var hours = Math.floor(timesec / 3600);
	var minutes = Math.floor((timesec - (3600 * hours)) / 60);
	var seconds = Math.floor((timesec - ((3600 * hours) + (60 * minutes))));
	return new Date(2142, 0, 0, hours, minutes, seconds, 0);
}
// Input: Date dateMs: a date
// Output: float: the number of seconds from the extraction of the
//	(hour,minutes,secondes,miliseconds) part of the date
function date_2_floatSeconds(dateMs) {
	return
	(3600 * dateMs.getHours())
	 + (60 * dateMs.getMinutes())
	 + dateMs.getSeconds() + (dateMs.getMilliseconds() / 1000);
}
// Inputs:
//	string hoursId,
//	string minutesId,
//	string secondesId,
//	string milisecondsId,
//	string totalId
// Effect: from (hoursId,minutesId,secondesId,milisecondsId) ids
//	[typically ids of input nodes (@type="number")],
//	updates the corresponding value of the node with id totalId
function updateSplitDate(hoursId, minutesId, secondesId, milisecondsId, totalId) {
	$('#' + totalId).val(
		parseInt(3600 * $('#' + hoursId).val())
		 + parseInt(60 * $('#' + minutesId).val())
		 + parseInt($('#' + secondesId).val())
		 + (parseFloat($('#' + milisecondsId).val()) / 1000));
}
// Inputs:
//	string hoursId,
//	string minutesId,
//	string secondesId,
//	string milisecondsId,
//	string totalId
// Effect: from the value of the node with id totalId, updates the values of the nodes
//	(hoursId,minutesId,secondesId,milisecondsId) with the decomposition of totalId
//	over the base  {'hours','minutes','seconds','miliseconds'}
function splitDate(hoursId, minutesId, secondesId, milisecondsId, totalId) {
	timesec = parseFloat($('#' + totalId).val());
	var hours = Math.floor(timesec / 3600);
	$('#' + hoursId).val(hours);
	var minutes = Math.floor((timesec - (3600 * hours)) / 60);
	$('#' + minutesId).val(minutes);
	var seconds = Math.floor((timesec - ((3600 * hours) + (60 * minutes))));
	$('#' + secondesId).val(seconds);
	var miliseconds = Math.round(1000 * (timesec - Math.floor(timesec)));
	$('#' + milisecondsId).val(miliseconds);
}
/****************************************************************/
/*			Time Progress (horizontal, left to right)			*/
/****************************************************************/
// Input:
//	string containerId,
//	float proportion
// Effect: update the size of "Before" part of the (horizontal, left to right) contoler
//	with id containerId to the given proportion (0<=proportion<=1)
function updateOffsetProgress(containerId, proportion) {
	var newPropWithBefore = Math.max(0, Math.min(100, (100 * proportion))) + "%";
	$('#' + containerId + "Before").width(newPropWithBefore);
}
// Inputs:
//	string progressBarId: the id of a controler (horizontal, left to right)
// 	Object playerVar: the player variable (curently: single youtube player,
//		to generalize to specialized generic player)
// 	annotationChartVar: a drawn google chart with {'packages':['annotationchart']}
// 	int recurenceToRedo: a number of miliseconds to recurently redo the update
//		(0=no recurent update)
// Effect: updates the progressBarId each recurenceToRedo miliseconds
//	with a proportion showing the current playHead position into the zoom (time range)
//	given by the annotationChartVar.
function updateProgress(progressBarId, playerVar, annotationChartVar, recurenceToRedo) {
	var curTimeToUpdate = player.getCurrentTime();
	var curTimeToUpdateDate = floatSeconds_2_HMSmS_Date(curTimeToUpdate);
	var actualRange = annotationChartVar.getVisibleChartRange();
	var actualRangeStartDate = Date.parse(actualRange.start);
	var actualRangeEndDate = Date.parse(actualRange.end);
	var actualRangeSizeSec = (actualRangeEndDate - actualRangeStartDate) / 1000.0;
	var newProportionComputed = 0;
	if (actualRangeSizeSec > 0) {
		newProportionComputed = curTimeToUpdateDate;
		newPoportionComputed =
			Math.max(
				0,
				Math.min(
					1,
					(curTimeToUpdateDate - actualRangeStartDate) / (actualRangeEndDate - actualRangeStartDate)));
	}
	updateOffsetProgress(progressBarId, newProportionComputed);
	var newRecurenceToRedo = parseInt($('#chartProgressRecurence').val());
	if (newRecurenceToRedo > 0) {
		setTimeout(
			updateProgress
			.bind(null, progressBarId)
			.bind(null, playerVar)
			.bind(null, annotationChartVar)
			.bind(null, newRecurenceToRedo),
			newRecurenceToRedo);
	}
}
// Inputs:
//	string progressBarId: the id of a controler (horizontal, left to right)
//	int mediaType
// 	Object playerVar: the player variable 
// 	int recurenceToRedo: a number of miliseconds to recurently redo the update
//		(0=no recurent update)
// Effect: updates the progressBarId each recurenceToRedo miliseconds
//	with a proportion showing the current playHead position into the zoom (time range)
//	given by properties of the controler.
function ttgUpdateProgress(progressBarId, mediaType, playerVar, recurenceToRedo) {
	var curTimeToUpdate = getCurrentTime();
	// console.log("curTimeToUpdate");	console.log(curTimeToUpdate);
	var actualRangeStartSec = $('#'+progressBarId).attr('data-progress-time_start');
	var actualRangeEndSec =  $('#'+progressBarId).attr('data-progress-time_end');
	var actualRangeSizeSec = (actualRangeEndSec - actualRangeStartSec) ;
	// console.log("actualRangeSizeSec");	console.log(actualRangeSizeSec);
	var newProportionComputed = 0;
	if (actualRangeSizeSec > 0) {
		newProportionComputed =
			Math.max(
				0,
				Math.min(
					1,
					(curTimeToUpdate - actualRangeStartSec) / (actualRangeEndSec - actualRangeStartSec)));
	}
	// console.log("newProportionComputed");	console.log(newProportionComputed);
	updateOffsetProgress(progressBarId, newProportionComputed);
	var newRecurenceToRedo = parseInt($('#chartProgressRecurence').val());
	if (newRecurenceToRedo > 0) {
		setTimeout(
			ttgUpdateProgress
			.bind(null, progressBarId)
			.bind(null, mediaType)
			.bind(null, playerVar)
			.bind(null, newRecurenceToRedo),
			newRecurenceToRedo);
	}
}
//
var gHandleRecenterPlayheadRecurence;
//  inputs:
//	Object annotationChartVar: a drawn google chart with {'packages':['annotationchart']}
// 	int recurenceToRedo: xxx todo change it json param setting
//		'chartRecenteringPosition', 'autoRecenterPlayhead', 'chartRecenteringRecurence'
// Effect: change the zoom (horizontal) position to put the playhead in the prefered position
function recenterPlayhead(annotationChartVar, recurenceToRedo) {
	var curTimeToCenter = player.getCurrentTime();
	var actualRange = annotationChartVar.getVisibleChartRange();
	var actualRangeStartDate = Date.parse(actualRange.start);
	var actualRangeEndDate = Date.parse(actualRange.end);
	var actualRangeSizeSec = (actualRangeEndDate - actualRangeStartDate) / 1000.0;
	var idealStartTime =
		curTimeToCenter - $('#chartRecenteringPosition').val() * actualRangeSizeSec;
	var idealendTime = idealStartTime + actualRangeSizeSec;
	var realStartTimeSec =
		Math.min(Math.max(0, idealStartTime), player.getDuration() - actualRangeSizeSec);
	var realStartTimeDate = floatSeconds_2_HMSmS_Date(realStartTimeSec);
	var realEndTimeSec =
		Math.min(player.getDuration(), realStartTimeSec + actualRangeSizeSec);
	var realEndTimeDate = floatSeconds_2_HMSmS_Date(realEndTimeSec);
	annotationChartVar.setVisibleChartRange(realStartTimeDate, realEndTimeDate);
	var newRecurenceToRedoBool = $('#autoRecenterPlayhead').is(':checked');
	var newRecurenceToRedoTime = parseInt($('#chartRecenteringRecurence').val());
	if (newRecurenceToRedoBool) {
		if (newRecurenceToRedoTime > 0) {
			if (gHandleRecenterPlayheadRecurence) {
				clearTimeout(gHandleRecenterPlayheadRecurence);
				gHandleRecenterPlayheadRecurence =
					setTimeout(
						recenterPlayhead
						.bind(null, annotationChartVar)
						.bind(null, newRecurenceToRedoTime),
						newRecurenceToRedoTime);
			} else {
				gHandleRecenterPlayheadRecurence =
					setTimeout(
						recenterPlayhead
						.bind(null, annotationChartVar)
						.bind(null, newRecurenceToRedoTime),
						newRecurenceToRedoTime);
			}
		}
	} else {
		if (gHandleRecenterPlayheadRecurence) {
			clearTimeout(gHandleRecenterPlayheadRecurence);
		}
	}
}
//xxx
var gttgHandleRecenterPlayheadRecurence;
//  inputs:
//	Object annotationChartVar: a drawn google chart with {'packages':['annotationchart']}
// 	int recurenceToRedo: xxx todo change it json param setting
//		'chartRecenteringPosition', 'autoRecenterPlayhead', 'chartRecenteringRecurence'
// Effect: change the zoom (horizontal) position to put the playhead in the prefered position
function ttgRecenterPlayhead(controlerId, recurenceToRedo) {
	var curTimeToCenter = getCurrentTime();
	var actualRangeStartDate = parseFloat($('#'+controlerId).attr('data-progress-time_start'));
	var actualRangeEndDate = parseFloat($('#'+controlerId).attr('data-progress-time_end'));
	var actualRangeSizeSec = (actualRangeEndDate - actualRangeStartDate);
	var idealStartTime =
		curTimeToCenter - $('#chartRecenteringPosition').val() * actualRangeSizeSec;
	var idealendTime = idealStartTime + actualRangeSizeSec;
	var realStartTimeSec =
		Math.min(Math.max(0, idealStartTime), Math.max(0,getDuration() - actualRangeSizeSec));
	var realEndTimeSec =
		Math.min(getDuration(), realStartTimeSec + actualRangeSizeSec);
	$('#'+controlerId).attr('data-progress-time_start',realStartTimeSec);
	$('#'+controlerId).attr('data-progress-time_end',realEndTimeSec);
	var newRecurenceToRedoBool = $('#autoRecenterPlayhead').is(':checked');
	var newRecurenceToRedoTime = parseInt($('#chartRecenteringRecurence').val());
	if (newRecurenceToRedoBool) {
		if (newRecurenceToRedoTime > 0) {
			if (gttgHandleRecenterPlayheadRecurence) {
				clearTimeout(gttgHandleRecenterPlayheadRecurence);
				gttgHandleRecenterPlayheadRecurence =
					setTimeout(
						ttgRecenterPlayhead
						.bind(null, controlerId)
						.bind(null, newRecurenceToRedoTime),
						newRecurenceToRedoTime);
			} else {
				gttgHandleRecenterPlayheadRecurence =
					setTimeout(
						ttgRecenterPlayhead
						.bind(null, controlerId)
						.bind(null, newRecurenceToRedoTime),
						newRecurenceToRedoTime);
			}
		}
	} else {
		if (gttgHandleRecenterPlayheadRecurence) {
			clearTimeout(gttgHandleRecenterPlayheadRecurence);
		}
	}
}
/****************************************************************/
/*			Time Control (horizontal, left to right)			*/
/****************************************************************/
// Inputs:
//	string progressBarId: the id of a controler (horizontal, left to right)
// 	Object playerVar: the player variable (curently: single youtube player,
//		to generalize to specialized generic player)
// 	Object annotationChartVar: a drawn google chart with {'packages':['annotationchart']}
// Effect: get a click on progressBarId (which size corresponds to annotationChartVar Zoom)
//		and change the playHead position inside the zoom (time range) given by the annotationChartVar.
function moveInsideRange(progressBarId, playerVar, annotationChartVar) {
	var container = document.getElementById(progressBarId);
	var coordX = relMouseCoordsX(event);
	var paddingLeftPx = $('#' + progressBarId).css('padding-left');
	var paddingLeftValue = paddingLeftPx.substr(0, paddingLeftPx.length - 2);
	var paddingRightPx = $('#' + progressBarId).css('padding-right');
	var paddingRightValue = paddingRightPx.substr(0, paddingRightPx.length - 2);
	//var fullWidth=$('#'+progressBarId).innerWidth() - (paddingLeftValue + paddingRightValue);
	var fullWidth =
		$('#' + progressBarId).css('width')
		.substr(0, $('#' + progressBarId).css('width').length - 2);
	var leftOnLeft = $('#' + progressBarId).offset().left;
	var coordXinside = coordX - leftOnLeft;
	var actualRange = annotationChartVar.getVisibleChartRange();
	console.log(actualRange);
	var actualRangeStartSec = date_2_floatSeconds(actualRange.start)
		var actualRangeEndSec = date_2_floatSeconds(actualRange.end)
		var actualRangeSizeSec = (actualRangeEndSec - actualRangeStartSec);
	if (fullWidth > 0) {
		var timetogoDate = actualRangeStartSec + ((actualRangeSizeSec * coordXinside) / fullWidth);
		// console.log("timetogoDate:" + timetogoDate);
		moveToMarker(0, timetogoDate);
	}
}
// Inputs:
//	string progressBarId: the id of a controler (horizontal, left to right)
// 	Object playerVar: the player variable (curently: single youtube player,
//		to generalize to specialized generic player)
// Effect: get a click on progressBarId (which size corresponds to annotationChartVar Zoom)
//		and change the playHead position inside the zoom (time range) given by the annotationChartVar.
function moveInsideRange2(progressBarId) {
	var container = document.getElementById(progressBarId);
	var coordX = relMouseCoordsX(event);
	var paddingLeftPx = $('#' + progressBarId).css('padding-left');
	var paddingLeftValue = paddingLeftPx.substr(0, paddingLeftPx.length - 2);
	var paddingRightPx = $('#' + progressBarId).css('padding-right');
	var paddingRightValue = paddingRightPx.substr(0, paddingRightPx.length - 2);
	//var fullWidth=$('#'+progressBarId).innerWidth() - (paddingLeftValue + paddingRightValue);
	var fullWidth =
		$('#' + progressBarId).css('width')
		.substr(0, $('#' + progressBarId).css('width').length - 2);
	var leftOnLeft = $('#' + progressBarId).offset().left;
	var coordXinside = coordX - leftOnLeft;
	var actualRangeStartSec = parseFloat($('#'+progressBarId).attr('data-progress-time_start'));
	var actualRangeEndSec = parseFloat($('#'+progressBarId).attr('data-progress-time_end'));
	var actualRangeSizeSec = (actualRangeEndSec - actualRangeStartSec);
	if (fullWidth > 0) {
		var timetogoDate = actualRangeStartSec + ((actualRangeSizeSec * coordXinside) / fullWidth);
		// console.log("timetogoDate:" + timetogoDate);
		goToTime(timetogoDate);
	}
	else{
		console.log("fullWidth not >0");
	}
}
// Inputs:
//	Object annotationChartVar: a drawn google chart with {'packages':['annotationchart']}
// 	string secondsControlerId: the id of a controleur for the offset.
//		A float in seconds is expected as value
// Effect: change the zoom size and recenter playhead
// 	xxx toredo it after the generalisation of "recenterPlayhead"
function changeSizeRange(annotationChartVar, secondsControlerId) {
	var realStartTimeDate = floatSeconds_2_HMSmS_Date(0);
	var realEndTimeDate =
		floatSeconds_2_HMSmS_Date(parseFloat($('#' + secondsControlerId).val()));
	annotationChartVar.setVisibleChartRange(realStartTimeDate, realEndTimeDate);
	recenterPlayhead(annotationChartVar, 0);
}
// Inputs:
//	Object annotationChartVar: a drawn google chart with {'packages':['annotationchart']}
// 	string secondsControlerId: the id of a controleur for the offset.
//		A float in seconds is expected as value
// Effect: change the zoom size and recenter playhead
// 	xxx toredo it after the generalisation of "recenterPlayhead"
function changeSizeRange2(controlerId, secondsControlerId) {
	$('#' + controlerId).attr('data-progress-time_start',0);
	$('#' + controlerId)
		.attr('data-progress-time_end', 
			parseFloat ($('#' + secondsControlerId).val()));
	// ttgRecenterPlayhead(controlerId, 0);
}
/****************************************************************/
/*					Time Control: fixed local					*/
/****************************************************************/
// Input:
//	string stringInputId: the id of a (text) input for the set of values required
//		(syntax: value1;value2;value3)
// 	string fixedNavPreviousId: the id of the node to fill move backward buttoms
// 	string fixedNavNextId: the id of the node to fill move forward  buttoms
// Effect: create fixed navigations buttoms in the respective containers
function createFixedNavButtons(stringInputId, fixedNavPreviousId, fixedNavNextId) {
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
					var jsOnclick = "javascript:forward('constant'," + valueSplit[i] + ")";
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
function forceFixedNav(valueToSet) {
	$('#fixedNavTimes').val(valueToSet);
	createFixedNavButtons('fixedNavTimes', 'fixedNavPrevious', 'fixedNavNext');
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
//xxx doc todo
function copyLocatedUrl(){
	urlBase = 'http://time.adrien-v.com/examples/?exNb='
		+ $('#playlistShown').attr('data-pid');
	curPlaylistItem = player.getPlaylistIndex();
	curTime = player.getCurrentTime();
	fullUrl = urlBase 
		+ '&i=' + curPlaylistItem
		+ '&t=' + curTime;
	var $temp = $("<input>")
    $("body").append($temp);
    $temp.val(fullUrl).select();
    document.execCommand("copy");
    $temp.remove();
}
//xxx doc todo
function copyCurentTime(timeType){
	var curTime = player.getCurrentTime();
	switch (timeType) {
		case 'srt':
			var curTimeSplit = floatSeconds_2_HMSmS_Obj(curTime);
			// console.log(curTimeSplit);
			// console.log(padRight(42,3,'0'));
			curTime = padLeft(curTimeSplit['hours'], 2, '0')
				+ ':' + padLeft(curTimeSplit['minutes'], 2, '0')
				+ ':' + padLeft(curTimeSplit['seconds'], 2, '0')
				+ ',' 
				+ padRight(
					(Math.round(curTimeSplit['miliseconds'] * 1000) / 1000)
					, 3
					, '0');
				console.log(curTime);	
			break;
		case 's': 
		default:
			break;
	}
	var $temp = $("<input>")
    $("body").append($temp);
    $temp.val(curTime).select();
    document.execCommand("copy");
    $temp.remove();
}
/****************************************************************/
/*******************      <div> Next/Previous *******************/
/****************************************************************/
/****************************************************************/
  function ttgMarkerMovePrevious(moveType, backTolerance, idcontainerAnnots, playerHtmlId){
	var curOffset = document.getElementById(playerHtmlId).ttgGetCurrentTime();
	curPlaylistItem = document.getElementById(playerHtmlId).ttgGetPlaylistIndex();
	// var mediaElement=mediaElements[mediaPosition];
	if (backTolerance !== null){
		curOffset = curOffset - backTolerance;
	}
	bestItemFound = null
	bestMarkerFound = null;
	switch (moveType) {
		case 'single':
		case 'singleFtxt':
			$('#' + idcontainerAnnots + " *[data-type='marker']")
			.each( function() {		
				if ( (moveType == 'single') 
					 || (moveType == 'singleFtxt' && $(this).is(":visible")) ) {
					if( $(this).attr('data-start') )
					{
						var valueThreated
							= parseFloat( $(this).attr('data-start') );	
						var itemThreated
							= parseInt( $(this).attr('data-playlist-item-start') ); 
						if( itemThreated <= curPlaylistItem )
						{
							if( (valueThreated < curOffset)
								|| (itemThreated < curPlaylistItem)) {
								if(bestMarkerFound === null) {
									bestMarkerFound = valueThreated;
									bestItemFound = itemThreated;
								}
								else{
									if( (itemThreated > bestItemFound) || 
										( (itemThreated == bestItemFound) 
											&& (curOffset - valueThreated) 
												< (curOffset - bestMarkerFound))) {
										bestMarkerFound = valueThreated;
										bestItemFound = itemThreated;
									}
								}	
							}
						}
					}
				}
			});
			break;			
	}
	if (bestMarkerFound !== null) {
		// mediaElement.currentTime=bestMarkerFound;
		if (bestItemFound == curPlaylistItem) {
			document.getElementById(playerHtmlId).ttgSeekTo(bestMarkerFound);
			//player.seekTo(bestMarkerFound);
		}
		else{
			document.getElementById(playerHtmlId).ttgPlayMediaAt(bestItemFound);
			document.getElementById(playerHtmlId).ttgSeekTo(bestMarkerFound);
		}
	}
	else{
		console.log("bestMarkerFound not found"); 
		// mediaElement.currentTime=0;
	}
  }
  
  function ttgMarkerMoveNext(moveType, forwardTolerance, idcontainerAnnots, playerHtmlId) {
	var curOffset = document.getElementById(playerHtmlId).ttgGetCurrentTime();
	curPlaylistItem = document.getElementById(playerHtmlId).ttgGetPlaylistIndex();
	if (forwardTolerance !== null) {
		curOffset = curOffset + forwardTolerance;
	}
	bestItemFound = null;
	bestMarkerFound = null;
	switch (moveType) {
	case 'single':
	case 'singleFtxt':
		$("#" + idcontainerAnnots + " *[data-type='marker']")
			.each(function(){
				if ( (moveType == 'single') 
					 || (moveType == 'singleFtxt' && $(this).is(":visible")) ) {
					if ($(this).attr('data-start')) {
						var valueThreated = 
							parseFloat($(this).attr('data-start'));	
						var itemThreated = 
							parseInt($(this).attr('data-playlist-item-start'));
						if (itemThreated >= curPlaylistItem) {
							if ( (valueThreated > curOffset)
								|| (itemThreated > curPlaylistItem) ) {
								if (bestMarkerFound === null) {
									bestMarkerFound = valueThreated;
									bestItemFound = itemThreated;
								}
								else {
									if (itemThreated<bestItemFound) {
										bestMarkerFound = valueThreated;
										bestItemFound = itemThreated;
									}
									if (itemThreated == bestItemFound) {
										if ( (valueThreated-curOffset) 
											 < (bestMarkerFound - curOffset)) {
												bestMarkerFound = valueThreated;
												bestItemFound = itemThreated;
										}
									}
								}	
							}
						}
					}
				}	
			});
		break;			
	}
	if (bestMarkerFound !== null) {
		if (bestItemFound == curPlaylistItem) {
			document.getElementById(playerHtmlId).ttgSeekTo(bestMarkerFound);
		}
		else {
			document.getElementById(playerHtmlId).ttgPlayMediaAt(bestItemFound);
			document.getElementById(playerHtmlId).ttgSeekTo(bestMarkerFound);
		}
	}
	else{
		console.log("bestMarkerFound not found"); 	// mediaElement.currentTime=0;
	}
  }  
/****************************************************************/
function buildAndDrawLocalNavBlock(containerBlockId, containerAnnotId, localNavType) {
	var newLocalNavPreviousRoot = document.createElement("span");
	newLocalNavPreviousRoot
		.setAttribute("class", 
			"btn btn-default tbtn-lg active container-fluid");
	newLocalNavPreviousRoot
		.setAttribute("onclick", 
			"javascript:markerMovePrevious('singleFtxt', 2, '" 
			+ containerAnnotId
			+ "')");
	newLocalNavPreviousRoot
		.setAttribute("title", 	'<-');	
		// .setAttribute("title", 	'Précédent');	multi-lingues
	newLocalNavPreviousTxt = document.createElement("span");
	newLocalNavPreviousTxt
		.setAttribute("class", 
			"glyphicon glyphicon-step-backward previousTrack");				
	newLocalNavPreviousTxt
		.setAttribute("aria-hidden", "true");
	newLocalNavPreviousTxt = 
		newLocalNavPreviousRoot.appendChild(newLocalNavPreviousTxt);
	document.getElementById(containerBlockId)
		.appendChild(newLocalNavPreviousRoot);

	var newLocalNavNextRoot = document.createElement("span");
	newLocalNavNextRoot
		.setAttribute("class", 
			"btn btn-default tbtn-lg active container-fluid");
	newLocalNavNextRoot
		.setAttribute("onclick", 
			"javascript:markerMoveNext('singleFtxt', 2, '" 
			+ containerAnnotId
			+ "')");
	newLocalNavNextRoot
		.setAttribute("title", 	'->');	
		// .setAttribute("title", 	'Suivant');	multi-lingues
	newLocalNavNextTxt = document.createElement("span");
	newLocalNavNextTxt
		.setAttribute("class", 
			"glyphicon glyphicon-step-forward nextTrack");				
	newLocalNavNextTxt
		.setAttribute("aria-hidden", "true");
	newLocalNavNextTxt = 
		newLocalNavNextRoot.appendChild(newLocalNavNextTxt);
	document.getElementById(containerBlockId)
			.appendChild(newLocalNavNextRoot);	
}
/****************************************************************/
function ttgBuildAndDrawLocalNavBlock(containerBlockId, containerAnnotId, localNavType, playerHtmlId) {
	var newLocalNavPreviousRoot = document.createElement("span");
	newLocalNavPreviousRoot
		.setAttribute("class", 
			"btn btn-default tbtn-lg active container-fluid");
	newLocalNavPreviousRoot
		.setAttribute("onclick", 
			"javascript:ttgMarkerMovePrevious('singleFtxt', 2, '" 
			+ containerAnnotId
			+ "','" 
			+ playerHtmlId + "')");
	newLocalNavPreviousRoot
		.setAttribute("title", 	'<-');	
		// .setAttribute("title", 	'Précédent');	multi-lingues
	newLocalNavPreviousTxt = document.createElement("span");
	newLocalNavPreviousTxt
		.setAttribute("class", 
			"glyphicon glyphicon-step-backward previousTrack");				
	newLocalNavPreviousTxt
		.setAttribute("aria-hidden", "true");
	newLocalNavPreviousTxt = 
		newLocalNavPreviousRoot
			.appendChild(newLocalNavPreviousTxt);
	document.getElementById(containerBlockId)
		.appendChild(newLocalNavPreviousRoot);

	var newLocalNavNextRoot = document.createElement("span");
	newLocalNavNextRoot
		.setAttribute("class", 
			"btn btn-default tbtn-lg active container-fluid");
	newLocalNavNextRoot
		.setAttribute("onclick", 
			"javascript:ttgMarkerMoveNext('singleFtxt', 2, '" 
			+ containerAnnotId
			+ "','" 
			+ playerHtmlId + "')");
	newLocalNavNextRoot
		.setAttribute("title", 	'->');	
		// .setAttribute("title", 	'Suivant');	multi-lingues
	newLocalNavNextTxt = document.createElement("span");
	newLocalNavNextTxt
		.setAttribute("class", 
			"glyphicon glyphicon-step-forward nextTrack");				
	newLocalNavNextTxt
		.setAttribute("aria-hidden", "true");
	newLocalNavNextTxt = 
		newLocalNavNextRoot.appendChild(newLocalNavNextTxt);
	document.getElementById(containerBlockId)
			.appendChild(newLocalNavNextRoot);	
}
/****************************************************************/
/********************      <ul> Text Chart    *******************/
/****************************************************************/
// Input: Object objectParams with a property annotsArray: an array of Objects('meta','data')
// Effect: insert below objectParams.chartContainerId a <ul> for each object
//	with one <li> clicable by segment in data
// 	click a li will make the playHead move to the start of the corresponding segment.
function buildAndDrawTextChart(objectParams) {
	// xxxx add test for objectParams nextChoice
	if (objectParams.localNavType) {
		var newNavBlockId;
		if (objectParams.localNavBlockId) {
			newNavBlockId = objectParams.localNavBlockId;
		}
		else {
			newNavBlockId = 
				"localNav_" 
				+ objectParams.localNavType
				+ "_"
				+ objectParams.chartContainerId;
			var newLocalNavRoot = document.createElement("div");
			newLocalNavRoot
				.setAttribute("id", newNavBlockId);
			newLocalNavRoot
				.setAttribute("class", 
					"container-fluid center localNavBlock");
			document.getElementById(objectParams.chartContainerId)
				.appendChild(newLocalNavRoot);
		}	
		buildAndDrawLocalNavBlock(newNavBlockId, objectParams.chartContainerId, 'singleFtxt');
	}
	for (var iAnnot = 0; iAnnot < objectParams['annotsArray'].length; iAnnot++) {
		var newUlRoot = document.createElement("ul");
		newUlRoot.setAttribute("class", "list-group");
		newUlRoot = document.getElementById(objectParams.chartContainerId).appendChild(newUlRoot);
		for (var segmentkey in objectParams['annotsArray'][iAnnot]['data']) {
			var segmentObject = objectParams['annotsArray'][iAnnot]['data'][segmentkey];
			var newli = document.createElement("li");
			newli.append(document.createTextNode(segmentObject.title));
			newli.setAttribute("class", "list-group-item");
			newli.setAttribute("data-type", "marker");
			newli.setAttribute("data-playlist-item-start", segmentObject.item_start);
			newli.setAttribute("data-start", segmentObject.time_start);
			newli.setAttribute("data-playlist-item-end", segmentObject.item_end);
			newli.setAttribute("data-end", segmentObject.time_end);
			newli.setAttribute(
				"onclick",
				'moveToMarker(' + segmentObject.item_start + ',' + segmentObject.time_start + ')');
			newli = newUlRoot.appendChild(newli);
		}
	}
}
// Input: Object objectParams with a property annotsArray: an array of Objects('meta','data')
// Effect: insert below objectParams.chartContainerId a <ul> for each object
//	with one <li> clicable by segment in data
// 	click a li will make the playHead move to the start of the corresponding segment.
function ttgAnnotationUlBasic(objectParams) {
	// xxxx add test for objectParams nextChoice
	if (objectParams.localNavType) {
		var newNavBlockId;
		if (objectParams.localNavBlockId) {
			newNavBlockId = objectParams.localNavBlockId;
		}
		else {
			newNavBlockId = 
				"localNav_" 
				+ objectParams.localNavType
				+ "_"
				+ objectParams.chartContainerId;
			var newLocalNavRoot = document.createElement("div");
			newLocalNavRoot
				.setAttribute("id", newNavBlockId);
			newLocalNavRoot
				.setAttribute("class", 
					"container-fluid center localNavBlock");
			document.getElementById(objectParams.chartContainerId)
				.appendChild(newLocalNavRoot);
		}	
		ttgBuildAndDrawLocalNavBlock(newNavBlockId, 
			objectParams.chartContainerId, 
			'singleFtxt', 
			objectParams.playerHtmlId);
	}
	for (var iAnnot = 0; iAnnot < objectParams['annotsArray'].length; iAnnot++) {
		var newUlRoot = document.createElement("ul");
		newUlRoot.setAttribute("class", "list-group");
		newUlRoot = document.getElementById(objectParams.chartContainerId).appendChild(newUlRoot);
		for (var segmentkey in objectParams['annotsArray'][iAnnot]['data']) {
			var segmentObject = objectParams['annotsArray'][iAnnot]['data'][segmentkey];
			var newli = document.createElement("li");
			newli.append(document.createTextNode(segmentObject.title));
			newli.setAttribute("class", "list-group-item");
			newli.setAttribute("data-type", "marker");
			newli.setAttribute("data-playlist-item-start", segmentObject.item_start);
			newli.setAttribute("data-start", segmentObject.time_start);
			newli.setAttribute("data-playlist-item-end", segmentObject.item_end);
			newli.setAttribute("data-end", segmentObject.time_end);
			newli.setAttribute(
				"onclick",
				"document.getElementById('" + objectParams.playerHtmlId + "')" 
					+ '.ttgSeekTo(' + segmentObject.time_start + ')');
				// xxx voir pour le cas playlist
				// 'moveToMarker(' + segmentObject.item_start + ',' + segmentObject.time_start + ')');
			newli = newUlRoot.appendChild(newli);
		}
	}
}
// Inputs:
//	string inputTextId: the id of a input text to search
// 	string rootSearchId: the id of block to search inside
// Effect: show below rootSearchId only makers with text matching the value of inputTextId
function filterNodesWithText(inputTextId, rootSearchId) {
	var textToSearch = $("#" + inputTextId).val().toLowerCase();
	$("#" + rootSearchId + " [data-type='marker']").each(function () {
		if (textToSearch) {
			if ($(this).text().toLowerCase().indexOf(textToSearch) != -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		} else {
			$(this).show();
		}
	});
}
/****************************************************************/
/*********************   local Nav Table  ***********************/
/****************************************************************/
// Input: Object objectParams with a property annotsArray: an array of Objects('meta','data')
// Effect: insert inside objectParams.chartContainerId a <tr> for each element of annotsArray.
// 	each <tr> is made of 3 cels: title, previous marker, next marker.
function buildAndDrawLocalTableChart(objectParams) {
	if (objectParams['annotsArray'].length > 0) {
		var nodeToFill = document.getElementById(objectParams['chartContainerId']);
		for (var iAnnot = 0; iAnnot < objectParams['annotsArray'].length; iAnnot++) {
			var idData = "markers_" + objectParams['chartContainerId'] + '_' + iAnnot;
			var annotLine = document.createElement('tr');
			nodeToFill.append(annotLine);
			var tdTitle = document.createElement('td');
			tdTitle.append(
				document.createTextNode(
					String(objectParams["annotsArray"][iAnnot]["meta"]["title"])));
			tdTitle.setAttribute("id", idData);
			for (var segmentkey in(objectParams["annotsArray"][iAnnot]["data"])) {
				var segmentObject = objectParams["annotsArray"][iAnnot]["data"][segmentkey];
				// xxx add a test here to integrate for instance minValue to consider
				if (true) {
					var segmentNode = document.createElement('span');
					segmentNode.setAttribute("data-type", "marker");
					segmentNode.setAttribute("data-playlist-item-start", segmentObject["item_start"]);
					segmentNode.setAttribute("data-start", segmentObject["time_start"]);
					tdTitle.append(segmentNode);
				}
			}
			annotLine.append(tdTitle);
			var tdPrevious = document.createElement('td');
			tdPrevious.innerHTML =
				'<span class="btn btn-default tbtn-lg active container-fluid"'
				 + ' onclick="javascript:markerMovePrevious(\'single\',2,\''
				 + idData
				 + '\')" title="précédent"><span class="glyphicon glyphicon-step-backward previousTrack"'
				 + 'aria-hidden="true"></span></span>';
			annotLine.append(tdPrevious);
			var tdNext = document.createElement('td');
			tdNext.innerHTML =
				'<span class="btn btn-default tbtn-lg active" '
				 + 'onclick="javascript:markerMoveNext(\'single\',2,\''
				 + idData
				 + '\')" title="Chapitre suivant">'
				 + '<span class="glyphicon glyphicon-step-forward nextTrack" aria-hidden="true">'
				 + '</span></span>';
			annotLine.append(tdNext);
		}
	}
}
/****************************************************************/
/*********************   Annotation Chart    ********************/
/****************************************************************/
function customAnnotationchart() {
	$('#customAnnotationchartModal').modal('show');
}
// Input: Object objectParams with a property annotsArray: an array of Objects('meta','data')
// Effect: fill objectParams.chartContainerId with an google.visualization.AnnotationChart
// 	adapt size/position of objectParams.progressBarRangeId to the size od the AnnotationChart
// 	add onclick-action (control offset) on this objectParams.progressBarRangeId
// 	add onclick-action (recenter the playHead) on objectParams.playHeadCenterId
// 	add onclick-action (change the size of the zoom) on objectParams.fixRangeLengthId
function buildAndDrawAnnotationChart(objectParams) {
	// console.log(objectParams);
	google.charts.load('current', {
		'packages': ['annotationchart']
	});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() {
		// Get sorted data (by time start), initialize all corresponding position to 0
		var sortedDatas = Array();
		var myPositions = Array();
		for (var iAnnot = 0; iAnnot < objectParams['annotsArray'].length; iAnnot++) {
			var localSortedArray = Array();
			var localItemFound = 0;
			for (var localKey in objectParams['annotsArray'][iAnnot]['data']) {
				localSortedArray.push(objectParams['annotsArray'][iAnnot]['data'][localKey]);
			}
			localSortedArray.sort(function (x, y) {
				return
				(x['item_start'] > y['item_start'])
				 || ((x['item_start'] == y['item_start'])
					 && (x['time_start'] > y['time_start']));
			});
			sortedDatas.push(localSortedArray);
			myPositions.push(0);
		}
		// Build data table for the google visualization
		var data = new google.visualization.DataTable();
		data.addColumn('datetime', 'Date', 'an,_date');
		for (var iAnnot = 0; iAnnot < objectParams['annotsArray'].length; iAnnot++) {
			var an_title = 'Annotation ' + iAnnot;
			console.log(objectParams);
			if (objectParams["titles"][iAnnot]) {
				an_title = objectParams["titles"][iAnnot];
			} else {
				if (objectParams['annotsArray'][iAnnot]['meta']['title']) {
					an_title = objectParams['annotsArray'][iAnnot]['meta']['title'];
				}
			}
			data.addColumn('number', an_title);
			data.addColumn('string', an_title + ' title');
			data.addColumn('string', an_title + ' text');
		}
		var continueMerge = true;
		var insertedLineNb = 0;
		largestTime = null;
		// add a row for each time stard found,
		// increment position on each (sorted) annotation when a segment is threated.
		// continue until alll segments are threated
		// xxx mettre une borne paramétrée si le besoin apparait
		while (continueMerge && insertedLineNb < 300000) {
			smallestMarker = null;
			insertedLineNb++;
			incompleteFound = false;
			for (var iAnnot = 0; iAnnot < objectParams['annotsArray'].length; iAnnot++) {
				if ((myPositions[iAnnot] >= 0) && sortedDatas[iAnnot][myPositions[iAnnot]]) {
					incompleteFound = true;
				}
			}
			if (!incompleteFound) {
				continueMerge = false;
				break;
			} else {
				// console.log('search min');
				for (var iAnnot = 0; iAnnot < objectParams['annotsArray'].length; iAnnot++) {
					if ((myPositions[iAnnot] >= 0) && sortedDatas[iAnnot][myPositions[iAnnot]]) {
						var myTime = sortedDatas[iAnnot][myPositions[iAnnot]]['time_start'];
						if (smallestMarker === null) {
							smallestMarker = parseFloat(myTime);
						} else {
							if (parseFloat(myTime) < smallestMarker) {
								smallestMarker = parseFloat(myTime);
							}
						}
						var myTimeEnd = sortedDatas[iAnnot][myPositions[iAnnot]]['time_end'];
						if (largestTime === null) {
							largestTime = parseFloat(myTimeEnd);
						} else {
							if (parseFloat(myTimeEnd) > largestTime) {
								largestTime = parseFloat(myTimeEnd);
							}
						}
					}
				}
				newRowToInsert = [[floatSeconds_2_HMSmS_Date(smallestMarker)]];
				// var newRowToInsert = [[ floatSeconds_2_HMS_Date(smallestMarker) ]];
				// console.log(newRowToInsert);
				for (var iAnnot = 0; iAnnot < objectParams['annotsArray'].length; iAnnot++) {
					if ((myPositions[iAnnot] >= 0)
						 && sortedDatas[iAnnot][myPositions[iAnnot]]
						 && (sortedDatas[iAnnot][myPositions[iAnnot]]['time_start']
							 == smallestMarker)) {
						var curVal = iAnnot;
						if (sortedDatas[iAnnot][myPositions[iAnnot]]['likeValue']) {
							curVal =
								parseFloat(sortedDatas[iAnnot][myPositions[iAnnot]]['likeValue']);
						}
						newRowToInsert[0].push(curVal);
						var curTitle = undefined;
						if (sortedDatas[iAnnot][myPositions[iAnnot]]['title']) {
							curTitle = sortedDatas[iAnnot][myPositions[iAnnot]]['title'];
						}
						newRowToInsert[0].push(padLeft(Math.round(smallestMarker), 10, ' '));
						newRowToInsert[0].push(curTitle);
						myPositions[iAnnot] = myPositions[iAnnot] + 1;
					} else {
						// console.log("else case");
						var curVal = iAnnot; //xxx change here for y values
						newRowToInsert[0].push(curVal);
						newRowToInsert[0].push(undefined);
						// newRowToInsert[0].push(insertedLineNb.toString());
						newRowToInsert[0].push(undefined);
					}
				}
				// data.addRows(newRowToInsert); // console.log(newRowToInsert);
				data.addRows(newRowToInsert); // console.log(newRowToInsert);
			}
		}
		// add a final point for the latest segment's end
		var newRowToInsert = [[floatSeconds_2_HMSmS_Date(largestTime)]];
		for (var iAnnot = 0; iAnnot < objectParams['annotsArray'].length; iAnnot++) {
			var curVal = iAnnot; // xxx change here for using some y values
			newRowToInsert[0].push(curVal);
			newRowToInsert[0].push('the end');
			newRowToInsert[0].push(undefined);
		}
		data.addRows(newRowToInsert);
		// build and draw the AnnotationChart
		var annotationChart =
			new google.visualization.AnnotationChart(
				document.getElementById(objectParams['chartContainerId']));
		var optionsAnnotationChart = {
			displayAnnotations: false,
			// displayLegendDots:false,
			zoomButtonsOrder: Array('max'),
			// annotationsWidth:25,
			// table: {
			// sortAscending: true,
			// sortColumn:1
			// },
			thickness: 2
			// displayAnnotationsFilter:true,
			// displayAnnotations: true,
			// displayLegendValues:false,
		};
		console.log(data);
		// overload params from the user form ...
		annotationChart.draw(data, optionsAnnotationChart);
		console.log(annotationChart.getContainer());
		$('#' + objectParams['chartContainerId'] + '_AnnotationChart_chartContainer')
			.find('rect').first().each(function () {
				//console.log(this); 	console.log(this['x']['baseVal']['value']); console.log(this['width']['baseVal']['value']);
				$('#' + objectParams['progressBarRangeId'])
				.css('margin-left', this['x']['baseVal']['value']);
				$('#' + objectParams['progressBarRangeId'])
				.css('width', this['width']['baseVal']['value']);
				$('#' + objectParams['progressBarRangeId'])
				.css('min-width', this['width']['baseVal']['value']);
				$('#' + objectParams['progressBarRangeId'])
				.css('max-width', this['width']['baseVal']['value']);
			});
		$('#' + objectParams['playHeadCenterId'])
			.attr(
				"data-range-date",
				JSON.stringify(annotationChart.getVisibleChartRange()));
		function selectHandler() {
			var mySegmentChosen = annotationChart.getSelection();
			if (mySegmentChosen.length > 0) {
				var timetogoto = 0;
				// var dateStart = data.Tf[0]["c"][0]["v"];
				var dateStart = floatSeconds_2_HMSmS_Date(0);
				var dateClicked = data.Tf[mySegmentChosen[0].row]["c"][0]["v"];
				timetogoto = (dateClicked - dateStart) / 1000;
				moveToMarker(0, timetogoto); // xxx to generalize for playlist ?
			}
		};
		function rangechange_handler(e) {
			// console.log('You changed the range to ', e['start'], ' and ', e['end']);
		}
		google.visualization.events
			.addListener(annotationChart, 'select', selectHandler);
		google.visualization.events
			.addListener(annotationChart, 'rangechange', rangechange_handler);
		// google.visualization.events.addListener(annotationChart, 'ready', recenter_handler);
		$('#' + objectParams['playHeadCenterId']).off("click").on("click", function () {
			recenterPlayhead(annotationChart, 0);
		});
		$('#' + objectParams['playHeadAutoCenterId']).off("click").on("click", function () {
			if ($('#' + objectParams['playHeadAutoCenterId']).is(':checked')) {
				recenterPlayhead(
					annotationChart,
					parseInt($('#' + objectParams['playHeadAutoCenterPeriodMs']).val()));
			}
		});
		$('#' + objectParams['progressBarRangeId']).off("click").on("click", function () {
			moveInsideRange('progressBarRange', player, annotationChart); 
		});
		$('#' + objectParams['forceRangeDurationId']).off("click").on("click", function () {
			changeSizeRange(annotationChart, objectParams['forcedRangeDurationSecId']);
		});
		updateProgress(objectParams['progressBarRangeId'], player, annotationChart, 0);
	}
}
/****************************************************************/
/***********************      Pie Chart    **********************/
/****************************************************************/
function customPie() {
	$('#customPieModal').modal('show');
}
function buildAndDrawPieChart(objectParams) {
	// console.log(objectParams);
	google.charts.load("current", {
		packages: ["corechart"]
	});
	function doDrawPieChart() {
		var pieChartOverview = {
			init: function (objectParams) {
				if (objectParams["chartLegendPositionId"]) {
					if ($('#' + objectParams["chartLegendPositionId"]).val()) {
						objectParams.chartOptions.legend.position = $('#' + objectParams["chartLegendPositionId"]).val();
					}
				}
				if (objectParams["chartIs3dId"]) {
					if ($('#' + objectParams["chartIs3dId"]).prop('checked')) {
						objectParams.chartOptions.is3D = 'true';
					} else {
						objectParams.chartOptions.is3D = 'false';
					}
				}
				if (objectParams["chartWidthId"]) {
					if ($('#' + objectParams["chartWidthId"]).val()) {
						objectParams.chartOptions.height = Math.round(parseFloat($('#' + objectParams["chartWidthId"]).val()));
					}
				}
				if (objectParams["chartHeightId"]) {
					if ($('#' + objectParams["chartHeightId"]).val()) {
						objectParams.chartOptions.height = Math.round(parseFloat($('#' + objectParams["chartHeightId"]).val()));
					}
				}
				if (objectParams["chartSegmentSizeCriterionId"]) {
					objectParams.sizeCriterionId = $('#' + objectParams["chartSegmentSizeCriterionId"]).val();
				}
				if (typeof objectParams.sizeCriterionId === 'undefined') {
					objectParams.sizeCriterionId = "time_length";
				}
				if (objectParams["chartEmptyAngleDegreeId"]) {
					objectParams.chartEmptyAngleDegree = $('#' + objectParams["chartEmptyAngleDegreeId"]).val();
				}
				if (typeof objectParams.chartEmptyAngleDegree === 'undefined') {
					objectParams.chartEmptyAngleDegree = 0;
				}
				if (objectParams["chartStartAngleDegreeId"]) {
					console.log('inputFound for chartStartAngleDegreeId');
					objectParams.chartStartAngleDegree = $('#' + objectParams["chartStartAngleDegreeId"]).val();
				}
				if (typeof objectParams.chartEmptyAngleDegree === 'undefined') {
					objectParams.chartStartAngleDegree = 0;
				}
				if (objectParams["chartSegmentOffsetCriterionId"]) {
					objectParams.offsetCriterionId = $('#' + objectParams["chartSegmentOffsetCriterionId"]).val();
				}
				if (objectParams["chartColorCriterionId"]) {
					objectParams.colorCriterion = $('#' + objectParams["chartColorCriterionId"]).val();
				}
				if (typeof objectParams["colorCriterion"] === 'undefined') {
					objectParams.colorCriterion = "";
				}
				if (objectParams["chartSegmentColorMinId"]) {
					objectParams.colorCriterionStart = $('#' + objectParams["chartSegmentColorMinId"]).val();
				}
				if (objectParams["chartSegmentColorMaxId"]) {
					objectParams.colorCriterionEnd = $('#' + objectParams["chartSegmentColorMaxId"]).val();
				}
				if (typeof objectParams["colorCriterionStart"] === 'undefined') {
					objectParams.colorCriterionStart = "#fcfad9";
				}
				if (typeof objectParams["colorCriterionEnd"] === 'undefined') {
					objectParams.colorCriterionEnd = "#ff9102";
				}
				if (objectParams["chartPieHoleId"]) {
					objectParams.chartOptions.pieHole = $('#' + objectParams["chartPieHoleId"]).val();
				}
				if (objectParams["chartPieSliceTextId"]) {
					objectParams.chartOptions.pieSliceText = $('#' + objectParams["chartPieSliceTextId"]).val();
				}
				if (objectParams["chartSegmentOffsetMaxId"]) {
					objectParams.chartSegmentOffsetMax = parseFloat($('#' + objectParams["chartSegmentOffsetMaxId"]).val());
				} else {
					if (typeof objectParams["chartSegmentOffsetMax"] === 'undefined') {
						objectParams.chartSegmentOffsetMax = 0.2;
					}
				}
				var pieChartArray = [['Partie', 'début', 'Taille', 'Couleur', ]];
				var minValSize = null;
				var maxValSize = null;
				var minValSlideOffset = null;
				var maxValSlideOffset = null;
				var minValSlideColor = null;
				var maxValSlideColor = null;
				for (var segmentkey in objectParams.globalAssocArray) {
					var segmentObject = objectParams.globalAssocArray[segmentkey];
					if (minValSize === null) {
						minValSize = parseFloat(segmentObject[objectParams["sizeCriterionId"]]);
						maxValSize = parseFloat(segmentObject[objectParams["sizeCriterionId"]]);
					} else {
						if (minValSize > parseFloat(segmentObject[objectParams["sizeCriterionId"]])) {
							minValSize = parseFloat(segmentObject[objectParams["sizeCriterionId"]]);
						}
						if (maxValSize < segmentObject[objectParams["sizeCriterionId"]]) {
							maxValSize = parseFloat(segmentObject[objectParams["sizeCriterionId"]]);
						}
					}
					if (minValSlideOffset === null) {
						minValSlideOffset = parseFloat(segmentObject[objectParams["offsetCriterionId"]]);
						maxValSlideOffset = parseFloat(segmentObject[objectParams["offsetCriterionId"]]);
					} else {
						if (minValSlideOffset > parseFloat(segmentObject[objectParams["offsetCriterionId"]])) {
							minValSlideOffset = parseFloat(segmentObject[objectParams["offsetCriterionId"]]);
						}
						if (maxValSlideOffset < segmentObject[objectParams["offsetCriterionId"]]) {
							maxValSlideOffset = parseFloat(segmentObject[objectParams["offsetCriterionId"]]);
						}
					}
					if (objectParams.colorCriterion.length > 0) {
						if (minValSlideColor === null) {
							minValSlideColor = parseFloat(segmentObject[objectParams["colorCriterion"]]);
							maxValSlideColor = parseFloat(segmentObject[objectParams["colorCriterion"]]);
						} else {
							if (minValSlideColor > parseFloat(segmentObject[objectParams["colorCriterion"]])) {
								minValSlideColor = parseFloat(segmentObject[objectParams["colorCriterion"]]);
							}
							if (maxValSlideColor < segmentObject[objectParams["colorCriterion"]]) {
								maxValSlideColor = parseFloat(segmentObject[objectParams["colorCriterion"]]);
							}
						}
					}
				}
				// console.log("minValSlideColor "+minValSlideColor+" maxValSlideColor "+ maxValSlideColor);
				var minSizeToAdd = 0;
				if (minValSize == maxValSize) {
					if (minValSize <= 0) {
						minSizeToAdd = 1 - minValSize;
					}
				} else {
					if (minValSize < 0) {
						minSizeToAdd = 0.01 - minValSize; // a voir si on ajoute moins de 1 voir quel epsilon
					}
				}
				var minOffsetToAdd = 0;
				if (minValSlideOffset == maxValSlideOffset) {
					if (minValSlideOffset <= 0) {
						minOffsetToAdd = Math.abs(minValSlideOffset);
					}
				} else {
					if (minValSlideOffset < 0) {
						minOffsetToAdd = 0.0 - minValSlideOffset;
					}
				}
				// console.log("minSizeToAdd "+minSizeToAdd);
				var totalSizeToDrawn = 0;
				for (var segmentkey in objectParams.globalAssocArray) {
					var segmentObject = objectParams.globalAssocArray[segmentkey];
					var segmentSizeValue = minSizeToAdd + parseFloat(segmentObject[objectParams["sizeCriterionId"]]);
					// console.log(segmentObject);
					totalSizeToDrawn = totalSizeToDrawn + segmentSizeValue;
					pieChartArray.push([segmentObject["title"], segmentSizeValue, segmentObject[objectParams["colorCriterion"]], parseFloat(segmentObject["time_start"])]);
				}
				var emptySegmentValue = 0;
				if (totalSizeToDrawn > 0) {
					// console.log("totalSizeToDrawn>0");
					if (objectParams.chartEmptyAngleDegree > 0) {
						if (parseFloat(objectParams.chartEmptyAngleDegree) < 360) {
							emptySegmentValue = totalSizeToDrawn * (parseFloat(objectParams.chartEmptyAngleDegree)) / (360.0 - parseFloat(objectParams.chartEmptyAngleDegree))
						}
					}
				}
				// console.log('emptySegmentValue: '+emptySegmentValue);
				pieChartArray.push(['', emptySegmentValue, 0, 0]);
				var offsetsOption = '';
				var offsetFound = 0;
				objectParams.chartOptions.slices = {};
				for (var segmentkey in objectParams.globalAssocArray) {
					var segmentObject = objectParams.globalAssocArray[segmentkey];
					objectParams.chartOptions.slices[offsetFound] = {};
					offsetFound++;
				}
				if (objectParams.chartEmptyAngleDegree > 0) {
					if (parseFloat(objectParams.chartEmptyAngleDegree) < 360) {
						objectParams.chartOptions.slices[offsetFound] = {};
					}
				}
				var totalSegmentFound = offsetFound;
				offsetFound = 0;
				if (maxValSlideOffset + minOffsetToAdd > 0) {
					for (var segmentkey in objectParams.globalAssocArray) {
						var segmentObject = objectParams.globalAssocArray[segmentkey];
						objectParams.chartOptions.slices[offsetFound]["offset"] = objectParams["chartSegmentOffsetMax"] * (minOffsetToAdd + parseFloat(segmentObject[objectParams["offsetCriterionId"]])) / maxValSlideOffset;
						offsetFound++;
					}
				}
				if (objectParams.chartStartAngleDegree > 0) {
					objectParams.chartOptions.pieStartAngle = objectParams.chartStartAngleDegree;
				}
				if (objectParams.colorCriterion.length > 0) {
					offsetFound = 0;
					for (var segmentkey in objectParams.globalAssocArray) {
						var segmentObject = objectParams.globalAssocArray[segmentkey];
						var alphaColor = 1
							if (minValSlideColor !== maxValSlideColor) {
								if (parseFloat(segmentObject[objectParams["colorCriterion"]]) > minValSlideColor) {
									alphaColor = (parseFloat(segmentObject[objectParams["colorCriterion"]]) - minValSlideColor) / (maxValSlideColor - minValSlideColor);
									// var segmentColor = ColorLuminance(objectParams.colorCriterionEnd, 1-alphaColor);
									var segmentColor = ColorInterpolation(objectParams.colorCriterionStart, objectParams.colorCriterionEnd, 1 - alphaColor);
									objectParams.chartOptions.slices[offsetFound]["color"] = segmentColor;
								} else {
									objectParams.chartOptions.slices[offsetFound]["color"] = objectParams.colorCriterionStart;
								}
							}
							offsetFound++;
					}
					if (objectParams.chartEmptyAngleDegree > 0) {
						if (parseFloat(objectParams.chartEmptyAngleDegree) < 360) {
							objectParams.chartOptions.slices[totalSegmentFound]["color"] = 'transparent';
						}
					}
				} else {
					if (objectParams.chartEmptyAngleDegree > 0) {
						if (parseFloat(objectParams.chartEmptyAngleDegree) < 360) {
							if (!objectParams.chartOptions.slices[totalSegmentFound]) {
								objectParams.chartOptions.slices[totalSegmentFound] = {};
							}
							objectParams.chartOptions.slices[totalSegmentFound]["color"] = 'transparent';
						}
					}
				}
				// draw pie chart // console.log(pieChartArray);
				var dataForPieChart = new google.visualization.arrayToDataTable(pieChartArray);
				var pieChartJson = new google.visualization.PieChart(document.getElementById(objectParams.chartContainerId)); //xxxx to correct to avoid colision -> not so global
				var chartLegendPositionStr = 'none';
				var optionsPieChart = {
					pieHole: 0.4,
					legend: {
						position: chartLegendPositionStr
					},
					chartArea: {
						width: '100%',
						height: '100%'
					},
					pieSliceText: 'none',
					//pieSliceText: 'label',legend:{position:'labeled'},
				};
				var componentsPie = [];
				// objectParams.chartOptions.tooltip={'ignoreBounds':true};
				pieChartJson.draw(dataForPieChart, objectParams.chartOptions);
				var containerPie = document.getElementById(objectParams.gadgetContainerId);
				function selectHandlerPie() {
					var mySegmentChosen = pieChartJson.getSelection();
					if (mySegmentChosen.length > 0) {
						// console.log("click on "+mySegmentChosen[0].row);
						moveToMarker(0, pieChartArray[1 + mySegmentChosen[0].row][3]);
					}
				};
				//google.visualization.drawToolbar(containerPie, componentsPie);
				google.visualization.events.addListener(pieChartJson, 'select', selectHandlerPie);
			},
		};
		pieChartOverview.init(objectParams)
	}
	google.charts.setOnLoadCallback(doDrawPieChart);
}
/****************************************************************/
/*********************      getAsJsArray    *********************/
/****************************************************************/
function getAsJsArray(annotType, annotUrl, callBackFunct, callBackParams) {
	//var globalAssocArray=Array();
	switch (annotType) {
	case 'csv_av':
		$.get(annotUrl, function (data) {
			var globalAssocArray = Array();
			var allTextLines = data.split(/\r\n|\n/);
			var headers = allTextLines[0].split("\t");
			var lines = [];
			for (var i = 1; i < allTextLines.length; i++) {
				var dataLine = allTextLines[i].split("\t");
				if (dataLine.length <= headers.length) {
					globalAssocArray[i - 1] = Array();
					for (var j = 0; j < headers.length; j++) {
						globalAssocArray[i - 1][headers[j]] = dataLine[j];
					}
					if (!(globalAssocArray[i - 1]['time_length'])) {
						globalAssocArray[i - 1]['time_length'] = globalAssocArray[i - 1]['time_end'] - globalAssocArray[i - 1]['time_start'];
					}
					if (!(globalAssocArray[i - 1]['item_start'])) {
						globalAssocArray[i - 1]['item_start'] = 0;
					}
					if (!(globalAssocArray[i - 1]['item_end'])) {
						globalAssocArray[i - 1]['item_end'] = 0;
					}
				}
			}
			callBackParams["globalAssocArray"] = globalAssocArray;
			console.log(globalAssocArray);
			callBackFunct(callBackParams);
		});
		break;
	case 'xml_pullup':
		break;
	case 'srtFile':
		$.get(annotUrl, function (data) {
			console.log(srtFileData);
			console.log(data);
			var srt = new Srt(data);
			// console.log(srt);
			var globalAssocArray = Array();
			if (srt.lines.length > 0) {
				for (var iInSrt = 0; iInSrt < srt.lines.length; iInSrt++) {
					var keySegment = 'an_0_' + iInSrt;
					globalAssocArray[keySegment] = Array();
					globalAssocArray[keySegment]['item_start'] = 0;
					globalAssocArray[keySegment]['time_start'] = srt.lines[iInSrt].start.timeAllSeconds;
					globalAssocArray[keySegment]['item_middle'] = 0;
					globalAssocArray[keySegment]['time_middle'] = (srt.lines[iInSrt].start.timeAllSeconds + srt.lines[iInSrt].end.timeAllSeconds) / 2;
					globalAssocArray[keySegment]['item_end'] = 0;
					globalAssocArray[keySegment]['time_end'] = srt.lines[iInSrt].end.timeAllSeconds;
					globalAssocArray[keySegment]['time_length'] = srt.lines[iInSrt].end.timeAllSeconds - srt.lines[iInSrt].start.timeAllSeconds;
					globalAssocArray[keySegment]['likeValue'] = 1;
					globalAssocArray[keySegment]['title'] = srt.lines[iInSrt].subtitle;
				}
			}
			callBackParams["globalAssocArray"] = globalAssocArray;
			console.log(globalAssocArray);
			callBackFunct(callBackParams);
		});
		break;
	case 'json_avTV':
		$.getJSON(annotUrl, function (annotJsondata) {
			var globalAssocArray = Array();
			var dimPieSlideChoice = 'time_length';
			//var dimPieSlideChoice='likeValue';
			for (var iInJson = 0; iInJson < annotJsondata.length; iInJson++) {
				var idThreatedPos = annotJsondata[iInJson].name.split('_', 3).join('_').length;
				var idThreated = annotJsondata[iInJson].name.substring(0, idThreatedPos);
				var nameRemainingAfterId = annotJsondata[iInJson].name.substring(idThreatedPos + 1);
				if (!(idThreated in globalAssocArray)) {
					globalAssocArray[idThreated] = Array();
				}
				globalAssocArray[idThreated][nameRemainingAfterId] = annotJsondata[iInJson].value;
			}
			for (var globalAssocArrayKey in globalAssocArray) {
				if ('time_start' in globalAssocArray[globalAssocArrayKey]) {
					if ('time_end' in globalAssocArray[globalAssocArrayKey]) {
						if (globalAssocArray[globalAssocArrayKey]['item_start'] == globalAssocArray[globalAssocArrayKey]['item_end']) {
							globalAssocArray[globalAssocArrayKey]['time_length'] = globalAssocArray[globalAssocArrayKey]['time_end'] - globalAssocArray[globalAssocArrayKey]['time_start'];
						}
						//else generalize for the case with several items involved (crossing segments)
					}
				}
			}
			// console.log(globalAssocArray);
			callBackParams["globalAssocArray"] = globalAssocArray;
			// console.log(callBackParams);
			callBackFunct(callBackParams);
		});
		return true;
		break;
	default:
		return true;
		break;
	}
}
/****************************************************************/
/******************      getAsJsArrayOfArray    *****************/
/****************************************************************/
// Input: 
//	Array(Object{'annotType','annotUrl','annotTitle'}) annotsArray: the annotations to retrieve
// 	annotType is the (inner) format of the annotation: 'srtFile', 'json_avTV', 'csv_av'
// 	annotUrl is the path (url) to the annotation file
// 	annotTitle can be used to set up the title of the annotation (use it when the format does not provide such a feature)
// 	function callBackFunct: the call back to apply after the retrieve
// 	Object callBackParams: the argument for the callBack function (possiblly modified during the retrieve)
// Effect: Retrieve all the annotations and for each one, load it as a generic Object({'meta','data'})
// 	add those objects to the array callBackParams["annotsArray"]
// 	finally call the callBackFunct function with this augmented callBackParams
function getAsJsArrayOfArray(annotsArray, callBackFunct, callBackParams) {
	var globalRespArrays = Array();
	var globalAssocArrays = Array();
	var globalCalls = Array();
	var globalMetas = Array();
	var globalTitles = Array();
	var globalItemStarts = Array();
	// console.log(annotsArray);
	if (annotsArray.length > 0) {
		for (var annotPos = 0; annotPos < annotsArray.length; annotPos++) {
			// console.log(annotsArray[annotPos]);
			switch (annotsArray[annotPos]['annotType']) {
			case 'json_avTV':
			default:
				globalCalls.push($.get(annotsArray[annotPos]['annotUrl'], function (data) {
						// globalAssocArrays[annotPos]=data;	// console.log(data);
					}));
				if (annotsArray[annotPos]['annotTitle']) {
					globalTitles.push(annotsArray[annotPos]['annotTitle']);
				} else {
					globalTitles.push('');
				}
				if (annotsArray[annotPos]['itemStart']) {
					globalItemStarts.push(annotsArray[annotPos]['itemStart']);
				} else {
					globalItemStarts.push(0);
				}
			}
		}
		callBackParams["titles"] = globalTitles;
		callBackParams["itemStarts"] = globalItemStarts;
		$.when.apply($, globalCalls)
		.done(function () {
			if (annotsArray.length == 1) {
				arguments = Array(arguments);
			}
			console.log(arguments);
			if (arguments.length > 0) {
				var annotsArrayFormated = Array();
				for (var annotPos = 0; annotPos < arguments.length; annotPos++) {
					if (arguments[annotPos][1] == 'success') {
						switch (annotsArray[annotPos]['annotType']) {
						case 'srtFile':
							var localResponse = arguments[annotPos][0];
							var srt = new Srt(localResponse); // needs class defined in ./subtitlesParser.js
							// console.log(localResponse); console.log(srt);
							var localResponseFormated = {
								'meta': {
									'title': 'srt'
								},
								'data': []
							};
							if (srt.lines.length > 0) {
								for (var iInSrt = 0; iInSrt < srt.lines.length; iInSrt++) {
									var curItemStart = 0;
									if (annotsArray[annotPos]['itemStart']) {
										 curItemStart = 
											parseInt (annotsArray[annotPos]['itemStart']);
									}
									var keySegment = 'an_0_' + iInSrt;
									localResponseFormated['data'][keySegment] = Array();
									localResponseFormated['data'][keySegment]['item_start'] = curItemStart;
									localResponseFormated['data'][keySegment]['time_start'] = 
										srt.lines[iInSrt].start.timeAllSeconds;
									localResponseFormated['data'][keySegment]['item_middle'] = curItemStart;
									localResponseFormated['data'][keySegment]['time_middle'] = 
										(srt.lines[iInSrt].start.timeAllSeconds 
										 + srt.lines[iInSrt].end.timeAllSeconds) 
										/ 2;
									localResponseFormated['data'][keySegment]['item_end'] = curItemStart;
									localResponseFormated['data'][keySegment]['time_end'] = 
										srt.lines[iInSrt].end.timeAllSeconds;
									localResponseFormated['data'][keySegment]['time_length'] = 
										srt.lines[iInSrt].end.timeAllSeconds 
										- srt.lines[iInSrt].start.timeAllSeconds;
									localResponseFormated['data'][keySegment]['likeValue'] = 1;
									localResponseFormated['data'][keySegment]['title'] = 
										srt.lines[iInSrt].subtitle;
								}
							}
							globalRespArrays.push(localResponse);
							globalAssocArrays.push(localResponseFormated);
							break;
						case 'csv_av':
							localResponse = arguments[annotPos][0];
							var localResponseFormated = {
								'meta': {
									'title': 'csv'
								}
							};
							localResponseFormated["data"] = Array();
							var globalAssocArray = Array();
							var allTextLines = localResponse.split(/\r\n|\n/);
							var headers = allTextLines[0].split("\t");
							var lines = [];
							for (var i = 1; i < allTextLines.length; i++) {
								var dataLine = allTextLines[i].split("\t");
								if (dataLine.length <= headers.length) {
									// console.log(i); //xxx set up the good item_start from options
									globalAssocArray[i - 1] = Array();
									for (var j = 0; j < headers.length; j++) {
										globalAssocArray[i - 1][headers[j]] = dataLine[j];
									}
									if (!(globalAssocArray[i - 1]['time_length'])) {
										globalAssocArray[i - 1]['time_length'] = 
											globalAssocArray[i - 1]['time_end'] 
											- globalAssocArray[i - 1]['time_start'];
									}
									if (!(globalAssocArray[i - 1]['item_start'])) {
										globalAssocArray[i - 1]['item_start'] = 0;
									}
									if (!(globalAssocArray[i - 1]['item_end'])) {
										globalAssocArray[i - 1]['item_end'] = 0;
									}
									localResponseFormated["data"][i - 1] = globalAssocArray[i - 1];
								}
							}
							callBackParams["globalAssocArray"] = globalAssocArray;
							globalAssocArrays.push(localResponseFormated);
							break;
						case 'json_avTV':
						default:
							// console.log(localResponse);
							var localResponse = arguments[annotPos][0];
							var localResponseData = arguments[annotPos][0]["data"];
							globalRespArrays.push(localResponse);
							var localResponseFormated = Object();
							if (localResponse["meta"]) {
								localResponseFormated["meta"] = localResponse["meta"];
							}
							localResponseFormated["data"] = Array();
							for (var iInJson = 0; iInJson < localResponseData.length; iInJson++) {
								var idThreatedPos = 
									localResponseData[iInJson].name
										.split('_', 3)
										.join('_')
										.length;
								var idThreated = 
									localResponseData[iInJson].name
									.substring(0, idThreatedPos);
								var nameRemainingAfterId = 
									localResponseData[iInJson].name
									.substring(idThreatedPos + 1);
								if (!(idThreated in localResponseFormated["data"])) {
									localResponseFormated["data"][idThreated] = Array();
								}
								localResponseFormated["data"][idThreated][nameRemainingAfterId] = 
									localResponseData[iInJson].value;
							}
							for (var localAssocArrayKey in localResponseFormated["data"]) {
								if ('time_start' in localResponseFormated["data"][localAssocArrayKey]) {
									if ('time_end' in localResponseFormated["data"][localAssocArrayKey]) {
										if (localResponseFormated["data"][localAssocArrayKey]['item_start'] 
										 == localResponseFormated["data"][localAssocArrayKey]['item_end']) {
											localResponseFormated["data"][localAssocArrayKey]['time_length'] = 
												localResponseFormated["data"][localAssocArrayKey]['time_end'] 
												- localResponseFormated["data"][localAssocArrayKey]['time_start'];
										}
										//else generalize for the case with several items involved (crossing segments)
									}
								}
							}
							// console.log(localResponseFormated);
							globalAssocArrays.push(localResponseFormated);
							break;
						}
					} else {
						console.log("failed get");
						// console.log(arguments[annotPos]);
						console.log(arguments[annotPos][1]);
					}
				}
				console.log(globalAssocArrays);
				callBackParams["annotsArray"] = globalAssocArrays;
				callBackFunct(callBackParams);
			} else {
				console.log("no arguments");
			}
			// console.log(globalAssocArrays);
		})
	} else {
		callBackParams["globalAssocArray"] = globalAssocArrays;
		console.log(callBackParams);
		callBackFunct(callBackParams);
	}
}
/****************************************************************/
/*************************   Bar Chart    ***********************/
/****************************************************************/
function buildAndDrawBarChart(objectParams) {
	//console.log('starting buildAndDrawBarChart');
	console.log(objectParams);
}
