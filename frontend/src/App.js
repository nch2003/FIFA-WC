import React from 'react'
import Login from "./LoginPage";
import SignUp from "./SignUp";
import Home from "./components/Home";
import Teams from "./components/Teams"
import TeamDetails from "./components/TeamDetails"
import Matches from './components/Matches';
import MatchDetails from './components/MatchDetails';
import InsertTeam from "./components/InsertTeam";
import InsertPlayer from './components/InsertPlayer';
import UpdateTeam from './components/UpdateTeam';
import UpdatePlayer from './components/UpdatePlayer';
import Stadiums from './components/Stadiums';
import PlayersPage from './components/PlayersPage';
import Statistics from './components/Statistics';
import MatchDet from './components/MatchDet';
import MatchesWithStadiums from './components/MatchesWithStadiums';
import PlayersWithStats from './components/PlayerWithStats';

import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/teams" element={<Teams />}></Route>
        <Route path="/teams/:teamName" element={<TeamDetails />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/matchdetails/:matchId" element={<MatchDetails />} />
        <Route path="/insert-team" element={<InsertTeam />} />
        <Route path="/teams/:teamName/insert-player" element={<InsertPlayer/>} />
        <Route path="/update-team/:teamName" element={<UpdateTeam />} />
        <Route path="teams/:teamName/players/:playerId" element={<UpdatePlayer />} />
        <Route path="/stadiums" element={<Stadiums />} />
        <Route path="/players" element={<PlayersPage />}></Route>
        <Route path="/stat/matches" element={<Statistics />}></Route>
        <Route path="/match-details" element={<MatchDet />} />
        <Route path="/matches-with-stadiums" element={<MatchesWithStadiums />} />
        <Route path="/players-with-stats" element={<PlayersWithStats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
