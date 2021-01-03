import { Hall } from '../entity/z_hall.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class hallService {
    private connection: Connection;
    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async add_data_hall(){
        const hall: Hall = Reader.prepare_data_hall();
        try {
            await this.connection.manager.save(hall);
            console.log(`Hall with id ${hall.hall_id} has been saved`);
        } catch (err) {
            console.log(err);
        }
    }

    async edit_data_hall(){
        const id: number = +question('Hall id: ');
        try {
            
            const hallRepo: Repository<Hall> = getRepository(Hall);
            let hallEdit: Hall = await hallRepo.findOne({
                where: { hall_id: id }
            });

            if(!hallEdit){
                console.log(`There is no hall with id ${id}`);
            } else {
                const hall: Hall = Reader.prepare_data_hall();

                await this.connection
                    .createQueryBuilder()
                    .update(Hall)
                    .set({ ...hall })
                    .where('hall_id = :id', {id})
                    .execute();

                console.log(`Hall with id ${id} has been updated`);
            }
        } catch(err) {
            console.log(err);
        }
    }

    async delete_data_hall() {
        const id: number = +question('viewer id: ');

        try {
            const hallRepo: Repository<Hall> = getRepository(Hall);
            let hallEdit: Hall = await hallRepo.findOne({
                where: { hall_id: id }
            });

            if (!hallEdit) {
                console.log(`There is no hall with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Hall)
                    .where('hall_id = :id', {id})
                    .execute();

                console.log(`Hall with id ${id} has been deleted`);
            }
        } catch(err) {
            console.log(err);
        }
    }

    async show_hall_data() {
        try {
            const hall: Array<Hall> = await this.connection.manager.find(Hall);
            Printer.print_hall(hall);
        } catch (err) {
            console.log(err);
        }
    }
}