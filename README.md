# ConvertMe app
Server-side application for ConvertMe app. Developed by using [NodeJS](https://nodejs.org/) + [ExpressJs](https://expressjs.com).

# How to run project:
To build the project follow simple steps:
  1. Make sure that [NodeJS](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) installed.
  2. Install required packages ```npm install express``` ```npm install express-fileupload``` ```npm install zip-local```
  3. Install [Python](https://www.python.org) and [PyPandoc](https://pypi.org/project/pypandoc/)
  4. Run server ```node index```

 # Deployment
  1. Edit code of inside index.js files
```js
 cons = PORT;
``` 

  2. Edit code action of client-side app inside to your new URL + /upload or /download depends in which .vue file you changing URL.
```html
<form
      class="choose_form_container"
      ref="uploadForm"
      id="uploadForm"
      action="http://192.168.0.202:8000/upload"
      method="post"
      encType="multipart/form-data"
>
```

 
