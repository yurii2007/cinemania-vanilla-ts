const urlPageTitle = 'JS Single Page Application Router';

document.querySelectorAll<HTMLAnchorElement>('nav a').forEach((link) =>
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLAnchorElement;

    window.history.pushState({}, '', target.href);
    urlLocationHandler();
  })
);

const urlRoutes: Record<
  string,
  { template: string; title: string; description: string }
> = {
  404: {
    template: '/src/pages/404.html',
    title: '404 | ' + urlPageTitle,
    description: 'Page not found',
  },
  '/': {
    template: '/src/pages/main.html',
    title: 'Home | ' + urlPageTitle,
    description: 'This is the home page',
  },
  '/home': {
    template: '/src/pages/home.html',
    title: 'About Us | ' + urlPageTitle,
    description: 'This is the about page',
  },
  '/hello-world': {
    template: '/src/pages/hello-world.html',
    title: 'Contact Us | ' + urlPageTitle,
    description: 'This is the contact page',
  },
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

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;

// call the urlLocationHandler function to handle the initial url
urlLocationHandler();
