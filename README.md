## Project Tech

# Matcher
https://project-tech-2021.herokuapp.com/login
![screenshot gif of app](https://github.com/deannabosschert/Matcher/blob/main/public/assets/img/screencapture_website.gif)



<details>
  <summary><strong>Table of Contents</strong> (click to expand)</summary>

<!-- toc -->

- [✅ To-do](#--to-do)
- [📋 Concept](#---concept)
- [⚙️ Installation](#---installation)
- [🧑🏼‍ Actor Diagram](#------actor-diagram)
- [↔️ Interaction diagram](#---interaction-diagram)
- [🌍 Design patterns](#---design-patterns)
- [👍🏽 Best practices](#-----best-practices)
- [🗃 Data](#---data)
  * [🐒 Color API](#---github-api)
    + [Endpoint(s)](#endpoint-s-)
    + [Rate limiting](#rate-limiting)
  * [💽 Data cleaning](#---data-cleaning)
- [👯🏿‍ Features (+ wishlist)](#------features----wishlist-)
- [🏫 Assignment](#---assignment)
  * [Learning goals](#learning-goals)
  * [Week 1 - Hello API 🐒](#week-1---hello-api---)
  * [Week 2 - Design and Refactor 🛠](#week-2---design-and-refactor---)
  * [Week 3 - Wrapping up 🎁](#week-3---wrapping-up---)
  * [Rubric](#rubric)
- [ℹ️ Resources](#---resources)
  * [Credits](#credits)
  * [Small inspiration sources](#small-inspiration-sources)
- [🗺️ License](#----license)

<!-- tocstop -->

</details>

## ✅ To-do
- [x] Add password hashing
- [ ] Add matching feature

## 📋 Concept
_What does your app do, what is the goal? (passing butter)_ 


## ⚙️ Installation
Clone this repository to your own device:
```bash
$ git clone https://github.com/deannabosschert/Matcher.git
```
Then, navigate to this folder and run:

```bash
npm install
```

Last,

```bash
npm run dev
```

#### Environment variables
Link your own database by creating a .env with the following:

```json
PORT=3000
DB_NAME="${yourdatabasename}"
C_NAME=${yourcollection}
DB_URL=${yourdburl}
SESSION_SECRET=1

```

#### Dependencies

<details>
  <summary>Dependencies (click to expand)</summary>
```json
 "devDependencies": {
    "cross-env": "^7.0.2",
    "node-sass": "^4.14.1",
    "node-sass-glob-importer": "^5.3.2",
    "nodemon": "^2.0.2",
    "npm-run-all": "^4.1.5"
  },
  "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "connect-mongodb-session": "^2.4.1",
    "dotenv": "^8.2.0",
    "ejs": "^3.0.1",
    "express": "^4.17.1",
    "express-liquid": "^0.2.6",
    "express-session": "^1.17.1",
    "fs": "^0.0.1-security",
    "gyp": "^0.5.0",
    "heroku": "^7.2.0",
    "liquidjs": "^9.25.0",
    "mongodb": "^3.6.6",
    "mongoose": "^5.9.10",
    "multer": "^1.4.2",
    "node-fetch": "^2.6.0",
    "node-gyp": "^3.8.0",
    "rebuild": "^0.1.2"
  }
```
</details>

## 📋 Concept
Users kunnen een account aanmaken, hiermee inloggen en op basis van hun favoriete kleur gematched worden met andere users.


## 🗃 Data

### 🐒 API
_What external data source is featured in your project and what are its properties?_ 

Ik gebruik de ColorAPI, te vinden op https://www.thecolorapi.com/.

Hier haal ik de 'named color' op van de user, en gebruik ik de data van complementaire kleuren als matcher.


#### Properties
Every color object returned by the API

Is named (from a matched dataset of over 2000 names+colors)
e.g. #24B1E0 == Cerulean
Has an image URL for demonstration
e.g. Cerulean image
Is transposed into hex, rgb, cmyk, hsl, hsv and XYZ formats
Is matched to a best-contrst color for text overlay, etc

#### Rate limiting
Niet vermeld!

### 💽 Data cleaning
_What has been done with the fetched data?_What has been done with the initial data? Cleaning pattern?

De wachtwoorden van de user worden gehashed alvorens in de database gestored

```js
    const user = {
              username: req.body.userSignup,
              email: req.body.emailSignup.toLowerCase(),
              hash: req.body.passwordSignup,
              description: '',
              age: '',
              location: '',
              avatar: ''
            }
```

outcome:
```json
    const user = {
              username: req.body.userSignup,
              email: req.body.emailSignup.toLowerCase(),
              hash: hash,
              description: '',
              age: '',
              location: '',
              avatar: ''
            }
```

## 👯🏿‍ Features (+ wishlist)
_What would you like to add (feature wishlist / backlog)?_ 

- [x] Register user
- [x] Login user
- [x] Logout user
- [x] Render profile
- [x] Remove profile
- [x] Hash passwords
- [ ] Fetch ColorAPI-data
- [ ] Match with other users based on complementary colors


## 🏫 Assignment
<details>
  <summary></strong> (click to expand)</summary>
We’ll focus on what it means to be a web developer, the current landscape of that space, and topics such as privacy, security, diversity, inclusion, accessibility, communication and team work.


### Learning goals

- You can design and develop a dynamic matching web application
- You can use version control using Git and GitHub
- You can navigate the terminal and set-up your own development environment
- You can write documentation that other developers understand
- You can explain your code and the cohesion of your application
- You can recognise good quality code, collaborate and review other people's code

### Goals 🐒
- Version control with Git (week 1)
- Write docs in markdown (week 1)
- Navigate the command line (week 2)
- Code quality and linting (week 3)
- Review code and understand code quality (week 4)
- Collaborate on GitHub with other developers (week 5)
- Learn about production environments and deployment (week 6)
- Learn about privacy and security issues (week 7+)

</details>

### Rubric

[Rubric- detailed rating of my project](https://github.com/deannabosschert/Matcher/wiki/Rubric)
![rubric](https://github.com/deannabosschert/Matcher/blob/main/src/img/rubric.png)

## ℹ️ Resources

### Credits
- Our superamazingteachers at @CMD

## 🗺️ License

Authors: 
- <!-- [Daniel van de Velde](https://github.com/deannabosschert) -->
- <!-- [Reinier van Limpt](https://github.com/deannabosschert) -->
- [Deanna Bosschert](https://github.com/deannabosschert)


License by
[MIT](https://github.com/deannabosschert/project/blob/master/LICENSE)

