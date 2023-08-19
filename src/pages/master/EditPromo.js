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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function EditPromo() {
  const navigate = useNavigate()
  
    const id = useParams().id

  const resetForm = () => {
    setForm({
      enDescription: '',
      areDescription: '',
      minAmount: '',
      discount: '',
      promoStatus: 'Active',
      promoExpiry: '',
      promoUsageLimit: '',
      promoCode: '',
      type: 'percentage'
      })
  }
  const handleSubmit = async() => {
    try {
        console.log(typeof form.promoExpiry);
        const res = await API.updatePromo(id,{
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

      if(res.data.status) toast.success('Promo Created successfully')
      resetForm();
      navigate('/promos-list') 
      console.log(res)
      
    } catch (error) {
      if(error.response.data.message) toast.error(error.response.data.message)
      else  toast.error('Something went wrong')
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value});
  }

  const [form,setForm] = useState({
    enDescription: '',
    areDescription: '',
    minAmount: '',
    discount: '',
    promoStatus: 'Active',
    promoExpiry: '',
    promoUsageLimit: '',
    promoCode: '',
    type: 'percentage'
  })


  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData = async(id) => {

        try {
            const res = await API.getPromoById(id);
            const data = res.data.data
            let date = res.data.data.promoExpiry
            date = date.split('T')
            date = date[0]

            setForm({
                enDescription: data.en.description,
                areDescription: data.are.description,
                minAmount: data.minAmount,
                discount: data.discount,
                promoStatus: data.promoStatus,
                promoExpiry: date,
                promoUsageLimit: data.promoUsageLimit,
                promoCode: data.promoCode,
                type: data.type
            })
        } catch (error) {
            if(error?.response?.data?.status) toast.error(error?.response?.data?.message)
            else  toast.error('Failed to get Promo details')
            console.log(error);
        }
    }
    if(id)
    fetchData(id)
  },[id])


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
            <Button className={'mc-btn primary text-xl py-4'} onClick={handleSubmit}>Update PROMO</Button>
        </Col>
            </Row>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
