import model
from prettytable import PrettyTable

def show_main_screen():
    print("Tables:")
    for elem in model.tables:
        print("\t"+elem)
    show_commands_menu()

def show_commands_menu():
    print("Commands:")
    print("\t<table name> - edit table mod")
    print("\t\tadd - add new row in table")
    print("\t\tedit - edit row in table")
    print("\t\tdelete - delete row from table (if id = 'all' - delete table)")
    print("\tgenerate - generate random n rows")
    print("\tselect - select menu")

def show_select_menu():
    print("____________________________________________________________________")
    print("1.Select viewer with special age who watch film with special date")
    print("2.Select hall with special seats and rows")
    print("____________________________________________________________________")


def show_result_of_select_first(rows):
    th = ["viewer_id", "v_name", "v_age"]
    table = PrettyTable(th)
    for elem in rows:
        td = [elem[0],elem[1],elem[2]]
        table.add_row(td)
    print(table)

def show_result_of_select_secound(rows):
    th = ["hall_id", "hall_name", "row_count", "seats_in_row"]
    table = PrettyTable(th)
    for elem in rows:
        td = [elem[0], elem[1], elem[2], elem[3]]
        table.add_row(td)
    print(table)
