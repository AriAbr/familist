# familist

Familist is a real-time updating app for creating collaborative to-do lists and sharing them with groups.

This Node-based app is deployed to heroku and is publicly available here: http://familist.herokuapp.com/

User authentication is managed by Passport.js

Real-time updates are powered by Socket.io

While the current version of the app does not include the ability to create groups or multiple lists, had I been given more time I would have added in this functionality. On the backend, I would have created an additional Group and List model. Items would have a one-to-many relationship with lists. Users and Lists would both have a one-to-many relationships with Groups. On the frontend, when a user signs in they would see a list of groups they belong to and then would be able to click on a group and then choose a list in that group to view the items. This functionality would also require the user of the 'rooms' feature in socket.io to ensure that any live updates are sent to the correct list.

Another improvement to the app that I would make would be to incorporate React.js into it. While the current version of the app does not have such a large number of interactive frontend features, React would provide a good framework for further develpoment of the frontend.
