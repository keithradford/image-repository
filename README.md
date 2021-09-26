# myPics

myPics is an online image repository built for the Shopify Backend Developer Intern Challenge (Winter 2022). The application lets users browse photos on topics they may be interested in as well as search, store, and even share photos on Twitter. It is a React web-app built using TypeScript currently being hosted on Heroku at https://immense-anchorage-96448.herokuapp.com/. 

## How it works

As mentioned, myPics is a web-app built with React using TypeScript. The application stores data in the user's browser's local storage to ensure their stored images persist between sessions. In the future, I would like to port this to an API to allow for data persisting between devices. Currently the stored data is set up in a way that porting to an API and database should be smooth. The following is a brief list of what myPics offers:

* Upon entering [the site](https://immense-anchorage-96448.herokuapp.com/) for the first time, users are prompted to enter their topics of interest. 
  * Can select up to 10.
  * After moving on to the main site the topics selected will be displayed with up to 50 related images. 
* Users can select images to add them to their vault or share on Twitter by simply clicking an image.  
* Users can choose to browse images, where they can search whatever they'd like. 
* Users can then go to their vault where all saved images will appear.

### Unsplash API
[Unsplash API](https://unsplash.com/developers) is used throughout this project as the sole source of images displayed on the site. Unsplash provides a vast set of images, making it the perfect API to use for this image repository. Requests are made based on topics (tags) that users set when first visiting the site as well as when users search for images.

### Chakra UI

myPics uses the component library [Chakra UI](https://chakra-ui.com/) as it's main source of components, styling, and formatting. You will notice throughout the codebase there is no use of raw HTML elements such as `<div>`, `<li>`, etc. as Chakra provides us with clean alternatives that help keep the code consistent and the website looking good.
  
## Run the app

To run the app locally, follow these steps:

  1. Clone the repository `git clone https://github.com/keithradford/image-repository.git`
  2. Navigate to the newly cloned repo and install dependencies `npm ci`
  3. Run the app `npm start` (defaults to [localhost:3000](http://localhost:3000/))

## Test the app
myPics has extensive unit tests built with [react-testing-libray](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/). Tests can be run with:
```bash
npm run test
```
