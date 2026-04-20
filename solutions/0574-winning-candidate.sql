SELECT Name FROM Candidate 
JOIN
(SELECT CandidateID
FROM Vote
GROUP BY CandiateId
ORDER BY Count(*) DESC
lIMIT 1) AS T1
ON Candidate.id=T1.CandidateId