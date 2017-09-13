// Input: Object objectParams with a property annotsArray: an array of Objects('meta','data')
// Effect: insert below objectParams.chartContainerId a <ul> for each object
//	with one <li> clicable by segment in data
// 	click a li will make the playHead move to the start of the corresponding segment.
function ttgAnnotationUlEdit(objectParams) {
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
	console.log(objectParams);
    var annotNum=objectParams['annotsArray'].length;
	for (var iAnnot = 0; iAnnot < annotNum; iAnnot++) {
		var newUlRoot = document.createElement("ul");
		var ulId = "ul" + iAnnot + objectParams.chartContainerId ;
		newUlRoot.setAttribute("class", "list-group ulBasicScroll");
		newUlRoot.setAttribute("id", ulId);
		newUlRoot = document.getElementById(objectParams.chartContainerId).appendChild(newUlRoot);
		for (var segmentkey in objectParams['annotsArray'][iAnnot]['data']) {
			var segmentObject = objectParams['annotsArray'][iAnnot]['data'][segmentkey];
            // console.log(segmentObject);
            ttgCreateNewSegment(objectParams.chartContainerId,
                objectParams.playerHtmlId,
                ['/av/annotScheme/dev.json'],
                segmentObject );
		}
	}
}


function ttgSegmentEditTitle(segmentObject, segmentId, objectParams){
    //console.log("ttgSegmentEditTitle");console.log(segmentObject);
    //console.log("segmentId");console.log(segmentId);
    //setTitleInput = document.createElement("input");
    setTitleInput = document.createElement("textarea");
    setTitleInput.id = segmentId + '_title';
    setTitleInput.setAttribute('name', segmentId + '_title');
   // setTitleInput.setAttribute('type', 'text');
    //setTitleInput.setAttribute('value', segmentObject.title);
    setTitleInput.setAttribute('cols', "74");
    setTitleInput.setAttribute('rows', "2");
    setTitleInput.setAttribute('class', "segmentTitle");
    if (segmentObject.title) {
        setTitleInput.appendChild(document.createTextNode(segmentObject.title.replace(/\\n/, '\r\n')));
    }
    //console.log('segmentObject-.title');
    //console.log(segmentObject);
    //$('#' + segmentId + '_title').val(segmentObject['title']);
    //$('#' + segmentId + '_title').val(segmentObject.title);
    return setTitleInput;
}

function addDeleteLine(liNode, idToDelete, options){
    lineDeleteSpan=document.createElement("span");
    lineDeleteSpan.setAttribute('class','btn btn-danger lineAnnotDelete');
    lineDeleteSpan.setAttribute('title',Translator.trans('Remove the line', {}, null));
    lineDeleteSpan.setAttribute('onclick',"javascript:removeAnnotLine('"+idToDelete+"')");
    lineDeleteIcon=document.createElement("span");
    lineDeleteIcon.setAttribute('class','glyphicon glyphicon-trash');
    lineDeleteIcon.setAttribute('aria-hidden','true');
    lineDeleteSpan.appendChild(lineDeleteIcon);
    liNode.appendChild(lineDeleteSpan);
}

function removeAnnotLine(idLine){
    blockTouched=document.getElementById(idLine);
    ulId=blockTouched.parentNode.id;
    liNumbers=blockTouched.parentNode.childNodes.length;
    $('#'+idLine).remove();
    /*
    if(liNumbers==1)
    {
        $('#openExport_an_0').hide();
    }
	 */
}

function makeIcon_typeAnnot(catId){
    switch(catId){
        case 'start':
            typeAnnotIcon=document.createElement("span");
            typeAnnotIcon.setAttribute('class','glyphicon glyphicon-arrow-right');
            typeAnnotIcon.setAttribute('aria-hidden','true');
            return typeAnnotIcon;
        case 'end':
            typeAnnotIcon=document.createElement("span");
            typeAnnotIcon.setAttribute('class','glyphicon glyphicon-arrow-left');
            typeAnnotIcon.setAttribute('aria-hidden','true');
            return typeAnnotIcon;
        case 'middle':
        default:
            return document.createTextNode('');
    }
}

