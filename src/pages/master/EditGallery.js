import React, { useEffect , useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Box, Item, Text, Icon, List, Image, Heading, Button, Input, Label } from "../../components/elements";
import { CustomerReview, RatingAnalytics } from "../../components/review";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import LabelTextarea from "../../components/fields/LabelTextarea";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/tripView.json";
import * as API from '../../api/gallery'
import { toast } from "react-toastify";
export default function EditGallery() {
    const [images,setImages] = useState([])
    
    useEffect(()=>{
        const fetchData = async() => {
            const res = await API.getAllImages();
            console.log(res.data.data?.gallery?.image);
            setImages(res.data.data.gallery.image)
        }
        fetchData();
    },[]) 

    const [submitting, setSubmitting] = useState('Publish Changes')
    const removeImage = (index) =>{
        let imageArray = [...images];
        imageArray.splice(index,1)
        setImages(imageArray)
    }

    const handleImageChange = async (e) => {
        const fileList = e.target.files;
        setImages([...images, ...fileList]);
    };

    const handleSubmit = async() => {
        try {
            setSubmitting('Uploading ...')
            const galleryData = new FormData();
            console.log(images);
            images.forEach((img,index)=>{
                if(typeof img === 'string')
                galleryData.append('image[]',img)
                else
                galleryData.append(`image${index}`, img)
            })

            const res = await API.updateGallery(galleryData);
            setSubmitting('Publish Changes')
            if(res&&res.data.status)    toast.success('Gallery updated successfully')
            console.log(res);
        } catch (error) {
            setSubmitting('Publish Changes')
            if(error.response.data.message) toast.error(error.response.data.message)
            else toast.error('Failed to update gallery')
            console.log(error);
        }
    }

    return (
        <PageLayout>
            <CardLayout className="mb-4">
                <Breadcrumb title='Gallery'>
                <Item key={ 0 } className="mc-breadcrumb-item">
                    <Anchor className="mc-breadcrumb-link" href={'/'}>Home</Anchor>    
                </Item>
                <Item key={ 1 } className="mc-breadcrumb-item">
                    Gallery
                </Item>
                <Item key={ 2 } className="mc-breadcrumb-item">
                    View
                </Item>
                </Breadcrumb>
            </CardLayout>
            <CardLayout className="p-lg-5">
                <Row>
                    <Col xl={6}>
                        <CardLayout>
                        <DivideTitle title="gallery" className="mb-4" />
                        <Box className = 'mc-trip-upload-media'     >
                        <Box className="mc-trip-upload-file">
                                <Input type="file" id = 'image' name='image' multiple onChange={handleImageChange} />
                                <Label htmlFor="image"><Icon type="collections" /><Text>{ 'uploadFile' }</Text></Label>
                            </Box>
                            {
                                images.map((img, index) => (
                                    <Box key={img.name} className="mc-trip-upload-image">
                                      {typeof img === 'string' ? (
                                        <Image src={img} alt="boat image" style={{maxHeight: '250px'}} />
                                      ) : (
                                        <Image src={URL?.createObjectURL?.(img)} alt="boat image" style={{maxHeight: '250px'}} />
                                      )}
                                      <Button style={{ color: 'red' }} onClick={() => { removeImage(index) }} className="material-icons delete position-absolute top-0 end-0 m-2 image-delete-button">cancel</Button>
                                    </Box>
                                  ))
                            }
                        </Box>
                        </CardLayout>
                        <Anchor 
                            className="mc-btn w-100 primary mt-5" 
                            text={submitting}
                            icon={submitting==='Publish Changes'?"cloud_upload":undefined }
                            href="#"
                            onClick={handleSubmit}
                        />
                    </Col>
                    
                </Row>
            </CardLayout>
        </PageLayout>
    )
}