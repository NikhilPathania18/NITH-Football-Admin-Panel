import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import AddonTable from "../../components/tables/TeamsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import * as API from "../../api/match";
import data from "../../data/master/blogList.json";
import BlogsTable from "../../components/tables/MatchesTable";
import { toast } from "react-toastify";

export default function MatchesList() {
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await API.getMatchesList();
        setBlogData(data.matchesList);
      } catch (error) {
        if (error.response.data.message)
          toast.error(error.response.data.message);
        else toast.error("Failed to fetch Matches List");
        console.log(error.message);
      }
    }
    fetchData();
  }, []);
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={'Matches List'}>
              {data?.breadcrumb.map((item, index) => (
                <li key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
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
              <Col xl={12}>
                <BlogsTable thead={data?.trip.thead} tbody={blogData} />
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
