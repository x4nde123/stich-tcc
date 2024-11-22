import con from "./connection.js"
import crypto from "crypto-js";



export async function inserirUsuario(user){
    const comando = `
    
    insert into usuario(nm_usuario, email, ds_senha)
    values(?,?,?);
    `

    let hash = crypto.SHA256(user.senha).toString();
    let resp = await con.query(comando, [user.nome, user.email,hash]);
    let info = resp[0];
    return info.insertId;
}




export async function loginUsuario(user){

    const comando = 

  `
  select 
    id_usuario id,
    nm_usuario nome,
       email  email,
       ds_senha senha
  from usuario
  where email = ?
  and ds_senha = ?;
  `
  let hash = crypto.SHA256(user.senha).toString();
  let registros = await con.query(comando, [user.email, hash]);
  let usuario = registros[0][0]; 


  
  if (usuario != null && hash === usuario.senha) {
    return usuario;
  } else{
    return null;
  }

  

}


export const listarUsuarios = async () => {
  const comando = 
  `
  select id_usuario id,
         nm_usuario nome,
         email      email
    from usuario                 
  `
  const [registros] = await con.query(comando)
  return registros
}