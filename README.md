## Synopsis

Our web app is a course guide for BC classes. It only has three majors implemented, but it would be easy to add more because of its modularity.
First, select a major from the dropdown and click submit.
Then, select the classes you have taken within that major and click submit.
Finally, a tree is displayed showing the core classes that you have not taken yet. The lines connecting the nodes of the tree represent prerequisites for that class. At the bottom of the page are the electives for that major. Hover over an elective to see a black border appear around its prerequisites. Click on any class to see its description.

## Tools

We used node, express, and socket.IO.

## Setting up the server

The app is set up to run on http://localhost:3000. To run the app, navigate into the App directory and do >npm install. Then, >node server.js will start the server.
