import { Readable } from "stream";
import prismaClient from "../../prisma";
import cloudinary from "../../config/cloudinary";


interface CreateProductServiceProps{
    name: string;
    price: number;
    description: string;
    category_id: string;
    imageBuffer: Buffer;
    imageName: string;
}

class CreateProductService{
    async execute({ name, price, description, category_id, imageBuffer, imageName }: CreateProductServiceProps){

        const categoryExists = await prismaClient.category.findFirst({
            where:{
                id: category_id
            }
        })

        if(!categoryExists){
            throw new Error("Categoria não encontrada!")
        }

        // ENVIAR PRO CLOUDINATY SALVAR A IMAGEM E PEGAR A URL
        let bannerUrl = "";
        try {

            const result = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "products",
                    resource_type: "image",
                    public_id: `${Date.now()}-${imageName.split(".")[0]}`
                }, (error, result) => {
                    if(error) reject(error);
                    else resolve(result);
                }
            )

                //CRIAR O STREAM DO BUFFER E FAZER PIPE PARA O CLOUDINARY
                const bufferStream = Readable.from(imageBuffer)
                bufferStream.pipe(uploadStream)

            })

            bannerUrl = result;

        } catch (error) {
            throw new Error("Error ao fazer o upload da imagem")
        }

        return("PRODUTO CRIADO")
    }
}

export { CreateProductService }