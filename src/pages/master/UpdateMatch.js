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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateMatch() {
    const id = useParams().id;
    const navigate = useNavigate();

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
                if(error.response.data.message)  toast.error(error.response.data.message)
                else  toast.error('Failed to get Blog data')
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

  const resetForm = () =>{
    setEnPostContent('')
    setArePostContent('')
    setEnSelectedImages([])
    setAreSelectedImages([])
    setEnTitle('')
    setAreTitle('')
    setCoverImage([])
  }

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

        const imageTag = `<img src="${imageUrl}" width="300px"  alt="Inserted Image" />`;
        const updatedContent = `${enPostContent}${imageTag}`;
        setEnPostContent(updatedContent);
    } catch (error) {
        if(error.response.data.message) toast.error(error.rresponse.data.message)
        else toast.error('Failed to upload the image')
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
        if(error.response.data.message) toast.error(error.response.data.message)
        else  toast.error('Failed to upload the image')
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
        if(res.data.status) toast.success('Blog updated successfully')
        resetForm();
        navigate('/blogs-list')
        console.log(res);
    } catch (error) {
        if(error.response.data.message) toast.error(error.response.data.message)
        else toast.error('Something went wrong')
        console.log(error);
    }
  };
  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
        <CardLayout>
            <Breadcrumb title='Edit blog'>
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
            coverImage.length===0&&
            <Box className="mc-trip-upload-file mt-4">
            <Input type="file" id = 'coverimage' name='coverimage' onChange={handleCoverImage} />
            <Label htmlFor="coverimage"><Icon type="collections" /><Text> cover image </Text></Label>
        </Box>
        }
        {
            coverImage.map((img,index) => (
                <Box key={img.name} className="mc-trip-upload-image d-flex justify-content-center">
                    {
                        (typeof img ==='string')?<Image  src={img}  alt="boat image" style={{maxWidth: '300px'}}/>:<Image  src={URL?.createObjectURL?.(img)}  alt="boat image" style={{maxWidth: '300px'}}/>
                    }
                  
                  <Button  onClick={()=>{setCoverImage([])}} className="btn btn-danger position-absolute top-0 end-0 m-2 " >Remove Image</Button> 
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
                    onChange = {(e)=>{setEnTitle(e.target.value)}}
                  name="title"
                />
              </Col>
              <Col xl={12}>
                <div className="max-w-4xl mx-auto p-6">
                  <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>
                  <JoditEditor value={enPostContent} onBlur={setEnPostContent} />

                    <Box className="mc-trip-upload-file mt-4">
                            <Input type="file" id = 'image' name='image' multiple onChange={handleEnFileChange} />
                            <Label htmlFor="image"><Icon type="collections" /><Text> upload images </Text></Label>
                        </Box>
                    {
                        selectedEnImages.length!==0&&
                        <h3 className="text-xl text-center" style={{marginTop: '5px'}}>Selected Images</h3>
                    }
                  <div className="mt-6 d-flex" style={{justifyContent: 'center', gap: '10px',flexWrap: 'wrap'}}>
                    {selectedEnImages.map((image) => (
                      <div key={image.name} className="mb-2 d-flex" style={{width:'200px', flexDirection: 'column', justifyContent: 'end'}}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={image?.name}
                          className="w-16 h-16 object-cover rounded"
                          width={200}
                        />
                        <button
                          onClick={() =>
                            handleEnImageInsert(image)
                          } 
                          className="btn btn-primary  "
                          style={{width: '200px', marginTop: '5px'}}
                        >
                          Insert Image
                        </button>
                      </div>
                    ))}
                  </div>
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
                    onChange = {(e)=>{setAreTitle(e.target.value)}}
                  name="title"
                />
              </Col>
              <Col xl={12}>
                <div className="max-w-4xl mx-auto p-6">
                  <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>
                  <JoditEditor value={arePostContent} onBlur={setArePostContent} />

                    <Box className="mc-trip-upload-file mt-4">
                            <Input type="file" id = 'areimage' name='image' multiple onChange={handleAreFileChange} />
                            <Label htmlFor="areimage"><Icon type="collections" /><Text> upload images </Text></Label>
                        </Box>
                    {
                        selectedAreImages.length!==0&&
                        <h3 className="text-xl text-center" style={{marginTop: '5px'}}>Selected Images</h3>
                    }
                  <div className="mt-6 d-flex" style={{justifyContent: 'center', gap: '10px',flexWrap: 'wrap'}}>
                    {selectedAreImages.map((image) => (
                      <div key={image.name} className="mb-2 d-flex" style={{width:'200px', flexDirection: 'column', justifyContent: 'end'}}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={image.name}
                          className="w-16 h-16 object-cover rounded"
                          width={200}
                        />
                        <button
                          onClick={() =>
                            handleAreImageInsert(image)
                          } 
                          className="btn btn-primary  "
                          style={{width: '200px', marginTop: '5px'}}
                        >
                          Insert Image
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </CardLayout>
        </Col>

        <CardLayout className={"d-flex justify-content-center"}>
          <Button
            className={"mc-btn primary text-xl py-4"}
            onClick={handleSubmit}
          >
            Update Blog
          </Button>
        </CardLayout>
      </Row>
    </PageLayout>
  );
}