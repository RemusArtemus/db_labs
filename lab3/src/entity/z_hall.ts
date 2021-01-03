import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'hall'})
export class Hall {

    @PrimaryGeneratedColumn()
    hall_id: number;
    
    @Column({ type: 'character varying', length: 50, nullable: false })
    hall_name: string;

    @Column({ type: 'integer', nullable: false})
    row_count: number;

    @Column({ type: 'integer', nullable: false})
    seats_in_row: number;
}