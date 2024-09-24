// chat-app/webpack.config.js
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack'; // Import the whole webpack module
import path from 'path';
import { fileURLToPath } from 'url';

const { ModuleFederationPlugin } = webpack.container; // Access ModuleFederationPlugin
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
  entry: './src/main.jsx', // Your main entry file
  mode: 'development',
  devServer: {
    port: 3001, // Port for the Chat App
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow cross-origin requests
    },
  },
  output: {
    publicPath: 'auto', // Ensure public path is set for dynamic loading
  },
  // shared: {
  //   react: { singleton: true },
  //   'react-dom': { singleton: true },
  //   'react-redux': { singleton: true }, // Share react-redux
  //   '@reduxjs/toolkit': { singleton: true }, // Share Redux toolkit
  // },
  resolve: {
      extensions: ['.*', '.js', '.jsx']
    },
  plugins: [
    new ModuleFederationPlugin({
      name: 'chatbox', // Name of the remote module
      filename: 'remoteEntry.js', // File that will be served
      exposes: {
        './Chatbox': './src/App.jsx', // Path to the Chatbox component
      },
      remotes: {
        host: "host@http://localhost:3000/remoteEntry.js", // Host URL
      },
      shared: {
        react: { singleton: true,eager:true }, // Share React instance
        'react-dom': { singleton: true,eager:true }, // Share ReactDOM instance
      },
    }),
    new HtmlWebpackPlugin({
      template: 'index.html', // HTML template for the app
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: ['babel-loader']
      },
      {
        test:/\.(css|scss)$/,
        use:['css-loader']
      },
      {
        test:/\.(png|svg|jpg|jpeg|ico|gif)$/,
        use:['file-loader']
      }
    ],
    
  },
};
