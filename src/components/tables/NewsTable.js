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
  Item,
} from "../elements";
import userInfo from "../../data/master/userList.json";
import * as API from "../../api/news";
import EmptyList from "../EmptyList";
import { toast } from "react-toastify";
import { setMainNews } from "../../api/news";

export default function NewsTable({
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

  

  let newData = data;

  
  const makeMainNews = async (id) => {
    try {
      if (!id) {
        toast.error("Failed to make it main news");
        return;
      }

      const { data } = await setMainNews(id);

      toast.success("Main News Set");
    } catch (error) {
      toast.error("Failed to make it main news");
      console.log(error);
    }
  };

  const deleteNews =async(id, index) => {
    try {
        
        const res = await API.deleteNews(id)

        let news = data
        news.splice(index,1)

        setData([...news])

        toast.success('News deleted successfully')
    } catch (error) {
        toast.error('Failed to delete News')
        console.log(error)
    }
  }
  return (
    <Box className="mc-table-responsive">
      {data.length === 0 && <EmptyList title={"Users"} />}
      {data.length !== 0 && (
        <Table className="mc-table">
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
                <Td title="id">
                  <Box className="mc-table-check">
                    <Text>#{index + 1}</Text>
                  </Box>
                </Td>
                <Td title={item?.title}>
                  <Box className="mc-table-profile">
                    {item.image && <Image src={item?.image} />}
                    <Text title={item?.title}>{item?.title}</Text>
                  </Box>
                </Td>

                <Td>
                  <Box className="mc-table-action">
                    <Anchor
                      href={"#"}
                      onClick={() => {
                        makeMainNews(item._id);
                      }}
                      title="Set as main news"
                      className="material-icons edit"
                    >
                      grade
                    </Anchor>
                    <Button
                      key={item?._id}
                      title="Delete"
                      className="material-icons delete"
                      onClick={() => {setBlockModal({active: true, id: item?._id, index: index})}}
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
        show={blockModal.active}
        onHide={() => setBlockModal({ active: false, id: "", index: "" })}
      >
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">are your sure!</Heading>
          <Text as="p">Want to delete this News?</Text>
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
                deleteNews(blockModal.id, blockModal.index);
                setBlockModal({ active: false, id: "", index: "" })
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
