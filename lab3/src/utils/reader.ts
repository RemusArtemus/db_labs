import { Film } from '../entity/z_film.js';
import { Viewer } from '../entity/z_viewer.js'
import { Hall } from '../entity/z_hall.js';
import { _View } from '../entity/z_view.js';
import { Session } from '../entity/z_session.js';
import { Ticket } from '../entity/z_ticket.js';
import { Format } from './format.js';
import { question } from 'readline-sync';

export class Reader {

    static prepare_data_film(): Film {
        const film: Film = new Film();

        film.f_name = question('film name: ');
        film.genre = question('film genre: ');
        film.year = Format.toDate(new Date(Date.now()));

        return film;
    }

    static prepare_data_viewer(): Viewer {
        const viewer: Viewer = new Viewer();

        viewer.v_name = question('viewer name: ');
        viewer.v_age = +question('viewer age: ');
        return viewer;
    }

    static prepare_data_hall(): Hall {
        const hall: Hall = new Hall();

        hall.hall_name = question('hall_name: ');
        hall.row_count = +question('rows: ');
        hall.seats_in_row = +question('seats_in_row: ');
        return hall;
    }

    static prepare_data_view():_View {
        const view: _View = new _View();

        view.v_film_id = +question('v_film_id: ');
        view.v_viewer_id = +question('v_viewer_id: ');

        return view;
    }
    
    static prepare_data_session():Session {
        const session: Session= new Session();

        session.time = Format.toDate(new Date(Date.now()));
        session.s_film_id = +question('s_film_id: ');
        session.s_hall_id = +question('s_hall_id: ');

        return session;
    }

    static prepare_data_ticket():Ticket {
        const ticket: Ticket = new Ticket();

        ticket.row = +question('row: ');
        ticket.seat = +question('seat: ');
        ticket.t_session_id = +question('t_session_id: ');

        return ticket;
    }

}