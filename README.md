See https://johnbyrnerepo.github.io/90poe-test/dist/index.html for a working version.

<p align="center">
  <img src="images/Screenshot.png" width="600" title="Menu">
</p>

This is the readme for the React assignment for 90 percent of everything.

The tech stack consists of React, Redux, Webpack, Babel, Jest and Enzyme.

The main component App.js features a filter panel with name and office, which are saved in localstorage and re-read on page refresh.

There are three columns for applied, interviewing and hired, with the ability to move a crew personnel member from one column to another.

Install with `npm install` and run with `npm start`.

Rudimentary tests are written in Jest/Enzyme and may be run with `npm test`.

Crew personnel data is fetched on page load with Redux saga and Axios. In future, hiring status would be propagated to the server side using a post saga.

Css is currently implemented in the index.html file, in future this would be refactored to React css modules.