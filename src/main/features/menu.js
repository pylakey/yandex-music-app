const {app, Menu} = require("electron");
const settings = require("electron-settings");
const {showOpenURLDialog} = require("../dialogs/openURL");
const navigation = require("./navigation");
const {showLoader} = require("../index");

const menu = Menu.buildFromTemplate([
    {
        label: app.name,
        submenu: [
            {role: "about"},
            {type: "separator"},
            {
                label: "Enable notifications",
                type: "checkbox",
                checked: settings.getSync("notifications") || true,
                click(menuItem) {
                    settings.set("notifications", menuItem.checked).then(_ => _);
                },
            },
            {type: "separator"},
            {role: "hide"},
            {role: "hideothers"},
            {role: "unhide"},
            {type: "separator"},
            {role: "quit"},
        ],
    },
    {
        role: "editMenu",
    },
    {
        role: "viewMenu",
        submenu: [
            {
                label: "Reload",
                accelerator: "CommandOrControl+R",
                click() {
                    showLoader();
                    global.mainWindow.reload();
                },
            },
            {
                role: "close",
            },
        ],
    },
    {
        role: "windowMenu",
    },
    {
        label: "Navigate",
        submenu: [
            {
                label: "Back",
                accelerator: "CommandOrControl+[",
                click: navigation.goBack,
            },
            {
                label: "Forward",
                accelerator: "CommandOrControl+]",
                click: navigation.goForward,
            },
            {
                type: "separator",
            },
            {
                label: "Open URL",
                accelerator: "CommandOrControl+O",
                click: showOpenURLDialog,
            },
        ],
    },
]);

Menu.setApplicationMenu(menu);
