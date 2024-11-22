import { Router } from "express";
import {
  inserirUsuario,
  listarUsuarios,
  loginUsuario,
} from "../repository/repositoryUsuario.js";
import { gerarToken } from "../utils/jwt.js";
import { consultarClientesTelefone } from "../repository/repositoryClientes.js";

const endpoints = Router();

endpoints.post("/usuario", async (req, resp) => {
  try {
    let user = req.body;
    let uss = await loginUsuario(user);

    if (uss == null) {
      resp.send({ erro: "Usuário ou senha incorreto(s)" });
    } else {
      let token = gerarToken(uss);
      resp.send({
        ...uss,
        token: token,
      });
    }
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.post("/inserirUsuario", async (req, resp) => {
  try {
    let user = req.body;
    let ins = await inserirUsuario(user);

    if (ins === null) {
      resp.send({ erro: "Usuario ou senha incorreta(s)" });
    } else {
      resp.send({ ins });
    }
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoints.get('/usuarios' , async (req, resp) => {
  try {
    const resposta = await listarUsuarios()

    resp.send(resposta)
  } catch (error) {
    resp.status(400).send({
      erro: error.message
    })
  }
})

export default endpoints;
