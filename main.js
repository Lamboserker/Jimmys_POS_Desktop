const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("node:path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // mainWindow.loadURL("http://localhost:3000"); // Für Entwicklung
  mainWindow.loadFile(path.join(__dirname, "dist/index.html")); // Für Produktion

  // Menü definieren
  const menu = Menu.buildFromTemplate([
    {
      label: "Datei",
      submenu: [
        {
          label: "Öffnen",
          click: () => {
            // Implementiere die Funktion zum Öffnen einer Datei
          },
        },
        {
          label: "Speichern",
          click: () => {
            // Implementiere die Funktion zum Speichern einer Datei
          },
        },
        {
          type: "separator",
        },
        {
          label: "Beenden",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "Bearbeiten",
      submenu: [
        { role: "undo", label: "Rückgängig" },
        { role: "redo", label: "Wiederholen" },
        { type: "separator" },
        { role: "cut", label: "Ausschneiden" },
        { role: "copy", label: "Kopieren" },
        { role: "paste", label: "Einfügen" },
      ],
    },
    {
      label: "Ansicht",
      submenu: [
        { role: "reload", label: "Neu laden" },
        { role: "forcereload", label: "Erneut erzwingen" },
        { role: "toggledevtools", label: "Entwicklertools umschalten" },
        { type: "separator" },
        { role: "resetzoom", label: "Zoom zurücksetzen" },
        { role: "zoomin", label: "Vergrößern" },
        { role: "zoomout", label: "Verkleinern" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Vollbild umschalten" },
      ],
    },
    {
      label: "Fenster",
      submenu: [
        { role: "minimize", label: "Minimieren" },
        { role: "close", label: "Schließen" },
      ],
    },
    {
      label: "Hilfe",
      submenu: [
        {
          label: "Homepage",
          click: async () => {
            await shell.openExternal("https://www.jimmys-cocktails.com/");
          },
        },
      ],
    },
  ]);

  // Menü setzen
  Menu.setApplicationMenu(menu);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
