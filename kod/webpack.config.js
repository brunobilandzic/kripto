const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      url: require.resolve("url/"),
      zlib: require.resolve("browserify-zlib"),
      fs: false,
      net: false,
      tls: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
};
