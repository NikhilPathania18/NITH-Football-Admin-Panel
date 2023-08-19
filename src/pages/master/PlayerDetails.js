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
import * as API from "../../api/player";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";


export default function PlayerDetails() {

  const {id} = useParams();

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

  const [playerPhoto,setPlayerPhoto] = useState(null)
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
            <Breadcrumb title={'Player Details'}>
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
                  value={form.name}
                  fieldSize="w-100 h-md"
                  disabled
                  required
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="roll no"
                  name="rollNo"
                  value={form.rollNo}
                  disabled
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="branch"
                  name="branch"
                  value={form.branch}
                  disabled
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="year of joining"
                  name="startYear"
                  value={form.startYear}
                  disabled
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="year of passing"
                  name="endYear"
                  value={form.endYear}
                  disabled
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="goals"
                  name="goals"
                  value={form.goals}
                  disabled
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="assists"
                  name="assists"
                  value={form.assists}
                  disabled
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  label="position"
                  name="position"
                  option={['striker','midfielder','defender','goalkeeper']}
                  value={form.position}
                  disabled
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="yellow cards"
                  name="yellowCards"
                  value={form.yellowCards}
                  disabled
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="red cards"
                  name="redCards"
                  value={form.redCards}
                  disabled
                  fieldSize="w-100 h-md"
                />
              </Col>
            </Row>
          </CardLayout>
        </Col>
        <Col xl={5}>
          <CardLayout>
            <Box className="mc-trip-upload-media">
              {
                playerPhoto ?
                <Box className="mc-trip-upload-image">
                  <Image
                    src={playerPhoto}
                    alt="player photo"
                  />
                </Box> :
                <Text>No profile image</Text>
              }
                
            </Box>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  )
}
