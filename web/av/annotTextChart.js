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
				 + '\')" title="pr�c�dent"><span class="glyphicon glyphicon-step-backward previousTrack"'
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
