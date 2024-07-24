const { contextBridge, ipcRenderer } = require("electron");
const axios = require("axios");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    let validChannels = ["toMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  axios: {
    get: async (url, config) => {
      try {
        const response = await axios.get(url, config);
        return response.data;
      } catch (error) {
        console.error("Axios GET request failed:", error);
        throw error;
      }
    },
    post: async (url, data, config) => {
      try {
        const response = await axios.post(url, data, config);
        return response.data;
      } catch (error) {
        console.error("Axios POST request failed:", error);
        throw error;
      }
    },
    put: async (url, data, config) => {
      try {
        const response = await axios.put(url, data, config);
        return response.data;
      } catch (error) {
        console.error("Axios PUT request failed:", error);
        throw error;
      }
    },
    delete: async (url, config) => {
      try {
        const response = await axios.delete(url, config);
        return response.data;
      } catch (error) {
        console.error("Axios DELETE request failed:", error);
        throw error;
      }
    },
  },
});
