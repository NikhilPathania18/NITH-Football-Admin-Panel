import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Box,
  Anchor,
  Button,
  Image,
  Input,
  Label,
  Icon,
  Text,
} from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/tripUpload.json";
import CustomOption from "../../components/fields/CustomOption";
import * as API from "../../api/player";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdatePlayer() {

  const {id} = useParams()
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    rollNo: '',
    branch: '',
    startYear: '',
    endYear: '',
    matches: 0,
    goals: 0,
    assists: 0,
    position: 'striker',
    yellowCards: 0,
    redCards: 0
  })

  const resetForm = () => {
    setForm({
      name: '',
      rollNo: '',
      branch: '',
      startYear: '',
      endYear: '',
      matches: 0,
      goals: 0,
      assists: 0, 
      position: 'striker',
      yellowCards: 0,
      redCards: 0
    })
  }

  const [playerPhoto,setPlayerPhoto] = useState(null)

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value})
  }

  const handleImageChange = (e) => {
    setPlayerPhoto(e.target.files[0])
  }
  
  const removeImage = () => {
    setPlayerPhoto(null)
  }

  const handleSubmit = async() => {
    try {
      const playerData = new FormData();
      playerData.append('name',form.name)
      playerData.append('rollNo',form.rollNo)
      playerData.append('branch',form.branch)
      playerData.append('startYear',form.startYear)
      playerData.append('endYear',form.endYear)
      playerData.append('matches',form.matches)
      playerData.append('goals',form.goals)
      playerData.append('assists',form.assists)
      playerData.append('position',form.position)
      playerData.append('yellowCards',form.yellowCards)
      playerData.append('redCards',form.redCards)
      playerData.append('photo',playerPhoto)
      
      console.log('player data', playerData )
      const res = await API.updatePlayer(id,playerData)
      const data = res.data

      console.log(data)
      if(data?.success){
        toast.success('Player details updated')
        navigate('/player-list')

      }
    } catch (error) {
      console.log(error)
      if(error.response.data.message) toast.error(error.response.data.message)
      else  toast.error('Something went wrong')
    }
  }

  useEffect(()=> {
    const fetchDetails = async(id) => {
      try {
        const {data} = await API.playerDetails(id);
        setForm(data.playerDetails);
        if(data.playerDetails.image)  setPlayerPhoto(data.playerDetails.image)
      } catch (error) {
        if(error?.response?.data?.message)  toast.error(error.response.data.message)
        else  toast.error('Failed to get Player details')
      }
    }
    if(id)  fetchDetails(id);
  },[id])

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={'Update Player Details'}>
            </Breadcrumb>
          </CardLayout>
        </Col>
        <Col xl={7}>
          <CardLayout>
            <Row>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="player name"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  fieldSize="w-100 h-md"
                  required
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="roll no"
                  name="rollNo"
                  onChange={handleChange}
                  value={form.rollNo}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="branch"
                  name="branch"
                  onChange={handleChange}
                  value={form.branch}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="year of joining"
                  name="startYear"
                  onChange={handleChange}
                  value={form.startYear}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="year of passing"
                  name="endYear"
                  onChange={handleChange}
                  value={form.endYear}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="matches"
                  name="matches"
                  onChange={handleChange}
                  value={form.matches}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="goals"
                  name="goals"
                  onChange={handleChange}
                  value={form.goals}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="assists"
                  name="assists"
                  onChange={handleChange}
                  value={form.assists}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  label="position"
                  name="position"
                  option={['striker','midfielder','defender','goalkeeper']}
                  onChange={handleChange}
                  value={form.position}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="yellow cards"
                  name="yellowCards"
                  onChange={handleChange}
                  value={form.yellowCards}
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="red cards"
                  name="redCards"
                  onChange={handleChange}
                  value={form.redCards}
                  fieldSize="w-100 h-md"
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
                  <Text>{ playerPhoto ?'change photo':'upload photo'}</Text>
                </Label>
              </Box>
              {
                playerPhoto &&
                <Box className="mc-trip-upload-image">
                  <Image
                    src={typeof playerPhoto === 'string' ? playerPhoto : URL?.createObjectURL?.(playerPhoto)}
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
              text="Update Player Details"
              icon="cloud_upload"
              href="#"
              onClick={handleSubmit}
            />
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  )
}
