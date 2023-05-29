const {defineConfig} = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    pages: {
        index: {
            entry: "examples/main.js",
            template: "public/index.html",
            filename: "index.html"
        },

    },
    outputDir:path.resolve(__dirname,'dist'),

    chainWebpack: (config) => {
        // 配置保留文件夹
        config.plugin('copy').tap(([options]) => {
            options.patterns.push(
                {
                    from: path.resolve(__dirname, 'packages'),
                    to: path.resolve(__dirname, 'sss-ui/packages'),
                },
                {
                    from: path.resolve(__dirname, 'src'),
                    to: path.resolve(__dirname, 'sss-ui/src'),
                }
            );
            return [options];
        });
    },
})
