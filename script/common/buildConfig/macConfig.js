if (process.platform !== "darwin") {
  module.exports = {};
} else {
  module.exports = {
    icon: "resource/unrelease/favicon.ico",
    type: "distribution",
  };
}
