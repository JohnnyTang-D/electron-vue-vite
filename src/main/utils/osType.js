export default {
  macOS() {
    return process.platform === "darwin";
  },
  windows() {
    return process.platform === "win32";
  },
};
