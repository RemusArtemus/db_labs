import { Film } from "../entity/z_film.js";
import { Hall } from '../entity/z_hall.js';
import { Session } from '../entity/z_session.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';


export class sessionService {

    private connection: Connection;
    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async add_data_session() {
        const session: Session = Reader.prepare_data_session();

        try {
            await this.connection.manager.save(session);
            console.log(`Session with id ${session.session_id} has been saved`);
        } catch (err) {
            console.log(err);
        }
    }

    async edit_data_session() {

        const id: number = +question('Session id: ');

        try {
            const sesRepo: Repository<Session> = getRepository(Session);
            let sesEdit: Session = await sesRepo.findOne({
                where: {
                    session_id: id
                }
            });

            if (!sesEdit) {
                console.log(`There is no session with id ${id}`);
            } else {
                const session: Session = Reader.prepare_data_session();
                const filmRepo: Repository<Film> = getRepository(Film);
                const hallRepo: Repository<Hall> = getRepository(Hall);

                const filmRow: Film = await filmRepo.findOne({
                    where: { film_id: session.s_film_id }
                });
                const hallRow: Hall = await hallRepo.findOne({
                    where: { hall_id: session.s_hall_id }
                });

                if (!filmRepo || !hallRepo) {
                    console.log(`There is no film with id ${filmRow} or hall with id ${hallRow}`);
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(Session)
                        .set({ ...session })
                        .where('session_id = :id', { id })
                        .execute();
                    console.log(`Session with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async delete_data_session () {
        const id: number = +question('Session id: ');
        try {
            const sesRepo: Repository<Session> = getRepository(Session);
            const session: Session = await sesRepo.findOne({
                where: {
                    session_id: id
                }
            });

            if (!session) {
                console.log(`There is no session with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Session)
                    .where('session_id = :id', { id })
                    .execute();
                
                console.log(`Session with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async show_data_session() {
        try {
            const session: Array<Session> = await this.connection.manager.find(Session);
            Printer.print_session(session);
        } catch (err) {
            console.log(err);
        }
    }

}