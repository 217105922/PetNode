CREATE TABLE public.dogs (
	id serial4 NOT NULL,
	title varchar(32) NOT NULL,
	summary text NULL,
	imageurl varchar(2048) NULL,
	authorid int4 NULL,
	CONSTRAINT dogs_pkey PRIMARY KEY (id),
);


datecreated timestamp NOT NULL DEFAULT now(),
	datemodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

INSERT INTO dogs (title,alltext,imageurl,summary,authorid) VALUES
	('Labrador Retriever',' ', '../img/dog.jpg','The first dogs here',1),
(' French Bulldog',' ', '../img/dog.jpg','The first dogs here',1),
('German Shepherd',' ', '../img/dog.jpg','The first dogs here',1),
('Golden Retriever',' ', '../img/dog.jpg','The first dogs here',1),
('English Bulldog',' ', '../img/dog.jpg','The first dogs here',1),
('Poodle',' ', '../img/dog.jpg','The first dogs here',1),
('Beagle',' ', '../img/dog.jpg','The first dogs here',1),
('Rottweiler',' ', '../img/dog.jpg','The first dogs here',1),
('German Shorthaired Pointer', ' ','../img/dog.jpg','The first dogs here',1),
('Dachshund', ' ','../img/dog.jpg','The first dogs here',1)