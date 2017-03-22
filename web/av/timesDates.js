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
