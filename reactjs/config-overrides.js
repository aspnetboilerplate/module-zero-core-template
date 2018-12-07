const tsImportPluginFactory = require('ts-import-plugin')
const {
    getLoader
} = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    const tsLoader = getLoader(
        config.module.rules,
        rule =>
        rule.loader &&
        typeof rule.loader === 'string' &&
        rule.loader.includes('ts-loader')
    );

    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css',
            })]
        })
    };

    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        modifyVars: {
            "@primary-color": "#1DA57A"
        },
    })(config, env);

    if (!config.plugins) {
        config.plugins = [];
    }

    config.plugins.push(
        (process.env.NODE_ENV === 'production') ?
        new CopyWebpackPlugin([{
            from: 'node_modules/@aspnet/signalr/dist/browser/signalr.min.js'
        }, {
            from: 'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js'
        }, {
            from: 'src/lib/abp.js'
        }]) :
        new CopyWebpackPlugin([{
            from: 'node_modules/@aspnet/signalr/dist/browser/signalr.min.js',
            to: 'dist'
        }, {
            from: 'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js',
            to: 'dist'
        }, {
            from: 'src/lib/abp.js',
            to: 'dist'
        }])
    );

    return config;
}