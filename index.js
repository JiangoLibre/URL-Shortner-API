const express = require('express');
const fetch = require("node-fetch");
const app = express();

app.get('/', async (req, res) => {

  if(req._parsedUrl.query){

    // pega o Parâmetro da URL
    var url = req._parsedUrl.query;

    if(url.indexOf('=') > -1){ // verifica se existe um parâmetro
      // trabalha para extrair apenas o parâmetro da URL inteira
      var parametro = url.split('=')[1]
      parametro = parametro.split('&')[0]

      // pega a URL curta
      const fetch1 = await fetch(`https://tinyurl.com/api-create.php?url=${parametro}`)
        .then((response) => response.text())
        .then((responseJSON) => {
          return responseJSON;
      });

      // mostra um JSON com a URL curta
      res.json({url: fetch1})
    }

  } else { // alerta que não foram passados parâmetros
    res.json({error: 'Nenhuma URL passada como parâmetro'})
  }
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App Listening In Port' + port);
});