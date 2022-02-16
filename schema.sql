DROP TABLE IF EXISTS famovis;
CREATE TABLE IF NOT EXISTS famovis(
    id SERIAL PRIMARY KEY,
    title varchar(256),
    overview text,
    poster_path varchar(256),
    release_date varchar(256),
    comment varchar(256)
);