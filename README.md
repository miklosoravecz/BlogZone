# BlogZone
This is a MERN-stack social media app, a reference work

## To run the app:
- Copy the repo.
- In client root folder create a .env file and write init: *REACT_APP_API=http://localhost:8000/api*.
- If you want to use email confirmation then register to https://sendgrid.com/
- In backend folder create a .env file and add the following lines:
> - NODE_ENV=development
>- PORT=8000
>- CLIENT_URL=http://localhost:3000
>- DATABASE=YOUR MONGO DB CONNECTION LINK
>- SENDGRID_API_KEY=YOUR SENDGRID CONNECTION LINK
>- JWT_SECRET=YOUR SECRET KEY (can be anything)
>- JWT_ACCOUNT_ACTIVATION=YOUR OTHER SECRET KEY (can be anything)
>- EMAIL_TO=noreply@mernauth.com 
>- EMAIL_FROM=your registered email to sendgrid
>- JWT_RESET_PASSWORD=YOUR AOTHER SECRET KEY
- In server folder run in command line **npm install** and after **nodemon server.js**
- In client folder type to command line: **npm install** and after **npm start**

##Until this point the project contains:
- User CRUD (create, login, edit and delete users)
- Email confirmation/ activation (SendGrid)
- Upload profile pictures
- Users can check other users profile
- Bootstrap

##What next:
- Working on the posts server side APIs
- Creating the post services in client side






