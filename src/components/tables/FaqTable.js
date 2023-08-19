import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Anchor, Heading, Box, Text, Input, Image, Icon, Button } from "../elements";
import * as API from '../../api/faqs'
import EmptyList from "../EmptyList";

export default function FaqTable({ thead, tbody }) {
    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);

    let newData = data
    const deleteFaq = async(id,index) => {
        const res = await API.deleteFaq(id);
        if(res.data.status===true){
            const updatedData = [...newData]
            updatedData.splice(index,1)
            setData(updatedData)
        }
    }

    useEffect(()=> { setData(tbody) }, [tbody]);
    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if(name === "allCheck") {
            const checkData = data?.map((item)=> {
                return { ...item, isChecked: checked };
            });
            setData(checkData);
        }
        else {
            const checkData = data?.map((item) => 
                item.name === name ? {...item, isChecked: checked} : item
            );
            setData(checkData);
        }
    }

    return (
        <Box className="mc-table-responsive">
            {data.length===0&&<EmptyList title={'FAQs'} />}
            {
                data.length!==0&&

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
                                        <Heading as="h6">{ item?.en?.question }</Heading>
                                        {/* <Text>{ item?.en?. }</Text> */}
                                    </Box>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-trip md">
                                    {/* <Image src={ item.src } alt={ item.alt } /> */}
                                    <Box className="mc-table-group">
                                        {/* <Heading as="h6">{ item?.are?.title }</Heading> */}
                                        <Text>{ item?.en?.answer }</Text>
                                    </Box>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-trip md">
                                    {/* <Image src={ item.src } alt={ item.alt } /> */}
                                    <Box className="mc-table-group">
                                        {/* <Heading as="h6">{ item?.are?.title }</Heading> */}
                                        <Text>{ item?.are?.question }</Text>
                                    </Box>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-trip md">
                                    {/* <Image src={ item.src } alt={ item.alt } /> */}
                                    <Box className="mc-table-group">
                                        {/* <Heading as="h6">{ item?.are?.title }</Heading> */}
                                        <Text>{ item?.are?.answer }</Text>
                                    </Box>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor href={`/faq-view/${item._id}`} title="View" className="material-icons view">visibility</Anchor>
                                    <Anchor href={`/edit-faq/${item._id}`} title="Edit" className="material-icons edit">edit</Anchor>
                                    <Button title="Delete" className="material-icons delete" onClick={()=> {setAlertModal({active:true, id:item?._id , index: index})}}>delete</Button>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            }

            <Modal show={ alertModal.active } onHide={()=> setAlertModal({active: false,id: '', index: ''})}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to delete this FAQ?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setAlertModal({active: false,id: '', index: ''})}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={()=> {deleteFaq(alertModal.id,alertModal.index); setAlertModal({active: false,id: '', index: ''})}}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box>
    );
}