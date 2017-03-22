
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
//xxx todo correct fonctionnality
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
