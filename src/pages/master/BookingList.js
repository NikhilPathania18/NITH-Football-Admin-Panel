import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import LabelField from "../../components/fields/LabelField";
import BookingTable from "../../components/tables/BookingTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/bookingList.json";
import * as API from '../../api/bookings'
import { toast } from "react-toastify";

export default function BookingList() {
    const [bookingData,setBookingData] = useState([])
    const [pendingBooking,setPendingBooking]= useState(0)
    const [approvedBooking,setApprovedBooking] = useState(0)
    const [blockedBooking,setBlockedBooking] = useState(0)
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await API.getAllBookings();
                setBookingData(res?.data?.data)
                console.log(res.data.data);
            } catch (error) {
                if(error?.response?.data?.message)  toast.error(error.response.data.message)
                else    toast.error('Failed to fetch Booking details')
                console.log(error);
            }
        }
        fetchData();
    },[])

    useEffect(()=>{
        const countBooking = (data) =>{
            let pending = 0, approved = 0, blocked = 0
            data.forEach(user => {
                if(user.isBlocked)  blocked++;
                else if(!user.isEmailVerified) pending++;
                else approved++;
            });
            setApprovedBooking(approved)
            setPendingBooking(pending)
            setBlockedBooking(blocked)
        }
        if(bookingData)
        countBooking(bookingData)
    },[bookingData])
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ data?.pageTitle }>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                    <Col xl={4} key={ 0 }>
                        <FloatCard 
                            variant={ 'lg purple' }
                            digit={pendingBooking}
                            title={ 'pending Bookings' }
                            icon={ 'pending' }
                        />
                    </Col>
                    <Col xl={4} key={ 1 }>
                        <FloatCard 
                            variant={ 'lg green' }
                            title={ 'confirmed Bookings' }
                            icon={ 'check_circle' }
                            digit={approvedBooking}
                        />
                    </Col>
                    <Col xl={4} key={ 2 }>
                        <FloatCard 
                            variant={ 'lg red' }
                            title={ 'canceled Bookings' }
                            icon={ 'remove_circle' }
                            digit={blockedBooking}
                        />
                    </Col>
                <Col xl={12}>
                    <CardLayout>
                        <CardHeader title={ data?.cardTitle }  />
                        <Row xs={1} sm={4} className="mb-4">
                            {/* {data?.filter.map((item, index)=> (
                                <Col key={index}>
                                    <LabelField 
                                        type = { item.type }
                                        label = { item.label }
                                        option = { item.option }
                                        placeholder = { item.placeholder }
                                        labelDir = "label-col"
                                        fieldSize = "w-100 h-sm"
                                    /> 
                                </Col>
                            ))} */}
                        </Row>
                        <BookingTable 
                            thead = { data?.table.thead }
                            tbody = { bookingData }
                            pendingBooking = {pendingBooking}
                            setPendingBooking = {setPendingBooking}
                            approvedBooking = {approvedBooking}
                            setApprovedBooking = {setApprovedBooking}
                            blockedBooking  = {blockedBooking}
                            setBlockedBooking = {setBlockedBooking}
                        />
                        {/* <Pagination /> */}
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    );
}