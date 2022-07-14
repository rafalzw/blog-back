# JS-blog

## JS-blog - back v0.1.0
Live demo [_here_](https://js-blog.networkmanager.pl/).

Link to frontend repository [_here_](https://github.com/rafalzw/blog-front).

## Project Status
Project is: in progress.

## General Information
- The idea of the project is to repeat and consolidate the knowledge acquired in the one-year MegaK course
- The project will be a place to grow to implement other technologies for example JWT (Json Web Token) and Passport.js


## Techniques Used
- NestJS 
- TypeScript
- Bcrypt - A library to help you hash passwords
- TypeORM - For integrating with SQL
- ValidationPipe - To automatically validate incoming requests
- Multer - To handle filing uploading


## Features
The project is a back-end api for a blog platform that uses features:
- REGISTER - create new user
- LOGIN - user login with verification of the hashed password with the password stored in the database 
- UPDATE USER SETTINGS - CRUD for user profile details
- UPLOAD FILE - user can upload profile image and post image
- CREATE NEW POST - user can create new posts
- EDIT AND DELETE POST - user can edit and delete their posts
- GET ALL POSTS - display all posts from the database
- GET ONE POST - display a single post
- GET ONE USER POSTS - display all posts of one user


## Setup
Rename the file config/config.example.ts to conig/config.ts and enter the correct data to connect to your database.


## TODO
- User authentication using JSON Web Tokens
- Create a new entity for tags
- Create a new entity for comments
- Add reactions column for Post Entity
