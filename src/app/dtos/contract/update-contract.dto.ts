import { IsString, IsOptional, MaxLength, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { ContractStatus } from 'src/domain/enums/contract-status.enum';

export class UpdateContractDto {
    @IsNumber()
    @IsOptional()
    managerId?: number;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    title?: string;

    @IsNumber()
    @IsOptional()
    value?: number;

    @IsDateString()
    @IsOptional()
    startDate?: string;

    @IsDateString()
    @IsOptional()
    endDate?: string;

    @IsEnum(ContractStatus)
    @IsOptional()
    status?: ContractStatus;

    @IsNumber()
    version: number;
}
