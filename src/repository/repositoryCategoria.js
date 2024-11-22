import con from "./connection.js"

export async function cadastrarCategoria(categoria){
  const comando = 
  `
  insert into categoria(nm_nome, ds_descricao)
              values(?,?)
  `
  const resp = await con.query(comando, [categoria.nome, categoria.descricao])
  const id = resp[0].insertId

  console.log(categoria)

  return {...categoria, id}
}

export async function listarCategorias(){
  const comando = 
  `
  select id_categoria id,
         nm_nome      nome,
         ds_descricao descricao  
  from categoria
  `
  const [registros] = await con.query(comando)
  return registros
}