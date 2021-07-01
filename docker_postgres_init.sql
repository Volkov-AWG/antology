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

insert into anthologyTree(name, content, description) values('demo tree','[
    {
        name: ''node1'', id: 1,
        children: [
            { name: ''child1'', id: 2 },
            { name: ''child2'', id: 3 }
        ]
    },
    {
        name: ''node2'', id: 4,
        children: [
            { name: ''child3'', id: 5 }
        ]
    }
]', 'default test tree');