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
		newUlRoot.setAttribute("class", "list-group ulBasicScroll");
		newUlRoot.setAttribute("id", "ulBasic" + objectParams.chartContainerId + '_' + iAnnot);
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


// Inputs:
//	string ulId: the id of a controler (horizontal, left to right)
//	string playerHtmlId: the player html variable (with function for generic usage)
// 	int recurenceToRedo: a number of miliseconds to recurently redo the update
//		(0=no recurent update)
// Effect: updates the ulId each recurenceToRedo miliseconds
//	with states classes added to show past/current/future segments.
function ttgUlUpdateStates(ulId, playerHtmlId, recurenceToRedo) {
    var curOffset = document.getElementById(playerHtmlId).ttgGetCurrentTime() ;
    // console.log(curOffset);
    var curPlaylistItem = document.getElementById(playerHtmlId).ttgGetPlaylistIndex() ;
    $("#" + ulId + " *[data-type='marker']")

        .each(function(){
			if ($(this).attr('data-start')) {
				var valueThreatedStart =
					parseFloat($(this).attr('data-start'));
				var itemThreatedStart =
					parseInt($(this).attr('data-playlist-item-start'));
				var valueThreatedEnd =
					parseFloat($(this).attr('data-end'));
				var itemThreatedEnd =
					parseInt($(this).attr('data-playlist-item-end'));
				var ulClassAdd="";
                if ( itemThreatedEnd < curPlaylistItem ) {
                    ulClassAdd = "markerInPastItem";
				}
                if ( itemThreatedStart == curPlaylistItem
					&& itemThreatedEnd == curPlaylistItem ) {

                    if (valueThreatedEnd <= curOffset) {
                        ulClassAdd = "markerBeforePlayhead";
					}
					else {
                    	if(curOffset < valueThreatedStart ) {
                            ulClassAdd = "markerAfterPlayhead";
                        }
                        else {
                            ulClassAdd = "markerContainingPlayhead";
						}
                    }
                }
				if( ulClassAdd.length > 0 ){
                    $(this).removeClass( "markerInPastItem markerBeforePlayhead markerAfterPlayhead markerContainingPlayhead" ).addClass( ulClassAdd )
				}
			}
        });
	 var newRecurenceToRedo = parseInt($('#ulProgressRecurence').val());
	 if (newRecurenceToRedo > 0) {
	 setTimeout(
         ttgUlUpdateStates
	 .bind(null, ulId)
	 .bind(null, playerHtmlId)
	 .bind(null, newRecurenceToRedo),
	 newRecurenceToRedo);
	 }
}

var ttgAnnotUlRecenterRecurence;
//  inputs:
//	string controlerId: the id of the ul controler
//	string playerHtmlId: the player html variable (with function for generic usage)
// 	int recurenceToRedo: a number of miliseconds to recurently redo the update
//		(0=no recurent update)
// Effect: updates the ulId each recurenceToRedo miliseconds
//	with states classes added to show past/current/future segments.
function ttgAnnotUlRecenter(controlerId, playerHtmlId, recurenceToRedo) {
    // console.log(controlerId + " - " + playerHtmlId + " - " + recurenceToRedo);
    var curOffset = document.getElementById(playerHtmlId).ttgGetCurrentTime() ;
    var curPlaylistItem = document.getElementById(playerHtmlId).ttgGetPlaylistIndex() ;
    bestMarkerFound = null;
    bestMarkerLi = null;
    $('#' + controlerId + " *[data-type='marker']")
        .each( function() {
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
                            bestMarkerLi = $(this);
						}
						else{
							if( (itemThreated > bestItemFound) ||
								( (itemThreated == bestItemFound)
								&& (curOffset - valueThreated)
								< (curOffset - bestMarkerFound))) {
								bestMarkerFound = valueThreated;
								bestItemFound = itemThreated;
                                bestMarkerLi = $(this);
							}
						}
					}
				}
			}

        });
	if (bestMarkerFound !== null) {
        // console.log("#########");
        var refPosLi =  bestMarkerLi.offset().top;
       // console.log("refPosLi: " + refPosLi);
        var refPosUlLi1 = bestMarkerLi.parent().children().first().offset().top;
      	var targetScroll =
            refPosLi
			- refPosUlLi1;
		// console.log("targetScroll: " + targetScroll);
        bestMarkerLi.parent().scrollTop(targetScroll);
	}
	else{
		// console.log("bestMarkerFound not found");
        $('#' + controlerId + " *[data-type='marker']").parent().scrollTop(0);
	}
}

