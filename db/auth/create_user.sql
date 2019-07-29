insert into users (username, email, password, profile_pic, faction_id, victories, defeats)
VALUES (${username}, ${email}, ${hash}, ${profile_pic}, ${faction_id}, 0, 0)
RETURNING *;