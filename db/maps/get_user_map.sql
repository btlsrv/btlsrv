SELECT * 
FROM maps m
JOIN modules2 m2
ON m.map_id = m2.map_id
JOIN modules3a m3a
ON m.map_id = m3a.map_id
JOIN modules3b m3b
ON m.map_id = m3b.map_id
JOIN modules4 m4
ON m.map_id = m4.map_id
JOIN modules5 m5
ON m.map_id = m5.map_id
WHERE m.map_id = $1;