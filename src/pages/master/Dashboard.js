import React from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ecommerce.json";
import { Box, Item, Anchor } from "../../components/elements";
import { EcommerceCard, SalesCard, TripsCard, RevenueCard, ClientsCard, ActivityCard, OrdersCard } from "../../components/cards";

export default function Dashboard() {
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Box className="mc-card">
                        <Breadcrumb title={data?.pageTitle}>
                            {data?.breadcrumb?.map((item, index) => (
                                <Item key={index} className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                                </Item>
                            ))}
                        </Breadcrumb>
                    </Box>
                </Col>
                <Col xs={12} xl={8}>
                    <Row xs={1} sm={2}>
                        {data?.heros?.map((item, index) => (
                            <Col key={index}>
                                <EcommerceCard
                                    icon={item.icon}
                                    trend={item.trend}
                                    title={item.title}
                                    number={item.number}
                                    variant={item.variant}
                                    percent={item.percent}
                                    compare={item.compare}
                                    dotsMenu={item.dotsMenu}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col xs={12} xl={4}>
                    <SalesCard
                        title={data?.sales.title}
                        amount={data?.sales.amount}
                        percent={data?.sales.percent}
                        trendIcon={data?.sales.trendIcon}
                        dotsMenu={data?.sales.dotsMenu}
                        compare={data?.sales.compare}
                        chart={data?.sales.chart}
                    />
                </Col>
                <Col xl={12}>
                    {/* <TripsCard
                        title={data?.products.title}
                        dotsMenu={data?.products.dotsMenu}
                        table={data?.products.table}
                    /> */}
                </Col>
            </Row>
        </PageLayout>
    );
}
