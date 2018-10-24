//&&START&&
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
//&&NAME&& Escape Html
//&&INPUT&& console.log(escapeHtml("<div id='test'></div>"));
//&&OUTPUT&& "&lt;div id=&#039;test&#039;&gt;&lt;/div&gt;"
//&&END&&


//&&START&&
function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//&&NAME&& Int to comma
//&&INPUT&& toCommas(190000)
//&&OUTPUT&& 190,000
//&&END&&


//&&START&&
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//&&NAME&& Set Cookie
//&&END&&

//&&START&&
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//&&NAME&& Get Cookie
//&&END&&

//&&START&&
function Template() {
    return null
}

//&&NAME&& Template
//&&INPUT&& return null;
//&&OUTPUT&& null
//&&END&&