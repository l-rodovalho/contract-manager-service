import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customersRepository: Repository<Customer>,
    ) { }

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        const existingCustomer = await this.customersRepository.findOne({
            where: { documentId: createCustomerDto.documentId }
        });

        if (existingCustomer) {
            throw new ConflictException('Customer with this document ID already exists.');
        }

        const customer = this.customersRepository.create(createCustomerDto);
        return this.customersRepository.save(customer);
    }

    async findAll(): Promise<Customer[]> {
        return this.customersRepository.find();
    }

    async findOne(id: number): Promise<Customer> {
        const customer = await this.customersRepository.findOne({ where: { id } });
        if (!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found.`);
        }
        return customer;
    }

    async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        const customer = await this.findOne(id);

        const updatedCustomer = this.customersRepository.merge(customer, updateCustomerDto);

        try {
            return await this.customersRepository.save(updatedCustomer);
        } catch (error) {
            if (error.name === 'OptimisticLockVersionMismatchError') {
                throw new ConflictException('Data was modified by another user. Please refresh and try again.');
            }
            throw error;
        }
    }

    async remove(id: number): Promise<void> {
        const customer = await this.findOne(id);
        await this.customersRepository.softRemove(customer);
    }
}