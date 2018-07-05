
React Flickr Photo Feed
=====
[View project in Github Pages](https://jonhx.github.io/flickr-app/)
## Overview
A super simple fully responsive single page react 16 app.

App features include:
- Free search
- Infinite Scrolling
- Sort by 6 different filters
- Search by tag

The app uses the public [Flickr API](https://www.flickr.com/services/api/). It utilises the [flickr.photos.search](https://www.flickr.com/services/api/flickr.photos.search.html) endpoint, taking advantage of the pagination and sorting queries.

## Building
Instructions to install and start:

1. `git clone <repo>`
2. `cd flickr-app`
3. `npm i`
4. `npm run start` || `npm run start:prod` dev/production builds

You can manually build using `npm run build` or for production settings `npm run build:prod`.

## Built with
The app isn't purely built with love, I used these libaries too:

- [React 16](#)
- [Webpack 4](#)
- [Webpack-dev-server](#)
- [babel](#)
- [LESS](#)
- [Grunt](#)
- [eslint](#)
- [Bootstrap](#)
