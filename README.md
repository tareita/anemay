# Anemay
Anemay is a fully-featured social media web application, built with the MERN stack.  

Deployed at: https://anemay.herokuapp.com/


## Features
- Create, read, update and delete posts
- Like and unlike posts
- Create, reply to, read, update and delete comments
- Markdown for posts and comments
- Sign up and login using JWT for authentication
- View profiles of users and browse through their posts, liked posts and comments
- Update bio which can be viewed by other users
- Fully responsive layout

## Installation and usage
1) Clone this repository  
```
git clone https://github.com/tareita/anemay.git
```
2) Install dependencies  
```
cd anemay  
npm install
cd client
npm install
```
3) Create .env in root directory
```
cd ..
touch .env
```
4) Configure environment variables in your new .env file. To acquire your MONGO_URI, create a cluster for free over at https://www.mongodb.com/. The TOKEN_KEY is a secret key of your choosing, you can generate one at this site: https://randomkeygen.com/.
```
MONGO_URI=<YOUR_MONGO_URI> 
TOKEN_KEY=<YOUR_TOKEN_KEY>
PORT=4000
```
5) Run the server
```
npm run server
```
6) Start a new terminal and run react's development server
```
cd anemay
cd client
npm start
```
## Screenshots
