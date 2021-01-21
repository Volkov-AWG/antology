CREATE TABLE anthologyTree
(
    id SERIAL,
    name character varying(100) NOT NULL,
    content jsonb NOT NULL,
    description character varying(256),
    DCreate TIMESTAMP DEFAULT NOW(),
    CONSTRAINT anthologyTree_key PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE anthologyTree
    OWNER to postgres;