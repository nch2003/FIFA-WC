const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "secret", 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Fifa_WC",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO users (username, email, password) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json({ error: err });
    }
    console.log(data);
    if (data.length > 0) {
      const user = data[0];
      req.session.user = {
        user_ID: user.user_ID,
        username: user.username,
        email: user.email,
        admin: user.admin,
      };
      return res.json({
        message: "Login successful",
        user: req.session.user,
      });
    } else {
      return res.json("Invalid credentials");
    }
  });
});

app.get("/teams", (req, res) => {
  const sql = "SELECT * FROM teams";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json(data);
  });
});

app.get("/teams/:teamName", (req, res) => {
  const { teamName } = req.params;
  const query = "SELECT name, coach FROM Teams WHERE name = ?";
  db.query(query, [teamName], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(result[0]);
  });
});

app.get("/teams/:teamName/players", (req, res) => {
  const { teamName } = req.params;
  const sql = `
    SELECT * 
    FROM players 
    WHERE team_id = (
        SELECT team_id 
        FROM teams 
        WHERE name = ?
    )
  `;
  db.query(sql, [teamName], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(data);
  });
});

app.get("/matches", (req, res) => {
  const sql = `
        SELECT m.match_id AS match_id,
            DATE_FORMAT(match_date, '%W %d %M %Y') AS match_day,
            t1.name AS team1_name, 
            t2.name AS team2_name, 
            m.stage,
            s.score_team1,
            s.score_team2
        FROM matches m
        INNER JOIN teams t1 ON m.team1_id = t1.team_id
        INNER JOIN teams t2 ON m.team2_id = t2.team_id
        INNER JOIN statistics s ON m.match_id = s.match_id
        ORDER BY m.match_date, m.match_id;
    `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database query error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    const matches = Array.isArray(results) ? results : Array.from(results);
    const groupedMatches = matches.reduce((acc, match) => {
      if (!acc[match.match_day]) {
        acc[match.match_day] = [];
      }
      acc[match.match_day].push(match);
      return acc;
    }, {});
    res.json(groupedMatches);
  });
});

app.get("/matches/:matchId", (req, res) => {
  const matchId = req.params.matchId;
  const query = `
    SELECT 
        m.match_id AS match_id,
        DATE_FORMAT(m.match_date, '%W %d %M %Y') AS match_day,
        (SELECT name FROM teams WHERE team_id = m.team1_id) AS team1_name,
        (SELECT name FROM teams WHERE team_id = m.team2_id) AS team2_name,
        m.stage,
        s.score_team1, 
        s.score_team2,
        s.possesion_team1,
        s.possesion_team2,
        st.name AS stadium_name
    FROM matches m
    INNER JOIN statistics s ON m.match_id = s.match_id
    INNER JOIN stadiums st ON m.stadium_id = st.stadium_id
    WHERE m.match_id = ?
  `;
  db.query(query, [matchId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching match details");
    } else {
      res.status(200).json(results[0]);
    }
  });
});


app.get("/current-user", (req, res) => {
  const query =
    "SELECT user_ID, username, email, admin FROM users WHERE user_ID = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching user data", error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(results[0]);
  });
});

app.post("/insert-team", (req, res) => {
  const { name, coach } = req.body;
  const sql = "INSERT INTO teams (name, coach) VALUES (?, ?)";
  db.query(sql, [name, coach], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert team." });
    }
    res.status(200).json({ message: "Team inserted successfully!" });
  });
});

app.delete("/teams/:teamName", (req, res) => {
  const teamName = req.params.teamName;
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: "Transaction start failed" });
    }
    const deletePlayersQuery =
      "DELETE FROM players WHERE team_id = (SELECT team_id FROM teams WHERE name = ?)";
    db.query(deletePlayersQuery, [teamName], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: "Error deleting players" });
        });
      }
      const deleteTeamQuery = "DELETE FROM teams WHERE name = ?";
      db.query(deleteTeamQuery, [teamName], (err, result) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: "Error deleting team" });
          });
        }
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: "Error committing transaction" });
            });
          }
          res
            .status(200)
            .send("Team and associated players deleted successfully");
        });
      });
    });
  });
});

