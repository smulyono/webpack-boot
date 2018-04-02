/**
 * Custom webpack boot HRM client
 *
 * - create websocket connection to listen for any changes
 *   from HMR server in webpack-dev-server /sockjs-client
 * - listen to message and react with HRM when signal is
 *   received
 */

const SockJS = require("sockjs-client"),
    stripAnsi = require("strip-ansi"),
    overlay = require("webpack-dev-server/client/overlay"),
    url = require("url");

const protocol = window ? window.location.protocol : "http",
    hostname = window ? window.location.hostname : "localhost",
    port = window ? window.location.port : 3000;

let currentHash = null,
    firstCompilation = true;

// initiating socket connection
let connection = new SockJS(
    url.format({
        protocol,
        hostname,
        port,
        pathname: "/sockjs-node"
    })
);

// when it is disconnected
connection.onclose = () => {
    console.info("[webpackHotClient] webpack-dev-server disconnected.");
};

// handle when message is received
connection.onmessage = e => {
    const message = JSON.parse(e.data);
    switch (message.type) {
        case "hash":
            // receive new hash from webpack
            currentHash = message.data;
            break;
        case "invalid":
            // when code is being updated
            console.info("[webpackHotClient] App being updated. Recompiling..");
            break;
        case "content-changed":
            // when files content is changed (removed or added)
            console.info("[webpackHotClient] Reloading due to content-changed");
            reloadWindow();
            break;
        case "still-ok":
        case "ok":
            // after compilation, everything still okay
            handleOkMessage(message.data);
            break;
        case "warnings":
            handleWarningMessage(message.data);
            break;
        case "errors":
            handleErrorsMessage(message.data);
            break;
        default:
        // do nothing
    }
};

/* ==================== HANDLE MESSAGE ================*/
function handleOkMessage(data) {
    if (console && console.clear) {
        console.clear();
    }
    overlay.clear();
    reloadModule(data);
}

function handleWarningMessage(data) {
    // show warning information
    // no fancy display in console, just point out to print warnings
    // in their terminal
    // if (console && console.clear) {
    //     console.clear();
    // }
    overlay.clear();
    reloadModule(data);
    console.info(
        `[webpackHotClient] ${data.length} warnings while compiling ...`
    );
}

function handleErrorsMessage(data) {
    if (console && console.clear) {
        console.clear();
    }

    // show errors in console
    console.error(
        `[webpackHotClient] ${data.length} errors while compiling ...`
    );
    data.map(error => {
        let strippedError = stripAnsi(error);
        console.error(strippedError);
        return strippedError;
    });
    overlay.showMessage(data);
}

function reloadModule(data) {
    const isSafeToUpdate = !firstCompilation;
    firstCompilation = false;

    if (isSafeToUpdate) {
        if (!module.hot) {
            console.error("no hot module replacement enabled!");
            // HMR is not enabled ??
            // reloadWindow();
            return;
        }

        // check if the current code needs to be updated (it might be
        // no changes)
        if (!isUpdateAvailable() || !canApplyUpdates()) {
            return;
        }

        // Check for HMR status
        // https://webpack.js.org/api/hot-module-replacement/
        module.hot
            .check(true)
            .then(outdatedModules => {
                if (!outdatedModules) {
                    reloadWindow();
                    return;
                }

                // another update goes in
                if (isUpdateAvailable()) {
                    reloadModule(data);
                }
            })
            .catch(err => {
                // hot module are not accepted or errors.
                // console.error(err);
                reloadWindow();
            });
    }
}

// Is there a newer version of this code available?
function isUpdateAvailable() {
    /* globals __webpack_hash__ */
    // __webpack_hash__ is the hash of the current compilation.
    // It's a global variable injected by Webpack.
    return currentHash !== __webpack_hash__;
}

// Webpack disallows updates in other states.
function canApplyUpdates() {
    return module.hot.status() === "idle";
}

function reloadWindow() {
    if (window) {
        window.location.reload();
    } else {
        console.info("window reload!");
    }
}
