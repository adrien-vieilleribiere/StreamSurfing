// Input: Object objectParams with a property annotsArray: an array of Objects('meta','data')
// Effect: insert below objectParams.chartContainerId a <ul> for each object
//	with one <li> clicable by segment in data
// 	click a li will make the playHead move to the start of the corresponding segment.
function ttgCreateNewSegment (listContainerId, playerHtmlId, annotSchemeRoute, objectParams) {
    var objectParamsCopy = Object;
    $.extend(true,objectParamsCopy, objectParams);
    // console.log(annotSchemeRoute);
    var curOffset = 0 ;
    if (objectParams.time_start) {
        curOffset = objectParams.time_start;
    }
    else{
        curOffset = document.getElementById(playerHtmlId).ttgGetCurrentTime() ;
    }
    var curPlaylistItem = 0;
    if (objectParams.item_start) {
       curPlaylistItem = objectParams.item_start;
    }
    else{
         curPlaylistItem = document.getElementById(playerHtmlId).ttgGetPlaylistIndex();
    }
    var curTitle = '';
    if (objectParams.title) {
       curTitle = objectParams.title;
    }
    var curValDim1=null;
    if (objectParams.valDim1) {
       curValDim1 = objectParams.valDim1;
    }
    var curValDim2=null;
    if (objectParams.valDim2) {
       curValDim2 = objectParams.valDim2;
    }
    var newli = document.createElement("li");
    var liId = 'seg' +
        (Math.round(1210201212120141542
            * Math.random()));

    // newli.append(document.createTextNode(segmentObject.title));
    newli.setAttribute("id", liId);
    newli.setAttribute("class", "list-group-item");
    newli.setAttribute("data-type", "marker");
    newli.setAttribute("data-playlist-item-start", curPlaylistItem);
    newli.setAttribute("data-start", curOffset);
    newli.setAttribute("data-playlist-item-end", curPlaylistItem);
    newli.setAttribute("data-end", curOffset);

    var annotContainerToInsertId = 'ul' + curPlaylistItem + listContainerId;
    // test existence of annotContainerToInsertId, (add node if not ?)
    newli = document.getElementById(annotContainerToInsertId).appendChild(newli);
    var annotSchemeUrl = '/av/annotScheme/basic.json';
    if (annotSchemeRoute.length) {
        //console.log("AnnotSchemeUrl found " + annotSchemeRoute);
        annotSchemeUrl = annotSchemeRoute;
    }
    else{
        console.log("No annotSchemeUrl found" + annotSchemeUrl);
    }
    //  var annotSchemeObj = JSON.parse('[{"deleteLine": "true"},{"replayStart":"true"},{"setStart":"true"},{"setTitle":"true"},{"replayEnd":"true"},{"setEnd":"true"},{"setValDim1":{"type":"numeric","min":"-1","max":"1","default":"0","name":"likeValue"}}]');
    $.get(annotSchemeUrl, function (data) {
        //console.log(data);
        for (var segValuePos = 0; segValuePos < data.length; segValuePos++) {
            // console.log(annotSchemeObj[segValuePos]);
            // switch (annotSchemeObj[segValuePos]) {
            for (name in data[segValuePos]) {
                //console.log(name);
                switch (name) {
                    case 'deleteLine' :
                        addDeleteLine(newli, liId);
                        break;
                    case 'replayStart' :
                        var newSeg = new Array();
                        var itemStartKey = 'item_' + 'start';
                        var timeStartKey = 'time_' + 'start';
                        newSeg[itemStartKey] = curPlaylistItem;
                        newSeg[timeStartKey] = curOffset;
                        objectParamsCopy['playerHtmlId'] = playerHtmlId;
                        ttgAddReplayTimeBlock(newSeg, liId, 'start' , objectParamsCopy);
                        break;
                    case 'setStart' :
                        var newSeg = new Array();
                        var itemStartKey = 'item_' + 'start';
                        var timeStartKey = 'time_' + 'start';
                        newSeg[itemStartKey] = curPlaylistItem;
                        newSeg[timeStartKey] = curOffset;
                        //(segmentObject, containerNodeId, typeAnnot , playerHtmlId, objectParams)
                        ttgCreateSetTimeBlock(newSeg, liId, 'start', playerHtmlId, objectParams);
                        break;
                    case 'setTitle' :
                        var newSeg = new Array();
                        newSeg['title'] = '';
                        objectParamsCopy['playerHtmlId'] = playerHtmlId;
                        if(curTitle){
                            objectParamsCopy['title'] = curTitle;
                            newSeg['title'] = curTitle;
                        }
                        newli.append(ttgSegmentEditTitle(newSeg, liId, objectParamsCopy));
                        break;
                    case 'replayEnd' :
                        var newSeg = new Array();
                        var itemEndKey = 'item_' + 'end';
                        var timeEndKey = 'time_' + 'end';
                        //newSeg[itemEndKey] = '';
                        //newSeg[timeEndKey] = '';
                        newSeg[itemEndKey] = itemEndKey;
                        newSeg[timeEndKey] = timeEndKey;
                        objectParamsCopy['playerHtmlId'] = playerHtmlId;
                        ttgAddReplayTimeBlock(newSeg, liId, 'end' , objectParamsCopy);
                        break;
                    case 'setEnd' :
                        var newSeg = new Array();
                        var itemStartKey = 'item_' + 'end';
                        var timeStartKey = 'time_' + 'end';
                        newSeg[itemStartKey] = curPlaylistItem;
                        newSeg[timeStartKey] = curOffset;
                        //(segmentObject, containerNodeId, typeAnnot , playerHtmlId, objectParams)
                        ttgCreateSetTimeBlock(newSeg, liId, 'end' ,playerHtmlId, objectParams);
                        break;
                    case 'setValDim1' :
                        //console.log(data[segValuePos]['setValDim1']);
                        ttgCreateValueBlock(liId, data[segValuePos]['setValDim1'], curValDim1);
                        break;
                    case 'setValDim2' :
                        ttgCreateValueBlock(liId, data[segValuePos]['setValDim2'], curValDim2);
                        break;
                    case 'keybordShortcuts':
                        // console.log(data[segValuePos]['keybordShortcuts']);
                        var shortcutsObject = data[segValuePos]['keybordShortcuts'];
                        ttgCreateNewShortcutControler(liId, shortcutsObject, objectParams);
                        break;
                    default:
                        console.log("unknown annot property '" + name +"'");

                }
            }
            //}
        }
        if (objectParams['focus']) {
            switch (objectParams['focus']) {
                case 'shortcutBox':
                case '.shortcutLineControls':
                    $('#' + liId + ' .shortcutLineControls')[0].focus();
                    break;
                case 'textarea':
                    $('#' + liId + ' textarea')[0].focus();
                    break;
                default:
                    break;
            }

        }
        /*else{
            console.log("no focus");
        }*/
    });
    /*
    var annotSchemeUrl =  Routing.generate("new_annotation");
    $.get(annotSchemeUrl, function (data) {
        console.log(data)
    });
    */
}


