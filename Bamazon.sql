create database if not EXISTS bamazonProducts_db;

use bamazonProducts_db;

create table products (
  item_id integer(10) auto_increment not null,
  product_name varchar(50) not null,
  department_name varchar(50) not null,
  price float(10),
  stock_quantity integer(10),
  primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("Diapers", "babies", 19.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Baby Wipes", "babies", 4.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Baby Formula", "babies", 19.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Pacifier", "babies", 3.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Toys", "babies", 6.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("PS4", "Gaming", 299.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Switch", "Gaming", 249.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("PS4 Controller", "Gaming", 49.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Monster Hunter", "Gaming", 59.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Switch Case", "Gaming", 14.99, 10);

select * from products;