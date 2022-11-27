# Miniour
Miniour is currently working and defining what I want to do, but I decide that I want to create something.


# Database Intruccions

For create a database, you need to do the following sql sentence.

```sql
CREATE SCHEMA `miniour` DEFAULT CHARACTER SET utf8 ;
```
In python django you need to create all the database infrastructure, if you start the project for first time, you have to do the migration with the following instructions.

```bash
python ./backend/manage.py migrate
```

# User management
Django have the tools that allow to create a new admin user, for do that 
you need to do the following bash command.

```bash
python ./backend/manage.py createsuperuser 
```