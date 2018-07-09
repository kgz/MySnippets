cart = {
    "type": null,
    "items": {}
}
comments = {
    "python": "#",
    "javascript": "//"
}

function getRegexes(lang) {
    comment = comments[lang];
    return {
        "STARTEND": new RegExp("(?<=[" + comment + "\/\/]\\s&&START&&\\s)(.|\\n|\\r)*?([" + comment + "\/\/]\\s&&END&&)", "g"),
        "NAME": new RegExp("(?<=[" + comment + "\/\/]\\s&&NAME&&\\s)(.|\\n|\\r)*?(?=\\n)", "g"),
        "INPUT": new RegExp("(?<=\\s&&INPUT&&\\s)([\\s\\S]*?)(?=\\n" + comment + ")", "gm"),
        "OUTPUT": new RegExp("(?<=\\s&&OUTPUT&&\\s)([\\s\\S]*?)(?=\\n" + comment + ")", "gm"),
        "CODE": new RegExp("^(?![" + comment + "\/\/]).+", "gm"),
        "credit": new RegExp("(?<=&&CREDIT&&\\s)(.*)", "g"),
        "tags": new RegExp("(?<=&&TAGS&&\\s)(.*)", "g")
    }
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
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
            }))
        })
    });
});
$(function () {
    $.each(themes, function (_, theme) {
        $(".dropdown-content").append("<a href='#'>" + theme + "</a>")
    })
    $.get("https://api.github.com/repos/Mat-Frayne/MySnippets/contents/snippets", function (data) {
        for (x in data) {
            df = data[x].name.match(/(.*)(?=\.)/)[0]
            $("#contents").append($("<div/>", { class: "langClick", text: df, "data-link": data[x].name }))
            $.get(data[x].download_url, function (out) {
                parse(out, df.toLowerCase());
            })
        }
    })
});

function parse(out, lang) {
    regexs = getRegexes(lang)
    var snippets = out.match(regexs["STARTEND"])
    for (index in snippets) {
        snip = snippets[index]
        name = snip.match(regexs["NAME"])
        code = snip.match(regexs["CODE"]);
        input = snip.match(regexs["INPUT"]);
        output = snip.match(regexs["OUTPUT"]);
        source = snip.match(regexs["SOURCE"])
        if (name != "null") $("#mainContent").append("<div class='blockTitle'>" + name.trim() + ":</div>")
        if (code != "null") $("#mainContent").append(`Code: <div class='copy'></div><pre><code class='` + lang + `'>` + escapeHtml(code.join("\n")) + `</code></pre>`)
        if (input != "null") $("#mainContent").append(`Input:<div class='copy'></div>\n<pre><code class='` + lang + `'>` + escapeHtml(input.join("\n")) + `</code></pre>`)
        if (output != "null") $("#mainContent").append(`Output:\n<pre><code class='` + lang + `'>` + escapeHtml(output.join("\n")) + `</code></pre>`)
    }
    $('code').each(function (i, block) {
        hljs.highlightBlock(block);
        $(this).animate({
            opacity: 1,
        })
    });
}
