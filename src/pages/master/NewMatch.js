import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import JoditEditor from "jodit-react";
import {
  Box,
  Heading,
  Anchor,
  Button,
  Image,
  Input,
  Label,
  Icon,
  Text,
} from "../../components/elements";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import { BsFillTrash3Fill } from "react-icons/bs";
import * as API from "../../api/match";
import * as team from "../../api/team";
import * as player from "../../api/player";
import { toast } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";

export default function NewMatch() {
  const [form, setForm] = useState({
    tournament: "",
    matchNumber: "",
    matchName: "",
    venue: "",
    date: "",
    halfLength: "",
    extraTimeHalfLength: "",
    teamA: "",
    teamB: "",
    playersA: [],
    playersB: [],
    teamAEvents: [],
    teamBEvents: [],
    teamAScore: 0,
    teamBScore: 0,
    teamAPenalties: 0,
    teamBPenalties: 0,
    status: "upcoming",
  });

  const resetForm = () => {
    setForm({
      tournament: "",
      matchNumber: "",
      matchName: "",
      venue: "",
      date: "",
      halfLength: "",
      extraTimeHalfLength: "",
      teamA: "",
      teamB: "",
      playersA: [],
      playersB: [],
      teamAEvents: [],
      teamBEvents: [],
      teamAScore: 0,
      teamBScore: 0,
      teamAPenalties: 0,
      teamBPenalties: 0,
      status: "upcoming",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  const [selectedTournament, setSelectedTournament] = useState([]);
  const [selectedTeamA, setSelectedTeamA] = useState([]);
  const [selectedTeamB, setSelectedTeamB] = useState([]);
  const [selectedPlayersA, setSelectedPlayersA] = useState([]);
  const [selectedPlayersB, setSelectedPlayersB] = useState([]);

  const [teamAEvents, setTeamAEvents] = useState([]);
  const [teamBEvents, setTeamBEvents] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.getTournamentsList();
        setTournaments(data.tournamentList);

        const res = await team.getTeamsList();
        setTeams(res.data.teamsList);

        const response = await player.playerList();
        const temp = [];
        console.log("respnse", response.data.playersList);
        response.data.playersList.forEach((ele, index) => {
          temp.push({
            _id: ele._id,
            title: `${index + 1}. ${ele.name} (${ele.rollNo})`,
          });
        });
        console.log(temp);
        setPlayers(temp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      if (selectedTournament.length === 0) {
        toast.error("Please select Tournament");
        return;
      }
      if (!selectedTeamA || !selectedTeamB) {
        toast.error("Please select both Teams");
        return;
      }
      if (selectedTeamA === selectedTeamB) {
        toast.error("Teams must be different");
        return;
      }

      let temp = form;
      temp.tournament = selectedTournament[0]._id;
      temp.teamA = selectedTeamA[0]._id;
      temp.teamB = selectedTeamB[0]._id;
      selectedPlayersA.forEach((plr) => {
        if (!temp.teamA.includes(plr._id)) temp.playersA.push(plr._id);
      });
      selectedPlayersB.forEach((plr) => {
        if (!temp.teamB.includes(plr._id)) temp.playersB.push(plr._id);
      });
      setForm({ ...temp });

      const { data } = await API.createMatch(form);
      console.log(data);
      if (data.success) {
        toast.success("New match created");
        resetForm();
        setSelectedPlayersA([]);
        setSelectedPlayersB([]);
        setSelectedTeamA([]);
        setSelectedTeamB([]);
        setSelectedTournament([]);
      }
    } catch (error) {
      if (error.response.data.message) toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };

  console.log("players", selectedPlayersA);
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="new match"></Breadcrumb>
          </CardLayout>
        </Col>

        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col xl={12}>
                <Multiselect
                  options={tournaments}
                  singleSelect={true}
                  showCheckbox={true}
                  displayValue="name"
                  selectedValues={selectedTournament}
                  onSelect={(e) => {
                    setSelectedTournament(e);
                  }}
                  onRemove={(e) => {
                    setSelectedTournament([]);
                  }}
                  placeholder="Select Tournament"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="number"
                  label="match number"
                  fieldSize="w-100 h-md"
                  value={form.matchNumber}
                  onChange={handleChange}
                  name="matchNumber"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="text"
                  label="match name"
                  fieldSize="w-100 h-md"
                  value={form.matchName}
                  onChange={handleChange}
                  name="matchName"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="text"
                  label="venue"
                  fieldSize="w-100 h-md"
                  value={form.venue}
                  onChange={handleChange}
                  name="venue"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="date"
                  label="date"
                  fieldSize="w-100 h-md"
                  value={form.date}
                  onChange={handleChange}
                  name="date"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="number"
                  label="half length (in minutes)"
                  fieldSize="w-100 h-md"
                  value={form.halfLength}
                  onChange={handleChange}
                  name="halfLength"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="number"
                  label="extra time half length (in minutes)"
                  fieldSize="w-100 h-md"
                  value={form.extraTimeHalfLength}
                  onChange={handleChange}
                  name="extraTimeHalfLength"
                />
              </Col>
              <Col xl={6}>
                <Multiselect
                  options={teams}
                  displayValue="name"
                  selectedValues={selectedTeamA}
                  singleSelect={true}
                  onSelect={(e) => {
                    setSelectedTeamA(e);
                  }}
                  onRemove={(e) => setSelectedTeamA([])}
                  placeholder="Select Team A"
                />
              </Col>
              <Col xl={6}>
                <Multiselect
                  options={teams}
                  displayValue="name"
                  selectedValues={selectedTeamB}
                  singleSelect={true}
                  onSelect={(e) => {
                    setSelectedTeamB(e);
                  }}
                  onRemove={(e) => setSelectedTeamB([])}
                  placeholder="Select Team B"
                />
              </Col>
              <Col xl={6}>
                <Multiselect
                  options={players}
                  displayValue="title"
                  selectedValues={selectedPlayersA}
                  onSelect={(e) => {
                    setSelectedPlayersA(e);
                  }}
                  onRemove={(e) => {
                    setSelectedPlayersA(e);
                  }}
                  placeholder="Select Players of Team A"
                />
              </Col>
              <Col xl={6}>
                <Multiselect
                  options={players}
                  displayValue="title"
                  selectedValues={selectedPlayersB}
                  onSelect={(e) => {
                    setSelectedPlayersB(e);
                  }}
                  onRemove={(e) => {
                    setSelectedPlayersB(e);
                  }}
                  placeholder="Select Players of Team B"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="number"
                  label="Team A Score"
                  fieldSize="w-100 h-md"
                  value={form.teamAScore}
                  onChange={handleChange}
                  name="teamAScore"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="number"
                  label="Team B Score"
                  fieldSize="w-100 h-md"
                  value={form.teamBScore}
                  onChange={handleChange}
                  name="teamBScore"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="number"
                  label="Team A Penalties"
                  fieldSize="w-100 h-md"
                  value={form.teamAPenalties}
                  onChange={handleChange}
                  name="teamAPenalties"
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="number"
                  label="Team B Penalties"
                  fieldSize="w-100 h-md"
                  value={form.teamBPenalties}
                  onChange={handleChange}
                  name="teamBPenalties"
                />
              </Col>
              {/* <Col xl={6}>
                <Row>
                  <Col xl={2}>
                    <LabelField
                      label="type"
                      fieldSize="w-100 h-md"
                      option={[
                        "goal",
                        "yellowCard",
                        "redCard",
                        "penaltyMissed",
                      ]}
                      value={form.teamBPenalties}
                      onChange={handleChange}
                      name={`type[]`}
                    />
                  </Col>
                  <Col xl={2}>
                    <LabelField
                      type="number"
                      label="time"
                      fieldSize="w-100 h-md"
                      value={form.teamBPenalties}
                      onChange={handleChange}
                      name={`type[]`}
                    />
                  </Col>
                  <Col xl={3}>
                  <Box className={'mc-label-field-group label-col'} >
                    <Label text={'Select player'} />
                  </Box>
                  </Col>
                </Row>
              </Col> */} 
              <Col xl={12}>
                <LabelField
                  label="match status"
                  fieldSize="w-100 h-md"
                  option={["upcoming", "ongoing", "ended"]}
                  value={form.status}
                  onChange={handleChange}
                  name="status"
                />
              </Col>
            </Row>
          </CardLayout>
        </Col>

        <CardLayout className={"d-flex justify-content-center"}>
          <Button
            className={"mc-btn primary text-xl py-4"}
            onClick={handleSubmit}
          >
            Create Match
          </Button>
        </CardLayout>
      </Row>
    </PageLayout>
  );
}