function addSetTimeBlock(typeMedia, pos, containerNode, idToSet, typeAnnot){
    // Add Button to set times
    setTimeSpan=document.createElement("span");
    setTimeSpan.id=idToSet+'_set_'+typeAnnot;
    setTimeSpan.setAttribute('title',Translator.trans('Add a new segment at the curent reading position', {}, null));
    setTimeSpan.setAttribute('class', 'btn btn-primary btn-lg active set' + typeAnnot);
    //setTimeSpan.setAttribute('onclick',"javascript:makeAnnot('"+typeMedia+"',"+pos+",'"+idToSet+"','"+typeAnnot+"')");
    setTimeSpanContentIcon=document.createElement("span");
    setTimeSpanContentIcon.setAttribute('class','glyphicon glyphicon-map-marker');
    setTimeSpanContentIcon.setAttribute('aria-hidden','true');
    setTimeSpan.appendChild(setTimeSpanContentIcon);
    // setTimeSpanContentTxt=document.createTextNode(makeReadable_typeAnnot(typeAnnot,true));
    typeAnnotSpanIcon=makeIcon_typeAnnot(typeAnnot)
    setTimeSpan.appendChild(typeAnnotSpanIcon);
    containerNode.appendChild(setTimeSpan);
    // <input id="an_0_0_pitemstart" name="an_0_0_pitemstart" type="text" class="itemPos" hidden>
    setItemInput = document.createElement("input");
    setItemInput.id = idToSet + '_item_' + typeAnnot;
    setItemInput.setAttribute('name', idToSet + '_item_' + typeAnnot);
    setItemInput.setAttribute('type', 'text');
    setItemInput.setAttribute('class', 'itemPos');
    containerNode.appendChild(document.createTextNode(' '));
    containerNode.appendChild(setItemInput);
    // containerNode.appendChild(document.createTextNode(' '));
    setTimeInput=document.createElement("input");
    setTimeInput.id = idToSet + '_time_' + typeAnnot;
    setTimeInput.setAttribute('name', idToSet + '_time_' + typeAnnot);
    setTimeInput.setAttribute('type', 'text');
    setTimeInput.setAttribute('class', 'marker_' + typeAnnot);
    containerNode.appendChild(document.createTextNode(' '));
    containerNode.appendChild(setTimeInput);
}

