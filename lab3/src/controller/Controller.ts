import { filmService } from '../services/z_filmService.js';
import { viewerService } from '../services/z_viewerService.js';
import { viewService } from '../services/z_viewService.js';
import { hallService } from '../services/z_hallService.js';
import { sessionService } from '../services/z_sessionService.js';
import { ticketService } from '../services/z_ticketService.js';

import { View } from '../view/View.js';
import { Connection } from 'typeorm';
import { question } from 'readline-sync';

export class Controller {
    static async start(connection: Connection) {
        const film = new filmService(connection);
        const viewer = new viewerService(connection);
        const view = new viewService(connection);
        const hall = new hallService(connection);
        const session = new sessionService(connection);
        const ticket = new ticketService(connection);

        const tables: Array<string> = ['Film', 'Viewer', 'View', 'Hall', 'Session', 'Ticket'];

        while (true) {
            View.mainMenu();
            let table: number = +question('input: ');

            if (table < 1 || table > 6) {
                return;
            } else {
                View.actionWithTable(tables[table - 1]);

                switch (table) {
                    case 1: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await film.add_data_film();
                                break;
                            }
                            case 2: {
                                await film.edit_data_film();
                                break;
                            }
                            case 3: {
                                await film.delete_data_film();
                                break;
                            }
                            case 4: {
                                await film.show_film_data();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 2: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await viewer.add_data_viewer();
                                break;
                            }
                            case 2: {
                                await viewer.edit_data_viewer();
                                break;
                            }
                            case 3: {
                                await viewer.delete_data_viewer();
                                break;
                            }
                            case 4: {
                                await viewer.show_viewer_data();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 3: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await view.add_data_view();
                                break;
                            }
                            case 2: {
                                await view.edit_data_view();
                                break;
                            }
                            case 3: {
                                await view.delete_data_view();
                                break;
                            }
                            case 4: {
                                await view.show_data_view();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 4: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await hall.add_data_hall();
                                break;
                            }
                            case 2: {
                                await hall.edit_data_hall();
                                
                                break;
                            }
                            case 3: {
                                await hall.delete_data_hall();
                                break;
                            }
                            case 4: {
                                await hall.show_hall_data();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 5: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await session.add_data_session();
                                break;
                            }
                            case 2: {
                                await session.edit_data_session();
                                break;
                            }
                            case 3: {
                                await session.delete_data_session();
                                break;
                            }
                            case 4: {
                                await session.show_data_session();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 6: {
                        let action: number = +question('input: ');

                        switch (action) {
                            case 1: {
                                await ticket.add_data_ticket();
                                break;
                            }
                            case 2: {
                                await ticket.edit_data_ticket();
                                break;
                            }
                            case 3: {
                                await ticket.delete_data_ticket();
                                break;
                            }
                            case 4: {
                                await ticket.show_data_ticket();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        
                        break;
                    }
                    default: {
                        return;
                    }
                }
            }
        }
    }
}