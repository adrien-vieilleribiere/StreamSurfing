// Input: Object objectParams with a property annotsArray: an array of Objects('meta','data')
// Effect: insert below objectParams.chartContainerId a <ul> for each object
//	with one <li> clicable by segment in data
// 	click a li will make the playHead move to the start of the corresponding segment.
function ttgCreateNewSegment(listContainerId, playerHtmlId, annotSchemeId, objectParams ) {
    var curOffset = document.getElementById(playerHtmlId).ttgGetCurrentTime() ;
    var curPlaylistItem = document.getElementById(playerHtmlId).ttgGetPlaylistIndex() ;
    var newli = document.createElement("li");
    var liId = Math.round(12102012121201*Math.random());
    /*if (annotNum > 1) {
        liId = objectParams.chartContainerId
            + 'li' + iAnnot
            + '-' + segmentkey;}
    */
    // newli.append(document.createTextNode(segmentObject.title));
    newli.setAttribute("id", liId);
    newli.setAttribute("class", "list-group-item");
    newli.setAttribute("data-type", "marker");
    newli.setAttribute("data-playlist-item-start", curPlaylistItem);
    newli.setAttribute("data-start", curOffset);
    newli.setAttribute("data-playlist-item-end", curPlaylistItem);
    newli.setAttribute("data-end", curOffset);

    var annotContainerToInsertId = 'ul' + curPlaylistItem + listContainerId;
    // test existence of annotContainerToInsertId, add node if not
    newli = document.getElementById(annotContainerToInsertId).appendChild(newli);
    /* todo get the path from the annotSchemeId
    https://symfony.com/doc/master/bundles/FOSJsRoutingBundle/installation.html
     var annotSchemeUrl="/web/av/annotScheme/basic.json";
     $.get(annotSchemeUrl, function (data) {
     console.log(data)
     })
     */
    var annotSchemeObj=JSON.parse('[{"deleteLine": "true"},{"replayStart":"true"},{"setStart":"true"},{"setTitle":"true"},{"replayEnd":"true"},{"setEnd":"true"},{"setValDim1":{"type":"numeric","min":"-1","max":"1","default":"0","name":"likeValue"}}]');
    // console.log(annotSchemeObj);
    for(var segValuePos = 0; segValuePos < annotSchemeObj.length; segValuePos++){
        // console.log(annotSchemeObj[segValuePos]);
        // switch (annotSchemeObj[segValuePos]) {
        for (name in annotSchemeObj[segValuePos]) {
            //console.log(name);
            switch (name) {
                case 'deleteLine':
                    addDeleteLine(newli, liId);
                    break;
                case 'replayStart':
                    var newSeg = new Array();
                    var itemStartKey = 'item_' + 'start';
                    var timeStartKey = 'time_' + 'start';
                    newSeg[itemStartKey] = curPlaylistItem;
                    newSeg[timeStartKey] = curOffset;
                    objectParams['playerHtmlId'] = playerHtmlId;
                    ttgAddReplayTimeBlock(newSeg, liId, 'start' , objectParams);
                    break;
                case 'setStart':
                    var newSeg = new Array();
                    var itemStartKey = 'item_' + 'start';
                    var timeStartKey = 'time_' + 'start';
                    newSeg[itemStartKey] = curPlaylistItem;
                    newSeg[timeStartKey] = curOffset;
                    //(segmentObject, containerNodeId, typeAnnot , playerHtmlId, objectParams)
                    ttgCreateSetTimeBlock(newSeg, liId, 'start' ,playerHtmlId, objectParams);
                    break;
                case 'setTitle':
                    var newSeg = new Array();
                    newSeg['title'] = '';
                    objectParams['playerHtmlId'] = playerHtmlId;
                    newli.append(ttgSegmentEditTitle(newSeg, liId, objectParams));
                    break;
                case 'replayEnd':
                    var newSeg = new Array();
                    var itemEndKey = 'item_' + 'end';
                    var timeEndKey = 'time_' + 'end';
                    //newSeg[itemEndKey] = '';
                    //newSeg[timeEndKey] = '';
                    newSeg[itemEndKey] = itemEndKey;
                    newSeg[timeEndKey] = timeEndKey;
                    objectParams['playerHtmlId'] = playerHtmlId;
                    ttgAddReplayTimeBlock(newSeg, liId, 'end' , objectParams);
                    break;
                case 'setEnd':
                    var newSeg = new Array();
                    var itemStartKey = 'item_' + 'end';
                    var timeStartKey = 'time_' + 'end';
                    newSeg[itemStartKey] = curPlaylistItem;
                    newSeg[timeStartKey] = curOffset;
                    //(segmentObject, containerNodeId, typeAnnot , playerHtmlId, objectParams)
                    ttgCreateSetTimeBlock(newSeg, liId, 'end' ,playerHtmlId, objectParams);
                    break;
                case 'setValDim1':
                    //switch(['type']){
                    ttgCreateValueBlock(liId, annotSchemeObj[segValuePos]['setValDim1']);
                    //}
                    break;
                case '':
                    break;
                default:
                    console.log("unknown annot property '" + name +"'");

            }
        }
        //}
    }

    /*
    ttgAddReplayTimeBlock(segmentObject, liId, 'start' , objectParams);

    ttgAddSetTimeBlock(segmentObject, liId, 'start', objectParams);
    newli.append(ttgSegmentEditTitle(segmentObject, liId, objectParams));
    ttgAddReplayTimeBlock(segmentObject, liId, 'end' , objectParams);
    ttgAddSetTimeBlock(segmentObject, liId, 'end', objectParams);
     */
}


