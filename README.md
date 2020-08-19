:herb: ![notiing-blogging](blog-frontend/src/assets/images/brand.svg) :herb:
# noting-blogging v1.0
Full-stack blog application built with Angular and SpringBoot

## Prerequisites
- Java 11
- Angular 9.1.9
- Maven
- MySQL Database

## To run the application
This project has a separate frontend and backend.

#### Backend
Import `blog-backend-java` as a maven application to your IDE.

You can create a MySQL database with the command below and to change the credentials in `blog-backend-java/src/main/resources/application.properties`. 
```
create database notingblogging
```
#### Frontend
After importing the `blog-frontend` folder to your IDE, install all the dependencies and run the application:
```
npm install
ng serve --open
```
## Features
### Database Schema
![Database schema](https://user-images.githubusercontent.com/64576115/90620282-d35d9300-e244-11ea-997b-f3eb4d0155fd.png)

### Version 1.0
- [x] Login and signup with JWT
- [x] Write new post
- [x] Edit post
- [x] Delete post
- [x] View posts by all users
- [x] View posts by one particular user
- [x] Mobile reponsive
- [x] Multilingual support (EN and ZH)

### Version 2.0
- [ ] Cover photo for posts
- [ ] Loading animations
- [ ] Categorization / Tags
- [ ] Password reset
