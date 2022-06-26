import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    updateFile(@UploadedFile() file: Express.Multer.File): any {
        return this.filesService.uploadFile(file.originalname, file.buffer)
    }
    
    @Get('download')
    getFile(@Query('fileName') fileName: string): any {
        return this.filesService.getFile(fileName)
    }
    
    @Put('change-filename')
    @UseInterceptors(FileInterceptor('file'))
    changeFilename(@Body() dto: { fileName: string, newFileName: string}): any {
        return this.filesService.changeFilename(dto.fileName, dto.newFileName)
    }
}