app.post("/teams/:teamName/players", (req, res) => {
  const { teamName } = req.params;
  const { firstname, lastname, position, goals, assists, birth_date } =
    req.body;
  const getTeamIdQuery = "SELECT team_id FROM Teams WHERE name = ?";
  db.query(getTeamIdQuery, [teamName], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching team details" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }
    const team_id = result[0].team_id;
    const insertPlayerQuery = `
      INSERT INTO players (team_id, firstname, lastname, position, goals, assists, birth_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      insertPlayerQuery,
      [team_id, firstname, lastname, position, goals, assists, birth_date],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error adding player" });
        }
        res.status(200).json({ message: "Player added successfully!" });
      }
    );
  });
});

app.delete("/players/:playerId", (req, res) => {
  const { playerId } = req.params;
  const query = "DELETE FROM players WHERE player_id = ?";
  db.query(query, [playerId], (err, result) => {
    if (err) {
      console.error("Error deleting player", err);
      return res.status(500).send("Error deleting player");
    }
    return res.status(200).send("Player deleted successfully");
  });
});

app.get("/teams/:teamName", (req, res) => {
  const name = req.params.teamName;
  const query = "SELECT * FROM teams WHERE name = ?";
  db.query(query, [name], (err, result) => {
    if (err) res.status(500).send(err);
    else res.json(result[0]);
  });
});

app.put("/teams/:teamName", (req, res) => {
  const name = req.params.teamName;
  const { newName, coach } = req.body;
  const query = "UPDATE teams SET name = ?, coach = ? WHERE name = ?";
  db.query(query, [newName, coach, name], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Team updated successfully!");
  });
});

app.get("/teams/:teamName/players/:playerId", (req, res) => {
  const { teamName, playerId } = req.params;
  const query = `
    SELECT * 
    FROM players 
    WHERE player_id = ? AND team_id = (
        SELECT team_id 
        FROM teams 
        WHERE name = ?
    )
  `;
  db.query(query, [playerId, teamName], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json(data[0]);
  });
});

app.put("/teams/:teamName/players/:playerId", (req, res) => {
  const { teamName, playerId } = req.params;
  const { firstname, lastname, position, goals, assists, birth_date } =
    req.body;
  const query = `
    UPDATE players
    SET 
      firstname = ?, 
      lastname = ?, 
      position = ?, 
      goals = ?, 
      assists = ?, 
      birth_date = ?
    WHERE player_id = ? AND team_id = (
      SELECT team_id
      FROM teams
      WHERE name = ?
    )
  `;
  db.query(
    query,
    [
      firstname,
      lastname,
      position,
      goals,
      assists,
      birth_date,
      playerId,
      teamName,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating player:", err);
        return res.status(500).json({ error: "Error updating player" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Player not found" });
      }
      res.status(200).json({ message: "Player updated successfully" });
    }
  );
});

app.get("/stadiums", (req, res) => {
  const sql = "SELECT * FROM stadiums";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(data);
  });
});

app.get("/players", (req, res) => {
  const sql = `
    SELECT p.firstname, p.lastname, p.position, t.name AS team_name
    FROM players p
    JOIN teams t ON p.team_id = t.team_id;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/stat/matches", (req, res) => {
  const query = `
        SELECT m.match_id, DATE_FORMAT(m.match_date, '%W %d %M %Y') AS match_date, t1.name AS team1,
         t2.name AS team2, s.score_team1, s.score_team2, s.offsides, s.possesion_team1, s.possesion_team2
        FROM matches m
        INNER JOIN teams t1 ON m.team1_id = t1.team_id
        INNER JOIN teams t2 ON m.team2_id = t2.team_id
        INNER JOIN statistics s ON m.match_id = s.match_id;
  
    `;
  db.query(query, (err, results) => {
    if (err) {
      console.log("Eroare la executarea interogării:", err);
      res.status(500).send("Eroare la executarea interogării");
      return;
    }
    res.json(results);
  });
});

app.get("/player-matches/:playerId", (req, res) => {
  const { playerId } = req.params;
  const sql = `
    SELECT pm.match_id, m.match_date, pm.min_played, pm.goals, pm.assists
    FROM player_matches pm
    JOIN matches m ON pm.match_id = m.match_id
    WHERE pm.player_id = ?
  `;
  db.query(sql, [playerId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error fetching player match data" });
    }
    res.status(200).json(data);
  });
});




app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
