CREATE TABLE public.Codes (
	id serial4 NOT NULL,
	code varchar(32) NOT NULL,
	authorid int4 NULL,
  datecreated timestamp NOT NULL DEFAULT now(),
	datemodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT Codes_pkey PRIMARY KEY (id),
  CONSTRAINT Codes_Ukey UNIQUE (code)
);




INSERT INTO Codes (code) VALUES
	('AJFAOFJ')