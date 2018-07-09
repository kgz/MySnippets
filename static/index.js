cart = {
    "type": null,
    "items": {}
}
comments = {
    "python": "#",
    "javascript": "//"
}
regexs = {
    "STARTEND": /(?<=[#\/\/]\s&&START&&\s)(.|\n|\r)*?(?=[#\/\/]\s&&END&&)/g,
    "NAME": /(?<=[#\/\/]\s&&NAME&&\s)(.|\n|\r)*?(?=\n)/g,
    "INPUT": /(?<=\s&&INPUT&&\s)(.*\n*)*?(?=["""#])/g,
    "OUTPUT": /(?<=\s&&OUTPUT&&\s)(.*\n*)*?(?=["""#])/g,
    "CODE": /^(?![#\/\/]).+/gm,
    "credit": /(?<=&&CREDIT&&\s)(.*)/g,
    "tags": /(?<=&&TAGS&&\s)(.*)/g
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
$(function () {
    // $.each(snippets, function (key, snip) {
    //     $("#contents").append("<a data-snip='" + key + "' class='langClick' href='#" + key + "'>" + key + "</a>")
    // })
    $.each(themes, function (_, theme) {
        $(".dropdown-content").append("<a href='#'>" + theme + "</a>")
    })
});
$(document).on("click", ".dropdown button", function () {
    $(".dropdown-content").toggle()
    $(this).parent().css("height", ($(".dropdown-content").is(":visible") ? "100%" : "20px"))
})
$(document).on("click", ".dropdown-content a", function () {
    $(".dropbtn").text($(this).text())
    $(".theme").remove();
    $("head").append('<link rel="stylesheet" class="theme" href="static/styles/' + $(this).text() + '.css">')
    $(".dropdown-content a").css("background-color", "#f1f1f1")
    $(".dropdown-content a").css("color", "black")
    $(this).css("color", "white")
    $(this).css("background-color", "#383838");
    scroll = $(window).scrollTop();
    setTimeout(function () { $('html, body').scrollTop(scroll) }, 1);
});
$(function () {
    $.get("https://api.github.com/repos/Mat-Frayne/MySnippets/contents/snippets", function (data) {
        for (x in data) {
            console.log(data[x])
            console.log(data[x].name)
            df = data[x].name.match(/(.*)(?=\.)/)[0]
            $("#contents").append($("<div/>", { class: "langClick", text: df }))
            $.get(data[x].download_url, function (out) {
                parse(out, df.toLowerCase());
            })
        }
    })
    language = "python"
    var response2 = $.get("snippets/python.py", function (data) {
        parse(data, language);
    });
});

function parse(out, lang) {
    console.log(out)
    var snippets = out.match(regexs["STARTEND"])
    for (index in snippets) {
        snip = snippets[index]
        name = snip.match(regexs["NAME"])
        code = snip.match(regexs["CODE"])
        input = snip.match(regexs["INPUT"]);
        output = snip.match(regexs["OUTPUT"]);
        source = snip.match(regexs["SOURCE"])
        if (name != "null") $("#mainContent").append("<div class='blockTitle'>" + name.trim() + ":</div>")
        console.log(code)
        if (code != "null") $("#mainContent").append(`<pre><code class='` + lang + `'>` + escapeHtml(code.join("\n")) + `</code></pre>`)
        if (input != "null") $("#mainContent").append(`Input:\n<pre><code class='` + lang + `'>` + escapeHtml(code.join("\n")) + `</code></pre>`)
        if (input != "null") $("#mainContent").append(`Input:\n<pre><code class='` + lang + `'>` + escapeHtml(code.join("\n")) + `</code></pre>`)
    }
    $('code').each(function (i, block) {
        hljs.highlightBlock(block);
        $(this).animate({
            opacity: 1,
        })
    });
}
