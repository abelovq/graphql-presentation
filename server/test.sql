PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
ANALYZE sqlite_master;
ANALYZE sqlite_master;
CREATE TABLE IF NOT EXISTS "books"(
	"id"       Integer NOT NULL PRIMARY KEY,
	"title"    Text NOT NULL,
	"authorId" Integer NOT NULL,
	CONSTRAINT "lnk_authors_books" FOREIGN KEY ( "authorId" ) REFERENCES "authors"( "id" )
,
CONSTRAINT "unique_id" UNIQUE ( "id" ) );
INSERT INTO books VALUES(1,'Мартин Иден',1);
INSERT INTO books VALUES(2,'Горе от ума',2);
INSERT INTO books VALUES(3,'asdasd',3);
INSERT INTO books VALUES(4,'asdasd1312',3);
INSERT INTO books VALUES(5,'asdasd1312',3);
INSERT INTO books VALUES(6,'asdasd1312',3);
INSERT INTO books VALUES(7,'На игле',3);
CREATE TABLE IF NOT EXISTS "authors"(
	"id"        Integer NOT NULL PRIMARY KEY,
	"firstName" Text NOT NULL,
	"lastName"  Text NOT NULL,
CONSTRAINT "unique_id" UNIQUE ( "id" ) );
INSERT INTO authors VALUES(1,'Джек','Лондон');
INSERT INTO authors VALUES(2,'Александр','Грибоедов');
INSERT INTO authors VALUES(3,'','asdasdasd');
INSERT INTO authors VALUES(4,'','asdasdasd');
INSERT INTO authors VALUES(5,'','asdasdasd');
INSERT INTO authors VALUES(6,'','asdasdasd');
INSERT INTO authors VALUES(7,'Ирвин','Уэлш');
CREATE INDEX "index_id" ON "books"( "id" );
CREATE INDEX "authors_id_idx" ON "authors"( "id" );
COMMIT;
