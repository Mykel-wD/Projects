import path from "path";

export default {
  mode: "development",
  entry: "./Index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "client"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
