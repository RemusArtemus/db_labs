import { Film } from "../entity/z_film.js"
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class filmService {

    private connection: Connection;
    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async add_data_film() {
        const film: Film = Reader.prepare_data_film();
        try {
            await this.connection.manager.save(film);
            console.log(`Film with id ${film.film_id} has been saved`);
        } catch (err) {
            console.log(err);
        }
    }

    async edit_data_film() {
        const id: number = +question('Film id: ');

        try {

            const filmRepo: Repository<Film> = getRepository(Film);
            let filmEdit: Film = await filmRepo.findOne({
                where: { film_id: id }
            });

            if(!filmEdit) {
                console.log(`There is no film with id ${id}`);
            } else {
                const film: Film = Reader.prepare_data_film();

                await this.connection
                    .createQueryBuilder()
                    .update(Film)
                    .set({ ...film })
                    .where('film_id = :id', {id})
                    .execute();

                console.log(`Film with id ${id} has been updated`);
            }

        } catch (err) {
            console.log(err);
        }
    }

    async delete_data_film(){
        const id: number = +question('film id: ');

        try {
            const filmRepo: Repository<Film> = getRepository(Film);
            let filmEdit: Film = await filmRepo.findOne({
                where: { film_id: id }
            });

            if (!filmEdit) {
                console.log(`There is no film with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Film)
                    .where('film_id = :id', {id})
                    .execute();

                console.log(`Film with id ${id} has been deleted`);
            }
        } catch(err) {
            console.log(err);
        }
    }

    async show_film_data() {
        try {
            const film: Array<Film> = await this.connection.manager.find(Film);

            Printer.print_film(film);
        } catch (err) {
            console.log(err);
        }
    }
}