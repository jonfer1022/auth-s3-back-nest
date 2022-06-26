import * as CryptoJs from 'crypto-js';
import * as sendgrid from '@sendgrid/mail';
import * as AWS from 'aws-sdk';

const credentials = {
	accessKeyId: process.env.ACCESS_KEY || "AKIAQ4PLN27VET2GOXE4",
	secretAccessKey: process.env.SECRET_ACCESS || "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",
	signatureVersion: "v4"
}
const keyCrypto = process.env.KEY_CRYPTO || "key_crypto";
const api_key = process.env.API_KEY || "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"
const bucketName = process.env.BUCKET_NAME || "bucket-save-files-tests" || "aluxion-testing";

AWS.config.update({ credentials, region: process.env.AWS_REGION || "us-east-1" })
const s3 = new AWS.S3();

const encryptField = async (data: string) => {
	if(!data) return '';
	return CryptoJs.AES.encrypt(data, keyCrypto).toString()
}

const decryptField = async (data) => {
	if(!data) return '';
	const bytes = CryptoJs.AES.decrypt(data, keyCrypto)
	return bytes.toString(CryptoJs.enc.Utf8)
}

const sendEmail = async (emailTo: string, subject: string, html: string) => {
	sendgrid.setApiKey(api_key);

	const msg = {
		to: `${emailTo}`,
		from: 'jonathanfab92@gmail.com',
		subject,
		html,
	}

	return await sendgrid.send(msg)
}

const putObjectS3 = async (fileName: string, body:any) => {
	const params = {
		Body: body, 
		Bucket: bucketName, 
		Key: fileName
	};
    return s3.putObject(params).promise()
}

const getObjectS3 = async (fileName: string) => {
	const params = {
		Bucket: bucketName, 
		Key: fileName
	};
	return s3.getObject(params).promise()
}

const copyObjectS3 = async (newFileName: string, path: string) => {
	const params = {
		Bucket: bucketName,
		CopySource: path, 
		Key: newFileName
	};
	return s3.copyObject(params).promise()
}

const deleteObjectS3 = async (path: string) => {
	const params = {
		Bucket: bucketName,
		Key: path
	};
	return s3.deleteObject(params).promise()
}

const getSignedUrlS3 = async (path: string) => {
	const params = {
		Bucket: bucketName,
		Key: path
	};
	return await s3.getSignedUrlPromise('getObject',params)
}

export {
    encryptField,
    decryptField,
    sendEmail,
    putObjectS3,
    getObjectS3,
    copyObjectS3,
    deleteObjectS3,
    getSignedUrlS3
}