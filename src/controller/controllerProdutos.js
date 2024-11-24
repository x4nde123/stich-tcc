import { Router } from "express";
import { cadastrarProduto, carregarImagemProduto, listarProdutos, listarProdutosPorId } from "../repository/repositoryProdutos.js";
import multer from "multer";

const endpoints = Router()
const upload = multer({ dest: 'storage/produtos' })

endpoints.post('/produtos', async (req, resp) => {
  try {
    const produto = req.body

    if (!produto.nome || !produto.valor)
      throw new Error('Preencha todos os campos obrigatórios')

    if(!produto.id_categoria)
      throw new Error('Selecione uma categoria')

    const resposta = await cadastrarProduto(produto)
    resp.send(resposta)
  } catch (error) { 
    resp.status(400)
      .send({
        erro: error.message
      })
  }
})

endpoints.get('/produtos', async (_, resp) => {
  try {
    const resposta = await listarProdutos()
    resp.send(resposta)
  } catch (error) {
    resp.status(404)
      .send({
        erro: error.message
      })
  }
})

endpoints.get('/produtos/:id', async (req, resp) => {
  try {
    const { id } = req.params

    const resposta = await listarProdutosPorId(id)

    if (!resposta)
      throw new Error('Não existe nenhum produto com esse id')

    resp.send(resposta)
  } catch (error) {
    resp.status(404)
      .send({
        erro: error.message
      })
  }
})

endpoints.patch('/produtos/:id/image', upload.single('image'), async (req, resp) => {
  try {
    const {id} = req.params
    const image = req.file

    if(!image.mimetype.startsWith('image'))
      throw new Error('O tipo de arquivo não é permitido')

    const resposta = await carregarImagemProduto(image.path, id)
    resp.send({affectedRows: resposta})
  } catch (error) {
    resp.status(400)
    .send({
      erro: error.message
    })
  }
})

export default endpoints