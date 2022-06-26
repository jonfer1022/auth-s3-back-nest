import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dtos';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    @UsePipes(new ValidationPipe({skipMissingProperties: true}))
    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, whitelist: true, transform: true}))
    register(@Body() dto: CreateUserDto): any {
        return this.usersService.registerUser(dto);
    }

    @Post('/login')
    @UsePipes(new ValidationPipe({skipMissingProperties: true}))
    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, whitelist: true, transform: true}))
    login(@Body() dto: LoginUserDto): any {
        return this.usersService.loginUser(dto);
    }

    @Post('/forgotPassword')
    @UsePipes(new ValidationPipe({skipMissingProperties: true}))
    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, whitelist: true, transform: true}))
    forgotPassword(@Body() dto: { email: string }): any {
        return this.usersService.forgotPasswordUser(dto.email);
    }
}
