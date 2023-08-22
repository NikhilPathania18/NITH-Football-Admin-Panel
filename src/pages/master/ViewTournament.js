import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Image, Input, Label, Icon, Text } from "../../components/elements"; 
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/addBoat.json";
import * as API from "../../api/boats";
// import ChipInput from 'material-ui-chip-input'
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function TournamentView() {

    const id = useParams().id

    const [uploadFile, setUploadFile] = useState('image upload');
    const [image,setImage]=useState([])
    const [enSpecs,setEnSpecs] = useState([])
    const [areSpecs,setAreSpecs] = useState([])
    const [form,setForm] = useState({
        enTitle: '',
        enDesc: '',
        areTitle: '',
        areDesc: '',
        type: 'Boat',
        totalCapacity: '',
        size: '',
        status: 'Active',
    })
    const fetchData = async () => {
        try {
            const res = await API.getBoatDetails(id);
            const data = res.data.data
            setForm({
                enTitle: data.en.title,
                enDesc: data.en.description,
                areTitle: data.are.title,
                areDesc: data.are.description,
                type: data.type,
                totalCapacity: data.totalCapacity,
                size: data.size,
                status: data.status,
            })
            setEnSpecs(data.en.specification)
            setAreSpecs(data.are.specification)
            setImage(data.image)
        } catch (error) {
            if(error.response.data.message) toast.error(error.response.data.message)
            else  toast.error('Failed to fetch Boat details')
            console.log(error.message);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])
    

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title='View Boat/Yacht'>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={6}>
                    <CardLayout>
                        <Row>
                            <Col xl={6}><LabelField type="text" disabled label="english title"   name='enTitle' value ={form.enTitle} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" disabled label="arabic title"   name ='areTitle' value ={form.areTitle} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelTextarea disabled label="english description"   name ='enDesc' value ={form.enDesc} fieldSize="w-100 h-text-md" /></Col>
                            <Col xl={6}><LabelTextarea disabled label="arabic description"   name ='areDesc' value ={form.areDesc} fieldSize="w-100 h-text-md" /></Col>
                            <Col xl={12}><LabelField disabled label="boat type"   name='type' value={form.type} option={['Boat', 'Yacht']} fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelField disabled type="text" label="boat size"   name ='size' value ={form.size} fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelField disabled label="status"   name ='status' value ={form.status} option={['Active', 'Inactive']} fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelField disabled type="number" label="total capacity"   name ='totalCapacity' value ={form.totalCapacity} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}>
                            <Label className="mc-label-field-title">english specifications</Label>
                                {/* <ChipInput
                                    disabled
                                    style={{margin: '10px 0'}}
                                    value = {enSpecs}
                                    
                                    // onAdd = {handleEnglishAdd}
                                    // onDelete= {handleEnglishDelete}
                                    // label = 'Specifications'
                                    variant="outlined"
                                    
                                /> */}
                            </Col>
                            <Col xl={6}>
                            <Label className="mc-label-field-title">arabic specifications</Label>
                                {/* <ChipInput
                                    disabled
                                    style={{margin: '10px 0'}}
                                    value = {areSpecs}
                                    // onAdd = {handleArabicAdd}
                                    // onDelete= {handleArabicDelete}
                                    // label = 'Specifications'
                                    variant="outlined"
                                    
                                /> */}
                            </Col>

                            {/* <Col xl={6}><LabelField type="number" label="bedrooms"   name ='bedrooms' value ={form.bedrooms} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="number" label="washrooms"   name ='washrooms' value ={form.washrooms} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField label="saloon"   option={['true','false']} name ='saloon' value ={form.saloon} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField label="fly bridge"   option={['true','false']} name ='flybridge' value ={form.flyBridge} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField label="sunbed"   option={['true','false']} name ='sunBed' value ={form.sunBed} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField label="dining area"   option={['true','false']} name ='diningArea' value ={form.diningArea} fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelField label="music system"   type='text' name ='musicSystem' value ={form.musicSystem} fieldSize="w-100 h-md" /></Col> */}
                            
                        </Row>
                    </CardLayout>
                </Col>
                
                <Col xl={6}>
                    <CardLayout>
                        <Box className="mc-trip-upload-media">
                            {/* <Box className="mc-trip-upload-file">
                                <Input type="file" id = 'image' name='image' multiple onChange={handleImageChange} />
                                <Label htmlFor="image"><Icon type="collections" /><Text></Text></Label>
                            </Box> */}
                            {
                                image.map((img, index) => (
                                    <Box key={img.name} className="mc-trip-upload-image">
                                      {typeof img === 'string' ? (
                                        <Image src={img} alt="boat image" style={{maxHeight: '250px'}} />
                                      ) : (
                                        <Image src={URL?.createObjectURL?.(img)} alt="boat image" style={{maxHeight: '250px'}} />
                                      )}
                                      {/* <Button style={{ color: 'red' }} onClick={() => { removeImage(index) }} className="material-icons delete position-absolute top-0 end-0 m-2 image-delete-button">cancel</Button> */}
                                    </Box>
                                  ))
                            }
                        </Box>
                        {/* <Anchor 
                            className="mc-btn w-100 primary mt-5" 
                            text="publish &amp; view" 
                            icon="cloud_upload" 
                            href="#"
                            onClick={handleSubmit}
                        /> */}
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}
