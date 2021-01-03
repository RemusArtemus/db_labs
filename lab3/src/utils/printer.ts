import { Film } from '../entity/z_film.js';
import { Viewer } from '../entity/z_viewer.js';
import { Hall } from '../entity/z_hall.js';
import { _View } from '../entity/z_view.js';
import { Session } from '../entity/z_session.js';
import { Ticket } from '../entity/z_ticket.js';
import { Format } from './format.js';



export class Printer {

    static print_film(film: Array<Film>) {
        console.log('film_Id |        f_name        |     genre     |   year');
        console.log('______________________________________________________________');

        film.forEach((item: Film) => {
            let filmName: string = '';
            let genre: string = '';

            if (item.f_name.length > 22) {
                filmName = item.f_name.substr(0, 19) + '...';
            } else {
                filmName = Format.toField(22, item.f_name);
            }

            if (item.genre.length > 15) {
                genre = item.genre.substr(0, 12) + '...';
            } else {
                genre = Format.toField(15, item.genre);
            }

            console.log(`${Format.toField(8, item.film_id.toString())}|${filmName}|${genre}|${Format.toField(12, Format.toDate(new Date(item.year)))}`);
            console.log('______________________________________________________________');
        });
    }

    static print_viewer(viewer: Array<Viewer>) {
        console.log('viewer_id |     viewer_name     | viewer_age ');
        console.log('_____________________________________________');
        viewer.forEach((item: Viewer) => {
            let viewerName = '';

            if (item.v_name.length > 21) {
                viewerName = item.v_name.substr(0, 18) + '...';
            } else {
                viewerName = Format.toField(21, item.v_name);
            }

            console.log(`${Format.toField(10, item.viewer_id.toString())}|${viewerName}|${Format.toField(12 ,item.v_age.toString())}`);
            console.log('_____________________________________________');
        });
    }

    static print_hall(hall: Array<Hall>) {
        console.log('hall_id |     hall_name     | row_count | seats_in_row ');
        console.log('_______________________________________________________');
        hall.forEach((item: Hall) => {
            let hallName = '';

            if (item.hall_name.length > 19) {
                hallName = item.hall_name.substr(0, 16) + '...';
            } else {
                hallName = Format.toField(19, item.hall_name);
            }

            console.log(`${Format.toField(8, item.hall_id.toString())}|${hallName}|${Format.toField(11 ,item.row_count.toString())}|${Format.toField(14, item.seats_in_row.toString())}`);                                            
            console.log('_______________________________________________________');
        });
    }

    static print_view(view: Array<_View>) {

        console.log('view_id | v_film_id |  v_viewer_id ');
        console.log('___________________________________');
        view.forEach((item: _View) => {
            console.log(`${Format.toField(8, item.view_id.toString())}|${Format.toField(11, item.v_film_id.toString())}|${Format.toField(13, item.v_viewer_id.toString())}`);
            console.log('___________________________________');
        });
    }

    static print_session(session: Array<Session>) {
        console.log('session_id |        time        | s_film_id | s_hall_id ');
        console.log('________________________________________________________');
        session.forEach((item: Session) => {
            console.log(`${Format.toField(11, item.session_id.toString())}|${Format.toField(20, Format.toDate(new Date(item.time)))}|${Format.toField(11, item.s_film_id.toString())}|${Format.toField(11, item.s_hall_id.toString())}`);
            console.log('________________________________________________________');
        });
    }

    static print_ticket(ticket: Array<Ticket>) {
        console.log('ticket_id |  row  |  seat  | t_session_id ');
        console.log('__________________________________________');
        ticket.forEach((item: Ticket) => {
            console.log(`${Format.toField(10, item.ticket_id.toString())}|${Format.toField(7, item.row.toString())}|${Format.toField(8, item.seat.toString())}|${Format.toField(14, item.t_session_id.toString())}`);
            console.log('__________________________________________');
        });
    }
}