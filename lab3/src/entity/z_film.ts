import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./z_session.js"
import { _View } from "./z_view.js"

@Entity({ name: 'film' })
export class Film {

    @PrimaryGeneratedColumn()
    film_id: number;

    @Column({ type: 'character varying', length: 50, nullable: false})
    f_name: string;

    @Column({ type: 'character varying', length: 50, nullable: false})
    genre: string;

    @Column({ type: 'date', nullable: false})
    year: string;

    @OneToMany(() => Session, session => session.s_film_id)
    session: Session[];

    @OneToMany(() => _View, view => view.v_film_id)
    view: _View[];
}