function ttgAddSetTimeBlock(segmentObject, containerNodeId, typeAnnot , objectParams){
    /*
        console.log("ttgAddSetTimeBlock");
        console.log(segmentObject);
        console.log(containerNodeId);
        console.log(typeAnnot);
        console.log(objectParams);
    */
    // Add Button to set times
	var containerNode = document.getElementById(containerNodeId);
    setTimeSpan = document.createElement("span");
    setTimeSpan.id = containerNodeId + '_set_' + typeAnnot;
    switch (typeAnnot){
        case 'start':
            setTimeSpan.setAttribute(
                "title",
                Translator.trans('Change the start of the segment (with the current reading position)'
                    , {}
                    , null));
            break;
        case 'end':
            setTimeSpan.setAttribute(
                "title",
                Translator.trans('Change the end of the segment (with the current reading position)'
                    , {}
                    , null));
            break;
        default:
            setTimeSpan.setAttribute(
                "title",
                Translator.trans('Change the time value (with the current reading position)'
                    , {}
                    , null));
    }
    setTimeSpan.setAttribute('class',
        'btn btn-primary btn-lg active set' + typeAnnot);
    setTimeSpan.setAttribute(
        'onclick',
        "ttgUpdateTextInputFromCurrentTime("
        + "'"
        + objectParams.playerHtmlId
        + "','"
        + containerNodeId
        + '_time_'
        + typeAnnot
        + "');"
		+ "updateDataAttributeFromInput('"
            + containerNodeId
            + "','"
            + containerNodeId
            + '_time_'
            + typeAnnot
            + "','"
            + typeAnnot
            + "')"
    );
    setTimeSpanContentIcon = document.createElement("span");
    setTimeSpanContentIcon.setAttribute('class','glyphicon glyphicon-map-marker');
    setTimeSpanContentIcon.setAttribute('aria-hidden','true');
    setTimeSpan.appendChild(setTimeSpanContentIcon);
    // setTimeSpanContentTxt=document.createTextNode(makeReadable_typeAnnot(typeAnnot,true));
    typeAnnotSpanIcon = makeIcon_typeAnnot(typeAnnot)
    setTimeSpan.appendChild(typeAnnotSpanIcon);
    containerNode.appendChild(setTimeSpan);
    // <input id="an_0_0_pitemstart" name="an_0_0_pitemstart" type="text" class="itemPos" hidden>
    setItemInput=document.createElement("input");
    setItemInput.id = containerNodeId+'_item_'+typeAnnot;
    setItemInput.setAttribute('name',containerNodeId+'_item_'+typeAnnot);
    setItemInput.setAttribute('type','text');
    setItemInput.setAttribute('value',segmentObject['item_'+typeAnnot]);
    setItemInput.setAttribute('class','itemPos');
    containerNode.appendChild(document.createTextNode(' '));
    containerNode.appendChild(setItemInput);
    // containerNode.appendChild(document.createTextNode(' '));
    setTimeInput = document.createElement("input");
    setTimeInput.id = containerNodeId+'_time_'+typeAnnot;
    switch (typeAnnot){
        case 'start':
            setTimeInput.setAttribute(
                "title",
                Translator.trans('Value of the start of the segment'
                    , {}
                    , null));
            break;
        case 'end':
            setTimeInput.setAttribute(
                "title",
                Translator.trans('Value of the end of the segment'
                    , {}
                    , null));
            break;
        default:
            setTimeInput.setAttribute(
                "title",
                Translator.trans('Value of the segment)'
                    , {}
                    , null));
    }
    setTimeInput.setAttribute('name',containerNodeId+'_time_'+typeAnnot);
    setTimeInput.setAttribute('type','text');
    setTimeInput.setAttribute('value', segmentObject['time_'+typeAnnot]);
    setTimeInput.setAttribute('onchange', "javascript:updateDataAttributeFromInput('"
        + containerNodeId
        + "','"
        + containerNodeId
        + '_time_'
        + typeAnnot
        + "','"
        + typeAnnot
        + "')"
    );
    setTimeInput.setAttribute('class', 'marker_' + typeAnnot);
    containerNode.appendChild(document.createTextNode(' '));
    containerNode.appendChild(setTimeInput);
}
function ttgAddReplayTimeBlock(segmentObject, containerNodeId, typeAnnot , objectParams){
    var containerNode = document.getElementById(containerNodeId);
    replaySpan = document.createElement("span");
    replaySpan.id = containerNodeId + '_play_'+typeAnnot;
    switch (typeAnnot){
        case 'start':
            replaySpan.setAttribute(
                "title",
                Translator.trans('Replay from the start of the segment', {}, null));
            break;
        case 'end':
            replaySpan.setAttribute(
                "title",
                Translator.trans('Replay from the end of the segment', {}, null));
            break;
        default:
            replaySpan.setAttribute(
                "title",
                Translator.trans('Replay from the marker', {}, null));
    }
    /*
    if (parseFloat(segmentObject['time_' + typeAnnot])>=0) {
        replaySpan.setAttribute('class', 'offsetCheck btn btn-primary');
    }
    else {
        replaySpan.setAttribute('class', 'offsetCheck btn btn-default');
    }*/
    replaySpan.setAttribute('class', 'offsetCheck btn btn-primary');
    switch (typeAnnot){
		case 'start':
        case 'end':
		default:
            replaySpan.setAttribute(
                "onclick",
                "ttgSeekFromTextInput('"
					+ objectParams.playerHtmlId
					+ "','"
					+ containerNodeId
					+ '_time_'
					+ typeAnnot
					+ "')");
	}

    replaySpanContentIcon = document.createElement("span");
    replaySpanContentIcon.setAttribute('class','glyphicon glyphicon-play');
    replaySpanContentIcon.setAttribute('aria-hidden','true');
    replaySpan.appendChild(replaySpanContentIcon);
   // document.createTextNode(makeReadable_typeAnnot(typeAnnot,true))
    containerNode.appendChild(document.createTextNode(' '));
    containerNode.appendChild(replaySpan);
    containerNode.appendChild(document.createTextNode(' '));
}

function ttgSeekFromTextInput(playerHtmlId, inputId) {
	document
		.getElementById(playerHtmlId)
		.ttgSeekTo(
			$('#' + inputId).val());
}
function ttgUpdateTextInputFromCurrentTime(playerHtmlId, inputId) {
	$('#' + inputId)
		.val(
			document
				.getElementById(playerHtmlId)
				.ttgGetCurrentTime);

}

function updateDataAttributeFromInput(toChangeNodeId, inputId, typeAnnot){
	// console.log(toChangeNodeId);
	var dataDim = 'data-' + typeAnnot;
	document
		.getElementById(toChangeNodeId)
		.setAttribute( dataDim, $('#' + inputId).val());
}
