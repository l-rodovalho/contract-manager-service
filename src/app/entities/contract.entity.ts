import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Customer } from './customer.entity';
import { User } from './user.entity';
import { ContractStatus } from 'src/domain/enums/contract-status.enum';

@Entity('contracts')
export class Contract {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ name: 'customer_id', type: 'int' })
    customerId: number;

    @Column({ name: 'manager_id', type: 'int' })
    managerId: number;

    @Column({ name: 'title', type: 'varchar', length: 255 })
    title: string;

    @Column({ name: 'value', type: 'decimal', precision: 15, scale: 2 })
    value: number;

    @Column({ name: 'start_date', type: 'date' })
    startDate: string;

    @Column({ name: 'end_date', type: 'date' })
    endDate: string;

    @Column({ name: 'status', type: 'enum', enum: ContractStatus, default: ContractStatus.PENDING })
    status: ContractStatus;

    @ManyToOne(() => Customer, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => User, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'manager_id' })
    manager: User;

    @VersionColumn()
    version: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', select: false })
    deletedAt: Date;
}
