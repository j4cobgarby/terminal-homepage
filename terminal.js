var prompt = "root@jacobgarby.co.uk:~#"

var termout
var cmdline

var projects = {
    "mustard": "https://github.com/j4cobgarby/mustard",
    "cordial": "https://github.com/j4cobgarby/Cordial",
    "eddy":    "https://github.com/j4cobgarby/eddy",
    "cool-dungeon": "https://github.com/j4cobgarby/cool-dungeon",
    "mining": "https://github.com/j4cobgarby/mining",
    "t": "https://github.com/j4cobgarby/t-chat-server-client",
    "aabb-renderer": "https://github.com/j4cobgarby/render",
    "big-boy-computer": "https://github.com/j4cobgarby/big-boy-computer",
    "py-ide": "https://github.com/j4cobgarby/PyIDE"
}

function init() {
    termout = document.getElementById('term')
    cmdline = document.getElementById('cmdline')
    cmdline.focus()
    document.getElementById('prompt').innerHTML = prompt
    cmdline.autofocus = true

    println("\nWelcome to my website!\nType 'help' to list all possible commands!\n")

    cmdline.onkeypress = function(e) {
        if (!e) e = window.event;
        var keycode = e.keycode || e.which;
        if (keycode == '13') {
            termout.innerHTML += prompt + "&nbsp;" + cmdline.value + '<br>'
            var args = cmdline.value.split(" ")
            switch (args[0]) {
                case "": break
                case "help":
                    help()
                    break
                case "ls":
                    ls()
                    break
                case "cd":
                    cd(args[1])
                    break
                case "colour":
                    colour(args[1])
                    break
                case "clear":
                    clear()
                    break
                default:
                    println("bash: " + args[0] + ": command not found. Type 'help' for possible commands.")
                    break
            }
            cmdline.value = ''
        }
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function println(s) {
    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) == " ") {
            termout.innerHTML += '&nbsp;'
            continue
        }
        if (s.charAt(i) == "\n") {
            termout.innerHTML += '<br>'
            continue
        }
        termout.innerHTML += s.charAt(i)
    }
    termout.innerHTML += '<br>'
}

function help() {
    println('fake GNU bash, version 0.0.1-release')
    println(" cd [project]              Opens up a project")
    println(" ls                        Lists projects")
    println(" colour [light/dark]       Changes the colour theme")
    println(" clear                     Clears the terminal")
    println(" help                      Displays this help page")
}

function ls() {
    println('total ' + Object.keys(projects).length)
    for (var p in projects) {
        if (projects.hasOwnProperty(p)) {
            println("-r--r--r-- 1 j4cobgarby " + p)
        }
    }
}

function cd(p) {
    if (projects[p]) window.location.href = projects[p]
    else println("cd: The project \"" + p + "\" does not exist. Type 'ls' for a list of available projects.")
}

function colour(scheme) {
    if (scheme == "light" || scheme == "dark") document.getElementById('lightordark').setAttribute("href", scheme + ".css")
    else println("colour: The colour scheme \"" + scheme + "\" does not exist. Try 'dark' or 'light'")
}

function clear() {
    termout.innerHTML = ''
}
