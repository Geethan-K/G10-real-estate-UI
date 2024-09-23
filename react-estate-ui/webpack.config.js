// Host App webpack.config.js
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  // other webpack config
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        chatbox: "chatbox@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        './SharedStore': './src/redux-store/shared-store.js', // Expose the shared store
      },
      shared: {
        react: { singleton: true },
        'react-redux': { singleton: true },
      },
    }),
  ],
};
