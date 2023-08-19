import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import LabelField from "../../components/fields/LabelField";
import UsersTable from "../../components/tables/UsersTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userList.json";
import * as API from '../../api/users'
import { toast } from "react-toastify";

export default function UserList() {
    const [userData,setUserData] = useState([])
    const [pendingUsers,setPendingUsers]= useState(0)
    const [approvedUsers,setApprovedUsers] = useState(0)
    const [blockedUsers,setBlockedUsers] = useState(0)
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await API.getAllUsers();
                setUserData(res?.data?.data)
            } catch (error) {
                if(error?.response?.data?.message)  toast.error(error.response.data.message)
                else    toast.error('Failed to fetch Users details')
                console.log(error);
            }
        }
        fetchData();
    },[])

    useEffect(()=>{
        const countUsers = (data) =>{
            let pending = 0, approved = 0, blocked = 0
            data.forEach(user => {
                if(user.isBlocked)  blocked++;
                else if(!user.isEmailVerified) pending++;
                else approved++;
            });
            setApprovedUsers(approved)
            setPendingUsers(pending)
            setBlockedUsers(blocked)
        }
        if(userData)
        countUsers(userData)
    },[userData])
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
                            digit={pendingUsers}
                            title={ 'pending users' }
                            icon={ 'pending' }
                        />
                    </Col>
                    <Col xl={4} key={ 1 }>
                        <FloatCard 
                            variant={ 'lg green' }
                            title={ 'verified users' }
                            icon={ 'check_circle' }
                            digit={approvedUsers}
                        />
                    </Col>
                    <Col xl={4} key={ 2 }>
                        <FloatCard 
                            variant={ 'lg red' }
                            title={ 'blocked users' }
                            icon={ 'remove_circle' }
                            digit={blockedUsers}
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
                        <UsersTable 
                            thead = { data?.table.thead }
                            tbody = { data?.table.tbody }
                            pendingUsers = {pendingUsers}
                            setPendingUsers = {setPendingUsers}
                            approvedUsers = {approvedUsers}
                            setApprovedUsers = {setApprovedUsers}
                            blockedUsers  = {blockedUsers}
                            setBlockedUsers = {setBlockedUsers}
                        />
                        {/* <Pagination /> */}
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    );
}