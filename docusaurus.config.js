// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MO Data',
  tagline: 'YABBA DABBA DOO',
  url: 'https://github.com',
  baseUrl: '/docsite/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'modataconsulting', // Usually your GitHub org/user name.
  projectName: 'docsite', // Usually your repo name.
  deploymentBranch: 'gh-pages', // Branch that GitHub pages will deploy from.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'MO Data Consulting Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
          // href: 'https://modataconsulting.com',
          target: '_self',
        },
        items: [
          {
            type: 'doc',
            docId: 'projects',
            position: 'left',
            label: 'Projects',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/modataconsulting/',
            label: 'GitHub',
            position: 'right',
          },
          // {
          //   type: 'search',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Projects',
            items: [
              {
                label: 'dbt GA4',
                to: '/docs/category/dbt-ga4',
              },
            ],
          },
          {
            title: 'Blog',
            items: [
              {
                label: 'dbt GA4',
                to: '/blog/dbt-ga4',
              },
            ],
          },
          {
            title: 'Get In Touch',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/modataconsulting/',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/joshuajordandesign/',
              },
            ],
          },
        ],
        logo: {
          alt: 'MO Data Consulting Logo',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
          // href: 'https://modataconsulting.com',
          // href: '/',
          target: '_self',
          width: 300,
        },
        copyright: `Copyright © ${new Date().getFullYear()} MO Data Consulting, LLC. All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    }),
};

module.exports = config;
