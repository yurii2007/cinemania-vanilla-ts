import { urlRoutes } from '../constants/router';

// todo - update all the links behavior, not only navigation
const initDynamicLinks = () => {
  document.querySelectorAll<HTMLAnchorElement>('nav a').forEach((link) =>
    link.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLAnchorElement;

      if (target.getAttribute('target') === '_blank') return;

      e.preventDefault();

      window.history.pushState({}, '', target.href);
      urlLocationHandler();
    })
  );
};

// create a function that handles the url location
const urlLocationHandler = async () => {
  let location = window.location.pathname; // get the url path
  // if the path length is 0, set it to primary page route
  if (location.length == 0) {
    location = '/';
  }
  // get the route object from the urlRoutes object
  const route = urlRoutes[location] || urlRoutes['404'];
  // get the html from the template
  const html = await fetch(route.template).then((response) => response.text());
  // set the content of the content div to the html
  const contentContainer = document.getElementById('content');
  if (!contentContainer) return;
  contentContainer.innerHTML = html;
  // set the title of the document to the title of the route
  document.title = route.title;
  // set the description of the document to the description of the route
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) return;
  metaDescription.setAttribute('content', route.description);
};

const initRouter = () => {
  // update nav links to behave as an SPA
  initDynamicLinks();
  // add an event listener to the window that watches for url changes
  window.onpopstate = urlLocationHandler;
  // call the urlLocationHandler function to handle the initial url
  urlLocationHandler();
};

export default initRouter;
