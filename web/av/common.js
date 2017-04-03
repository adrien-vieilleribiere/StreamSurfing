function objectifyForm(formArray) {//serialize data function

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function padLeft(str, max, prefix) {
    str = str.toString();
    return str.length < max ? padLeft(prefix + str, max, prefix) : str;
}
function padRight(str, max, suffix) {
    str = str.toString();
    return str.length < max ? padRight(str + suffix, max, suffix) : str;
}

function removeLastLineBreak(inputStr){
    return inputStr
        .replace(/\r\n$/, "")
        .replace(/\n$/, "");
}

