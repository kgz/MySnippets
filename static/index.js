// cart = {
//     "type": null,
//     "items": {}
// }
// function escapeHtml(text) {
//     return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
// }
// $(function () {
//     $.each(snippets, function (key, snip) {
//         $("#contents").append("<a data-snip='" + key + "' class='langClick' href='#" + key + "'>" + key + "</a>")
//     })
//     $.each(themes, function (_, theme) {
//         $(".dropdown-content").append("<a href='#'>" + theme + "</a>")
//     })
// });
// $(document).on("click", ".langClick", function () {
//     $("#mainContent").html("");
//     that = $(this).attr("data-snip")
//     $.each(snippets[$(this).attr("data-snip")], function (key, snip) {
//         $.each(snip, function (snipkey, snipsnip) {
//             $("#mainContent").append("<div class='blockTitle'>" + key + ":</div>")
//             if (snipsnip.code) $("#mainContent").append(`<pre><code class='` + that + `'>` + escapeHtml(snipsnip.code.trim()) + `</code></pre>`)
//             if (snipsnip.in) $("#mainContent").append(`Input:\n<pre><code class='` + that + `'>` + escapeHtml(snipsnip.in.trim()) + `</code></pre>`)
//             if (snipsnip.out) $("#mainContent").append(`Output:\n<pre><code class='` + that + `'>` + escapeHtml(snipsnip.out.trim()) + `</code></pre>`)
//             if (snipsnip.code) {
//                 $("#mainContent").append($("<button/>", {
//                     "data-snippet-lang": that,
//                     "data-snippet-snippet": key,
//                     "data-snippet-index": snip.indexOf(snipkey),
//                     "data-snippet-min": false,
//                     text: "Add",
//                     class: "button"
//                 }));
//                 if (that == "javascript") $("#mainContent").append($("<button/>", {
//                     "data-snippet-lang": that,
//                     "data-snippet-snippet": key,
//                     "data-snippet-index": snip.indexOf(snipkey),
//                     "data-snippet-min": true,
//                     text: "Add (min)",
//                     class: "button"
//                 }));
//             }
//             if (snipsnip.source) $("#mainContent").append("<a target='_blank' href='" + snipsnip.source + "' class='source'>Source</a>")
//             $("#mainContent").append("<hr>")
//         })
//     });
//     $('code').each(function (i, block) {
//         hljs.highlightBlock(block);
//         $(this).animate({
//             opacity: 1,
//         })
//     });
// });
// $(document).on("click", ".dropdown-content a", function () {
//     $(".dropbtn").text($(this).text())
//     $(".theme").remove();
//     $("head").append('<link rel="stylesheet" class="theme" href="static/styles/' + $(this).text() + '.css">')
//     $(".dropdown-content a").css("background-color", "#f1f1f1")
//     $(".dropdown-content a").css("color", "black")
//     $(this).css("color", "white")
//     $(this).css("background-color", "#383838");
//     scroll = $(window).scrollTop();
//     setTimeout(function () { $('html, body').scrollTop(scroll) }, 1);
// });
// $(document).on("click", ".button", function () {
//     if ($(this).attr("data-snippet-lang") != cart.type) {
//         cart.items = {};
//         cart.type = $(this).attr("data-snippet-lang");
//     }
//     if ($(this).attr("data-snippet-snippet") in cart) {
//         if ($(this).attr("data-snippet-min") == cart[$(this).attr("data-snippet-snippet")].min) {
//             console.log("already in!")
//             return
//         } else {
//             cart[$(this).attr("data-snippet-snippet")].min == $(this).attr("data-snippet-min")
//         }
//     } else {
//         cart.items[$(this).attr("data-snippet-snippet")] = {
//             "min": $(this).attr("data-snippet-min"),
//         }
//     }
//     console.log(cart)
// })
// $(document).on("click", ".dropdown button", function () {
//     $(".dropdown-content").toggle()
//     $(this).parent().css("height", ($(".dropdown-content").is(":visible") ? "100%" : "20px"))
// })
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
$(function () {
    k = $("<script/>", { src: "snippets/python.py" });
    $("#mainContent").append(k)
});
