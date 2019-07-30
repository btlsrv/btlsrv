SELECT u.username, u.victories, u.defeats, u.faction_id
FROM users u
ORDER BY victories DESC
LIMIT 10;