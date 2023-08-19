import React, { useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  Box,
  Text,
  Item,
  Anchor,
  Button,
  Label,
} from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { Breadcrumb, DivideTitle } from "../../components";
import CardLayout from "../../components/cards/CardLayout";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/settings.json";
import * as API from "../../api/match";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

export default function LiveMatch() {
  const id = useParams().id;
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const [matchDetails, setMatchDetails] = useState(null);

  const [team, setTeam] = useState('A');

  const [player, setPlayer] = useState([]);

  const [assister, setAssister] = useState([]);

  const [event, setEvent] = useState({
    type: "goal",
    player: null,
    assist: null,
    time: "",
    remarks: "",
    goalType: "openPlay",
  });

  const resetForm = () => {
    setEvent({
        type: "goal",
        player: null,
        assist: null,
        time: "",
        remarks: "",
        goalType: "openPlay",
    })
    setTeam('A')
    setPlayer([])
    setAssister([])
  }

  const endMatch = async() => {
    try {
        const confirm = window.confirm('Do you want to end Match?');
        console.log('confirm',confirm)
       const {data} = await API.endMatch(id);
       console.log('data',data)
       if(data.success){
        toast.success('Match ended');
        navigate('/matches-list')
       }
    } catch (error) {
        if(error?.response?.data?.message)  toast.error(error.response.data.message)
        else    toast.error('Failed to end Match')
    }
  }

  const handleSubmit = async () => {
    try {
        console.log('event',event)
        if(player.length===0){
            toast.error('Please select Player')
            return;
        }
        event.player = player[0]._id
        if(assister.length!==0) event.assist = assister[0]._id

        let data
        if(event.type === 'goal')
        data = (await API.updateScore(id, team, event)).data;
        else
        data = (await API.updateEvent(id,team,event)).data;

        console.log('data',data)
        if(data.success)
        fetchData(id);
        resetForm();
        toast.success('Event added')
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Something went wrong");
      console.log(error);
    }
  };

  const [form, setForm] = useState({
    teamAScore: 0,
    teamBScore: 0,
  });


  const startMatch = async() => {
    try {
        let half;
        let status = matchDetails.currentStatus;
        console.log('status',status)
        switch(status){
            case 'notStarted': half='firstHalf'; break;
            case 'firstHalf': half='halfTime'; break;
            case 'halfTime': half='secondHalf'; break;
            case 'secondHalf': half='fullTime'; break;
            case 'fullTime': half='extraTimeFirstHalf'; break;
            case 'extraTimeFirstHalf': half='extraTimeHalfTime'; break;
            case 'extraTimeHalfTime': half='extraTimeSecondHalf'; break;
            case 'extraTimeSecondHalf': half='penalties'; break;
        }
        console.log('half',half)
        const {data} = await API.startMatch(id, half);
        console.log(data)
        if(data.success){
            const res = await fetchData(id);
            toast.success('Half started/stopped')
        }
    } catch (error) {
        if (error?.response?.data?.message)
        toast.error(error.response.data.message);
        else toast.error("Something went wrong");
        console.log(error);
    }
  };

  const fetchData = async (id) => {
    try {
      const { data } = await API.getMatchDetails(id);
      setMatchDetails(data?.matchDetails);
      console.log(data);
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error.response.data.message);
      else toast.error("Failed to fetch details");
    }
  };


  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      {matchDetails && (
        <PageLayout>
          <CardLayout className="mb-4">
            <Breadcrumb title={"Match Details"}>
              {/* {data?.breadcrumb.map((item, index) => (
                        <Item key={ index } className="mc-breadcrumb-item">
                            {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                        </Item>
                    ))} */}
            </Breadcrumb>
          </CardLayout>
          <CardLayout className="p-sm-5 mb-4">
            <Box className="mb-5">
              <div style={{ display: "flex", alignItems: "center" }}>
                <DivideTitle
                  title="Score"
                  className="mb-4"
                  style={{ marginBottom: "0 !important" }}
                />
                {/* <Button
                  className={`material-icons icons mb-4 p-2 ${
                    edit ? "d-none" : ""
                  }`}
                  style={{
                    marginLeft: "15px",
                    borderRadius: "100%",
                    color: "white",
                    backgroundColor: "#5e5d72",
                  }}
                  onClick={handleEdit}
                >
                  edit
                </Button> */}
              </div>
              <Row>
                <Col xl={12} className="ps-xl-5">
                  <Row>
                    <Col xl={6}>
                      <LabelField
                        disabled
                        name="enHeroTagline"
                        value={matchDetails ? matchDetails.teamAScore : 0}
                        label={
                          matchDetails
                            ? `${matchDetails.teamA.name}`
                            : "Team A Score"
                        }
                        type="text"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col xl={6}>
                      <LabelField
                        disabled
                        name="areHeroTagline"
                        value={matchDetails ? matchDetails.teamBScore : 0}
                        label={
                          matchDetails
                            ? `${matchDetails.teamB.name}`
                            : "Team B Score"
                        }
                        type="text"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Box>

            {/* <Button
              className={`mc-btn primary ${edit ? "" : "d-none"}`}
              icon="verified"
              text="save all changes"
              onClick={handleSubmit}
            /> */}
          </CardLayout>
          {
            (matchDetails && (matchDetails.currentStatus === 'notStarted' || matchDetails.currentStatus === 'halfTime' || matchDetails.currentStatus === 'fullTime' || matchDetails.currentStatus === 'extraTimeHalfTime'))&&
            <CardLayout
            className={`p-sm-5 mb-4 `}
            >
            <Text >{`Current Status: ${matchDetails.currentStatus}`}</Text>
            <Button
              className={"mc-btn primary d-block m-auto"}
              icon={"verified"}
              text={`Start Half`}
              onClick={startMatch}
            />
          </CardLayout>
          }
          {
            (matchDetails && (matchDetails.currentStatus === 'firstHalf' || matchDetails.currentStatus === 'secondHalf' || matchDetails.currentStatus === 'extraTimeFirstHalf' || matchDetails.currentStatus === 'extraTimeSecondHalf'  ))&&
            <CardLayout
            className={`p-sm-5 mb-4 `}
          >
            <Text >{`Current Status: ${matchDetails.currentStatus}`}</Text>
            <Button
              className={"mc-btn btn btn-danger d-block m-auto"}
              icon={"cancel"}
              text="End Half"
              onClick={startMatch}
            />
          </CardLayout>
          }
          
          <CardLayout className={"p-sm-5 mb-4"}>
            <Row>
              <Col xl={12}>
                <LabelField
                  name="type"
                  option={['goal','yellowCard','redCard','penaltyMissed']}
                  value={event.type}
                  label="Select Team"
                  fieldSize="w-100 h-md"
                  onChange = {(e)=>{setEvent({...event,[e.target.name]: e.target.value})}}
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  name="team"
                  option={["A", "B"]}
                  value={team}
                  label="Select Team"
                  fieldSize="w-100 h-md"
                  onChange = {(e)=>{ setTeam(e.target.value)}}
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  name="goalType"
                  option={["openPlay", "penalty", "freeKick", "ownGoal"]}
                  value={event.goalType}
                  label="Goal Type"
                  fieldSize="w-100 h-md"
                  onChange = {(e)=>{setEvent({...event,[e.target.name]: e.target.value})}}
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  name="time"
                  value={event.time}
                  type="number"
                  label="Time"
                  fieldSize="w-100 h-md"
                  onChange = {(e)=>{setEvent({...event,[e.target.name]: e.target.value})}}
                />
              </Col>

              <Col xl={6}>
                <Label text="Select Player" className={"mb-2"} />
                <Multiselect
                  options={[...matchDetails.playersA, ...matchDetails.playersB]}
                  displayValue="name"
                  singleSelect={true}
                  selectedValues={player}
                  onSelect={(e) => {
                    setPlayer(e);
                  }}
                  onRemove={(e) => {
                    setPlayer([]);
                  }}
                />
              </Col>
              <Col xl={6}>
                <Label text="Select Assister" className={"mb-2"} />
                <Multiselect
                  options={[...matchDetails.playersA, ...matchDetails.playersB]}
                  displayValue="name"
                  selectedValues={assister}
                  singleSelect={true}
                  onSelect={(e) => {
                    setAssister(e);
                  }}
                  onRemove={(e) => {
                    setAssister([]);
                  }}
                />
              </Col>
              <Col xl={12}>
                <Button
                  className={"mc-btn primary d-block m-auto"}
                  icon={"verified"}
                  text="Add Event"
                  onClick={handleSubmit}
                />
              </Col>
            </Row>
          </CardLayout>
          <CardLayout
            className={`p-sm-5 mb-4 `}
          >
            <Button
              className={"mc-btn btn btn-danger d-block m-auto"}
              icon={"cancel"}
              text="End Match"
              onClick={endMatch}
            />
          </CardLayout>
        </PageLayout>
      )}
    </>
  );
}
