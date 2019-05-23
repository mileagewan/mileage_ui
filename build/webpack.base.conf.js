'use strict'
//必备的需求,将/src目录改为examples目录
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
//下面两个配置是为了vue-markdown-loader和Markdown-it-container配置的信息options信息
const MarkdownItContainer = require('markdown-it-container')
const striptags = require('./strip-tags')
/**
 * 2019-2-24新增
 */
var Ex = require('extract-text-webpack-plugin') //css分离打包


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('examples'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

//vueMarkdown的配置文件,用来解析Markdown里面的html文档

const vueMarkdown = {
  // preprocess: (MarkdownIt, source) => {
  //   MarkdownIt.renderer.rules.table_open = function () {
  //     return '<table class="table">'
  //   }
  //   MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)
  //   return source
  // },

  // preprocess: (MarkdownIt, source) => {
  //   MarkdownIt.renderer.rules.table_open = function () {
  //     return '<table class="table">'
  //   }
  //   MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)

  //   // ```html `` 给这种样式加个class hljs
  //   //  但是markdown-it 有个bug fence整合attr的时候直接加载class数组上而不是class的值上
  //   //  markdown-it\lib\renderer.js 71行 这么修改可以修复bug
  //   //  tmpAttrs[i] += ' ' + options.langPrefix + langName; --> tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
  //   // const fence = MarkdownIt.renderer.rules.fence 
  //   // MarkdownIt.renderer.rules.fence = function(...args){
  //   //   args[0][args[1]].attrJoin('class', 'hljs')
  //   //   var a = fence(...args)
  //   //   return a
  //   // }

  //   // ```code`` 给这种样式加个class code_inline
  //   const code_inline = MarkdownIt.renderer.rules.code_inline
  //   MarkdownIt.renderer.rules.code_inline = function(...args){
  //     args[0][args[1]].attrJoin('class', 'code_inline')
  //     return code_inline(...args)
  //   }
  //   return source
  // },
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function () {
      return '<table class="table">'
    }
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)

    // ```code`` 给这种样式加个class code_inline
    const code_inline = MarkdownIt.renderer.rules.code_inline
    MarkdownIt.renderer.rules.code_inline = function (...args) {
      args[0][args[1]].attrJoin('class', 'code_inline')
      return code_inline(...args)
    }
    return source
  },
  use: [
    [MarkdownItContainer, 'demo', {
      // 用于校验包含demo的代码块
      validate: params => params.trim().match(/^demo\s*(.*)$/),
      render: function (tokens, idx) {

        var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

        if (tokens[idx].nesting === 1) {
          var desc = tokens[idx + 2].content;
          // 编译成html
          const html = utils.convertHtml(striptags(tokens[idx + 1].content, 'script'))
          // 移除描述，防止被添加到代码块
          tokens[idx + 2].children = [];

          return `<demo-block>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`;
        }
        return '</div></demo-block>\n';
      }
    }]
  ]
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './examples/main.js'
  },

  /**
   * 3-16d增加的
   */
  externals: {//不打包的
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    //'vuex': 'Vuex',
    'axios': 'axios',
    'echarts': 'echarts',
    'jquery': 'jQuery'
  },



  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('examples'),
      '@src': resolve('examples')
    }
  },
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      ...(config.dev.useEslint ? [] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('examples'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]

        //这里将example替换src,表示根目录进行改变
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      //下面是解析vue-markdown文件的配置的rules文件
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: vueMarkdown
      },
      /**
       * 2019-2-24新增的css分离打包
       */
      {
        test: /\.css$/,
        loader: Ex.extract({
          fallback: 'style-loader',
          use: "css-loader"
        })
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
