
const path = require('path');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { MODE } = process.env;
//development是true,不是开发false
let IsDevelopment = MODE === 'development';
console.log(MODE, 'MODE------>');
const Config = require('./webpack_config/dev.config');
const moduleConfig = require('./webpack_config/module.config');
const pluginsConfig = require('./webpack_config/plugins.config');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
    mode: MODE,
    devtool: IsDevelopment ? 'source-map' : 'cheap-source-map',
    entry: {
        index: './src/index.tsx',
    },  // 入口文件,多入口配置
    output: {
        filename: IsDevelopment ? 'js/[name].js' : 'js/[name][contenthash:8].min.js',
        path: path.resolve(__dirname, "build"),
        chunkFilename: "js/[name].[contenthash:8].js",
        publicPath: '/',
    },  // 打包出口文件
    resolve: {
        extensions: [".ts", ".tsx", ".js", "jsx", ".json"],//从左向右找，添加后缀
        alias: {
            '@assets': path.resolve(__dirname, "src/assets"),
            '@components': path.resolve(__dirname, "src/components"),
            '@http': path.resolve(__dirname, "src/http_request"),
            '@pages': path.resolve(__dirname, "src/pages"),
            '@public': path.resolve(__dirname, "src/public"),
            '@router': path.resolve(__dirname, "src/router"),
            '@store': path.resolve(__dirname, "src/store"),
            '@example': path.resolve(__dirname, "src/example"),
        }
    },
    module: moduleConfig,    // 处理对应模块
    plugins: pluginsConfig,  // 对应的插件
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        port: Config.port,
        host: Config.ip,
        proxy: Config.proxy.map(item => (
            {
                context: item.path,
                target: item.target,
                changeOrigin: true,
                secure: false,
                // pathRewrite: item.isDevelop ? { '^/tower-logistic': '' } : null,//请求时替换掉api
            }
        )),
        compress: true,
        historyApiFallback: true,
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: !IsDevelopment,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,  // 使用这个插件主要是删除build文件夹中的一个注释文件
                terserOptions: IsDevelopment ? {} : {
                    output: {
                        comments: false,  // 打包时去掉注释
                    },
                    compress: {
                        arguments: false,
                        dead_code: true,
                        pure_funcs: ['console.log']  // 打包时清除掉无用的console.log
                    },
                },
            }),
            // new OptimizeCssAssetsPlugin(),
            new CssMinimizerPlugin(),
            new ESBuildMinifyPlugin({
                target: 'es2015',
                minifyWhitespace: true,
                sourcemap: IsDevelopment,
            }),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                rcRelevant: {
                    name: 'rc-relevant',
                    test: /[\\/]node_modules[\\/](@ant-design|rc-table|rc-picker|rc-select|rc-util|rc-menu|rc-tree|rc-pagination|rc-image|rc-virtual-list|rc-textarea|rc-trigger)[\\/]/,
                    chunks: 'all',
                    priority: 4,
                },
                antd: {
                    name: 'antd',
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    chunks: 'all',
                    priority: 3,
                },
                vendor: {
                    name: 'vendor',
                    priority: 2,
                    test: /node_modules/,
                    // test: /[\\/]node_modules[\\/](react|react-dom|moment|react-document-title|bind-decorator)[\\/]/,
                    chunks: 'all',
                    minSize: 0,
                    minChunks: 2,
                },
                common: {
                    name: 'common',
                    priority: 1,
                    test: /src/,
                    chunks: 'all',
                    minSize: 0,
                    minChunks: 2,
                },
            }
        },
        // 为 webpack 运行时代码创建单独的chunk
        runtimeChunk: {
            name: 'manifest',
        }
    }
};