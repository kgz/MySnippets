cart = {
    "type": null,
    "items": {}
}
comments = {
    "python": "# ",
    "javascript": "//"
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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

function getRegexes(lang) {
    comment = comments[lang];
    return {
        "STARTEND": new RegExp("(?<=[" + comment + "\/\/]\\s?&&START&&\\s)(.|\\n|\\r)*?([" + comment + "\/\/]\\s?&&END&&)", "g"),
        "NAME": new RegExp("(?<=[" + comment + "\/\/]\\s?&&NAME&&\\s)(.|\\n|\\r)*?(?=\\n)", "g"),
        "INPUT": new RegExp("(?<=\\s?&&INPUT&&\\s)([\\s\\S]*?)(?=\\n" + comment + ")", "gm"),
        "OUTPUT": new RegExp("(?<=\\s?&&OUTPUT&&\\s)([\\s\\S]*?)(?=\\n" + comment + ")", "gm"),
        "CODE": new RegExp("^(?!" + comment + ").+", "gm"),
        "CREDIT": new RegExp("(?<=\\s?&&CREDIT&&\\s)(.*)", "g"),
        "tags": new RegExp("(?<=\\s?&&TAGS&&\\s)(.*)", "g")
    }
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function parse(out, lang) {
    $("#mainContent").fadeOut(function () {
        $("#mainContent").empty();

        regexs = new getRegexes(lang)
        var snippets = out.match(regexs["STARTEND"])
        for (index in snippets) {
            snip = snippets[index]
            name = snip.match(regexs["NAME"])
            code = snip.match(regexs["CODE"]);
            input = snip.match(regexs["INPUT"]);
            output = snip.match(regexs["OUTPUT"]);
            source = snip.match(regexs["SOURCE"])
            container = $("<span/>", {
                class: "container"
            })
            if (name) container.append("<div class='blockTitle'>" + name.trim() + ":</div>")
            if (code) container.append(`<div class='copy'>copy</div><pre><code class='` + lang + `'>` + escapeHtml(code.join("\n")) + `</code></pre>`)
            if (input) container.append(`Input:<div class='copy'>copy</div>\n<pre><code class='` + lang + `'>` + escapeHtml(input.join("\n")) + `</code></pre>`)
            if (output) container.append(`Output:\n<pre><code class='` + lang + `'>` + escapeHtml(output.join("\n")) + `</code></pre>`)
            container.append("<hr>")
            $("#mainContent").append(container)
        }
        $('code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    });
    $("#mainContent").fadeIn();
}



$(function () {
    $.each(themes, function (_, theme) {
        $(".dropdown-content").append("<a href='#'>" + theme + "</a>")
    })
    $.get("https://api.github.com/repos/Mat-Frayne/MySnippets/contents/snippets", function (data) {
        for (x in data) {
            df = data[x].name.match(/(.*)(?=\.)/)[0]
            $("#contents").append($("<div/>", {
                class: "langClick",
                text: df,
                "data-link": data[x].name
            }))

        }
        $.get(data[0].download_url, function (out) {
            parse(out, data[0].name.match(/(.*)(?=\.)/)[0]);
        })
    })
    theme = getCookie("theme")
    console.log(theme)
    if (theme) {
        arr = $(".dropdown a");
        arr.each(function(ind) {
            console.log($(this).text() + " " + theme)
            if ($(this).text() == theme) {
                $(this).click()
            }
        });
    }
});

$(document).on("click", ".langClick", function () {
    that = this
    $.get("https://raw.githubusercontent.com/Mat-Frayne/MySnippets/master/snippets/" + $(that).attr("data-link"), function (out) {
        parse(out, $(that).attr("data-link").split(".")[0]);
    })
})
$(document).on("click", ".dropdown button", function () {
    $(".dropdown-content").toggle()
    $(this).parent().css("height", ($(".dropdown-content").is(":visible") ? "100%" : "20px"))
});
$(document).on("click", ".dropdown-content a", function () {
    scroll = $(window).scrollTop();
    console.log(scroll)
    that = this
    $("#container").fadeOut(0, function () {
        $(".dropbtn").text($(that).text())
        $(".theme").remove();
        $("head").append('<link rel="stylesheet" class="theme" href="static/styles/' + $(that).text() + '.css">').ready(function () {
            $('html, body').scrollTop(scroll, $("#container").fadeIn(0, function () {
                $(".dropdown-content a").css("background-color", "#f1f1f1")
                $(".dropdown-content a").css("color", "black")
                $(that).css("color", "white")
                $(that).css("background-color", "#383838");
                setCookie("theme", $(that).text(), 365)
            }))
        })

    });
});
$(document).on("click", ".copy", function () {
    that = $(this).next("pre").find("code").select();
    temp = $("<textarea/>", {
        style: "display:none;",
        text: that.text()
    }).appendTo("body")
    temp.select()
    document.execCommand("copy");
    console.log("copied")
    temp.remove();
});