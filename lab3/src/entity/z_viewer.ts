import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { _View } from "./z_view.js"

@Entity({ name: 'viewer'})
export class Viewer {

    @PrimaryGeneratedColumn()
    viewer_id: number;
    
    @Column({ type: 'character varying', length: 50, nullable: false})
    v_name: string;

    @Column({ type: 'integer', nullable: false})
    v_age: number;

    @OneToMany(() => _View, view => view.v_viewer_id)
    view: _View[];

}