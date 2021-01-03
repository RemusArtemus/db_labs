import { Viewer } from '../entity/z_viewer.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class viewerService {

    private connection: Connection;
    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async add_data_viewer() {
        const viewer: Viewer = Reader.prepare_data_viewer();
        try {
            await this.connection.manager.save(viewer);
            console.log(`Viewer with id ${viewer.viewer_id} has been saved`);
        } catch (err) {
            console.log(err);
        }
    }

    async edit_data_viewer() {
        const id: number = +question('Viewer id: ');

        try {
            
            const viewerRepo: Repository<Viewer> = getRepository(Viewer);
            let viewerEdit: Viewer = await viewerRepo.findOne({
                where: { viewer_id: id }
            });

            if(!viewerEdit){
                console.log(`There is no viewer with id ${id}`);
            } else {

                const viewer: Viewer = Reader.prepare_data_viewer();

                await this.connection
                    .createQueryBuilder()
                    .update(Viewer)
                    .set({ ...viewer })
                    .where('viewer_id = :id', {id})
                    .execute();

                console.log(`Viewer with id ${id} has been updated`);
            }

        } catch(err) {
            console.log(err);
        }
    }

    async delete_data_viewer(){
        const id: number = +question('viewer id: ');

        try {
            const viewerRepo: Repository<Viewer> = getRepository(Viewer);
            let viewerEdit: Viewer = await viewerRepo.findOne({
                where: { viewer_id: id }
            });

            if (!viewerEdit) {
                console.log(`There is no viewer with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Viewer)
                    .where('viewer_id = :id', {id})
                    .execute();

                console.log(`Viewer with id ${id} has been deleted`);
            }
        } catch(err) {
            console.log(err);
        }
    }

    async show_viewer_data() {
        try {
            const viewer: Array<Viewer> = await this.connection.manager.find(Viewer);
            Printer.print_viewer(viewer);
        } catch (err) {
            console.log(err);
        }
    }

} 