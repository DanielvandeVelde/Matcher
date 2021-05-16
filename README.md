# Matcher

<kbd>![Site image](https://raw.githubusercontent.com/DanielvandeVelde/Matcher/master/docs/hero.png "Site image")</kbd>

A live version of this application is running [here](https://be-matcher.herokuapp.com/)  
I suggest checking out the [Wiki](https://github.com/DanielvandeVelde/Matcher/wiki) for information on the process.  

## ✅ To-do
- [x] Update readme
- [x] Update wiki further
- [x] Add another feature
- [ ] Build scripts
- [ ] Improve error-handling
- [ ] PWA (+ improve accessibility, render-blocking, etc)
- [ ] Add proper states

## 📋 Concept
This Matcher repository is for 'MapMatcher' a _"datingsite"_ that tries to connect people that want to go to the same destination.  
It will take in your preferences and criteria and match you with people whose criteria you match.  

## ⚙️ Installation
Clone this repository to your own device:
```bash
$ git clone https://github.com/DanielvandeVelde/Matcher.git
```
Then, navigate to this folder and run:

```bash
npm install
```

To start:

```bash
npm start
```

But please be advised that you will need a [.env-file like the example I've provided](https://github.com/DanielvandeVelde/Matcher/blob/main/.env.example)

## 🗃 Data

Data in this application is coming from a mongodb server.  
You can populate this yourself, taking note of what it should look like in the [User model](https://github.com/DanielvandeVelde/Matcher/blob/main/models/user.js).   
Or by letting users register themselves.  

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

## 🗺️ License

Author: 
- [Daniel van de Velde](https://github.com/DanielvandeVelde) 


License by
[MIT](https://github.com/deannabosschert/project/blob/master/LICENSE)

