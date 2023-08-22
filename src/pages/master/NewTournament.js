import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Image, Input, Label, Icon, Text } from "../../components/elements"; 
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/addBoat.json";
import { createBoat } from "../../api/boats";
import { toast } from "react-toastify";
import * as team from '../../api/team'
import Multiselect from "multiselect-react-dropdown";

export default function NewTournament() {


    const [groupATeams, setGroupATeams] = useState([])
    const [groupBTeams, setGroupBTeams] = useState([])

    const [groupTeams, setGroupTeams] = useState([])

    const [allTeams, setAllTeams] = useState([])

    const [form,setForm] = useState({
        name: '',
        type: 'interyear',
        startYear: '',
        schedule: '',
        numberOfGroups: 1
    })

    const resetForm = () => {
        setForm({
            name: '',
            type: 'interyear',
            startYear: '',
            schedule: '',
            numberOfGroups: 1
        })
    }

    const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit = async() => {
        try {
            
        } catch (error) {
            if(error.response.data.message) toast.error(error.response.data.message)
            else    toast.error('Something went wrong')
        }
    }
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const {data} = await team.getTeamsList();
                setAllTeams(data.teamsList)
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
                        <Breadcrumb title='Add Boat'>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <Row>
                            <Col xl={12}><LabelField type="text" label="Tournament Name" onChange={handleChange} name='name' value ={form.name} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField option={['interyear','interbranch','friendly','other']} label="Tournament Type" onChange={handleChange} name ='type' value ={form.type} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" label="start year" onChange={handleChange} name ='startYear' value ={form.startYear} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="text" label="schedule" onChange={handleChange} name ='schedule' value ={form.schedule} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}><LabelField type="number" label="number of groups" onChange={handleChange} name ='numberOfGroups' value ={form.numberOfGroups} fieldSize="w-100 h-md" /></Col>
                            <Col xl={6}>
                                <Multiselect
                                    options={allTeams}
                                    selectedValues={groupATeams}
                                    onSelect={(e) => {setGroupATeams(e)}}
                                    onRemove={(e)=> {setGroupBTeams(e)}}
                                    placeholder="Select Group A Teams"
                                    displayValue="name"
                                />
                            </Col>
                        </Row>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}
