/*
 * Central lab loader for the shared index page.
 * - reads the selected lab from the URL
 * - updates the title and dropdown state
 * - loads implemented lab script bundles in order
 * - shows a placeholder for unfinished labs or no selection
 */
(function() {
    var ALL_LABS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
    var IMPLEMENTED_LABS = ["01", "02", "03", "04", "05", "06", "07", "08", "09","10"];
    var LAB_SCRIPTS = ["setup.js", "build.js", "animate.js", "run.js"];

    // Resolve the requested lab from ?lab=XX and allow a no-selection landing state.
    function getActiveLab() {
        var params = new URLSearchParams(window.location.search);
        var requestedLab = params.get("lab");

        if (ALL_LABS.indexOf(requestedLab) >= 0) {
            return requestedLab;
        }

        return "";
    }

    // Keep the browser title aligned with the selected lab while leaving the page heading generic.
    function setLabTitle(activeLab) {
        var currentLab = parseInt(activeLab, 10);
        var heading = document.getElementById("pageTitle");

        if (heading) {
            heading.textContent = "Computer Graphics Demo";
        }

        if (isNaN(currentLab)) {
            document.title = "CG Labs";
            return;
        }

        document.title = "CG Labs - Lab " + currentLab;
    }

    // Sync the dropdown with the active lab and reload when the user changes it.
    function initializeLabSelector(activeLab) {
        var selector = document.getElementById("labSelector");

        if (!selector) {
            return;
        }

        selector.value = activeLab;
        selector.addEventListener("change", function(event) {
            var params = new URLSearchParams(window.location.search);
            params.set("lab", event.target.value);
            window.location.search = params.toString();
        });
    }

    // Show a status banner for placeholder, error, or empty-state messages.
    function showLabStatus(message, isCentered) {
        var status = document.getElementById("labStatus");

        if (!status) {
            return;
        }

        status.textContent = message;
        status.classList.toggle("centered-status", !!isCentered);
        status.hidden = false;
    }

    // Hide the status banner when a lab can load normally.
    function hideLabStatus() {
        var status = document.getElementById("labStatus");

        if (!status) {
            return;
        }

        status.hidden = true;
        status.textContent = "";
        status.classList.remove("centered-status");
    }

    // Load the four lab files in order so run.js executes last.
    function loadLabScripts(activeLab) {
        if (!activeLab) {
            showLabStatus("Select a lab from the menu to begin.", true);
            return;
        }

        if (IMPLEMENTED_LABS.indexOf(activeLab) < 0) {
            showLabStatus("Lab " + activeLab + " is coming soon.", true);
            return;
        }

        hideLabStatus();

        var labBasePath = "labs/lab" + activeLab + "/";

        // Chain script injection one file at a time to preserve execution order.
        function loadScriptAt(index) {
            if (index >= LAB_SCRIPTS.length) {
                return;
            }

            var script = document.createElement("script");
            script.src = labBasePath + LAB_SCRIPTS[index];
            script.async = false;
            script.onload = function() {
                loadScriptAt(index + 1);
            };
            script.onerror = function() {
                showLabStatus("Unable to load Lab " + activeLab + ".", true);
                console.error("Failed to load lab script:", script.src);
            };
            document.body.appendChild(script);
        }

        loadScriptAt(0);
    }

    // Initialize the page from the current URL selection.
    var activeLab = getActiveLab();
    window.activeLab = activeLab;

    setLabTitle(activeLab);
    initializeLabSelector(activeLab);
    loadLabScripts(activeLab);
})();