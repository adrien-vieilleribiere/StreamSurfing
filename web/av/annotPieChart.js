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
				var pieChartArray = [['Partie', 'd�but', 'Taille', 'Couleur', ]];
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
