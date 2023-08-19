import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Anchor, Heading, Box, Text, Input, Image, Icon, Button } from "../elements";
import * as API from '../../api/team'
import EmptyList from "../EmptyList";
import { toast } from "react-toastify";
export default function TeamsTable({ thead, tbody }) {
    const [alertModal, setAlertModal] = useState({active: false,id: '',index: ''});
    const [data, setData] = useState([]);

    useEffect(()=> { setData(tbody) }, [tbody]);

    let newData = data
    const deleteTeam = async(id,index) => {
        try {
            const {data} = await API.deleteTeam(id)
            if(data.success){
                const updatedData = [...newData]
                updatedData.splice(index,1)
                setData(updatedData)
                toast.warning('Team Deleted') 
            }
        } catch (error) {
            if(error?.response?.data?.message)  toast.error(error.response.data.message)
            else    toast.error('Failed to delete Team')
            console.log(error)
        }
    }

    return (
        <Box className="mc-table-responsive">
            {data.length===0&&<EmptyList title={'Teams'} />}
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
                                    checked={ data?.filter((team)=> team.isChecked !== true).length < 1 } 
                                    onChange={ handleCheckbox } 
                                /> */}
                                <Text>uid</Text>
                            </Box>
                        </Th>
                        {thead.map((team, index) => (
                            <Th key = {index}>{ team }</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                    {data?.map((team, index) => (
                        <Tr key={ index }> 
                            <Td title={ index + 1 }>
                                <Box className="mc-table-check">
                                    {/* <Input 
                                        type="checkbox" 
                                        name={team.name} 
                                        checked={ team?.isChecked || false }
                                        onChange={ handleCheckbox } 
                                    /> */}
                                    <Text>#{ index + 1 }</Text>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-profile">
                                {team?.logo && <Image src={team?.logo} />}
                                <Text>{team?.name.toUpperCase()}</Text>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-trip md">
                                    {/* <Image src={ team.src } alt={ team.alt } /> */}
                                    <Box className="mc-table-group">
                                        {/* <Heading as="h6">{ team?.type}</Heading> */}
                                        <Text >{ team?.type.toUpperCase() }</Text>
                                    </Box>
                                </Box>
                            </Td>
                            <Td>{ team?.numberOfMatches }</Td>
                            <Td>{ team?.wins }</Td>
                            <Td>{ team?.loses }</Td>
                            <Td>{ team?.draw }</Td>
                            <Td>{ team?.goals }</Td>
                            <Td>{ team?.cleanSheets }</Td>
                            <Td>
                                {team?.players.length}
                            </Td>
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor href={`/team-view/${team._id}`} title="View" className="material-icons view">visibility</Anchor>
                                    <Anchor href={`/update-team/${team._id}`} title="Edit" className="material-icons edit">edit</Anchor>
                                    <Button title="Delete" className="material-icons delete" onClick={()=> setAlertModal({active:true, id:team?._id , index: index})}>delete</Button>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            }
            

            <Modal show={ alertModal.active } onHide={()=> setAlertModal({active: false,id: '',index: ''})}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to delete this Team?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setAlertModal({active: false,id: '', index: ''})}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={()=> {deleteTeam(alertModal.id,alertModal.index); setAlertModal({active: false,id: '', index: ''})}}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box>
    );
}