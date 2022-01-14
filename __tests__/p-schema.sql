create extension if not exists unaccent;

drop schema if exists p cascade;

create schema p;


create table p.filterable (
  id serial primary key,
  "char4" char(4),
  "text" text,
  "varchar64" varchar(64)
);
