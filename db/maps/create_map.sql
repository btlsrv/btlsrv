INSERT INTO maps (user_id)
VALUES ($1)
returning *;