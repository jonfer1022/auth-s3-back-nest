import { Injectable } from '@nestjs/common';
import { copyObjectS3, deleteObjectS3, getObjectS3, getSignedUrlS3, putObjectS3 } from 'src/services/utils';
const bucketName = process.env.BUCKET_NAME || "bucket-save-files-tests" || "aluxion-testing";

@Injectable()
export class FilesService {
    async uploadFile(originalname: string, buffer: any){
        return await putObjectS3(originalname, buffer)
    }
    
    async getFile(fileName: string){
        return await getObjectS3(fileName)
    }
    
    async changeFilename(fileName: string, newFileName: string){
        const objectPath = `https://${bucketName}.s3.amazonaws.com/${fileName.split(' ').join('+')}`;
        await copyObjectS3(newFileName, objectPath);
		await deleteObjectS3(fileName);
		return await getSignedUrlS3(newFileName)
    }
}
