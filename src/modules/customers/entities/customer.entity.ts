import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn
} from 'typeorm';

export enum EntityStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({ name: 'corporate_name', type: 'varchar', length: 255 })
    corporateName: string;

    @Column({ name: 'trade_name', type: 'varchar', length: 255 })
    tradeName: string;

    @Column({ name: 'document_id', type: 'varchar', length: 50, unique: true })
    documentId: string;

    @Column({ name: 'contact_email', type: 'varchar', length: 255 })
    contactEmail: string;

    @Column({ type: 'enum', enum: EntityStatus, default: EntityStatus.ACTIVE })
    status: EntityStatus;

    @VersionColumn()
    version: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', select: false })
    deletedAt: Date;
}