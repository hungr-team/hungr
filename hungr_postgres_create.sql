SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.users (
    "_id" serial NOT NULL,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    "radius" bigint DEFAULT 800,
    CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (OIDS=FALSE);

CREATE TABLE public.restaurants (
    "_id" serial NOT NULL,
    "restaurant" varchar NOT NULL,
    CONSTRAINT "restaurants_pk" PRIMARY KEY ("_id")
) WITH (OIDS=FALSE);

CREATE TABLE public.food_types (
    "_id" serial NOT NULL,
    "food_type" varchar NOT NULL,
    CONSTRAINT "food_types_pk" PRIMARY KEY ("_id")
) WITH (OIDS=FALSE);

CREATE TABLE public.user_food_prefs (
    "_id" serial NOT NULL,
    "user_id" bigint NOT NULL,
    "food_type_id" bigint NOT NULL,
    CONSTRAINT "user_food_prefs_pk" PRIMARY KEY ("_id")
) WITH (OIDS=FALSE);

CREATE TABLE public.liked_restaurants (
    "_id" serial NOT NULL,
    "user_id" bigint NOT NULL,
    "restaurant_id" bigint NOT NULL,
    CONSTRAINT "liked_restaurants_pk" PRIMARY KEY ("_id")
) WITH (OIDS=FALSE);

CREATE TABLE public.blocked_restaurants (
    "_id" serial NOT NULL,
    "user_id" bigint NOT NULL,
    "restaurant_id" bigint NOT NULL,
    CONSTRAINT "blocked_restaurants_pk" PRIMARY KEY ("_id")
) WITH (OIDS=FALSE);

ALTER TABLE public.user_food_prefs ADD CONSTRAINT "user_food_prefs_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.user_food_prefs ADD CONSTRAINT "user_food_prefs_fk1" FOREIGN KEY ("food_type_id") REFERENCES public.food_types("_id");

ALTER TABLE public.liked_restaurants ADD CONSTRAINT "liked_restaurants_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.liked_restaurants ADD CONSTRAINT "liked_restaurants_fk1" FOREIGN KEY ("restaurant_id") REFERENCES public.restaurants("_id");

ALTER TABLE public.blocked_restaurants ADD CONSTRAINT "blocked_restaurants_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.blocked_restaurants ADD CONSTRAINT "blocked_restaurants_fk1" FOREIGN KEY ("restaurant_id") REFERENCES public.restaurants("_id");

INSERT INTO public.food_types VALUES (0, 'Italian');
INSERT INTO public.food_types VALUES (1, 'Chinese');
INSERT INTO public.food_types VALUES (2, 'Vietnamese');
INSERT INTO public.food_types VALUES (3, 'American');
INSERT INTO public.food_types VALUES (4, 'Thai');
INSERT INTO public.food_types VALUES (5, 'Japanese');
INSERT INTO public.food_types VALUES (6, 'Mediterranean');
INSERT INTO public.food_types VALUES (7, 'Middle Eastern');
INSERT INTO public.food_types VALUES (8, 'Indian');

