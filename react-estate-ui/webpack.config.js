import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack'; // Import the whole webpack module
import path from 'path';
import { fileURLToPath } from 'url';

const { ModuleFederationPlugin } = webpack.container; // Access ModuleFederationPlugin
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/main.jsx', 
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),  // Where your static files are served from
    historyApiFallback: true,  // This ensures all requests are routed to index.html
  },
  resolve: {
    extensions: ['.*', '.js', '.ts', '.jsx']
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        chatbox: 'chatbox@http://localhost:3001/remoteEntry.js',
      },
      exposes: {
        './SharedStore': './src/redux-store/shared-store.js', // Expose the shared store
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        'react-redux': { singleton: true, eager: true }, // Share react-redux
        '@reduxjs/toolkit': { singleton: true, eager: true }, // Share Redux toolkit
      },
    }),
    new HtmlWebpackPlugin({
      template: 'index.html', // Path to your HTML template
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
        test: /\.(css)$/,
        use: ['css-loader']
      },
      {
        test: /\.scss$/, // For SCSS files
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded', // Keep comments in output
                sourceComments: true,    // Include comments
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|ico|gif)$/,
        use: ['file-loader']
      }
    ],

  },
};
