import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsNotEmpty
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    lastName: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(128)
    password: string;
}
