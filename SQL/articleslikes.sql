CREATE TABLE public.articleslikes (
	id serial4 NOT NULL,
	articleID int4 NOT NULL,
	userID int4 NOT NULL,
	CONSTRAINT articleslikes_pkey PRIMARY KEY (id),
  CONSTRAINT NoDuplicateLike  UNIQUE (articleID, userID)
);