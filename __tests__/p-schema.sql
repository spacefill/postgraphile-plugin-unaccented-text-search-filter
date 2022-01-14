create extension if not exists unaccent;

drop schema if exists p cascade;

create schema p;


create table p.filterable (
  id serial primary key,
  "bpchar4" bpchar(4),
  "char4" char(4),
  "text" text,
  "varchar" varchar,
  "varchar64" varchar(64)
);