function ttgCreateSetTimeBlock(segmentObject, containerNodeId, typeAnnot , playerHtmlId, objectParams){
    // Add Button to set times
    var containerNode = document.getElementById(containerNodeId);
    setTimeSpan=document.createElement("span");
    setTimeSpan.id = containerNodeId + '_set_' + typeAnnot;
    /* setTimeSpan.setAttribute('title','Ajouter un marqueur '+makeReadable_typeAnnot(typeAnnot,false)+' (à la position courante de lecture)');
     todo: multilingue */
    setTimeSpan.setAttribute('class','btn btn-primary btn-lg active set'+typeAnnot);
    setTimeSpan.setAttribute(
        'onclick',
        "ttgUpdateTextInputFromCurrentTime("
        + "'"
        + playerHtmlId
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
    setTimeSpanContentIcon=document.createElement("span");
    setTimeSpanContentIcon.setAttribute('class','glyphicon glyphicon-map-marker');
    setTimeSpanContentIcon.setAttribute('aria-hidden','true');
    setTimeSpan.appendChild(setTimeSpanContentIcon);
    // setTimeSpanContentTxt=document.createTextNode(makeReadable_typeAnnot(typeAnnot,true));
    typeAnnotSpanIcon=makeIcon_typeAnnot(typeAnnot)
    setTimeSpan.appendChild(typeAnnotSpanIcon);
    containerNode.appendChild(setTimeSpan);
    // <input id="an_0_0_pitemstart" name="an_0_0_pitemstart" type="text" class="itemPos" hidden>
    setItemInput=document.createElement("input");
    setItemInput.id = containerNodeId + '_item_' + typeAnnot;
    setItemInput.setAttribute('name', containerNodeId + '_item_' + typeAnnot);
    setItemInput.setAttribute('type', 'text');
    setItemInput.setAttribute('value', segmentObject['item_' + typeAnnot]);
    setItemInput.setAttribute('class', 'itemPos');
    containerNode.appendChild(document.createTextNode(' '));
    containerNode.appendChild(setItemInput);
    // containerNode.appendChild(document.createTextNode(' '));
    setTimeInput = document.createElement("input");
    setTimeInput.id = containerNodeId + '_time_' + typeAnnot;
    setTimeInput.setAttribute('name',containerNodeId + '_time_' + typeAnnot);
    setTimeInput.setAttribute('type','text');
    setTimeInput.setAttribute('value', segmentObject['time_' + typeAnnot]);
    setTimeInput.setAttribute('onchange', "javascript:updateDataAttributeFromInput('"
        + containerNodeId
        + "','"
        + containerNodeId
        + '_time_'
        + typeAnnot
        + "','"
        + typeAnnot
        + "');"
        + "updateDataAttributeFromInput('"
            + containerNodeId
            + "','"
            + containerNodeId
            + '_playlist-item_'
            + typeAnnot
            + "','"
            + 'playlist-item-'
            + typeAnnot
            + "')"
    );
    setTimeInput.setAttribute('class', 'marker_' + typeAnnot);
    containerNode.appendChild(document.createTextNode(' '));
    containerNode.appendChild(setTimeInput);
}

function ttgCreateValueBlock(containerNodeId, paramObject){
    //console.log(paramObject);
    var containerNode = document.getElementById(containerNodeId);
    setValInput = document.createElement("input");
    setValInput.id =
        paramObject.name
        + containerNodeId;
    setValInput.setAttribute(
        'name',
        paramObject.name + containerNodeId);
    switch (paramObject['type']) {
        case 'numeric':
            setValInput.setAttribute('type', 'number');
            break;
        default:
            setValInput.setAttribute('type', 'range');
            break;
    }
    if (paramObject['title']) {
        setValInput.setAttribute(
            'title',
            paramObject['title']);
    }
    else{
        setValInput.setAttribute(
            'title',
            paramObject['name']);
    }
    if (paramObject['min']) {
        setValInput.setAttribute(
            'min',
            paramObject['min']);
    }
    else {
        setValInput.setAttribute(
            'min',
            0);
    }
    if (paramObject['max']) {
        setValInput.setAttribute(
            'max',
            paramObject['max']);
    }
    else {
        setValInput.setAttribute(
            'max',
            1);
    }
    if (paramObject['step']) {
        setValInput.setAttribute(
            'step',
            paramObject['step']);
    }
    else {
        setValInput.setAttribute(
            'step',
            '0.1');
    }
    if (paramObject['style']) {
        setValInput.setAttribute(
            'style',
            paramObject['style']);
    }
    else {
        setValInput.setAttribute(
            'style',
            'margin:0.5em; width:4em');
    }
    if (paramObject['default']) {
        setValInput.setAttribute(
            'value',
            paramObject['default']);
    }
    containerNode.appendChild(setValInput);
}