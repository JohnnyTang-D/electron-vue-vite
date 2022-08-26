if (process.platform === "darwin") {
  module.exports = {};
} else {
  module.exports = {
    icon: "../resource/unrelease/favicon.ico",
    target: [
      {
        target: "nsis",
        arch: ["ia32"],
      },
    ],
    // sign: async (config) => {},//签名
  };
}
