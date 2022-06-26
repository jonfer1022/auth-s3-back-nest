import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsNotEmpty
} from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(128)
    password: string;
}
