SELECT u.username, u.victories, u.defeats
FROM users u
JOIN factions f
ON u.faction_id = f.faction_id
WHERE f.faction_id = $1
ORDER BY victories DESC
LIMIT 10;