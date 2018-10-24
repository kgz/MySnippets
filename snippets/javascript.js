//&&START&&
function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//&&NAME&& Escape Html
//&&INPUT&& console.log(escapeHtml("<div id='test'></div>"));
//&&OUTPUT&& "&lt;div id=&#039;test&#039;&gt;&lt;/div&gt;"
//&&END&&
