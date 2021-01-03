import { Session } from '../entity/z_session.js';
import { Ticket } from '../entity/z_ticket.js';
import { Reader } from '../utils/reader.js';
import { Printer } from '../utils/printer.js';
import { Connection, getConnection, getRepository, Repository } from 'typeorm';
import { question } from 'readline-sync';

export class ticketService {
    private connection: Connection;
    constructor(connection: Connection) {
        this.connection = getConnection();
    }

    async add_data_ticket() {
        const ticket: Ticket = Reader.prepare_data_ticket();

        try {
            await this.connection.manager.save(ticket);
            console.log(`Ticket with id ${ticket.ticket_id} has been saved`);
        } catch (err) {
            console.log(err);
        }
    }

    async edit_data_ticket() {

        const id: number = +question('Ticket id: ');

        try {
            const ticketRepo: Repository<Ticket> = getRepository(Ticket);
            let ticketEdit: Ticket = await ticketRepo.findOne({
                where: {
                    ticket_id: id
                }
            });

            if (!ticketEdit) {
                console.log(`There is no ticket with id ${id}`);
            } else {
                const ticket: Ticket = Reader.prepare_data_ticket();
                const sesRepo: Repository<Session> = getRepository(Session);

                const sesRow: Session = await sesRepo.findOne({
                    where: { session_id: ticket.t_session_id }
                });

                if (!sesRepo) {
                    console.log(`There is no session with id ${sesRow}`);
                } else {
                    await this.connection
                        .createQueryBuilder()
                        .update(Ticket)
                        .set({ ...ticket })
                        .where('ticket_id = :id', { id })
                        .execute();
                    console.log(`Ticket with id ${id} has been updated`);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async delete_data_ticket() {

        const id: number = +question('Ticket id: ');
        try {
            const ticketRepo: Repository<Ticket> = getRepository(Ticket);
            const ticket: Ticket = await ticketRepo.findOne({
                where: {
                    ticket_id: id
                }
            });

            if (!ticket) {
                console.log(`There is no ticket with id ${id}`);
            } else {
                await this.connection
                    .createQueryBuilder()
                    .delete()
                    .from(Ticket)
                    .where('ticket_id = :id', { id })
                    .execute();
                
                console.log(`Ticket with id ${id} has been deleted`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async show_data_ticket() {
        try {
            const ticket: Array<Ticket> = await this.connection.manager.find(Ticket);
            Printer.print_ticket(ticket);
        } catch (err) {
            console.log(err);
        }
    }

}