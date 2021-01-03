DELIMITER  &&

DROP PROCEDURE IF EXISTS CreateComment;
CREATE PROCEDURE CreateComment(
	IN bodyIn TEXT,
    IN createdIn DATE,
    IN titleIn VARCHAR(250),
    IN ratingIn INT,
    IN product_idIn INT,
	IN userNameIn VARCHAR(255)
)
BEGIN 
	DECLARE reviewer INT DEFAULT -1;
    SELECT id_reveiwer INTO reviewer FROM phone_db.reveiwer WHERE username = userNameIn LIMIT 1;
    
    IF reviewer < 0 THEN
		INSERT INTO phone_db.reveiwer(username) VALUES (userNameIn);
        SELECT LAST_INSERT_ID() INTO reviewer;
	END IF;
    
    INSERT INTO phone_db.comment(body, created, title, rating, product_id, reviewer_id) 
    VALUES(bodyIn, createdIn, titleIn, ratingIn, product_idIn, reviewer);
END &&
DELIMITER ;