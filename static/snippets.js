snippets = {
    "javascript": {
        "format": [{
            "code": `if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
            ? args[number]
            : match;
        });
    };
}`,
            "in": `"{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")`,
            "out": `ASP is dead, but ASP.NET is alive! ASP {2}`,
            "source": "https://stackoverflow.com/a/4673436",
            "credit": "fearphage",
            "tags": ["string", "format", "prototype"]
        }],
        "setCookie": [{
            "code": `function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}`,
            "in": ``,
            "out": ``,
            "source": "https://www.w3schools.com/js/js_cookies.asp",
            "credit": "",
            "tags": ["Cookie", "Set"]
        }],
        "getCookie": [{
            "code": `function getCookie(cname) {
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
}`,
            "in": ``,
            "out": ``,
            "source": "https://www.w3schools.com/js/js_cookies.asp",
            "credit": "",
            "tags": ["cookie", "get"]
        }],
        "escape html": [{
            "code": `function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}`,
            "in": ``,
            "out": ``,
            "source": "https://stackoverflow.com/a/4835406",
            "credit": "Kip",
            "tags": ["", "", ""]
        }]
    },
    "python": {
        "reverse string": [{
            "code": ``,
            "in": `'hello world'[::-1]`,
            "out": `"dlrow olleh"`,
            "source": "http://snippets.readthedocs.io/en/latest/string.html",
            "credit": "",
            "tags": ["String", "Reverse", ""]
        }],
        "List to chunks": [{
            "code": `def chunks(list_, splits):
    """Splits a list into evenly sized chunks."""
    for ind in range(0, len(list_), splits):
        yield list_[ind:ind+splits]`,
            "in": `myList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
for index in chunks(myList, 4):
    print(index)`,
            "out": `[1, 2, 3, 4]\n[5, 6, 7, 8]\n[9]`,
            "source": "http://snippets.readthedocs.io/en/latest/list.html",
            "credit": "",
            "tags": ["List", "Split", "Chunks", "Generator"]
        }],
        "time diffrence": [{
            "code": `def diffrence(stime, ftime):
    """Returns diffrence between two times in d/h/m/s"""
    min_, sec_ = divmod(ftime - stime, 60)
    hour_, min_ = divmod(min_, 60)
    day_, hour_ = divmod(hour_, 24)
    uptime = ""
    if day_ > 0:
        uptime += f"{str(round(day_))} {(day_ == 1 and 'day' or 'days')},"
    if uptime or hour_ > 0:
        uptime += f"{str(round(hour_))} {(hour_ == 1 and 'hour' or 'hours')},"
    if uptime or min_ > 0:
        uptime += f"{str(round(min_))} {(min_ == 1 and 'minute' or 'minutes')},"
    uptime += f"{str(round(sec_))} {(sec_ == 1 and 'second' or 'seconds')}."
    return uptime`,
            "in": `import time
start = 1497549267 #Thursday, 15 June 2017 17:54:27
finish = time.time()
print(diffrence(start, finish))`,
            "out": `"368 days, 0 hours, 1 minute, 7 seconds."`,
            "source": "",
            "credit": "",
            "tags": ["Time", "Epoch", "Diffrence"]
        }]
    }
}
themes = ['agate', 'androidstudio', 'arduino-light', 'arta', 'ascetic', 'atelier-cave-dark', 'atelier-cave-light', 'atelier-dune-dark', 'atelier-dune-light', 'atelier-estuary-dark', 'atelier-estuary-light', 'atelier-forest-dark', 'atelier-forest-light', 'atelier-heath-dark', 'atelier-heath-light', 'atelier-lakeside-dark', 'atelier-lakeside-light', 'atelier-plateau-dark', 'atelier-plateau-light', 'atelier-savanna-dark', 'atelier-savanna-light', 'atelier-seaside-dark', 'atelier-seaside-light', 'atelier-sulphurpool-dark', 'atelier-sulphurpool-light', 'atom-one-dark', 'atom-one-light', 'brown-paper', 'codepen-embed', 'color-brewer', 'darcula', 'dark', 'darkula', 'default', 'docco', 'dracula', 'far', 'foundation', 'github-gist', 'github', 'googlecode', 'grayscale', 'gruvbox-dark', 'gruvbox-light', 'hopscotch', 'hybrid', 'idea', 'ir-black', 'kimbie.dark', 'kimbie.light', 'magula', 'mono-blue', 'monokai-sublime', 'monokai', 'obsidian', 'ocean', 'paraiso-dark', 'paraiso-light', 'pojoaque', 'purebasic', 'qtcreator_dark', 'qtcreator_light', 'railscasts', 'rainbow', 'routeros', 'school-book', 'solarized-dark', 'solarized-light', 'sunburst', 'tomorrow-night-blue', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'tomorrow-night', 'tomorrow', 'vs', 'vs2015', 'xcode', 'xt256', 'zenburn']
base = [{
    "code": ``,
    "in": ``,
    "out": ``,
    "source": "",
    "credit": "",
    "tags": ["", "", ""]
}]
