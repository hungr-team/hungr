const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log("The Process ENV variable", process.env.NODE_ENV);
module.exports = {
  devtool: "eval-source-map",
  mode: "development",
  entry: "./client/index.js",
  devServer: {
    // contentBase: __dirname + '/client/',
    publicPath: "/build/",
    proxy: {
      "/": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/build/",
  },
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        // Conditions:
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "client")],
        exclude: [path.resolve(__dirname, "node_modules")],

        // Actions:
        loader: "babel-loader",
        // the loader which should be applied, it'll be resolved relative to the context
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-transform-react-jsx"],
        },
        type: "javascript/auto",
        // specifies the module type
        /* Advanced actions (click to show) */
      },
      {
        // Conditions:
        test: /.(css|scss)$/,
        include: [path.resolve(__dirname, "client")],
        exclude: [path.resolve(__dirname, "node_modules")],

        // Actions:
        use: ["style-loader", "css-loader", "sass-loader"],
        // the loader which should be applied, it'll be resolved relative to the context
      },
      {
        oneOf: [
          // ... (rules)
        ],
        // only use one of these nested rules
      },
      {
        // ... (conditions)
        rules: [
          // ... (rules)
        ],
        // use all of these nested rules (combine with conditions to be useful)
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
    /* Advanced module configuration (click to show) */
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: [".js", ".jsx"],
  },
};
