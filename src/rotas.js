import apiControllerUsuario from './controller/apiControllerUsuario.js'
import apiControllerClientes from './controller/apiControllerClientes.js'
import apiControllerVendas from './controller/apiControllerVendas.js'
import controllerCategoria from './controller/controllerCategorias.js'
import controllerProdutos from './controller/controllerProdutos.js'

export function rotas(servidor){

    servidor.use(apiControllerUsuario)
    servidor.use(apiControllerClientes)
    servidor.use(apiControllerVendas)
    servidor.use(controllerCategoria)
    servidor.use(controllerProdutos)

}

export default rotas;