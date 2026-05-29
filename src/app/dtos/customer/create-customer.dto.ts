import { IsString, IsEmail, IsNotEmpty, MaxLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

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
    @Transform(({ value }) => typeof value === 'string' ? value.replace(/[.\/\-]/g, '') : value)
    @Matches(/^(?:\d{11}|\d{14})$/, { message: 'documentId must contain exactly 11 or 14 digits' })
    @MaxLength(50)
    documentId: string;

    @IsEmail()
    @MaxLength(255)
    contactEmail: string;
}