insert into users (username, email, password, profile_pic, faction_id)
VALUES (${username}, ${email}, ${hash}, ${profile_pic}, ${faction_id})
RETURNING *;