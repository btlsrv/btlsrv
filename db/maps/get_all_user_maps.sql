SELECT * FROM maps
WHERE user_id = $1 AND name IS NOT NULL;