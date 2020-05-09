(function (global) {
    var ajaxutils = {};
    function getRequestObject () {
        if (global.XMLHttpRequest ) {
            return (new XMLHttpRequest ());
        }
        else if (gloabl.ActiveXObject) {
            return (new ActiveXObject ("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("Ajax is not supported!");
            return (null);
        }
    }
    // makes an ajax get resuest to 'requestUrl' 
    ajaxutils.sendGetRequest = 
    function (requestUrl, responseHandler, isJsonResponse) {
        var request = getRequestObject();
        request.onreadystatechange = 
        function() {
            handleResponse (request, responseHandler, isJsonResponse);
        };
        request.open ("GET", requestUrl , true);
        request.send (null);
    };
    function handleResponse (request, responseHandler, isJsonResponse) {
        if ((request.readyState == 4) && (request.status == 200)){
            if (isJsonResponse == undefined) {
                isJsonResponse = true;
            }
            if (isJsonResponse) {
                responseHandler(JSON.parse(request.responseText));
            }
            else {
               responseHandler(request.responseText);
            }
        }
    }
    global.$ajaxutils = ajaxutils ;
})(window);