function ttgCreateSetTimeBlock(segmentObject, containerNodeId, typeAnnot , playerHtmlId, objectParams){
    // Add Button to set times
    var containerNode = document.getElementById(containerNodeId);
    setTimeSpan=document.createElement("span");
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
    setTimeInput.setAttribute('name', containerNodeId + '_time_' + typeAnnot);
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

function ttgCreateValueBlock(containerNodeId, paramObject, forcedValue){
    // console.log(paramObject);
    var containerNode = document.getElementById(containerNodeId);
    setValInput = document.createElement("input");
    setValInput.id =
        containerNodeId
        + '_'
        + paramObject.name;
    setValInput.setAttribute(
        'name',
        containerNodeId
        + '_'
        + paramObject.name );
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
    if (forcedValue) {
         setValInput.setAttribute(
            'value',
            forcedValue);
    }
    else {
        if (paramObject['default']) {
            setValInput.setAttribute(
                'value',
                paramObject['default']);
        }
    }
    containerNode.appendChild(setValInput);
}

function ttgCreateNewShortcutControler(containerNodeId, shortcutsObject, objectParams) {
    var containerNode = document.getElementById(containerNodeId);
    var scInputId =
        shortcutsObject.name
        + containerNodeId;
    // console.log('scInputId: ' + scInputId);
    setScInput = document.createElement("input");
    setScInput.id = scInputId;
    setScInput.setAttribute('data-liid', containerNodeId);
    setScInput.setAttribute('type', 'text');
    setScInput.setAttribute('class', 'shortcutLineControls');
    setScInput.setAttribute('placeholder',
        Translator.trans('Shortcut-Zone'
            , {}
            , null));
    if (shortcutsObject['style']) {
        setScInput.setAttribute(
            'style',
            shortcutsObject['style']);
    }
    else {
        setScInput.setAttribute(
            'style',
            'margin:0.5em; width:1em');
    }
    if (shortcutsObject['title']) {
        setScInput.setAttribute(
            'title',
            Translator.trans(shortcutsObject['title']
                , {}
                , null));
    }
    else{
        setScInput.setAttribute(
            'title',
            Translator.trans('Shortcut-Zone'
                , {}
                , null));
    }
    setScInput = containerNode.appendChild(setScInput);
    var shortcutToProcess;
    var shortcutAction = Array();
    var objectParamsCopy = Object;
    $.extend(true, objectParamsCopy, objectParams);
    objectParamsCopy['liId'] = containerNodeId;
    objectParamsCopy['shortcutsObject'] = shortcutsObject;
    $( "#" + scInputId ).on('keydown', objectParamsCopy, function( event ) {
        // console.log(event);  // console.log(event.which); // console.log(event.data);
        objectParamsCopy['liId'] = this.getAttribute("data-liId");
        var keyCodeFound = false;
        var keyAction = null;
        var keyActionParams = null;
        for (var sortpos = 0;
             sortpos < (event.data['shortcutsObject']['shortcuts'].length) ;
             sortpos++) {
            if(event.data['shortcutsObject']['shortcuts'][sortpos]['keyCode'] == event.which){
                keyCodeFound = true;
                keyAction = event.data['shortcutsObject']['shortcuts'][sortpos]['action'];
                keyActionParams = event.data['shortcutsObject']['shortcuts'][sortpos]['actionParams'];
                applyShortCutActionLi(keyAction, keyActionParams, event.data);
            }
        }
       if ( event.which !== 9 && event.which !== 9  ) {
            event.preventDefault();
            if ( !keyCodeFound ) {
                /* todo clean the log after setting the dev basics */
                console.log("Key " + event.which + " is not specified");
           }
       }
    });
}
function applyShortCutActionLi(actionName, actionParams, objectParams) {
    // console.log(actionName);
    // console.log(actionParams);
    // console.log(objectParams);
    switch (actionName) {
        case 'setSegmentStart':
            ttgUpdateTextInputFromCurrentTime(objectParams['playerHtmlId'],
                objectParams['liId'] + '_time_start');
            updateDataAttributeFromInput(objectParams['liId'],
                objectParams['liId'] + '_time_start',
                'start');
            break;
        case 'setSegmentEnd':
            ttgUpdateTextInputFromCurrentTime(objectParams['playerHtmlId'],
                objectParams['liId'] + '_time_end');
            updateDataAttributeFromInput(objectParams['liId'],
                objectParams['liId'] + '_time_end',
                'end');
            break;
        case 'backward':
            var timeToGoForward = - actionParams[0];
            document
                .getElementById(objectParams['playerHtmlId'])
                .ttgForward('constant', timeToGoForward);
            break;
        case 'forward':
            document
                .getElementById(objectParams['playerHtmlId'])
                .ttgForward('constant', actionParams[0]);
            break;
        case 'togglePlayPause':
            document
                .getElementById(objectParams['playerHtmlId'])
                .ttgTogglePlayPause();
            break;
        case 'playbackrate':
            document
                .getElementById(objectParams['playerHtmlId'])
                .ttgSetPlaybackRate( actionParams[0] );
            break;
        case 'reviewSegmentStart':
            var liNode = document
                .getElementById(objectParams['liId']);
            var timeToGo = liNode.getAttribute("data-start");
            var itemToGo = liNode.getAttribute("data-playlist-item-start");
            /* todo : add itemToGo Managment for playlist cases */
            document
                .getElementById(objectParams['playerHtmlId'])
                .ttgSeekTo(timeToGo);
            break;
        case 'reviewSegmentEnd':
            var liNode = document
                .getElementById(objectParams['liId']);
            var timeToGo = liNode.getAttribute("data-end");
            var itemToGo = liNode.getAttribute("data-playlist-item-end");
            /* todo : add itemToGo Managment for playlist cases */
            document
                .getElementById(objectParams['playerHtmlId'])
                .ttgSeekTo(timeToGo);
            break;
        case 'deleteSegment':
            if (document.getElementById(objectParams['liId']).nextElementSibling) {
                $('#' + document.getElementById(objectParams['liId']).nextElementSibling.id
                    + ' .shortcutLineControls'
                )[0].focus();
            }
            else {
                if (document.getElementById(objectParams['liId']).previousElementSibling
                    &&  $('#' + document.getElementById(objectParams['liId']).previousElementSibling.id
                        + ' .shortcutLineControls'
                    ).length ) {
                    $('#' + document.getElementById(objectParams['liId']).previousElementSibling.id
                        + ' .shortcutLineControls'
                    )[0].focus();
                }
            }
            removeAnnotLine(objectParams['liId']);
            break;
        case 'createNewSegment':
            // console.log(actionName);  console.log(actionParams);   console.log(objectParams);
            var objectParamsCopy = Object ;
            $.extend(true, objectParamsCopy, objectParams);
            if (actionParams[1] && actionParams[1]['focus']) {
                switch (actionParams[1]['focus']) {
                    case 'textarea':
                        objectParamsCopy['focus'] = 'textarea';
                       // jsonOptionsForNew = {"focus": "textarea"};
                        break;
                    case 'shortcutBox':
                    case '.shortcutLineControls':
                        objectParamsCopy['focus'] = '.shortcutLineControls';
                        //jsonOptionsForNew = {"focus": ".shortcutLineControls"};
                        break;
                    case 'none':
                    default:
                        objectParamsCopy['focus'] = '';
                        break;
                }
            }
            else {
                console.log('actionParams[1] not found');
            }
            // console.log(actionParams[0]);  console.log(objectParams);
            var newSeg = new Array();
            var itemStartKey = 'item_' + 'start';
            var timeStartKey = 'time_' + 'start';
            newSeg[itemStartKey] = document.getElementById(objectParams['playerHtmlId']).ttgGetPlaylistIndex();
            newSeg[timeStartKey] = document.getElementById(objectParams['playerHtmlId']).ttgGetCurrentTime();
            ttgCreateNewSegment( 'ttgAnUlBody' + objectParams['playerHtmlId'],
                objectParams['playerHtmlId'],
                [actionParams[0]],
                newSeg
                );
            break;
        case 'goToPreviousLine':
            if (document.getElementById(objectParams['liId']).previousElementSibling
                &&  $('#' + document.getElementById(objectParams['liId']).previousElementSibling.id
                    + ' .shortcutLineControls'
                ).length ) {
                $('#' + document.getElementById(objectParams['liId']).previousElementSibling.id
                    + ' .shortcutLineControls'
                )[0].focus();
            }
            break;
        case 'goToNextLine':
            if (document.getElementById(objectParams['liId']).nextElementSibling
                &&  $('#' + document.getElementById(objectParams['liId']).nextElementSibling.id
                    + ' .shortcutLineControls' )
                    .length ) {
                $('#' + document.getElementById(objectParams['liId']).nextElementSibling.id
                    + ' .shortcutLineControls'
                )[0].focus();
            }
            break;
        case 'editTitle': //$('#' + liId + ' textarea')[0].focus();
            if ( $('#' + objectParams['liId']
                    + ' textarea' )
                    .length ) {
                $('#' + objectParams['liId']
                    + ' textarea' )[0].focus();
            }
            break;

        default:
            console.log("actionName not known (applyShortCutActionLi)");
            console.log(actionName);
    }

}
