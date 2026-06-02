import { IsEmail, IsOptional, IsString, MaxLength, IsEnum, IsNumber } from 'class-validator';
import { UserRole } from 'src/domain/enums/user-role.enum';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MaxLength(255)
    name?: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(255)
    email?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsNumber()
    version: number;
}
