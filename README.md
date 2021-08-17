# User Hobbies App

A user hobbies api

**Author:** Fisayo Agboola

**Environments**

Node version - v14.15.0

**This application uses the following technologies:**

- nodeJs
- typescript
- expressJs
- typedi
- routing-controllers
- jest
- supertest

note: `run all commands in the applications root directory`

## To run the app via docker

```
docker-compose up
```

#

## To run the app manually

**Install all dependencies**

```
npm install
```

**Database**

```
- get a mongodb uri
- create a .env file on the project's root directory
- set the connection uri as MONGODB_URI in the .env file (i.e MONGODB_URI=<connection uri>)
```

**Start the application**

```
- source .env
- npm start
```

#

## To test the application

```
npm run test
```

#

## Documentation

- ### The Swagger documentation can be found at http://localhost:3000/docs
- ### Get postman collection link [here](https://www.getpostman.com/collections/26dd19c183417db4fdf4)

#

## The Design Principles used are:

- Single Responsibility Principle
- Dependency Inversion Principle
- DRY Principle
- KISS Principle
- YAGNI Principle

### Single Responsibility Principle:

```
I utilized this principle since it makes my code simpler to actualize and forestalls unforeseen side-effects of future changes (when I roll out an improvement in one class or capacity it will be reflected on all the various classes or capacities that relies upon it).
```

### Dependency Inversion Principle:

```
I utilized this principle since I need my 'top-level' objects to be entirely stable and not delicate for change.
```

### DRY Principle:

```
I utilized this principle to make my code more composed and simpler to keep up. And furthermore spare my time at whatever point I need to change something later on.
```

### KISS Principle:

```
I utilized this principle to make it simpler for other software engineers to envision the different parts of the applications, intellectually planning the potential impacts of any change.
```

### YAGNI Principle:

```
I utilized this principle since it abstains from investing energy on features that may not be used and helps me avoid feature creep.
```
