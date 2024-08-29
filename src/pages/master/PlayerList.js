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
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.playerList();
        setPlayerData(response.data.playersList);
        setSelectedPlayers(response.data.playersList);
      } catch (error) {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to fetch player list");
        }
      }
    };
    fetchData();
  }, []);

  const filterPlayers = (str) => {
    setFilterString(str);
    if (!str) {
      setSelectedPlayers(playerData);
    } else {
      str = str.toLowerCase();
      const filteredArray = playerData.filter(
        (player) =>
          player.name.toLowerCase().includes(str) ||
          player.rollNo.toLowerCase().includes(str)
      );
      setSelectedPlayers(filteredArray);
    }
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={"Players List"}>
              {/* Your breadcrumb items */}
            </Breadcrumb>
          </CardLayout>
        </Col>
        <Col xl={12}>
          <CardLayout>
            <Row>
              <Col xs={12} sm={6} md={6} lg={6}>
                <LabelField
                  type={"text"}
                  label={"Enter Name or Roll Number"}
                  value={filterString}
                  onChange={(e) => filterPlayers(e.target.value)}
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
