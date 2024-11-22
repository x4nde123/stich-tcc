import con from "./connection.js"

export async function cadastrarProduto(produto) {
  const comando = 
  `
  insert into produtos(id_categoria, nm_nome, vl_valor, ds_descricao)
              values(?,?,?,?)
  `
  const resp = await con.query(comando, [
    produto.id_categoria,
    produto.nome,
    produto.valor,
    produto.descricao
  ])
  
  produto.id = resp[0].insertId

  return produto
}

export async function listarProdutos() {
  const comando = 
  `
  select id_produto   id,
         id_categoria id_categoria,
         nm_nome      nome,
         vl_valor     valor,
         ds_descricao descricao,
         img_logo     image
    from produtos         
  `
  const [registros] = await con.query(comando)
  return registros
}

export async function listarProdutosPorId(id) {
  const comando = `
  select id_produto   id,
         id_categoria id_categoria,
         nm_nome      nome,
         vl_valor     valor,
         ds_descricao descricao,
         img_logo       image
    from produtos
   where id_produto  = ?  
  `
  const [registros] = await con.query(comando, [id])
  // console.log(registros)

  return registros[0]
}

export async function carregarImagemProduto(img, id) {
  const comando = 
  `
  update produtos
     set img_logo   = ?
   where id_produto = ?  
  `
  const [resp] = await con.query(comando, [img, id])
  console.log(resp)

  return resp.affectedRows 
}