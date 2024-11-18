const DEFAULT_PAGE_TITLE = 'Cinemania | SPA in vanilla ts';

export const urlRoutes: Record<
  string,
  { template: string; title: string; description: string }
> = {
  404: {
    template: '/src/pages/404.html',
    title: '404 | ' + DEFAULT_PAGE_TITLE,
    description: 'Page not found',
  },
  '/': {
    template: '/src/pages/home.html',
    title: DEFAULT_PAGE_TITLE,
    description: 'This is the home page',
  },
  '/catalog': {
    template: '/src/pages/catalog.html',
    title: 'Catalog',
    description: 'This is the catalog page',
  },
  '/library': {
    template: '/src/pages/library.html',
    title: 'Library',
    description: 'This is the library page',
  },
};
