import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
	entry: {
			app: "./src/index.js",
	},
	plugins: [
			new HtmlWebpackPlugin({
					title: "Production",
					template: "./src/template.html",
			}),
	],
	output: {
			filename: "main.js",
			path: path.resolve(import.meta.dirname, "dist"),
			clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
};