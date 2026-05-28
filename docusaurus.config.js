import {themes as prismThemes} from 'prism-react-renderer';

  const config = {
    title: 'DIKË Docs',
    tagline: 'Documentación del proyecto DIKË',
    favicon: 'img/favicon.ico',
    url: 'https://docusaurus-dike.vercel.app/',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    i18n: {
      defaultLocale: 'es',
      locales: ['es'],
    },
    presets: [
      [
        'classic',
        {
          docs: {
            sidebarPath: './sidebars.js',
            routeBasePath: '/',
          },
          blog: false,
          theme: {
            customCss: './src/css/custom.css',
          },
        },
      ],
    ],
    themeConfig: {
      navbar: {
        title: 'DIKË',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentación',
          },
          {
            href: 'https://github.com/Miguelean1/Dike-backend',
            label: 'Backend',
            position: 'right',
          },
          {
            href: 'https://github.com/Miguelean1/Dike-frontend',
            label: 'Frontend',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} DIKË. Documentación generada`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    },
  };
      
  export default config;