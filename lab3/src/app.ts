import "reflect-metadata";
import { createConnection } from "typeorm";
import { Controller } from "./controller/Controller.js";
import { Film } from "./entity/z_film.js";
import { Session } from "./entity/z_session.js";
import { _View } from "./entity/z_view.js";
import { Viewer } from "./entity/z_viewer.js";
import { Hall } from "./entity/z_hall.js";
import { Ticket } from "./entity/z_ticket.js";

createConnection({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "3miners1creeper",
    database: "cinema",
    entities: [ Film, Session, _View, Viewer, Hall, Ticket],
    synchronize: false,
    logging: false
}).then(async connection => {
    Controller.start(connection);
}).catch(error => console.log(error));


/* ???
QueryFailedError: повторяющееся значение ключа нарушает ограничение уникальности "u_hall_id"
    at new QueryFailedError (E:\for ARTEM\IT-shnik\JS\lab3\node_modules\typeorm\error\QueryFailedError.js:11:28)
    at Query.<anonymous> (E:\for ARTEM\IT-shnik\JS\lab3\node_modules\typeorm\driver\postgres\PostgresQueryRunner.js:235:38)
    at Query.handleError (E:\for ARTEM\IT-shnik\JS\lab3\node_modules\pg\lib\query.js:128:19)
    at Client._handleErrorMessage (E:\for ARTEM\IT-shnik\JS\lab3\node_modules\pg\lib\client.js:326:17)
    at Connection.emit (node:events:376:20)
    at E:\for ARTEM\IT-shnik\JS\lab3\node_modules\pg\lib\connection.js:109:12
    at Parser.parse (E:\for ARTEM\IT-shnik\JS\lab3\node_modules\pg-protocol\dist\parser.js:40:17)
    at Socket.<anonymous> (E:\for ARTEM\IT-shnik\JS\lab3\node_modules\pg-protocol\dist\index.js:10:42)
    at Socket.emit (node:events:376:20)
    at addChunk (node:internal/streams/readable:311:12) {
  length: 357,
  severity: 'ОШИБКА',
  code: '23505',
  detail: 'Ключ "(s_hall_id)=(3)" уже существует.',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'session',
  column: undefined,
  dataType: undefined,
  constraint: 'u_hall_id',
  file: 'd:\\pginstaller_12.auto\\postgres.windows-x64\\src\\backend\\access\\nbtree\\nbtinsert.c',
  line: '570',
  routine: '_bt_check_unique',
  query: 'INSERT INTO "session"("time", "s_film_id", "s_hall_id") VALUES ($1, $2, $3) RETURNING "session_id"',
  parameters: [ 2021-02-28T22:00:00.000Z, 2, 3 ]
}
*/