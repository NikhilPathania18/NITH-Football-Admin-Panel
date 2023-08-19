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
import * as API from '../../api/faqs'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditFaq() {
  const navigate = useNavigate();
const id = useParams().id
  const [form,setForm] = useState({
    enQuestion: '',
    enAnswer: '',
    areQuestion: '',
    areAnswer: ''
  })

  const resetForm = () => {
    setForm({
      enQuestion: '',
      enAnswer: '',
      areQuestion: '',
      areAnswer: ''
    })
  }
  const handleSubmit = async() => {
    try { 
      const res = await API.updateFaq(id,{
        en: {
          question: form.enQuestion,
          answer: form.enAnswer
        },
        are: {
          question: form.areQuestion,
          answer: form.areAnswer
        }
      })
      if(res&&res.data.status)  toast.success('FAQ updated successfully')
      resetForm();
      navigate('/faqs-list')
      console.log(res)
      
    } catch (error) {
      if(error?.response?.data?.message)  toast.error(error.response.data.message)
      else  toast.error('Failed to update FAQ')
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value});
  }

  useEffect(()=>{
    const fetchData = async(id) => {
        try {
          const res = await API.getFaqById(id);
          const data = res.data;
          setForm({
              enQuestion: data.en.question,
              enAnswer: data.en.answer,
              areQuestion: data.are.question,
              areAnswer: data.are.answer
          })
          console.log(form);
        } catch (error) {
          if(error.response.data.message) toast(error.response.data.message)
          else  toast.error('Failed to fetch FAQ details')
        }
    }
    if(id)
    fetchData(id);
  },[id])
  const [data, setData] = useState([]);
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
            <Breadcrumb title='edit faq'>
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
        <Col xl={6}>
          <CardLayout>
            <CardHeader title="english details" dotsMenu={data?.dotsMenu} />
            <Row>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="question"
                  fieldSize="w-100 h-md"
                  value = {form.enQuestion}
                  onChange = {handleChange}
                  name = 'enQuestion'
                />
              </Col>
              <Col xl={12}><LabelTextarea label="answer"  name ='enAnswer' value = { form.enAnswer} onChange = {handleChange}fieldSize="w-100 h-text-md" /></Col>
            </Row>
          </CardLayout>
        </Col>

        <Col xl={6}>
          <CardLayout>
            <CardHeader title="Arabic details" dotsMenu={data?.dotsMenu} />
            <Row>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="question"
                  fieldSize="w-100 h-md"
                  name = 'areQuestion'
                  value = {form.areQuestion}
                  onChange = {handleChange}
                />
              </Col>
              <Col xl={12}><LabelTextarea label="answer"  name ='areAnswer' value ={form.areAnswer} onChange = {handleChange} fieldSize="w-100 h-text-md" /></Col>
            </Row>
          </CardLayout>
        </Col>
        <Col xl = {12}>
          <CardLayout className={'d-flex justify-content-center'}>
            <Button className={'mc-btn primary text-xl py-4'} onClick={handleSubmit}>Add Faq</Button>
          </CardLayout>
        </Col>
      </Row>

    </PageLayout>
  );
}
