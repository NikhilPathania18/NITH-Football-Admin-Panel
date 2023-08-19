import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Anchor,
  Heading,
  Box,
  Text,
  Input,
  Image,
  Icon,
  Button,
} from "../elements";
import * as API from "../../api/match";
import EmptyList from "../EmptyList";
import { toast } from "react-toastify";

export default function MatchesTable({ thead, tbody }) {
  const [alertModal, setAlertModal] = useState({
    active: false,
    id: "",
    index: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(tbody);
  }, [tbody]);

  let newData = data;
  const deleteMatch = async (id, index) => {
    try {
      const res = await API.deleteMatch(id);
      if (res.data.success) {
        const updatedData = [...newData];
        updatedData.splice(index, 1);
        setData(updatedData);
        toast.warn("Match deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertDateToString = (date) => {
    let ans = date;
    ans = date.split("T")[0];
    return ans;
  };

  return (
    <Box className="mc-table-responsive">
      {data.length === 0 && <EmptyList title={"Blogs"} />}
      {data.length !== 0 && (
        <Table className="mc-table trip">
          <Thead className="mc-table-head primary">
            <Tr>
              <Th>
                <Box className="mc-table-check">
                  <Text>uid</Text>
                </Box>
              </Th>
              {thead.map((item, index) => (
                <Th key={index}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody className="mc-table-body even">
            {data?.map((item, index) => (
              <Tr key={index}>
                <Td title={index + 1}>
                  <Box className="mc-table-check">
                    <Text>#{index + 1}</Text>
                  </Box>
                </Td>
                <Td title={item?.status}>
                  {item?.status === "upcoming" && (
                    <Text className="mc-table-badge purple">Upcoming</Text>
                  )}
                  {item?.status === "ongoing" && (
                    <Text className="mc-table-badge green">Ongoing</Text>
                  )}
                  {item?.status === "ended" && (
                    <Text className="mc-table-badge red">Ended</Text>
                  )}
                </Td>
                <Td>
                  <Box className="mc-table-trip md">
                    <Box className="mc-table-group">
                      <Heading title={item?.tournament?.name} as="h6">
                        {item?.tournament.name}
                      </Heading>
                    </Box>
                  </Box>
                </Td>
                <Td>
                  <Box className="mc-table-trip md">
                    <Box className="mc-table-group">
                      <Heading as="h6">
                        {convertDateToString(item?.date)}
                      </Heading>
                    </Box>
                  </Box>
                </Td>
                <Td>
                  <Text>{item?.teamA?.name.toUpperCase()}</Text>
                </Td>
                <Td>
                  <Text>{item?.teamB?.name.toUpperCase()}</Text>
                </Td>
                <Td>
                  <Text>{item?.teamAScore}</Text>
                </Td>
                <Td>
                  <Text>{item?.teamBScore}</Text>
                </Td>
                <Td>
                  <Text>{item?.winner}</Text>
                </Td>
                <Td>
                  <Box className="mc-table-action overflow-auto">
                    {(item?.status === "upcoming" ||
                      item?.status === "ongoing") && (
                        <Anchor
                          href={`/live-match-update/${item._id}`}
                          title="live"
                          className="material-icons edit"
                        >
                          settings
                        </Anchor>
                      )}

                    {/* <Anchor
                      href={`/view-match/${item._id}`}
                      title="View"
                      className="material-icons view"
                    >
                      visibility
                    </Anchor>
                    <Anchor
                      href={`/update-match/${item._id}`}
                      title="Edit"
                      className="material-icons edit"
                    >
                      edit
                    </Anchor> */}
                    <Button
                      title="Delete"
                      className="material-icons delete"
                      onClick={() =>
                        setAlertModal({
                          active: true,
                          id: item?._id,
                          index: index,
                        })
                      }
                    >
                      delete
                    </Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Modal
        show={alertModal.active}
        onHide={() => setAlertModal({ active: false, id: "", index: "" })}
      >
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to delete this Match?</Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                setAlertModal({ active: false, id: "", index: "" })
              }
            >
              nop, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deleteMatch(alertModal.id, alertModal.index);
                setAlertModal({ active: false, id: "", index: "" });
              }}
            >
              yes, delete
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
