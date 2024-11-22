import { Router } from "express";
import { alterarCliente, consultarClientesTelefone, consultarClintes, deletarClientes, inserirCliente } from "../repository/repositoryClientes.js";



const endpoints = Router();

endpoints.get('/clientesConsultar', async (req, resp) =>{
    try {
       
        let registros = await consultarClintes();
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
    })



endpoints.post('/clientesInserir' ,async (req, resp) =>{
        try {
             let clientes = req.body;
        let numero = await inserirCliente(clientes);
    
        resp.send(
            {
                novoID:numero
            }
        );
    
        } catch (err) {
            resp.status(400).send({
                erro: err.message
            })
        }
   
       
    })


    endpoints.get('/consultarTelefone/:telefone', async (req, resp) => {
        try {
          let telefone = req.params.telefone;
          let consultarTelefone = await consultarClientesTelefone(telefone);

          if (telefone == null) {
            resp.send({
                erro: 'Nenhum telefone encontrado.'
            })
          } else{
            resp.send({
            consulta: consultarTelefone
          })
          }
      
          
          
        } catch (err) {
          resp.status(400).send({
            erro: err.message
          })
        }
      })
           


endpoints.put('/clientesAlterar/:telefone' ,async (req, resp) =>{
    
    try {
        let telefone = req.params.telefone;
        let clientes = req.body;
    

        let linhasAfetadas = await alterarCliente(telefone,clientes);
         
        if(linhasAfetadas >= 1){
         resp.send();

        }
        resp.send({
            Alterar:telefone
        })
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
    })

    
    endpoints.delete('/clientesDeletar/:telefone' ,async (req, resp) =>{
    
        try {
    
            let telefone = req.params.telefone
            let linhasAfetadas = await deletarClientes(telefone);
         
        if(linhasAfetadas >= 1){
         resp.send();

        }
        

        resp.send({
            deletar:telefone
        })
        } catch (err) {
            
            resp.status(400).send({
                erro: err.message
        })
        
        }})




export default endpoints;