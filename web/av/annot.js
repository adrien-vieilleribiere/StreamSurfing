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
		// .setAttribute("title", 	'Pr�c�dent');	multi-lingues
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
