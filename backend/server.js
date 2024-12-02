const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "secret", // Replace with a strong secret
    resave: false, // Prevent unnecessary session save
    saveUninitialized: true, // Save uninitialized sessions
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
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

      // Save user details in session
      req.session.user = {
        user_ID: user.user_ID,
        username: user.username,
        email: user.email,
        admin: user.admin, // Save admin value
      };
      return res.json({
        message: "Login successful",
        user: req.session.user, // Extract the user details
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

// Assuming you have a MySQL database connection set up as `db`
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

// Fetch players by team name
app.get("/teams/:teamName/players", (req, res) => {
  const teamName = req.params.teamName;
  const sql = `
    SELECT players.* 
    FROM players 
    INNER JOIN teams ON players.team_id = teams.team_id 
    WHERE teams.name = ?`;

  db.query(sql, [teamName], (err, data) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json(data);
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

    // Transformă rezultatul într-un array real
    const matches = Array.isArray(results) ? results : Array.from(results);

    // Gruparea meciurilor pe zile
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
        t1.name AS team1_name, 
        t2.name AS team2_name, 
        m.stage,
        s.score_team1, 
        s.score_team2,
        s.possesion_team1,
        s.possesion_team2
    FROM matches m
    INNER JOIN teams t1 ON m.team1_id = t1.team_id
    INNER JOIN teams t2 ON m.team2_id = t2.team_id
    INNER JOIN statistics s ON m.match_id = s.match_id
    WHERE m.match_id = ?
  `;

  db.query(query, [matchId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching match details");
    } else {
      res.json(results[0]); // Return a single match
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
    res.json(results[0]); // Send the user data to the frontend
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
  const sql = "DELETE FROM Teams WHERE name = ?";
  db.query(sql, [teamName], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting the team.");
    } else {
      res.send("Team deleted successfully.");
    }
  });
});

// Add player route
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

// server.js
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


app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
