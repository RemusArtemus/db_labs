import controller

controller.view.show_main_screen()
controller.try_mode_command()
controller.view.model.connection.commit()
controller.view.model.connection.close()