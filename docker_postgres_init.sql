CREATE TABLE anthologyTree
(
    id SERIAL,
    name character varying(100) NOT NULL,
    description character varying(256),
    content jsonb NOT NULL,
    DCreate TIMESTAMP DEFAULT NOW(),
    CONSTRAINT anthologyTree_key PRIMARY KEY (id)
);
Create table branch
(
	id serial,
	treeID int not null,
	keys character varying(256),
	CONSTRAINT branch_key PRIMARY KEY (id)
);
Create table urlList
(
	id serial,
	treeID int not null,
	branchID int not null,
	name character varying(5000),
	annotation character varying(5000),
	link character varying(5000),
	authors character varying(5000),
	journal character varying(5000),
	journal_link character varying(5000),
	CONSTRAINT urlList_key PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE anthologyTree
    OWNER to postgres;

insert into anthologyTree(name, description, content) values('demo tree', 'default demo tree','
    {
        "value": "main demo",
        "id": 1,
        "child": [
          {
            "value": " second demo1",
            "id": 2,
            "child": [
              {
                "value": "third demo1",
                "id": 3
              },
              {
                "value": "third demo2",
                "id": 4
              }
            ]
          },
          {
            "value": " second demo2",
            "id": 5,
            "child": [
              {
                "value": "fourth demo1",
                "id": 6
              },
              {
                "value": "fourth demo2",
                "id": 7
              }
            ]
          }
        ]
      }
');
insert into branch(treeid, keys) values (1, 'main demo second demo1 third demo 1'),
                                        (1, 'main demo second demo1 third demo 2'),
                                        (1, 'main demo second demo2 fourth demo1'),
                                        (1, 'main demo second demo1 fourth demo2');
insert into urllist(treeid, branchid, name, annotation, link, authors, journal, journal_link) values 
(1,1, 'имя1','аннотация','www.ssilka1.ru','здесь был автор','название сбежало','www.ssilka2.ru'),
(1,1, 'имя2','аннотация','www.ssilka3.ru','здесь был автор','название сбежало','www.ssilka4.ru'),
(1,2, 'имя3','аннотация','www.ssilka5.ru','здесь был автор','название сбежало','www.ssilka6.ru'),
(1,2, 'имя4','аннотация','www.ssilka7.ru','здесь был автор','название сбежало','www.ssilka8.ru'),
(1,3, 'имя5','аннотация','www.ssilka9.ru','здесь был автор','название сбежало','www.ssilka10.ru'),
(1,3, 'имя6','аннотация','www.ssilka11.ru','здесь был автор','название сбежало','www.ssilka12.ru'),
(1,4, 'имя7','аннотация','www.ssilka13.ru','здесь был автор','название сбежало','www.ssilka14.ru'),
(1,4, 'имя8','аннотация','www.ssilka15.ru','здесь был автор','название сбежало','www.ssilka16.ru');
