

interface authUserServiceProps{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: authUserServiceProps){

    }
}

export { AuthUserService }