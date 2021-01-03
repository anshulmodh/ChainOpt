const configuration = {
    client_id: '153nh5kdekmb7e8vn9330ii7c9',
    redirect_uri: 'http://localhost:3000/c/',
    response_type: 'code',
    post_logout_redirect_uri: 'http://localhost:3000/',
    scope: 'openid profile email',
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_TbfJ5AZWJ',
    silent_redirect_uri: 'http://localhost:3000/authentication/silent_callback',
    automaticSilentRenew: true,
    loadUserInfo: true,
  };
  
  export default configuration;