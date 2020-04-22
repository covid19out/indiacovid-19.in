const {MinifyHtml} = require('scully-plugin-minify-html');
const {Sitemap} = require('@gammastream/scully-plugin-sitemap');

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
  priority: ['1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8','1.0', '0.9', '0.8'],
  ignoredRoutes: ['/404']
};

exports.config = {
  projectRoot: "./src",
  projectName: "CovidStat",
  outDir: './dist/static',
  defaultPostRenderers,
  minifyHtmlOptions,
  sitemapOptions,
  routes:{},
  extraRoutes: [
    "/dashboard",
    "/worldwide",
    "/sources",
    "/helpline",
    "/awareness",
    "/about",
    "/MOHFWIndia",
    '/helpline/awareness/advisor',
    '/helpline/awareness/guidelines',
    '/helpline/awareness/additional-advisory',
    '/helpline/awareness/notifying-persons',
    '/helpline/awareness/preventive-measures',
    '/helpline/awareness/procedure-for-passenger',
    '/helpline/awareness/strategy-covid19',
    '/helpline/awareness/emergency',
    '/helpline/awareness/revised-strategy',
    '/helpline/awareness/order',
    '/helpline/awareness/infection',
    '/helpline/awareness/defeat',
    '/helpline/awareness/secretary',
    '/helpline/awareness/office-order',
    '/helpline/awareness/office-memorandum',
    '/helpline/awareness/outbreak',
    '/helpline/awareness/guideline-measures',
    '/helpline/awareness/role',
    '/helpline/awareness/telemedicine',
    '/helpline/awareness/gazette',
    '/helpline/awareness/press-information',
    '/helpline/awareness/testing',
    '/helpline/awareness/health-advisory', 
    '/helpline/awareness/disinfection',
    '/helpline/awareness/owners',
    '/helpline/awareness/mind', 
    '/helpline/awareness/ventilator',
    '/helpline/awareness/issues',
    '/helpline/awareness/opd-medicines',
    '/helpline/awareness/management', 
    '/helpline/awareness/dialysis',
  ]
};