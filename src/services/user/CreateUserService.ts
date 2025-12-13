import prismaClient from "../../prisma";

interface CreateUserProps{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({ name, email, password }: CreateUserProps){
        
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("Usuário já existente!")
        }

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: password,
            }
        })

        return user.name;
    }
}

export { CreateUserService }