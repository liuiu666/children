import { defineConfig } from 'umi';
import { productCode } from './package.json';
export default defineConfig({
  theme: {},
  title: false,
  base: productCode,
  inlineLimit: 10000, // 小于10kb编译成base64
  history: {
    type: 'hash',
  },
  hash: false,
  outputPath: './build',
  nodeModulesTransform: {
    type: 'none',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  plugins: [],
  alias: {
    '@': './src',
  },
  chainWebpack(config) {
    // 设置出口文件名
    config.plugin('extract-css').tap(() => [
      {
        filename: `main.css`,
        chunkFilename: `[name].chunk.css`,
        ignoreOrder: true,
      },
    ]);
    config.output.filename('app.js');
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      // pathRewrite: { '^/igate': '' },
    },
  },
});
