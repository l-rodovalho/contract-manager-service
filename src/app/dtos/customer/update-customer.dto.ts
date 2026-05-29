import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, Matches, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

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
    @Transform(({ value }) => typeof value === 'string' ? value.replace(/[.\/\-]/g, '') : value)
    @Matches(/^(?:\d{11}|\d{14})$/, { message: 'documentId must contain exactly 11 or 14 digits' })
    @MaxLength(50)
    documentId?: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(255)
    contactEmail?: string;

    @IsNumber()
    version: number;
}