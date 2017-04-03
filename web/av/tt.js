

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
					globalAssocArray[keySegment]['title'] = removeLastLineBreak(srt.lines[iInSrt].subtitle);
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
                                        removeLastLineBreak(srt.lines[iInSrt].subtitle);
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
