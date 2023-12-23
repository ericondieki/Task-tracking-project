<h1>Task tracking Project</h1>
<p>This is an work in progress independantly developed project that aims to provide a simple user interface and exprerience when engaging in project management. It is 
full stack endevour with a front end created using HTML, CSS and VanillaJS, and RESTfull API coded using express.js anda database developed with MySQL.</p>

<h2>Goals of this Project</h2>
<ul>
  <li>•	Allow mangers the convenience of organizing teams within the company or institution and disseminating tasks to either teams or individuals that span a wide geographical area.</li>
  <li>•	Give workers a platform on which they can reliably track the tasks and teams assigned to them by managers.</li>
  <li>•	Integration of auxiliary software to aid in tracking tasks, the main one for this system being the Google maps API for the locations of work sites and workers operating on them</li>
  <li>•	Allow the establishment of dependencies for both tasks (Where the undertaking of certain tasks cannot happen without the confirmed completion of its prerequisites) and teams (Where teams can be established and divided further into sub-groups if a situation calls for it)</li>
  <li>•	Allow on this platform, complex but easy to understand interactivity. For managers that might mean ease in assigning tasks, organizing teams and settings objectives for each at the beginning of a work day, week month or even year.</li>
  <li>•	Provide a more affordable way for people to engage with these kinds of services that what is currently on offer.</li>
</ul>
<p>The achievment of the stated goals is made possible by a complex amalgamtion of languages and frameworks working in tandem to bring their vision to life</p>

<h2>Front End</h2>
<p>The front end of this project is as previously mentioned, made up of HTMl, CSS and VanillaJS. It aims to provide a simple to understand UI and by extension a seamless user experience. It currently houses a total of six main pages not including the login and sign up pages: Dashboard, Projects, Teams, Tasks, Members and Guide These pages all share the same fundamental design template differing only in functionality which is what forms the core of the seamless flow of the system.</p>
<p>The Dashboard is a bit of a black sheep the front end's grand design. While all the other available pages use very similar script to manage their behaviour the dashboard is almost fully reliant on the Google Maps API and is built around this reliance. It is the main hub of the interface and its main purpose is to display intuitively, all of the information that is created by a project admin on four of the fives other pages. I'm sure you can guess which. The other pages are meant to establish what information is being displayed on the dashboard. Said information is respective to the name of the page. The tasks page which also uses the Google maps API as a minor part of its functionality is where the location of a task that is presented as a marker on the dashboard is established.</p>
<p>Still in the works is the transformation of this site to a progressive web application. A functioning manifest.json file was added to the project as well as a service worker for the purpose of caching certain assets to both improve the perfomrance of the site and allow for its existence as a PWA.</p>
