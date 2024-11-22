import { Router } from "express";
import { cadastrarCategoria, listarCategorias } from "../repository/repositoryCategoria.js";

const endpoints = Router()

endpoints.post('/categoria', async (req, resp) => {
  try {
    const categoria = req.body

    if(!categoria.nome || !categoria.descricao)
      throw new Error('Preencha todos os campos obrigatórios')

    const resposta = await cadastrarCategoria(categoria)
    resp.send(resposta)
  } catch (error) {
    resp.status(400)
    .send({
      erro: error.message
    })
  }
})

endpoints.get('/categoria', async (_, resp) => {
  try {
    const resposta = await listarCategorias()

    if(resposta.length <= 0)
      throw new Error('Não existe nenhuma categoria cadastrada')

    resp.send(resposta)
  } catch (error) {
    resp.status(404)
    .send({
      erro: error.message
    })
  }
})

export default endpoints