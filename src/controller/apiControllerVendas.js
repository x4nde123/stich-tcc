import { Router } from "express";
import { alterarVendas, consultarVendas, consultarVendasTelefone, deletarVendas, inserirVendas } from "../repository/repositortVendas.js";



const endpoints = Router();

endpoints.get('/vendasConsultar', async (req, resp) =>{
    try {
       
        let registros = await consultarVendas();
        resp.send(registros);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
    })



endpoints.post('/vendasInserir' ,async (req, resp) =>{
        try {
             let clientes = req.body;
        let numero = await inserirVendas(clientes);
    
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


endpoints.get('/vendasConsultar/:telefone', async (req, resp) =>{
    try {
        let telefone = req.params.telefone;
        let registros = await consultarVendasTelefone(telefone);
        resp.send({
             Consultar: registros
        } );

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
    })


endpoints.put('/vendasAlterar/:telefone' ,async (req, resp) =>{
    
    try {
        let telefone = req.params.telefone;
        let clientes = req.body;
    

        let linhasAfetadas = await alterarVendas(telefone,clientes);
         
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

    
    endpoints.delete('/vendasDeletar/:telefone' ,async (req, resp) =>{
    
        try {
    
            let telefone = req.params.telefone
            let linhasAfetadas = await deletarVendas(telefone);
         
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