import * as jwt from 'jsonwebtoken';
import { Injectable, Inject} from '@nestjs/common';
import { User } from 'src/database/models/user.model';
import { decryptField, encryptField, sendEmail } from 'src/services/utils';
import { CreateUserDto, LoginUserDto } from './dtos';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private readonly userRepository: typeof User) { }

    async registerUser(user: CreateUserDto) {
        const _user = await this.userRepository.findAll({ where: { email: user.email }})

        if (_user.length) {
            return { msg: "User Already Exist. Please Login"};
        }

        //Encrypt user password
        const encryptedPassword = await encryptField(user.password);

        // Create user in our database
        const newUser = await this.userRepository.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: encryptedPassword
        });

        // Create token
        const token = jwt.sign(
            { user_id: newUser.id, email: user.email },
            'token_key' || process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );

        return ({ ...newUser, token })
    }

    async loginUser (_login: LoginUserDto) {
        
        // Validate if user exist in our database
        const user = await this.userRepository.findOne({ where: { email: _login.email } });

        if (!user) return { msg: "This user doesn't exits"};
        const _password = await decryptField(user.password);
    
        if (user && (_password === _login.password)) {
            // Create token
            const token = jwt.sign(
                { user_id: user.id, email: _login.email },
                'token_key' || process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );

            return ({ ...user, token })
        } else return ({ message: "Invalid Credentials"} );
    }

    async forgotPasswordUser(email: string) {
        const user = await this.userRepository.findOne({ where: { email }});
        if (!(user)) return { msg: "This email or user doesnt exits."}

        const _password = await decryptField(user.password);

        const subject = "Restore Password"
        const html = `<strong>Hi ${user.firstName},</strong> <span>this is the password: ${_password}</span>
        <p>Try don't forget it!</p>`
        await sendEmail(user.email, subject, html);

        return ({ message: "Email sended"})
    }
}
