SELECT m.message, u.username, m.message_id, fr.forum_id 
FROM messages m 
JOIN users u
ON m.user_id = u.user_id
JOIN forums fr
ON m.forum_id = fr.forum_id
JOIN factions fa
ON fr.faction_id = fa.faction_id
WHERE fa.faction_id = $1;