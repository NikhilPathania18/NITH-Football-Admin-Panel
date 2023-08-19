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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditTournament() {
    const navigate = useNavigate();
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

    const handleEnglishAdd = (spec) => {
        setEnSpecs([...enSpecs,spec])
    }
    
    const handleEnglishDelete = (spec) => {
        setEnSpecs(enSpecs.filter((tag) => tag!== spec))
    }
    const handleArabicAdd = (spec) => {
        setAreSpecs([...areSpecs,spec])
    }
    
    const handleArabicDelete = (spec) => {
        setAreSpecs(areSpecs.filter((tag) => tag!== spec))
    }

    const fetchData = async () => {
        try {
            const res = await API.getBoatDetails(id);
            const data = res.data.data
            console.log(data);
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
            if(error.response.data.message) console.log(error.response.data.message);
            else    toast.error('Failed to get boat/yacht details')
            console.log(error.message);
        }
    }

    const resetForm = () => {
        setForm({
            enTitle: '',
            enDesc: '',
            areTitle: '',
            areDesc: '',
            type: 'Boat',
            totalCapacity: '',
            size: '',
            status: 'Active'
        });
        setImage([])
        setAreSpecs([])
        setEnSpecs([])
    }

    useEffect(()=>{
        fetchData();
    },[])
    
    const handleSubmit = async() => {
        try {
            const boatData = new FormData();
            boatData.append('en.title',form.enTitle)
            boatData.append('en.description',form.enDesc)
            boatData.append('are.title',form.areTitle)
            boatData.append('are.description',form.areDesc)
            boatData.append('type',form.type)
            boatData.append('totalCapacity',form.totalCapacity)
            boatData.append('size',form.size)
            boatData.append('status',form.status)
            enSpecs.forEach((spec) => {
                boatData.append('en.specification[]', spec);
            });
            areSpecs.forEach((spec) => {
            boatData.append('are.specification[]', spec);
            });
            image.forEach((img, index) => {
                if(typeof img === 'string')
                boatData.append('image[]',img)
                else
                boatData.append(`image${index}`, img);
            });
            const res = await API.boatYachtUpdateById(id,boatData)
            if(res&&res.data.status)    toast.success('Boat/Yacht updated successfully')
            resetForm();
            navigate('/boat-list')
            console.log(res);

        } catch (error) {
            if(error.response.data.message) toast.error(error.response.data.message)
            else(toast.error('Something went wrong'))
            console.log(error.message)
        }
    }

    const handleChange = (e) => {
        if(e.target.value==='true') setForm({...form,[e.target.name]: true})
        else if(e.target.value==='false')   setForm({...form,[e.target.name]: false})
        else
        setForm({...form, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        const fileList = e.target.files;
        setImage([...image, ...fileList]);
    };

    const removeImage = (index) =>{
        let imageArray = [...image];
        imageArray.splice(index,1)
        setImage(imageArray)
    }

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title='Edit Boat/Yacht'>
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
                            <Col xl={6}><LabelField type="text" label="english title" onChange={handleChange} name='enTitle' value ={form.enTitle} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" label="arabic title" onChange={handleChange} name ='areTitle' value ={form.areTitle} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelTextarea label="english description" onChange={handleChange} name ='enDesc' value ={form.enDesc} fieldSize="w-100 h-text-md" /></Col>
                            <Col xl={6}><LabelTextarea label="arabic description" onChange={handleChange} name ='areDesc' value ={form.areDesc} fieldSize="w-100 h-text-md" /></Col>
                            <Col xl={12}><LabelField label="boat type" onChange={handleChange} name='type' value={form.type} option={['Boat', 'Yacht']} fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelField type="text" label="boat size" onChange={handleChange} name ='size' value ={form.size} fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelField label="status" onChange={handleChange} name ='status' value ={form.status} option={['Active', 'Inactive']} fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelField type="number" label="total capacity" onChange={handleChange} name ='totalCapacity' value ={form.totalCapacity} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}>
                                <Label className="mc-label-field-title">english specifications</Label>
                                {/* <ChipInput
                                    style={{margin: '10px 0'}}
                                    value = {enSpecs}
                                    onAdd = {handleEnglishAdd}
                                    onDelete= {handleEnglishDelete}
                                    // label = 'Specifications'
                                    variant="outlined"
                                    
                                /> */}
                            </Col>
                            <Col xl={6}>
                                <Label className="mc-label-field-title">arabic specifications</Label>
                                {/* <ChipInput
                                    style={{margin: '10px 0'}}
                                    value = {areSpecs}
                                    onAdd = {handleArabicAdd}
                                    onDelete= {handleArabicDelete}
                                    // label = 'Specifications'
                                    variant="outlined"
                                    
                                /> */}
                            </Col>

                            {/* <Col xl={6}><LabelField type="number" label="bedrooms" onChange={handleChange} name ='bedrooms' value ={form.bedrooms} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="number" label="washrooms" onChange={handleChange} name ='washrooms' value ={form.washrooms} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField label="saloon" onChange={handleChange} option={['true','false']} name ='saloon' value ={form.saloon} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField label="fly bridge" onChange={handleChange} option={['true','false']} name ='flybridge' value ={form.flyBridge} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField label="sunbed" onChange={handleChange} option={['true','false']} name ='sunBed' value ={form.sunBed} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField label="dining area" onChange={handleChange} option={['true','false']} name ='diningArea' value ={form.diningArea} fieldSize="w-100 h-md" /></Col>
                            <Col xl={12}><LabelField label="music system" onChange={handleChange} type='text' name ='musicSystem' value ={form.musicSystem} fieldSize="w-100 h-md" /></Col> */}
                            
                        </Row>
                    </CardLayout>
                </Col>
                
                <Col xl={6}>
                    <CardLayout>
                        <Box className="mc-trip-upload-media">
                            <Box className="mc-trip-upload-file">
                                <Input type="file" id = 'image' name='image' multiple onChange={handleImageChange} />
                                <Label htmlFor="image"><Icon type="collections" /><Text>{ uploadFile }</Text></Label>
                            </Box>
                            {
                                image.map((img, index) => (
                                    <Box key={img.name} className="mc-trip-upload-image">
                                      {typeof img === 'string' ? (
                                        <Image src={img} alt="boat image" style={{maxHeight: '250px'}} />
                                      ) : (
                                        <Image src={URL?.createObjectURL?.(img)} alt="boat image" style={{maxHeight: '250px'}} />
                                      )}
                                      <Button style={{ color: 'red' }} onClick={() => { removeImage(index) }} className="material-icons delete position-absolute top-0 end-0 m-2 image-delete-button">cancel</Button>
                                    </Box>
                                  ))
                                //     <Box key={img.name} className="mc-trip-upload-image">
                                //       <Image  src={URL?.createObjectURL?.(img)}  alt="boat image" style={{maxHeight: '250px'}}/>
                                //       <Button style={{color: 'red' }} onClick={()=>{removeImage(index)}} className="material-icons delete position-absolute top-0 end-0 m-2 image-delete-button" >cancel</Button>
                                //     </Box>
                                //   ))
                            }
                        </Box>
                        <Anchor 
                            className="mc-btn w-100 primary mt-5" 
                            text="publish &amp; view" 
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
