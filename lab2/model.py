import psycopg2
import time

connection = psycopg2.connect(
  dbname='cinema',
  user='postgres',
  password='3miners1creeper',
  host='127.0.0.1'
)

cursor = connection.cursor()

tables = ["film", "hall", "session", "ticket", "view", "viewer"]

def create_new_row_in_table(name, args):
  sql_query = "insert into "
  for el in args:
    if el == args[0]:
      sql_query = sql_query + name + " values( " + str(el) + ", "
    elif el != args[len(args)-1]:
      sql_query = sql_query + str(el) + ", "
    else:
      sql_query = sql_query + str(el) + ");"
  try:
    cursor.execute(sql_query)
    print("In table" + name + " has been aded new row")
  except psycopg2.Error as err:
    print(err.pgerror)

def delete_row_from_table(name, id):
  sql_query = "delete from " + name
  if id != "all":
    sql_query = sql_query + " where " + name +"_id = " + str(id) + ";"
  else:
    sql_query = sql_query + ";"
  print(sql_query)
  try:
    cursor.execute(sql_query)
    print("Row with id = " + id + " has been delete")
  except psycopg2.Error as err:
    print(err.pgerror)

def edit_row_in_table(name, id, column, newvalue):
  if id == 0:
    sql_query\
      = "update " + name + " set " + column + " = " + newvalue + ";"
  else:
    sql_query = "update " + name + " set " + column + " = " + newvalue + " where " + name+"_id = " + str(id) + ";"
  try:
    cursor.execute(sql_query)
    print("Row with id = " + id + "and in column" + column + " has been changed")
  except psycopg2.Error as err:
    print(err.pgerror)

def generate_random_rows():
  num = input("Number = ")
  sql_query = "insert into viewer (v_name, v_age) " \
              "select substr(characters, (random()*length(characters)+1 )::integer, 10), " \
              "(12+random()*70)::int " \
              "from (values ('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM')) as symbols(characters), " \
              "generate_series(1," + num + ");"
  try:
    cursor.execute(sql_query)
    print(num + "rows in table \"viewer\" has been generated")
  except psycopg2.Error as err:
    print(err.pgerror)

def select(num):
  sql_query = " "
  start_time = time.time()
  if num == '1':
    sql_query = "with usr as ( "\
                "select * from viewer where v_age > 10 and v_age < 17 "\
                "), fm as ( "\
                "select * from film where (year > \'2001-01-01\') and (year < \'2005-01-01\') ) "\
                "select * from usr;"
  else:
    sql_query = "select * from hall  where (seats_in_row > 10 and row_count < 22)"
  try:
    cursor.execute(sql_query)
    print("Time(ms):", 1000*(time.time() - start_time))
    return  cursor.fetchall()
  except psycopg2.Error as err:
    print(err.pgerror)

