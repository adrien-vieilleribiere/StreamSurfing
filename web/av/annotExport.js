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

function executeExport(metaContainerId, lineContainerId, linesRoot, outputContainerId, outputDataContainerId, playerHtmlId){
    exportFormat = $('#exportFormat').val();
    // exportType = $('#exportType').val();
    // console.log(lineContainerId+" - "+ linesRoot + " - " + exportType);
    console.log(linesRoot + " - " + exportFormat + " - " + outputContainerId + " - " + outputDataContainerId);
    executeExportMain(metaContainerId, linesRoot, exportFormat, outputContainerId, outputDataContainerId, playerHtmlId);
}

function executeExportMain(metaContainerId, linesRoot, exportFormat, outputContainerId, outputDataContainerId, playerHtmlId){
    $('#'+outputContainerId).empty();
    $('#'+outputDataContainerId).empty();
    var exportString = '';
    switch(exportFormat){
        case 'json-annot':
            // todo
            var $formAnnot = $('#' + linesRoot );
            var dataObj = $formAnnot.serializeArray();
            exportString += JSON.stringify(dataObj);
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
           // console.log(exportString);
            break;
        case 'json_avTV':
            exportString += '{"meta":';
            console.log("metaContainerId: " + metaContainerId );
            var $metaFormAnnot = $('#' + metaContainerId);
            var metaObj = objectifyForm($metaFormAnnot.serializeArray());
            var currentTime = +new Date();
            metaObj['date-update-ms'] = currentTime.toString(); //exportString + ',"date-update":"' + currentTime + '"';
            console.log("json_avTV now, json-annot next");
            exportString += JSON.stringify(metaObj);
            exportString += ',"data":';
            console.log("linesRoot: " + linesRoot);
            var $formAnnot = $('#' + linesRoot );
            var dataObj = $formAnnot.serializeArray();
            exportString += JSON.stringify(dataObj);
            exportString += '}';
            break;
        case 'csv_av':
            //exportString +=  '"time_start"\t"time_end"\t"title"' ;
            exportString +=  'time_start\ttime_end\ttitle' ;
            /*todo: formalize annotationScheme to generalize with more cols (likeValue, ....)*/
            exportString += '\r\n';
            $("#" + linesRoot + " *[data-type='marker']")
                .each(function(){
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
                        exportString += '\r\n';
                    }});
            break;
        case 'json-params':
            var $formAnnot = $('#userParamsForm');
            var dataObj = $formAnnot.serializeArray();
            exportString += JSON.stringify(dataObj);
            break;

        default:
            alert("export not ready yet for this exportType");
    }
    if (exportString) {
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
    }
}
