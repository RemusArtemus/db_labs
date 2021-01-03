import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./z_session.js";

@Entity({ name: 'ticket'})
export class Ticket  { 

    @PrimaryGeneratedColumn()
    ticket_id: number;

    @Column({ type: 'integer', nullable: false})
    row: number;

    @Column({ type: 'integer', nullable: false})
    seat: number;

    @Column({ type: 'integer', nullable: false})
    @ManyToOne(() => Session, (session_ticket: Session) => session_ticket.session_id)
    @JoinColumn({ name: 't_session_id' })
    t_session_id: number;
}