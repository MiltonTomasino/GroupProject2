This folder will contain the text to copy/paste into MySQL to create databases locally for testing.

MenuItems Table
- to create this table copy and paste the command located in menu-items-table-creation.txt into mysql and execute it
- to populate the table you will need to
        1. copy the menu-items-data.txt file to the /var/lib/mysql-files directory. 
                Use command: sudo scp <path to menu-items-data.txt> /var/lib/mysql-files/
        2. use a sql command to load the data into the table
                Use command: LOAD DATA INFILE '/var/lib/mysql-files/menu-items-data.txt' INTO TABLE MenuItems FIELDS TERMINATED BY '|' ENCLOSED BY '"' LINES TERMINATED BY '\n';
