import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { Box, Heading,Anchor,Button,Image,Input,Label,Icon,Text,} from "../../components/elements";
import {Table,Thead,Tbody,Th,Tr,Td,} from "../../components/elements/Table";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import { BsFillTrash3Fill } from "react-icons/bs";
import * as API from "../../api/team";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
export default function TeamView() {
    const id = useParams().id
    const [form,setForm] = useState({
      name: "",
      type: "year",
      players: [],
      numberOfMatches: 0,
      wins: 0,
      loses: 0,
      draw: 0,
      goals: 0,
      cleanSheets: 0
    })
    const [playersList, setPlayersList] = useState([])
    const [logo,setLogo] = useState(null)

    useEffect(()=>{
      const fetchData = async(id) => {
        try {
          const {data} = await API.getTeamDetails(id);
          setForm(data.teamDetails)
          setPlayersList(data?.teamDetails?.players)
          setLogo(data?.teamDetails?.logo)
        } catch (error) {
          console.log(error)
        }
      }
      if(id)
      fetchData(id);
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
            <CardHeader title="team details"  />
            <Row>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="Team name"
                  fieldSize="w-100 h-md"
                  value={form.name.toUpperCase()}
                   
                  name="name"
                  disabled
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  label="Team type"
                  fieldSize="w-100 h-md"
                  option ={['year','branch','college','other']}
                  value={form.type}
                  name="type"
                  disabled
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="number of matches"
                  fieldSize="w-100 h-md"
                  value={form.numberOfMatches}
                  name="numberOfMatches"
                  disabled
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="wins"
                  fieldSize="w-100 h-md"
                  value={form.wins}
                   
                  name="wins"
                  disabled
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="loses"
                  fieldSize="w-100 h-md"
                  value={form.loses}
                   
                  name="loses"
                  disabled
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="draw"
                  fieldSize="w-100 h-md"
                  value={form.draw}
                   
                  name="draw"
                  disabled
                />
              </Col>
              <Col xl={12}>
                <LabelField
                  type="number"
                  label="clean sheets"
                  fieldSize="w-100 h-md"
                  value={form.cleanSheets}
                   
                  name="cleanSheets"
                  disabled
                />
              </Col>
              <Col xl={12}>
                <Multiselect
                  options={playersList}
                  displayValue="name"
                  // showCheckbox
                  selectedValues={playersList}
                  placeholder="Selected Players"
                  disable
                />
              </Col>
              
            </Row>
          </CardLayout>
        </Col>

        <Col xl={5}>
          <CardLayout>
            <Box className="mc-trip-upload-media">
              {/* <input type="file" name='image' multiple onChange={handleImageChange} /> */}
              {/* <Box className="mc-trip-upload-file">
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
              </Box> */}
              {
                logo&&(typeof logo == 'string' ?
                  <Box className="mc-trip-upload-image">
                  <Image
                    src={logo}
                    alt ="team logo"
                  />
                  </Box>:
                  <Box className="mc-trip-upload-image">
                  <Image
                    src={URL?.createObjectURL?.(logo)}
                    alt="team logo"
                  />
                  </Box>
                )
                
              }
                
            </Box>
            
          </CardLayout>
        </Col>

      </Row>
    </PageLayout>
  );
}
