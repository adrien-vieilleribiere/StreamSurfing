function startExport(){
    $('#export-html-ul-info').empty();
    $('#export-html-ul-data').empty();
    $('#exportModal').modal('show');
}

function startImport(){
    $('#import-html-ul-info').empty();
    $('#import-html-ul-data').empty();
    $('#importModal').modal('show');
}

function executeExport(metaContainerId, lineContainerId, linesRoot, outputContainerId, outputDataContainerId, annotSchemeRoute, playerHtmlId){
    exportFormat = $('#exportFormat').val();
    // exportType = $('#exportType').val();
    // console.log(lineContainerId+" - "+ linesRoot + " - " + exportType);
    // console.log(linesRoot + " - " + exportFormat + " - " + outputContainerId + " - " + outputDataContainerId + " - " + annotSchemeRoute );
    executeExportMain(metaContainerId, linesRoot, exportFormat, outputContainerId, outputDataContainerId, annotSchemeRoute, playerHtmlId);
}

function executeExportMain(metaContainerId, linesRoot, exportFormat, outputContainerId, outputDataContainerId, annotSchemeRoute, playerHtmlId){
    $('#'+outputContainerId).empty();
    $('#'+outputDataContainerId).empty();
    var exportString = '';
    switch(exportFormat){
        case 'json-annot':
            // todo
            var $formAnnot = $('#' + linesRoot );
            var dataObj = $formAnnot.serializeArray();
            exportString += JSON.stringify(dataObj);
            if (exportString) {
                showExportWithCopy (outputContainerId, null, exportString);
            }
            break;
        case 'srtFile':
            var posSegment=1;
            $("#" + linesRoot + " *[data-type='marker']")
                .each(function(){
                    if ($(this).attr('data-start') && $(this).attr('data-end') ) {
                        exportString += posSegment.toString();
                        exportString += '\r\n';
                        exportString += floatSeconds_2_srtTime($(this).attr('data-start'));
                        exportString +=  " --> " ;
                        exportString += floatSeconds_2_srtTime($(this).attr('data-end'));
                        exportString += '\r\n';
                        exportString += $(this).find( ".segmentTitle" ).val();
                        exportString += '\r\n';
                        exportString += '\r\n';
                        posSegment++;
                    }});
            if (exportString) {
                showExportWithCopy (outputContainerId, null, exportString);
            }
            break;
        case 'json_avTV':
            exportString += '{"meta":';
            //console.log("metaContainerId: " + metaContainerId );
            var $metaFormAnnot = $('#' + metaContainerId);
            var metaObj = objectifyForm($metaFormAnnot.serializeArray());
            var currentTime = +new Date();
            metaObj['date-update-ms'] = currentTime.toString(); //exportString + ',"date-update":"' + currentTime + '"';
            console.log("json_avTV now, json-annot next");
            exportString += JSON.stringify(metaObj);
            exportString += ',"data":';
            // console.log("linesRoot: " + linesRoot);
            var $formAnnot = $('#' + linesRoot );
            var dataObj = $formAnnot.serializeArray();
            exportString += JSON.stringify(dataObj);
            exportString += '}';
            if (exportString) {
                showExportWithCopy (outputContainerId, null, exportString);
            }
            break;
        case 'csv_av':
            //exportString +=  '"time_start"\t"time_end"\t"title"' ;
            //console.log(annotSchemeRoute);
            var colsToExport = Array();
            var annotSchemeUrl = '/av/annotScheme/basic.json';
            if (annotSchemeRoute.length) {
                //console.log("AnnotSchemeUrl found " + annotSchemeRoute);
                annotSchemeUrl = annotSchemeRoute;
            }
            else{
                console.log("No annotSchemeUrl found" + annotSchemeUrl);
            }
            $.get(annotSchemeUrl,
                function (data) {
                    //console.log(data)
                    for (var annotSchemeLinePos = 0;
                            annotSchemeLinePos < data.length;
                            annotSchemeLinePos++) {
                        for (name in data[annotSchemeLinePos]) {
                            if ( data[annotSchemeLinePos][name]['exportPosition'] ) {
                                colsToExport[data[annotSchemeLinePos][name]['exportPosition']]
                                    = data[annotSchemeLinePos][name]['name'];
                            }
                        }
                    }
                    // console.log(colsToExport);
                    exportString +=  'time_start\ttime_end\ttitle' ;
                    if (colsToExport.length > 0) {
                        for (var icol = 0;
                            icol < colsToExport.length;
                            icol++) {
                            if (icol in colsToExport) {
                                exportString +=  '\t';
                                exportString +=  colsToExport[icol] ;
                            }
                        }
                    }
                    /*else{
                        console.log("colsToExport empty");
                    }
                    */
                    exportString += '\r\n';
                    $("#" + linesRoot + " *[data-type='marker']")
                        .each(function(){
                            //console.log(colsToExport);
                            if ($(this).attr('data-start') && $(this).attr('data-end') ) {
                                //exportString +=  '"' ;
                                exportString += $(this).attr('data-start');
                                //exportString +=  '"' ;
                                exportString +=  '\t' ;
                                //exportString +=  '"' ;
                                exportString += $(this).attr('data-end');
                                //exportString +=  '"' ;
                                exportString +=  '\t' ;
                                //exportString +=  '"' ;
                                exportString += $(this).find( ".segmentTitle" ).first().val().replace(/\r?\n/g, '\\n');
                                //exportString +=  '"' ;
                                if (colsToExport.length > 0) {
                                    for (var icol = 0;
                                        icol < colsToExport.length;
                                        icol++) {
                                        if (icol in colsToExport) {
                                            var inputDimId =
                                                $(this).attr('id')
                                                + "_"
                                                + colsToExport[icol];
                                            //console.log(inputDimId);
                                            exportString +=  '\t';
                                            exportString +=  $('#' + inputDimId).val();
                                        }
                                    }
                                }
                                exportString += '\r\n';
                            }});
                    if (exportString) {
                       showExportWithCopy(outputContainerId, null, exportString);
                    }
                }
            );
            break;
        case 'json-params':
            var $formAnnot = $('#userParamsForm');
            var dataObj = $formAnnot.serializeArray();
            exportString += JSON.stringify(dataObj);
            if (exportString) {
                showExportWithCopy (outputContainerId, null, exportString);
            }
            break;
        default:
            alert("export not ready yet for this exportType");
    }
       /*
        var re = new RegExp(linesRoot, 'g');
        exportString = exportString.replace(re, '');
        //var $temp = $("<input>")
        var $tempExport = $("<textarea>")
        $("#exportModal").append($tempExport);
        $tempExport.val(exportString).select();
        document.execCommand("copy");
        $tempExport.remove();
        resultDoneInfo = document.createElement("h3");
        resultDoneInfo
            .appendChild(
            document.createTextNode(Translator.trans('The export is copied to the clipboard'
                , {}
                , null)));
        document
            .getElementById(outputContainerId)
            .appendChild(resultDoneInfo);
        document
            .getElementById(outputDataContainerId)
            .appendChild(document.createTextNode(exportString));
        $('#'+outputContainerId).show();
        modalPos = document
            .getElementById('exportModal')
            .offsetTop;
        resPos = document
            .getElementById(outputContainerId)
            .offsetTop;
        document
            .getElementById('exportModal')
            .scrollTop
            = resPos - modalPos;
        // console.log(exportString);
        */
}

function showExportWithCopy (outputContainerId, textAreaId, stringValueToShow) {
    var newTA = document
        .createElement('textarea');
    if (textAreaId) {
        newTA.setAttribute("id",textAreaId);
    }
    else{
        var currentTime = +new Date();
        newTA.setAttribute("id",'ta' + currentTime.toString() );
    }
    newTA.appendChild(document.createTextNode(stringValueToShow));
    //newTA.setAttribute("cols","74");
    newTA.setAttribute("rows","10");
    newTA.setAttribute("style","width:100%");
    document
        .getElementById(outputContainerId)
        .appendChild(newTA);
    $('#'+outputContainerId).show();
    modalPos = document
        .getElementById('exportModal')
        .offsetTop;
    resPos = document
        .getElementById(outputContainerId)
        .offsetTop;
    document
        .getElementById('exportModal')
        .scrollTop
        = resPos - modalPos;
}
