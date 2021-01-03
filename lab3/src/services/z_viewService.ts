import { Film } from '../entity/z_film.js';
import { Viewer } from '../entity/z_viewer.js';
import { _View } from '../entity/z_view.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class viewService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async add_data_view() {
        const view: _View = Reader.prepare_data_view();

        try {
            await this.connection.manager.save(view);

            console.log(`View with id ${view.view_id} has been saved`);
        } catch (err) {
            console.log(err);
        }
    }

    async edit_data_view() {

        const id: number = +question('View id: ');

        try {
            const newView: _View = Reader.prepare_data_view();
            const viewRepo: Repository<_View> = getRepository(_View);
            const filmRepo: Repository<Film> = getRepository(Film);
            const viewerRepo: Repository<Viewer> = getRepository(Viewer);

            const view: _View = await viewRepo.findOne({
                where: { view_id: id }
            });

            if (!view) {
                console.log(`There is no View with id ${id}`);
            } else {
                const film: Film = await filmRepo.findOne({
                    where: { film_id: newView.v_film_id }
                });
                const viewer: Viewer = await viewerRepo.findOne({
                    where: { viewer_id: newView.v_viewer_id }
                });

                if (!film || !viewer) {
                    console.log(`There is no film with id ${newView.v_film_id} or viewer with id ${newView.v_viewer_id}`);
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(_View)
                        .set({ ...newView })
                        .where('view_id = :id', { id })
                        .execute();
                    console.log(`View with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async delete_data_view() {

        const id: number = +question('View id: ');

        try {
            const viewRepo: Repository<_View> = getRepository(_View);
            const view: _View = await viewRepo.findOne({
                where: { view_id: id }
            });

            if (!view) {
                console.log(`There is no View with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(_View)
                    .where('view_id = :id', { id })
                    .execute();

                console.log(`View with id ${id} has been deleted`);   
            }
        } catch (err) {
            console.log(err);
        }
    }

    async show_data_view() {
        try {
            const view: Array<_View> = await this.connection.manager.find(_View);
            Printer.print_view(view);
        } catch (err) {
            console.log(err);
        }
    }

}