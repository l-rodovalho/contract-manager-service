import { IsString, IsEmail, IsNotEmpty, MaxLength, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from 'src/domain/enums/user-role.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}
