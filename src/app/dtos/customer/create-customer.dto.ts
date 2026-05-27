import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    corporateName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    tradeName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    documentId: string;

    @IsEmail()
    @MaxLength(255)
    contactEmail: string;
}