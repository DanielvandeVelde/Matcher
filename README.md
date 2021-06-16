## Project Tech

# Matcher
https://project-tech-2021.herokuapp.com/login
![screenshot gif of app](https://cleanshot-cloud-fra.s3.eu-central-1.amazonaws.com/media/8774/O2VNl7CwZtQMg21eYtqWaT1FtR8gJQg8vrc0c7HF.gif?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaDGV1LWNlbnRyYWwtMSJIMEYCIQCGyxCmzK3XDOXdVMGUa6903SfyasFCc%2FZXLXV1PzwadQIhAI1PbVg5v3rA3pMWwx7VeVm7NP89kbuy0xBJ0cNhmpF5Kp8CCEMQABoMOTE5NTE0NDkxNjc0Igz8iMaWVVBIqm9VVCYq%2FAFSI%2Fj7ICPj28%2BWZUbLnxY0N%2BqQRjzmEabsnfoJGTOzu2LviHuzBghneEdIcZ5zfVUPeNNhRtXiNsNJhmB5hux1WakBuO4FtA7eZRiFWU9urE0QSOkZ%2BGj1YCvjlPsqhlMe2dDouQxpZmcprfiHuQT7BCJG0p0JwiRhiPr7sLNrjiqMJ11VW1zpyAIMRnA%2B7ySRKK59sMzbZE8EvbxJyDvqf7LxW8cBAecRnQsR24NvIiWa1Ugo5R42JQT3iz6oKEwEtXvu5lgHp50%2FMxdg%2BRJv29H5lZH8lIs2L0JTXjPxnGhAPqKjOFoY8SLZDhkl4upxdUJHrqpxs%2FfYLcQwmYmnhgY6mQFyiyBqVdGrUtHq1NLqXLj3Pg7%2B4tQE8krXdpsRsZ0wptog1vNj8s3%2BjzLBkg6jSA5qMzodzP766kFXyncGVbrSW1wHZQviHtb4pv0u1axVRRPmX2jPL%2F9jINiszfbQoqO5XJzJBp6dYW5vTLbmDHMrv0BSmZ8GExAvW6xIjW8GEB2MC9JDGcR1yRoD1LhxTxat3XC8PUTC%2Fi0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5MF2VVMNHOKAAN7I%2F20210616%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210616T094352Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=086b409c42db57c871319c9d16e3d29d764a581b6259b648768519f7c51a381a)


This Matcher repository is for 'MapMatcher' a "datingsite" that tries to connect people that want to go to the same destination.
It will take in your preferences and criteria and match you with people whose criteria you match.

I suggest checking out the [Wiki](https://github.com/DanielvandeVelde/Matcher/wiki) for information on the process.  

<details>
  <summary><strong>Table of Contents</strong> (click to expand)</summary>

<!-- toc -->

- [✅ To-do](#--to-do)
- [📋 Concept](#---concept)
- [⚙️ Installation](#---installation)
- [🗃 Data](#---data)
  * [🐒 Color API](#---github-api)
    + [Endpoint(s)](#endpoint-s-)
    + [Rate limiting](#rate-limiting)
  * [💽 Data cleaning](#---data-cleaning)
- [👯🏿‍ Features (+ wishlist)](#------features----wishlist-)
- [🏫 Assignment](#---assignment)
  * [Learning goals](#learning-goals)
  * [Goals](#goals)
  * [Rubric](#rubric)
- [ℹ️ Resources](#---resources)
  * [Credits](#credits)
  * [Small inspiration sources](#small-inspiration-sources)
- [🗺️ License](#----license)

<!-- tocstop -->

</details>
 
## ✅ To-do
- [ ] Remove Leaflet JS and CSS from head on unneeded pages like "/home" and "login".
- [x] Improve input accessibility registration-page (display:none instead of visibility)
- [x] Implement build-scripts (gzip, auto-prefixer, babel etc.)
- [x] CSS to SCSS (+ map)
- [ ] Proper error-handling (not only for registration-page)
- [x] PWA (+ improve accessibility, render-blocking etc)
- [ ] Working with states (empty, loading etc)
- [ ] Images (minify?) and save on server as base64
- [ ] Profile Delete feature
- [x] Issues/wiki page for all code conventions/commit strategies/branch
- [x] ESLint file for formatting & code consistency
- [x] Favicon
- [x] Update Heroku
- [x] Add research of dating sites
- [ ] Refactor code
- [x] Password hashing
- [x] Implement AJAX to check login credentials before submitting


## 📋 Concept

This Matcher repository is for 'MapMatcher' a "datingsite" that tries to connect people that want to go to the same destination.
It will take in your preferences and criteria and match you with people whose criteria you match.


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

### Build scripts
#### predev
Also included: a predev script that runs `build:css` which is specified in the gulpfile.js pipeline to build css from `./src/styles.scss` (which is sass) and place the compiled css file in `public/dist`.

#### prebuild
The dist folder will be emptied and filled with a new css file every time you call `npm run dev` by running a script `prebuild` that runs `rimraf ./public/dist` which is a prebuild:css script so this will always happen right before the css is built.

#### watcher
On top of that we've included a watch:css script which watches my src folder for any changes that are made to the css and html (hbs) files and proxies a server to port 3001 by using browsersync, every time changes are made to css this refreshes the page with the new css changes you've made.

[Heres](https://github.com/ReiniervanLimpt/project-tech-21/blob/main/gulpfile.js) a link to the gulpfile which includes the sass and watch script.


#### Environment variables
Link your own database by creating a .env with the following:

```json
PORT=3000
DB_NAME="${yourdatabasename}"
C_NAME=${yourcollection}
DB_URL=${yourdburl}
SESSION_SECRET=1

```
So, please be advised that you will need a [.env-file like the example I've provided](https://github.com/DanielvandeVelde/Matcher/blob/main/.env.example)


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


## 🗃 Data

Data in this application is coming from a mongodb server.
You can populate this yourself, taking note of what it should look like in the [User model](https://github.com/DanielvandeVelde/Matcher/blob/main/models/user.js).
Or by letting users register themselves.

<details>
  <summary>expand for assessment 1</summary>

### 🐒 API
_What external data source is featured in your project and what are its properties?_ 


Ik gebruik de ColorAPI, te vinden op https://www.thecolorapi.com/.

Hier haal ik de 'named color' op van de user, en gebruik ik de data van complementaire kleuren als matcher.


#### Properties
- Every color object returned by the API

- Is named (from a matched dataset of over 2000 names+colors) e.g. #24B1E0 == Cerulean
- Has an image URL for demonstration e.g. Cerulean image
- Is transposed into hex, rgb, cmyk, hsl, hsv and XYZ formats
- Is matched to a best-contrst color for text overlay, etc

#### Rate limiting
Niet vermeld!

  </details>
  
  
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

- [ ] Match with other users based on an extra possibility of complementary colors or something else
- [ ] Chat functionality
- [ ] Code refactoring


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

[Rubric- detailed rating of our project](https://github.com/deannabosschert/Matcher/wiki/Rubric)
![rubric](https://github.com/deannabosschert/Matcher/blob/main/src/img/rubric.png)


## ℹ️ Resources

- [Box-shadow](https://www.cssmatic.com/box-shadow)
- [MDN docs](https://developer.mozilla.org/en-US/)
- [Mongoose docs](https://mongoosejs.com/docs/api.html)
- [MongoDB docs](https://docs.mongodb.com/v4.0/reference/operator/query/)
- [Pompebled (background SVG used)](https://en.wikipedia.org/wiki/Seeblatt#/media/File:Pompebled.svg)
- [SO question from 2008 for distance measurement](https://stackoverflow.com/a/21623206)
- [Leaflet (open-source JavaScript library for mobile-friendly interactive maps)](https://leafletjs.com/)
- [Leaflet color markers](https://github.com/pointhi/leaflet-color-markers)
- [Pinetools Darken color](https://pinetools.com/darken-color)
- [browsersync](https://www.npmjs.com/package/browser-sync)
- [gulp](https://www.npmjs.com/package/gulp)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [handlebars templating](https://www.npmjs.com/package/express-handlebars)

## 🗺️ License

Authors: 
- [Daniel van de Velde](https://github.com/deannabosschert)
- [Reinier van Limpt](https://github.com/deannabosschert)
- [Deanna Bosschert](https://github.com/deannabosschert)



License by
[MIT](https://github.com/deannabosschert/project/blob/master/LICENSE)
