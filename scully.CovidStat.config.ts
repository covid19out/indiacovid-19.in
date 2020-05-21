import { ScullyConfig, setPluginConfig  } from '@scullyio/scully';
import {RouteTypes} from '@scullyio/scully';
import {MinifyHtml} from 'scully-plugin-minify-html';
import { Options } from 'html-minifier';
import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';
const postRenderers = [MinifyHtml];
const SitemapPlugin = getSitemapPlugin();

setPluginConfig(SitemapPlugin, {
    urlPrefix: 'https://indiacovid-19.in',
    sitemapFilename: 'sitemap.xml',
    changeFreq: 'always',
    priority: ['1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8', '1.0', '0.9', '0.8'],
    ignoredRoutes: ['/404']
});

// const defaultMinifyOptions: Options = {
//   caseSensitive: true,
//   removeComments: true,
//   collapseWhitespace: true,
//   collapseBooleanAttributes: true,
//   removeRedundantAttributes: true,
//   useShortDoctype: true,
//   removeEmptyAttributes: true,
//   minifyCSS: true,
//   minifyJS: true,
//   removeScriptTypeAttributes: true,
//   removeStyleLinkTypeAttributes: true,
//   // don't remove attribute quotes, not all social media platforms can parse this over-optimization
//   removeAttributeQuotes: false,
//   // don't remove optional tags, like the head, not all social media platforms can parse this over-optimization
//   removeOptionalTags: false,
//   // scully specific HTML comments
//   // this will always be added in the final minifyOptions config
//   ignoreCustomComments: [
//     /scullyContent-(begin|end)/
//   ],
//   // scully specific data injection
//   // this will always be added in the final minifyOptions config
//   ignoreCustomFragments: [
//     /\/\*\* ___SCULLY_STATE_(START|END)___ \*\//
//   ]
// };

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'CovidStat',
  outDir: './dist/static',
  defaultPostRenderers: postRenderers,
  routes: {
    // defaultMinifyOptions
  },
  extraRoutes: [
      '/dashboard',
      '/worldwide',
      '/sources',
      '/helpline',
      '/awareness',
      '/about',
      '/MOHFWIndia',
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
