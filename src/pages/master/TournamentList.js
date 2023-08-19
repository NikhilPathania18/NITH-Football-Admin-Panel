import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import BoatsTable from "../../components/tables/BoatsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/boatList.json";
import * as API from '../../api/boats'
import { toast } from "react-toastify";

export default function TournamentList() {
    const [boatData,setBoatData] = useState([])
    let tableBody = {};
    useEffect(()=>{
        async function fetchData() {
            try {
                const res = await API.getBoats();
                setBoatData(res.data.data)
            } catch (error) {
                if(error.response.data.message) toast.error(error.response.data.message)
                else  toast.error('Failed to fetch Boat/Yacht list')
                console.log(error.message);
            }
        }
        fetchData();
    },[])

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title="Boats/Yachts List">
                            {data?.breadcrumb.map((item, index) => (
                                <li key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                {/* {data?.float.map((item, index) => (
                    <Col key={ index } sm={6} lg={4}>
                        <FloatCard 
                            variant = { item.variant }
                            digit = { item.digit }
                            title = { item.title }
                            icon = { item.icon }
                        />
                    </Col>
                ))} */}
                <Col xl={12}>
                    <CardLayout>
                        <Row>
                            {/* {data?.trip.filter.map((item, index)=> (
                                <Col xs={12} sm={6} md={4} lg={3} key={ index }>
                                    <LabelField
                                        type = { item.type }
                                        label = { item.label }
                                        option = { item.option }
                                        placeholder = { item.placeholder }
                                        labelDir = "label-col"
                                        fieldSize = "w-100 h-md"
                                    />
                                </Col>
                            ))} */}
                            <Col xl={12}>
                                <BoatsTable 
                                    thead = { data?.trip.thead } 
                                    tbody = { boatData} 
                                />
                                {/* <Pagination /> */}
                            </Col>
                        </Row>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    );
}
