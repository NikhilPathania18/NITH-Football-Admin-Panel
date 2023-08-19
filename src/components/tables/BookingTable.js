import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Button,
  Image,
  Input,
  Text,
  Box,
  Icon,
  Anchor,
  Option,
  Heading,
} from "../elements";
import userInfo from "../../data/master/bookingList.json";
import * as API from "../../api/bookings";
import EmptyList from "../EmptyList";

export default function BookingTable({
  thead,
  tbody,
  pendingUsers,
  approvedUsers,
  blockedUsers,
  setPendingUsers,
  setApprovedUsers,
  setBlockedUsers,
}) {
  const [data, setData] = useState([]);
  const [userData, setUserData] = React.useState("");
  const [editModal, setEditModal] = React.useState(false);
  const [blockModal, setBlockModal] = React.useState({
    active: false,
    id: "",
    index: "",
  });

  useEffect(() => {
    setData(tbody);
  }, [tbody]);

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;

    if (name === "allCheck") {
      const checkData = data?.map((item) => {
        return { ...item, isChecked: checked };
      });
      setData(checkData);
    } else {
      const checkData = data?.map((item) =>
        item?.name === name ? { ...item, isChecked: checked } : item
      );
      setData(checkData);
    }
  };

  let newData = data;

  const blockUser = async (id, index) => {
    try {
      const res = await API.getAllBookings(id);
      if (res.data.status === true) {
        const updatedData = [...newData];
        setBlockedUsers(++blockedUsers);
        if (!updatedData[index].isEmailVerified)
          setPendingUsers(--pendingUsers);
        else setApprovedUsers(--approvedUsers);
        updatedData[index].isBlocked = true;
        setData(updatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unBlockUser = async (id, index) => {
    try {
      const res = await API.getAllBookings(id);
      if (res.data.status === true) {
        const updatedData = [...newData];
        setBlockedUsers(--blockedUsers);
        if (!updatedData[index].isEmailVerified)
          setPendingUsers(++pendingUsers);
        else setApprovedUsers(++approvedUsers);
        updatedData[index].isBlocked = false;
        setData(updatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="mc-table-responsive">
      {data.length === 0 && <EmptyList title={"Users"} />}
      {data.length !== 0 && (
        <Table className="mc-table">
          <Thead className="mc-table-head primary">
            <Tr>
              <Th >
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
                <Td title="id">
                  <Box className="mc-table-check">
                    <Text>#{index + 1}</Text>
                  </Box>
                </Td>
                <Td title={item?.userName}>
                <Box className="mc-table-icon role">
                  {item?.user?._id&&(
                    <Text className="mc-table-badge green">True</Text>
                  )}
                  {!item?.user?._id&&(
                    <Text className="mc-table-badge red">False</Text>
                  )}
                  </Box>
                </Td>
                <Td title={item?.role}>
                    <Text>{item?.user?.userName}</Text>
                </Td>
                <Td title={item?.user?.email}>{item?.user?.email}</Td>
                <Td title={item?.user?.email}>{item?.user?.phone}</Td>
                <Td title={item?.user?.email}>{item?.trip?.en?.title}</Td>
                <Td title={item?.selectedSlot}>
                    <Text className="mc-table-badge ">{item?.selectedSlot?.date}</Text>
                    <Text className="mc-table-badge ">{item?.selectedSlot?.time}</Text>
                </Td>
                <Td title={item?.isDeleted}>
                    <Text className="mc-table-badge ">{item?.totalPrice}</Text>
                </Td>
                <Td title={item?.fromGoogle}>
                    <Text className="mc-table-badge ">{item?.numberOfPersons}</Text>
                </Td>
                <Td title={item?.isBlocked}>
                  {item?.paymentDetails.paymentStatus === true && (
                    <Text className="mc-table-badge green">True</Text>
                  )}
                  {item?.paymentDetails.paymentStatus  === false && (
                    <Text className="mc-table-badge red">False</Text>
                  )}
                </Td>
                <Td title={item?.status}>
                  {item?.status === 'Pending' && (
                    <Text className="mc-table-badge purple">Pending</Text>
                  )}
                  {item?.status  === 'Cancelled' && (
                    <Text className="mc-table-badge red">Cancelled</Text>
                  )}
                  {item?.status  === 'Confirmed' && (
                    <Text className="mc-table-badge green">Confirmed</Text>
                  )}
                </Td>
                {/* <Td title={ item?.status }>
                                    { item?.status === "approved" && <Text className="mc-table-badge green">{ item?.status }</Text> }
                                    { item?.status === "pending" && <Text className="mc-table-badge purple">{ item?.status }</Text> }
                                    { item?.status === "    blocked" && <Text className="mc-table-badge red">{ item?.status }</Text> }
                                </Td> */}
                {/* <Td>
                  <Box className="d-flex justify-content-center">
                    {item.isBlocked === false && (
                      <Button
                        title="Block User"
                        className="btn btn-danger"
                        onClick={() =>
                          setBlockModal({
                            active: true,
                            id: item?._id,
                            index: index,
                          })
                        }
                      >
                        block
                      </Button>
                    )}
                    {item.isBlocked === true && (
                      <Button
                        title="Block"
                        className="btn btn-success"
                        onClick={() =>
                          setBlockModal({
                            active: true,
                            id: item?._id,
                            index: index,
                          })
                        }
                      >
                        unblock
                      </Button>
                    )}
                  </Box>
                </Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Modal
        show={editModal}
        onHide={() => setEditModal(false, setUserData(""))}
      >
        <Box className="mc-user-modal">
          <Image src={userData.src} alt={userData?.alt} />
          <Heading as="h4">{userData?.name}</Heading>
          <Text as="p">{userData?.email}</Text>
          <Form.Group className="form-group inline mb-4">
            <Form.Label>role</Form.Label>
            <Form.Select>
              <Option>{userData?.role ? userData?.role.text : ""}</Option>
              {userInfo.role.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-group inline">
            <Form.Label>status</Form.Label>
            <Form.Select>
              <Option>{userData?.status}</Option>
              {userInfo.status.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Form.Select>
          </Form.Group>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditModal(false)}
            >
              close popup
            </Button>
            <Button
              type="button"
              className="btn btn-success"
              onClick={() => setEditModal(false)}
            >
              save Changes
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>

      <Modal
        show={blockModal.active}
        onHide={() => setBlockModal({ active: false, id: "", index: "" })}
      >
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">
            Want to {data[blockModal.index]?.isBlocked ? "Unblock" : "Block"}{" "}
            this user's account?
          </Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                setBlockModal({ active: false, id: "", index: "" })
              }
            >
              nop, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (data[blockModal.index]?.isBlocked === true)
                  unBlockUser(blockModal.id, blockModal.index);
                else blockUser(blockModal.id, blockModal.index);
                setBlockModal({ active: false, id: "", index: "" });
              }}
            >
              yes, {data[blockModal.index]?.isBlocked ? "Unblock" : "Block"}
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
