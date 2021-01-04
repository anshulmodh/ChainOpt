const awsconfig = {
  "Auth": {
    "region": "us-east-1",
    "userPoolId": "us-east-1_TbfJ5AZWJ",
    "userPoolWebClientId": "153nh5kdekmb7e8vn9330ii7c9",
    "mandatorySignIn": false,
    // "cookieStorage": {
    //   "domain": "localhost",
    //   "path": "/",
    //   "expires": 365,
    //   "secure": true
    // },
    "redirectSignIn": "http://localhost:3000/c/",
    "redirectSignOut": "http://localhost:3000/"
  },
  "API": {
    "endpoints": [
      {
        "name": "User Area",
        "endpoint": "http://localhost:3000/c"
      }
    ]
  }
}

  export default awsconfig;