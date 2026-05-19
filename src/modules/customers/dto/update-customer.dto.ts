import { IsString, IsEmail, MaxLength, IsNumber, IsOptional } from 'class-validator';

export class UpdateCustomerDto {
    @IsString()
    @IsOptional()
    @MaxLength(255)
    corporateName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    tradeName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    documentId?: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(255)
    contactEmail?: string;

    @IsNumber()
    @IsOptional()
    version?: number;
}