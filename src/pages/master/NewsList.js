import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import AddonTable from "../../components/tables/TeamsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/TeamsList.json";
import { toast } from "react-toastify";
import NewsTable from "../../components/tables/NewsTable";
import { getAllNews } from "../../api/news";

export default function NewsList() {
    const [newsList, setNewsList] = useState([])

    const head = ["news title", "Action"]

    useEffect(()=>{
        const fetchData = async() => {
            try {
                const {data} = await getAllNews();
                let news = data.news
                news = news.reverse();
                setNewsList(news)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[])
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title={"News List"}>
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
              {/* {data?.trip.filter.map((item, index)=> (
                                <Col xs={12} sm={6} md={4} lg={3} key={ index }>
                                    <LabelField
                                        type = { item.type }
                                        label = { item.label }
                                        option = { item.option }
                                        placeholder = { item.placeholder }
                                        labelDir = "label-col"
                                        fieldSize = "w-100 h-md"
                                    />
                                </Col>
                            ))} */}
              <Col xl={12}>
                <NewsTable thead={head} tbody={newsList} />
                {/* <Pagination /> */}
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
