import view
table_size = {
    "film" or "hall" or "session" or "ticket": 4,
    "view" or "viewer": 3,
}
heads = {
    "film": ["film_id", "f_name", "f_genre", "f_date"],
    "hall": ["hall_id", "hall_name", "row_count", "seats_in_row"],
    "session": ["session_id", "time", "s_film_id", "s_hall_id"],
    "ticket": ["ticket_id", "row", "seat", "t_session_id"],
    "view": ["view_id", "v_viewer_id", "v_film_id"],
    "viewer": ["viewer_id", "v_name", "v_age"]
}

def try_mode_command():
    command = input(">")
    if command == search_table(command):
        table_eit_mode(command)
    elif command == "generate":
        view.model.generate_random_rows()
    elif command == "select":
        _select()

def table_eit_mode(table_name):
    command = input(">")
    if command == "add":
        _add(table_name)
    elif command == "edit":
        _edit(table_name)
    elif command == "delete":
        _delete(table_name)

def _add(table_name):
    array = []
    list = heads.get(table_name)
    i = 0
    while i < table_size.get(table_name):
        array.append(input(str(list)+"\n>"))
        i = i + 1
    view.model.create_new_row_in_table(table_name, array)

def _edit(table_name):
    id = input("id = ")
    column = input("column = ")
    newvalue = input("new value = ")
    view.model.edit_row_in_table(table_name, id, column, newvalue)

def _delete(table_name):
    id = input("id = ")
    view.model.delete_row_from_table(table_name, id)

def search_table(command):
    for name in view.model.tables:
        if command == name:
            return name

def _select():
    view.show_select_menu()
    command = input(">")
    if command == '1':
        view.show_result_of_select_first(view.model.select(command))
    elif command == '2':
        view.show_result_of_select_secound(view.model.select(command))