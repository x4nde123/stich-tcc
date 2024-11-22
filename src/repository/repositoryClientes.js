import con from "./connection.js";



export async function inserirCliente(clientes){

    const comando = `
    
    insert into clientes (nm_clientes, ultima_compra, total, numero, email)
    values(?,?,?,?,?)
    `;
   let resposta = await con.query(comando , [clientes.nome, clientes.ultima, clientes.total, clientes.numero, clientes.email]);
  let info = resposta[0];

  return info.insertId;

}




export async function consultarClintes(){

const comando = `

select   id_cliente    id,
         nm_clientes    nome,
         ultima_compra     UltimaCompra,
         total  total,
         numero  numero,
         email email
from  clientes; 
`
let resposta = await con.query(comando);
        let registros = resposta[0]
    
        return registros;
}


export async function consultarClientesTelefone(telefone){

  const comando = `
  
           select   id_cliente    id,
           nm_clientes    nome,
           ultima_compra     Ultimacompra,
           total  total,
           numero numero,
           email email
           from clientes
           where numero = ?;
  `;
  let resposta = await con.query(comando,[telefone]);
  let registros = resposta[0];
      
          return registros;
  }


export async function alterarCliente(telefone , clientes){

  const comando = `
  
  
  update clientes
  set   nm_clientes  =  ?,
           ultima_compra  =   ?,
           total = ?,
           numero = ?,
           email = ?
  where numero = ?;
  `

  let resposta = await con.query(comando , [clientes.nome, clientes.ultima, clientes.total, clientes.numero,clientes.email, telefone]);
  let info = resposta[0];
  return info.insertId;

}


export async function deletarClientes(telefone){

  const comando = `
  
  
  delete from clientes
  where numero = ?
  `;

  let resposta = await con.query(comando , [telefone]);
  let info = resposta[0];
  return info.insertId;

}