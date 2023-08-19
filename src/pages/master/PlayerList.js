import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import PlayerTable from "../../components/tables/PlayerTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/playerList.json";
import * as API from "../../api/player";
import { toast } from "react-toastify";

export default function PlayerList() {
  const [playerData, setPlayerData] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.playerList();
        setPlayerData(data.playersList);
        setSelectedPlayers(data.playersList);
      } catch (error) {
        if (error?.response?.data?.message)
          toast.error(error.response.data.message);
        else toast.error("Failed to fetch player list");
      }
    };
    fetchData();
  }, []);

  const [filterYear,setFilterYear] = useState(null)
  const [filterBranch,setFilterBranch] = useState('all')

  // useEffect(() => {
  //   let tempArray = selectedPlayers;
  //   if(filterYear==null){
  //     temp
  //   }
  // }, [filterYear,filterBranch]);
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={'Players List'}>
              {/* {data?.breadcrumb.map((item, index) => (
                <li key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </li>
              ))} */}
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
              <Col xs={12} sm={6} md={4} lg={3} >
                <LabelField
                  type = {Number}
                  label={'Year'}
                  value = {filterYear}
                  onChange = {(e)=>{setFilterYear(e.target.value)}}
                  labelDir="label-col"
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} >
                <LabelField
                  // type = { item.type }
                  label={'Branch'}
                  option={['all','cse','electrical','civil','ece','architecture','ep','mnc','mechanical','material','chemical']}
                  value = {filterBranch}
                  onChange = {(e)=>{setFilterBranch(e.target.value)}}
                  labelDir="label-col"
                  fieldSize="w-100 h-md"
                />
              </Col>
              <Col xl={12}>
                <PlayerTable thead={data?.trip.thead} tbody={selectedPlayers} />
                {/* <Pagination /> */}
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
