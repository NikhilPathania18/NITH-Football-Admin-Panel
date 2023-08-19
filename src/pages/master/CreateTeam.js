import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
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
import * as API from "../../api/team";
import * as player from '../../api/player'
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-toastify";
export default function CreateTeam() {
  const [form, setForm] = useState({
    name: "",
    type: "year",
    players: [],
    numberOfMatches: 0,
    wins: 0,
    loses: 0,
    draw: 0,
    goals: 0,
    cleanSheets: 0
  });

  const resetForm = () => {
    setForm({
      name: "",
      type: "year",
      players: [],
      numberOfMatches: 0,
      wins: 0,
      loses: 0,
      draw: 0,
      goals: 0,
      cleanSheets: 0
    });
  };
  const handleSubmit = async () => {
    try {
      const teamData = new FormData();
      teamData.append('name',form.name)
      teamData.append('type',form.type)
      teamData.append('numberOfMatches',form.numberOfMatches)
      teamData.append('wins',form.wins)
      teamData.append('loses',form.loses)
      teamData.append('draw', form.draw)
      teamData.append('goals',form.goals)
      teamData.append('cleanSheets',form.cleanSheets)

      selectedPlayers.forEach(player => {
        teamData.append('players[]',player._id)
      });

      teamData.append('logo',logo)

      const {data} = await API.createTeam(teamData);
      if(data.success){
        resetForm();
        setLogo(null)
        setSelectedPlayers([])  
        toast.success('Team Created')
      }
    } catch (error) {
      if (error.response.data.message) toast.error(error.response.data.message);
      else toast.error("Something went wrong");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const removeImage = () => {
    setLogo(null)
  }

  const handleImageChange = (e) => {
    setLogo(e.target.files[0])
  }

  const [logo,setLogo] =useState(null)

  const [data,setData] = useState([])

  const [players,setPlayers] = useState([])

  const [selectedPlayers,setSelectedPlayers] = useState([])

  useEffect(()=>{
    const fetchData = async() => {
      try {
        const {data} = await player.playerList()
        const temp = [];
        data.playersList.forEach((plr,index) => {
          temp.push({
            title: `${index+1}. ${plr?.name} (${plr?.rollNo})`,
            _id: plr._id
          })
        });
        setPlayers(temp); 

      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[])
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title="create team">
              {/* {data?.breadcrumb?.map((item, index) => (
                <li key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )} */}
              {/* </li>
              ))} */}
            </Breadcrumb>
          </CardLayout>
        </Col>
        <Col xl={7}>
          <CardLayout>
            <CardHeader title="team details" dotsMenu={data?.dotsMenu} />
            <Row>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="Team name"
                  fieldSize="w-100 h-md"
                  value={form.name.toUpperCase()}
                  onChange={handleChange}
                  name="name"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  label="Team type"
                  fieldSize="w-100 h-md"
                  option ={['year','branch','college','other']}
                  value={form.type}
                  onChange={handleChange}
                  name="type"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="number of matches"
                  fieldSize="w-100 h-md"
                  value={form.numberOfMatches}
                  onChange={handleChange}
                  name="numberOfMatches"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="wins"
                  fieldSize="w-100 h-md"
                  value={form.wins}
                  onChange={handleChange}
                  name="wins"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="loses"
                  fieldSize="w-100 h-md"
                  value={form.loses}
                  onChange={handleChange}
                  name="loses"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="draw"
                  fieldSize="w-100 h-md"
                  value={form.draw}
                  onChange={handleChange}
                  name="draw"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="clean sheets"
                  fieldSize="w-100 h-md"
                  value={form.cleanSheets}
                  onChange={handleChange}
                  name="cleanSheets"
                />
              </Col>
              <Col xl={12}>
                <Multiselect
                  options={players}
                  displayValue="title"
                  showCheckbox
                  selectedValues={selectedPlayers}
                  onSelect={(e)=>{setSelectedPlayers(e)}}
                  onRemove={(e) => {setSelectedPlayers(e)}}
                  placeholder="Select Players from the List"
                />
              </Col>
              
            </Row>
          </CardLayout>
        </Col>

        <Col xl={5}>
          <CardLayout>
            <Box className="mc-trip-upload-media">
              {/* <input type="file" name='image' multiple onChange={handleImageChange} /> */}
              <Box className="mc-trip-upload-file">
                <Input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                />
                <Label htmlFor="image">
                  <Icon type="collections" />
                  <Text>{ logo ?'change photo':'upload photo'}</Text>
                </Label>
              </Box>
              {
                logo &&
                <Box className="mc-trip-upload-image">
                  <Image
                    src={URL?.createObjectURL?.(logo)}
                    alt="player photo"
                    style={{ maxHeight: "250px" }}
                  />
                  <Button
                    style={{ color: "red" }}
                    onClick={removeImage}
                    className="material-icons delete position-absolute top-0 end-0 m-2 image-delete-button"
                  >
                    cancel
                  </Button>
                </Box>
              }
                
            </Box>
            <Anchor
              className="mc-btn w-100 primary mt-5"
              text="Create Team"
              icon="cloud_upload"
              href="#"
              onClick={handleSubmit}
            />
          </CardLayout>
        </Col>

      </Row>
    </PageLayout>
  );
}
