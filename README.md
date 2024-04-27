# Second-Hand-SHOP

## Project Overview

Project entails developing a user-friendly website for a second-hand shop, featuring registration, login, ad posting, search functionalities, as well as options for editing and deleting ads. The site aims to provide a seamless platform for buying and selling used goods, catering to a wide range of users in need of such services.

## Features

- **Authentication:**
  - For authentication, Json Web Tokens (JWT) are used.
  - JWT is saved in local storage and sent on request where necessary.

- **Users:**
  - Sign up
  - Log in
  - Log Out
  - Search Products
  - Post Own Products
  - Edit Own Products
  - Delete Own Products
  
## Technologies Used

- React.js
- JavaScript
- Node.js
- Express.js
- MongoDB
- CSS3

## Environment Variables (Server Folder)

- `DATABASE`: MongoDB connection string  
- `PORT`: Port (e.g., 4000)

## Environment Variables (Client Folder(config.json))

## Start Scripts

- **Server:**
  - `nodemon server`
- **Client:**
  - `npm start`
