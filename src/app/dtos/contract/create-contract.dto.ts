import { IsString, IsNotEmpty, MaxLength, IsNumber, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ContractStatus } from 'src/domain/enums/contract-status.enum';

export class CreateContractDto {
    @IsNumber()
    @IsNotEmpty()
    customerId: number;

    @IsNumber()
    @IsNotEmpty()
    managerId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsDateString()
    @IsNotEmpty()
    startDate: string;

    @IsDateString()
    @IsNotEmpty()
    endDate: string;

    @IsEnum(ContractStatus)
    @IsOptional()
    status?: ContractStatus;
}
