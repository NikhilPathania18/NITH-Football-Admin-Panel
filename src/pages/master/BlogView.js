import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import JoditEditor from "jodit-react";
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
import * as API from "../../api/blogs";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function BlogView() {
    const id = useParams().id;
    useEffect(()=>{
        const fetchData = async(id) => {
            try {
                const res = await API.getBlogById(id)
                const data = res.data.data;
                setEnTitle(data.en.title)
                setAreTitle(data.are.title)
                setEnPostContent(data.en.content)
                setArePostContent(data.are.content)
                setCoverImage([data.image])
            } catch (error) {
                if(error.response.data.message) toast.error(error.response.data.message)
                else  toast.error('Failed to fetch Blog details')
                console.log(error);
            }
        }
        if(id)
        fetchData(id);
    },[id])
  const [enPostContent, setEnPostContent] = useState("");
  const [arePostContent, setArePostContent] = useState("");
  const [selectedEnImages, setEnSelectedImages] = useState([]);
  const [selectedAreImages, setAreSelectedImages] = useState([]);
  const [data,setData] = useState([])
  const [enTitle, setEnTitle] = useState('')
  const [areTitle, setAreTitle] = useState('')

  const [coverImage,setCoverImage] = useState([])

  const handleCoverImage = (event) => {
    const files = Array.from(event.target.files)
    setCoverImage(files)
  }


  const handleEnFileChange = (event) => {
    const files = Array.from(event.target.files);
    setEnSelectedImages(files);
  };

  const handleAreFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAreSelectedImages(files);
  };

  const handleEnImageInsert = async(image) => {
    try {
        const imageData = new FormData();
        imageData.append('image',image) 
        const {data} = await API.getImageLink(imageData)
        const imageUrl = data.image
        console.log(imageUrl);

        const imageTag = `<img src="${imageUrl}" width="300px"  alt="Inserted Image" />`;
        const updatedContent = `${enPostContent}${imageTag}`;
    setEnPostContent(updatedContent);
    } catch (error) {
        console.log(error);
    }

    
  };
  const handleAreImageInsert = async(image) => {

    try {
        const imageData = new FormData();
        imageData.append('image',image)
        const {data} = await API.getImageLink(imageData)
        const imageUrl = data.image

        const imageTag = `<img src="${imageUrl}" width="300px"  alt="Inserted Image" />`;
        const updatedContent = `${arePostContent}${imageTag}`;
        setArePostContent(updatedContent);
    } catch (error) {
        console.log(error);
    }

    
  };

  const handleSubmit = async() => {
    try {
        const blogData = new FormData();
        blogData.append('enTitle',enTitle)
        blogData.append('areTitle',areTitle)
        blogData.append('enPostContent',enPostContent)
        blogData.append('arePostContent',arePostContent)
        coverImage.forEach((image)=>{
            blogData.append('image',image)
        })
        const res = await API.updateBlog(id,blogData)

        console.log(res);
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
        <CardLayout>
            <Breadcrumb title='Blog View'>
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
        <Col xl = {12}>
        {
            coverImage.map((img,index) => (
                <Box key={img.name} className="mc-trip-upload-image d-flex justify-content-center">
                    {
                        (typeof img ==='string')?<Image  src={img}  alt="boat image" style={{maxWidth: '300px'}}/>:<Image  src={URL?.createObjectURL?.(img)}  alt="boat image" style={{maxWidth: '300px'}}/>
                    }
                </Box>
              ))

        }
        
        </Col>
        <Col xl={6}>
          <CardLayout>
            <Row>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="english title"
                  fieldSize="w-100 h-md"
                    value = {enTitle}
                    disabled
                  name="title"
                />
              </Col>
              <Col xl={12}>
                <div className=" mx-auto p-6 blog-view" style={{border: '1px solid #9a9a9a', padding: '5px', borderRadius: '5px', wordWrap: 'break-word'}}>
                    <div className="" dangerouslySetInnerHTML={{__html: enPostContent }}></div>
                </div>
              </Col>
            </Row>
          </CardLayout>
        </Col>

        <Col xl={6}>
          <CardLayout>
            <Row>
              <Col xl={12}>
                <LabelField
                  type="text"
                  label="arabic title"
                  fieldSize="w-100 h-md"
                    value = {areTitle}
                  name="title"
                  disabled
                />
              </Col>
              <Col xl={12}>
              <div className="max-w-4xl mx-auto p-6" style={{border: '1px solid #9a9a9a', padding: '5px', borderRadius: '5px', wordWrap: 'break-word'}}>
                    <div className="" dangerouslySetInnerHTML={{__html: arePostContent }}></div>
                </div>
              </Col>
            </Row>
          </CardLayout>
        </Col>

      </Row>
    </PageLayout>
  );
}