import { Column, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Film } from "./z_film.js";
import { Hall } from "./z_hall.js";
import { Ticket } from "./z_ticket.js";

@Entity({name: 'session'})
export class Session {

    @PrimaryGeneratedColumn()
    session_id: number;

    @Column({ type:'timestamp without time zone', nullable: false})
    time: string;

    @Column({ type:'integer', nullable: false})
    @ManyToOne(() => Film, (film: Film) => film.film_id)
    @JoinColumn({ name: 's_film_id' })
    s_film_id: number;

    @Column({ type:'integer', nullable: false})
    @OneToOne(() => Hall)
    @JoinColumn({ name: 's_hall_id' })
    s_hall_id: number;

    @OneToMany(() => Ticket, ticket => ticket.t_session_id)
    ticket: Ticket[];

}