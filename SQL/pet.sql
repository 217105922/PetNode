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
	('last one', '../img/dog.jpg',"The first dogs here",1),
(' one', '../img/dog.jpg',"The first dogs here",2),
('e', '../img/dog.jpg',"The first dogs here",3)
  