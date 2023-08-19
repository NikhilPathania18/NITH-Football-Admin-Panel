import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Anchor, Heading, Box, Text, Input, Image, Icon, Button, Label } from "../elements";
import * as API from '../../api/messages'
import { Col, Row } from "react-bootstrap";
import { LabelField, LabelTextarea } from "../fields";
import { toast } from "react-toastify";
import EmptyList from "../EmptyList";

export default function CustomerQuestionsTable({ thead, tbody }) {
    const [alertModal, setAlertModal] = useState({
        active: false,
        _id: '',
        index: ''
    });
    const [sending, setSending] = useState('Send Mail')
    const [replyModal, setReplyModal] = useState({
        active: false,
        _id: '',
        question: '',
        reply: '',
        email: '',
        index: ''
    }); 

    const replyToUser = async(id, reply, index) => {
        try {
            console.log(replyModal);
            setSending('Sending mail...')
            const res = await API.replyToUser(replyModal._id,reply)
            console.log(res);
            let tempData = data
            tempData[index].isReplied = true
            tempData[index].isSeen = true
            setData(tempData)
            setSending('Send Mail')
            setReplyModal({
                acitve: false,
                _id: '',
                question: '',
                reply: '',
                email: '',
                index: ''
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMessage = async(id,index) => {
        try {
            const res = await API.deleteMessage(id);
            let tempData = data
            tempData.splice(index,1)
            setData([...tempData])
            console.log(res);
            if(res&&res.data.status)    toast.warning('Message deleted')
        } catch (error) {
            if(error?.response?.data?.message)  toast.error(error.response.data.message)
            else    toast.error('Failed to delete message')
            console.log(error);
        }
    }

    const [data, setData] = useState([]);

    const getDate = (date) => {
        let newDate = date.split('T')[0]
        return newDate
    }
    useEffect(()=> { setData(tbody) }, [tbody]);


    
    return (
        <Box className="mc-table-responsive">
            {data.length===0&&<EmptyList title={'Messages'} />}
            {data.length!==0&&
                <Table className="mc-table trip">
                <Thead className="mc-table-head primary">
                    <Tr>
                        <Th>
                            <Box className="mc-table-check">
                                {/* <Input 
                                    type="checkbox" 
                                    name="allCheck"
                                    checked={ data?.filter((item)=> item.isChecked !== true).length < 1 } 
                                    onChange={ handleCheckbox } 
                                /> */}
                                <Text>uid</Text>
                            </Box>
                        </Th>
                        {thead.map((item, index) => (
                            <Th key = {index}>{ item }</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                    {data?.map((item, index) => (
                        <Tr key={ index }> 
                            <Td title={ index + 1 }>
                                <Box className="mc-table-check">
                                    {/* <Input 
                                        type="checkbox" 
                                        name={item.name} 
                                        checked={ item?.isChecked || false }
                                        onChange={ handleCheckbox } 
                                    /> */}
                                    <Text>#{ index + 1 }</Text>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-trip md">
                                    {/* <Image src={ item.src } alt={ item.alt } /> */}
                                    <Box className="mc-table-group">
                                        <Heading as="h6">{ item?.name }</Heading>
                                        {/* <Text>{ item?.en?. }</Text> */}
                                    </Box>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-trip md">
                                    {/* <Image src={ item.src } alt={ item.alt } /> */}
                                    <Box className="mc-table-group">
                                        {/* <Heading as="h6">{ item?.are?.title }</Heading> */}
                                        <Text>{ item?.email }</Text>
                                    </Box>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-trip md">
                                    {/* <Image src={ item.src } alt={ item.alt } /> */}
                                    <Box className="mc-table-group">
                                        {/* <Heading as="h6">{ item?.are?.title }</Heading> */}
                                        <Text>{ item?.message }</Text>
                                    </Box>
                                </Box>
                            </Td>
                            <Td>
                                    { item?.isReplied === true && <Text className="mc-table-badge green">True</Text> }
                                    { item?.isReplied === false && <Text className="mc-table-badge purple">False</Text> }
                            </Td>
                            <Td title={ item?.isSeen }>
                                    { item?.isSeen === true && <Text className="mc-table-badge green">True</Text> }
                                    { item?.isSeen === false && <Text className="mc-table-badge purple">False</Text> }
                            </Td>
                            <Td>
                                <Box className="mc-table-trip md">
                                    {/* <Image src={ item.src } alt={ item.alt } /> */}
                                    <Box className="mc-table-group">
                                        {/* <Heading as="h6">{ item?.are?.title }</Heading> */}
                                        <Text>{ item?.createdAt ? getDate(item.createdAt) : '' }</Text>
                                    </Box>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-action">
                                    {/* <Anchor href={`/faq-view/${item._id}`} title={item._isSeen?'Mark as unread': 'Mark as read'} className="material-icons view">{item.isSeen?'visibility':'visibility_off'}</Anchor> */}
                                    {/* <Anchor href={`/edit-faq/${item._id}`} title="Reply" className="material-icons edit">send</Anchor> */}
                                    <Button title="Reply"  className="material-icons edit" onClick={()=>{
                                        setReplyModal({active: true, _id:item?._id , index: index, email: item?.email, question: item?.message, reply: ''});
                                    }}>send</Button>
                                    <Button title="Delete" className="material-icons delete" onClick={()=> {setAlertModal({active:true, id:item?._id , index: index, email: item?.email, question: item?.message, reply: ''})}}>delete</Button>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        }

            <Modal show={ replyModal.active } onHide={()=> setReplyModal({active:false, _id:'', index: '', email: '', question: '', reply: '' })}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    {/* <Heading as="h3">are your sure!</Heading> */}
                    <Text as="p">User's message</Text>
                    <Row>
                        <Label  text={replyModal.question}/>
                        <Col xl={12}>
                            <LabelTextarea  label="Your reply" onChange={(e)=> setReplyModal({...replyModal,reply: e.target.value })} name ='totalCapacity' value ={replyModal.reply} fieldSize="w-100 h-md" />
                        </Col>
                    </Row>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setReplyModal({active:false, _id:'', index: '', email: '', question: '', reply: '', })}>Cancel</Button>
                        <Button type="button" className="btn btn-danger" onClick={()=> {replyToUser(replyModal._id, replyModal.reply, replyModal.index); setAlertModal({active:false, _id:'', index: '', email: '', question: '', reply: '', })}}>{sending}</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
            
            <Modal show={ alertModal.active } onHide={()=> setAlertModal({active: false,id: '', index: ''})}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to delete this message?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setAlertModal({active: false,id: '', index: ''})}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={()=> {deleteMessage(alertModal.id,alertModal.index); setAlertModal({active: false,id: '', index: ''})}}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>

        </Box>
    );
}