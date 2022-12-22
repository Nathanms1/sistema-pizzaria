import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'


interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        
        //verificar se enviou um email
        if(!email){
            throw new Error("Email incorreto")
        }

        //verificar se esse email ja esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error ("Email já cadastrado")
        }

        const passwordHash = await hash(password, 8)

        // cadastra user no BD
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            //Seleciona os campos que vão retornar visivelmente após criar usuário
            select:{
                name: true,
                id: true,
                email: true
            }
        })
        
        return user;
    }
}

export { CreateUserService }