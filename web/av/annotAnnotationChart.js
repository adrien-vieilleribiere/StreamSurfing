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
		// xxx mettre une borne param�tr�e si le besoin apparait
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
