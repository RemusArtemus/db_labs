export class View {
    static mainMenu(): void {
        console.log('_____________________________________________________________');
        console.log('Database controller program\n');
        console.log('1. Table Film');
        console.log('2. Table Viewer');
        console.log('3. Table View');
        console.log('4. Table Hall');
        console.log('5. Table Session');
        console.log('6. Table Ticket');
        console.log('_____________________________________________________________');
    }

    static actionWithTable(tableName: string): void {
        console.log('_____________________________________________________________');
        console.log(`Table ${tableName}:\n`);
        console.log('1 add data');
        console.log('2 edit data');
        console.log('3 remove data');
        console.log('4 show data');
        console.log('_____________________________________________________________');
    }
}