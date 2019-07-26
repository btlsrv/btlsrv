DELETE FROM modules2
WHERE map_id = $1;

DELETE FROM modules3a
WHERE map_id = $1;

DELETE FROM modules3b
WHERE map_id = $1;

DELETE FROM modules4
WHERE map_id = $1;

DELETE FROM modules5
WHERE map_id = $1;

DELETE FROM maps
WHERE map_id = $1;