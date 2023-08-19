import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Anchor, Heading, Box, Text, Input, Image, Icon, Button } from "../elements";
import * as API from '../../api/player'
import EmptyList from "../EmptyList";
import { toast } from "react-toastify";

export default function PlayerTable({ thead, tbody }) {
    const [alertModal, setAlertModal] = useState({active: false, id: '', index: ''});
    const [data, setData] = useState([]);
    useEffect(()=> { setData(tbody) }, [tbody]);

    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if(name === "allCheck") {
            const checkData = data?.map((player)=> {
                return { ...player, isChecked: checked };
            });
            setData(checkData);
        }
        else {
            const checkData = data?.map((player) => 
                player.name === name ? {...player, isChecked: checked} : player
            );
            setData(checkData);
        }
    }
    let newData = data;

    const deletePlayer = async(id,index) => {
        try {
            const res = await API.deletePlayer(id);
            if(res.data.success===true){
                const updatedData = [...newData]
                updatedData.splice(index,1)
                setData(updatedData)
                toast.success('Player deleted')
            }

        } catch (error) {
            if(error?.response?.data?.message)  toast.error(error.response.data.message)
            else    toast.error('Failed to delete Player')
        }
        
    }

    return (
        <Box className="mc-table-responsive">
            {data.length===0&&<EmptyList title={'Players'} />}
            {
                data.length!==0 &&
            <Table className="mc-table trip">
                <Thead className="mc-table-head primary">
                    <Tr>
                        <Th>
                            <Box className="mc-table-check">
                                {/* <Input 
                                    type="checkbox" 
                                    name="allCheck"
                                    checked={ data?.filter((player)=> player.isChecked !== true).length < 1 } 
                                    onChange={ handleCheckbox } 
                                /> */}
                                <Text>uid</Text>
                            </Box>
                        </Th>
                        {thead.map((player, index) => (
                            <Th key={ index }>{ player }</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                    {Array.isArray(data) && data?.map((player, index) => (
                        <Tr key={ index }> 
                            <Td title={ index + 1 }>
                                <Box className="mc-table-check">
                                    {/* <Input 
                                        type="checkbox" 
                                        name={player?.name} 
                                        checked={ player?.isChecked || false }
                                        onChange={ handleCheckbox } 
                                    /> */}
                                    <Text>#{ index + 1 }</Text>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-profile">
                                {player?.image && <Image src={player?.image} />}
                                <Text>{player?.name}</Text>
                                </Box>
                            </Td>
                            
                            <Td>
                                <Box className="mc-table-trip md">
                                    <Box className="mc-table-group">
                                        <Text>{ player?.rollNo }</Text>
                                    </Box>
                                </Box>
                            </Td>
                            <Td>{ player?.branch }</Td>
                            <Td>{ player?.startYear }</Td>
                            <Td>{ player?.endYear }</Td>
                            <Td>{ player?.matches }</Td>
                            <Td>{ player?.goals }</Td>
                            <Td>{ player?.assists }</Td>
                            <Td>{ player?.position }</Td>
                            <Td>{ player?.yellowCards }</Td>
                            <Td>{ player?.redCards }</Td>
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor href={`/player-details/${player?._id}`} title="View" className="material-icons view">visibility</Anchor>
                                    <Anchor href={`/update-player/${player?._id}`} title="Edit" className="material-icons edit">edit</Anchor>
                                    <Button key = {player?._id} title="Delete" className="material-icons delete" onClick={(e)=>{ setAlertModal({active:true, id:player?._id , index: index})}}>delete</Button>
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
                    <Text as="p">Want to delete this Player?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setAlertModal({active: false,id: '', index: ''})}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={()=> {deletePlayer(alertModal.id,alertModal.index); setAlertModal({active: false,id: '', index: ''})}}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box>
    );
}