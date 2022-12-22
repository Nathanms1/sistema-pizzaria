import {Request, Response} from 'express'
import { CreateProductService } from '../../services/product/CreateProductService' 

class CreateProductController{
    async handle(req: Request, res: Response){
        const {name, category_id, description, price} = req.body;

        const createProductService = new CreateProductService();

        if(!req.file){
            throw new Error("Erro ao subir arquivo")
        }else{

            const {originalname, filename: banner } = req.file;

            const product = await createProductService.execute({
                name,
                banner,
                category_id,
                description,
                price
            });
    
            return res.json(product);
        } 

    }
}

export { CreateProductController }