import prismaClient from "../../prisma"


class DetailUserService{
    async execute(user_id: string){
        try {
            
            const user = await prismaClient.user.findFirst({
                where:{
                    id: user_id
                },
                select:{
                    id: true,
                    name: true,
                    role: true,
                    createdAt: true,
                }
            })
    
            if(!user){

                throw new Error("Usuário não encrontrado")
            }

            return user;

        } catch (error) {
            throw new Error("Usuário não encrontrado")
        }

    }
}

export { DetailUserService }