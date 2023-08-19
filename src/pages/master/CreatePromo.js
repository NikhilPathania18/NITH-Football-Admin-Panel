import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import {
  Box,
  Heading,
  Anchor,
  Button,
  Image,
  Input,
  Label,
  Icon,
  Text,
} from "../../components/elements";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import { BsFillTrash3Fill } from "react-icons/bs";
import * as API from '../../api/promos'
import { toast } from "react-toastify";
export default function CreatePromo() {
  
  const [form,setForm] = useState({
    enDescription: '',
    areDescription: '',
    minAmount: '',
    type: 'percentage',
    discount: '',
    promoStatus: 'Active',
    promoExpiry: '',
    promoUsageLimit: '',
    promoCode: '',
  })

  const resetForm = () => {
    setForm({
      enDescription: '',
      areDescription: '',
      minAmount: '',
      promoAmount: '',
      promoStatus: 'Active',
      promoExpiry: '',
      promoUsageLimit: '',
      promoCode: '',
    })
  }
  const handleSubmit = async() => {
    try {
      const res = await API.createPromo({
        enDescription: form.enDescription,
        areDescription: form.areDescription,
        minAmount: form.minAmount,
        discount: form.discount,
        promoStatus: form.promoStatus,
        promoExpiry: form.promoExpiry,
        promoUsageLimit: form.promoUsageLimit,
        promoCode: form.promoCode,
        type: form.type
      })

      if(res&&res.data.status){
        console.log(res);
        toast.success('Promo Code created')
        resetForm();
      }
    } catch (error) {
      if(error.response&&error.response.data?.message)  toast.error(error.response.data?.message)
      else toast.error('Something went wrong')
      console.log(error.response);
    }
  }

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value});
  }

  const [data, setData] = useState([]);


  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title='create promo'>
              {data?.breadcrumb?.map((item, index) => (
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
        <Col xl={12}>
          <CardLayout>
            <CardHeader title="promo details"  />
            <Row>
              <Col xl={6}>
                <LabelField
                  type="text"
                  label="promo code"
                  fieldSize="w-100 h-md"
                  value = {form.promoCode}
                  onChange = {handleChange}
                  name = 'promoCode'
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="number"
                  label="promo usage limit"
                  fieldSize="w-100 h-md"
                  value = {form.promoUsageLimit}
                  onChange = {handleChange}
                  name = 'promoUsageLimit'
                />
              </Col>
              <Col xl={6}><LabelTextarea label="english description"  name ='enDescription' value = { form.enDescription} onChange = {handleChange}fieldSize="w-100 h-text-md" /></Col>
              <Col xl={6}><LabelTextarea label="arabic description"  name ='areDescription' value = { form.areDescription} onChange = {handleChange}fieldSize="w-100 h-text-md" /></Col>
              <Col xl={6}>
                <LabelField
                  label="discount by"
                  fieldSize="w-100 h-md"
                  option={['percentage','amount']}
                  value = {form.type}
                  onChange = {handleChange}
                  name = 'type'
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="number"
                  label={`discount ${form.type}`}
                  fieldSize="w-100 h-md"
                  value = {form.discount}
                  onChange = {handleChange}
                  name = 'discount'
                />
              </Col>
              
              <Col xl={6}>
                <LabelField
                  type="number"
                  label="minimum amount"
                  fieldSize="w-100 h-md"
                  value = {form.minAmount}
                  onChange = {handleChange}
                  name = 'minAmount'
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  label="promo status"
                  option={['Active','Inactive']}
                  fieldSize="w-100 h-md"
                  value = {form.promoStatus}
                  onChange = {handleChange}
                  name = 'promoStatus'
                />
              </Col>
              <Col xl={6}>
                <LabelField
                  type="date"
                  label="promo expiry"
                  fieldSize="w-100 h-md"
                  value = {form.promoExpiry}
                  onChange = {handleChange}
                  name = 'promoExpiry'
                />
              </Col>
              <Col xl = {12}>
            <Button className={'mc-btn primary text-xl py-4'} onClick={handleSubmit}>CREATE PROMO</Button>
        </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
