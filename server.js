const http = require("http");
//require = recurso  de node.js que nos permite cargar módulos externos
const express = require("express");
// caixa de ferramentas que tem recurso para facilitar de um servidor http(precisa ser puxado com comando no terminal "npm intall express")
const app = express();

const servidorHTTP = http.createServer(app);
//cria um servidor HTTP
const io = require("socket.io")(servidorHTTP);
//socket é uma funcionalidade esxterna, para ser intalada usamos o terminal 
// para puxarmos essa exxtenção usamos npm: "npm install socket.io"

app.use(express.static("public"));
//static= arquivos estaticos
//esse trecho do codigo faz com que o navegador pegue os dados dentro da pasta "public"

io.addListener("connection", (socket) => {
  //define oq uma função ira fazer  quando a conexão for realizada
  console.log("um usuário acabou de conectar");
  socket.addListener("nova mensagem", (msg) => {
    io.emit("nova mensagem", msg);
  });
});
//detalhew importante sobre o socket.io, temos que lincar ele no nosso "index.html", o front de toda apgina senão nao iremos conseguir estabelecer uma conexão.

servidorHTTP.listen(2101, '192.168.15.183');
//configura o servidor 
