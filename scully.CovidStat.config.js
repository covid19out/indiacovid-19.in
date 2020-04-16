const {RouteTypes} = require('@scullyio/scully');
const {MinifyHtml} = require('scully-plugin-minify-html');
const {Sitemap} = require('@gammastream/scully-plugin-sitemap');
 
//const postRenderers = [MinifyHtml];
const defaultPostRenderers = [Sitemap,MinifyHtml];
 
const minifyHtmlOptions = {
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
  collapseWhitespace: true,
  useShortDoctype: true
};

const sitemapOptions = {
  urlPrefix: 'https://indiacovid-19.in',
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'always',
  priority: ['1.0', '0.9', '0.8'],
  ignoredRoutes: ['/404']
};


exports.config = {
  projectRoot: "./src",
  //defaultPostRenderers: postRenderers,  // for all routes
  projectName: "CovidStat",
  outDir: './dist/static',
  defaultPostRenderers,
  minifyHtmlOptions,
  sitemapOptions, 
  routes: {
    //postRenderers: postRenderers,
    //minifyHtmlOptions
  }
};