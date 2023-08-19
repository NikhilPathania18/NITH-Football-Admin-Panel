import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import AddonTable from "../../components/tables/TeamsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout";
import * as API from "../../api/promos";
import data from "../../data/master/promoList.json";
import PromoTable from "../../components/tables/PromoTable";
import { toast } from "react-toastify";

export default function PromoList() {
  const [promoData, setPromoData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.getAllPromos();
        console.log(res);
        const data = res.data.data;
        setPromoData(data);
      } catch (error) {
        if (error?.response?.data?.message)
          toast.error(error.response.data.message);
        else toast.error("Failed to fetch Promo List");
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
            <Breadcrumb title={"Promos List"}>
              {/* {data?.breadcrumb.map((item, index) => (
                                <li key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
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
                <PromoTable thead={data?.trip.thead} tbody={promoData} />
                {/* <Pagination /> */}
              </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
