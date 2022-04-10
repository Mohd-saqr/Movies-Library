-- DROP TABLE IF EXISTS famovis;
-- CREATE TABLE IF NOT EXISTS famovis(
--     id SERIAL PRIMARY KEY,
--     title text,
--     overview text,
--     imgurl varchar(512),
--     release_date varchar(256),
--     rate float , 
--     lang varchar(256),
--     vot_count float
-- );
DROP TABLE IF EXISTS trending;
CREATE TABLE IF NOT EXISTS trending(
    id SERIAL PRIMARY KEY,
    title text,
    overview text,
    imgurl varchar(512),
    release_date varchar(256),
    rate float , 
    lang varchar(256),
    vot_count float
);