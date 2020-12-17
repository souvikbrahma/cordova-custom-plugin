var exec = require("cordova/exec");

function CustomPlugin() {}

// The function that passes work along to native shells
// Message is a string, duration may be 'long' or 'short'
CustomPlugin.prototype.update = function (
    successCallback,
    errorCallback,
    config
) {
    exec(successCallback, errorCallback, "CustomPlugin", "update", [
        {
            flexibleUpdateStalenessDays: config.flexibleUpdateStalenessDays,
            immediateUpdateStalenessDays: config.immediateUpdateStalenessDays,
        },
    ]);
};

// Installation constructor that binds updatePlugin to window
CustomPlugin.install = function () {
    if (!window.plugins) {
        window.plugins = {};
    }
    window.plugins.updatePlugin = new CustomPlugin();
    return window.plugins.updatePlugin;
};

cordova.addConstructor(CustomPlugin.install);
