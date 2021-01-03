import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Film } from "./z_film.js"
import { Viewer } from "./z_viewer.js"

@Entity ({name: 'view'})
export class _View {

    @PrimaryGeneratedColumn()
    view_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Film, (film: Film) => film.film_id)
    @JoinColumn({ name: 'v_film_id' })
    v_film_id: number;

    @Column({ type: 'integer', nullable: false })
    @ManyToOne(() => Viewer, (tags: Viewer) => tags.viewer_id)
    @JoinColumn({ name: 'v_viewer_id' })
    v_viewer_id: number;

}
