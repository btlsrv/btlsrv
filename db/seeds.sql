CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25),
    email VARCHAR,
    password VARCHAR,
    profile_pic TEXT,
    faction_id INTEGER REFERENCES factions(faction_id),
    victories INTEGER,
    defeats INTEGER
);

CREATE TABLE factions (
    faction_id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE maps (
    map_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(users_id),
    name VARCHAR
);

CREATE TABLE modules2 (
    mod2_id SERIAL PRIMARY KEY,
    map_id INTEGER REFERENCES maps(map_id),
    m2_position1 INTEGER,
    m2_position2 INTEGER
);

CREATE TABLE modules3a (
    mod3a_id SERIAL PRIMARY KEY,
    map_id INTEGER REFERENCES maps(map_id),
    m3a_position1 INTEGER,
    m3a_position2 INTEGER,
    m3a_position3 INTEGER
);

CREATE TABLE modules3b (
    mod3b_id SERIAL PRIMARY KEY,
    map_id INTEGER REFERENCES maps(map_id),
    m3b_position1 INTEGER,
    m3b_position2 INTEGER,
    m3b_position3 INTEGER
);

CREATE TABLE modules4 (
    mod4_id SERIAL PRIMARY KEY,
    map_id INTEGER REFERENCES maps(map_id),
    m4_position1 INTEGER,
    m4_position2 INTEGER,
    m4_position3 INTEGER,
    m4_position4 INTEGER
);

CREATE TABLE modules5 (
    mod5_id SERIAL PRIMARY KEY,
    map_id INTEGER REFERENCES maps(map_id),
    m5_position1 INTEGER,
    m5_position2 INTEGER,
    m5_position3 INTEGER,
    m5_position4 INTEGER,
    m5_position5 INTEGER
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(users_id),
    message VARCHAR
);

CREATE TABLE forms (
    from_id SERIAL PRIMARY KEY,
    faction_id INTEGER REFERENCES factions(faction_id),
    message_id INTEGER REFERENCES messages(message_id)
);