CREATE DATABASE "Dataminr" 
    WITH  OWNER = postgres 
    ENCODING = 'UTF8' 

TABLESPACE = pg_default

CREATE TABLE IF NOT EXISTS public."Tasks"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    task_id character varying(13) COLLATE pg_catalog."default" NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    CONSTRAINT "Tasks_pkey" PRIMARY KEY (task_id)
        INCLUDE(task_id),
    CONSTRAINT "Tasks_task_id_key" UNIQUE (task_id)
)

CREATE TABLE IF NOT EXISTS public."Tasklist"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    tasklist_id character varying(13) COLLATE pg_catalog."default" NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    CONSTRAINT "Tasklist_pkey" PRIMARY KEY (tasklist_id)
        INCLUDE(tasklist_id),
    CONSTRAINT "Tasklist_tasklist_id_key" UNIQUE (tasklist_id)
)

CREATE TABLE IF NOT EXISTS public."TasklistMap"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    tasklist_id character varying(13) COLLATE pg_catalog."default" NOT NULL,
    task_id character varying(13) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT "TasklistMap_pkey" PRIMARY KEY (id)
        INCLUDE(id),
    CONSTRAINT "TasklistMap_tasklist_id_task_id_key" UNIQUE (tasklist_id, task_id),
    CONSTRAINT task_id FOREIGN KEY (task_id)
        REFERENCES public."Tasks" (task_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT tasklist_id FOREIGN KEY (tasklist_id)
        REFERENCES public."Tasklist" (tasklist_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)