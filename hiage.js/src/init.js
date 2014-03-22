//var jqueryScript = document.createElement("script");
//jqueryScript.setAttribute("src", "lib/jquery-2.1.0.min.js")
//document.head.appendChild(jqueryScript)

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = setTimeout;
}

requirejs.config({
    baseUrl: "lib",
    paths: {
        'jquery': "jquery-2.1.0.min"
    }
})
console.log('inited');