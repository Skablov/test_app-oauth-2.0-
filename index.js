var express = require('express');
var request = require('request');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());

app.get('/', (req, res) =>
{
  if(!req.cookies.access_token)
  {
    res.sendFile(__dirname + '/index.html');
  }
  else
  {
    res.sendFile(__dirname + '/main.html');
  }
});

app.get('/main', (req, res) =>
{
  console.log(req.query.code);
  if(req.query.code != undefined)
  {
    request({
      method: 'GET',
      url: 'https://oauth.vk.com/access_token',
      qs: {
        client_id: 6946989,
        client_secret: 'dTrBl0tEZMx3gqmiiBf7',
        redirect_uri: 'http://127.0.0.1:3000/main',
        code: req.query.code
      }
    }, (error, response, body) =>
  {
    if(!error && response.statusCode == 200)
    {
      body = JSON.parse(body);
      res.cookie("access_token", `${body.access_token}`);
      res.cookie("id", `${body.user_id}`);
      return res.redirect('/');
    }
    else
    {
      console.error(body);
    }
  })

  }
  else
  {
    res.sendFile(__dirname + '/error.html');
  }
})

app.listen(3000, () =>
{
  console.log("Server start on port - 3000");
});
