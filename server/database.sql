CREATE DATABASE team-work;

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255),
    jobRole VARCHAR(255),
    department VARCHAR(255),
    is_admin BOOLEAN NOT NULL DEFAULT false,
    address VARCHAR(255),
    created_at  DATE NOT NULL,
    updated_at  DATE NOT NULL);


--Insert fake users
     INSERT INTO users (firstname,
     lastname,
    email,
    password,
     gender,
      jobRole,
    department,
    isAdmin,
     address)
      VALUES ('goodness', 'aig', 'goodness@gmail.com','password', 'male', 'None', 'develope', true ,'No 7 eyaen, benin city');

      CREATE TABLE gifs (
        gif_id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL,
        public_id varchar NOT NULL,
        created_at timestamp with time zone NOT NULL,
        user_id SERIAL NOT NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users (id));






        -- Table: public.gifs

-- DROP TABLE IF EXISTS public.gifs;

CREATE TABLE IF NOT EXISTS public.gifs
(
    gif_id integer NOT NULL DEFAULT nextval('gifs_gif_id_seq'::regclass),
    title character varying(128) COLLATE pg_catalog."default" NOT NULL,
    image_url character varying(128) COLLATE pg_catalog."default" NOT NULL,
    public_id character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL,
    user_id integer NOT NULL DEFAULT nextval('gifs_user_id_seq'::regclass),
    CONSTRAINT gifs_pkey PRIMARY KEY (gif_id),
    CONSTRAINT gifs_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.gifs
    OWNER to postgres;