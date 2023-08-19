import React, { useEffect , useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Box, Item, Text, Icon, List, Image, Heading, Button } from "../../components/elements";
import { CustomerReview, RatingAnalytics } from "../../components/review";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import LabelTextarea from "../../components/fields/LabelTextarea";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/tripView.json";
import * as API from '../../api/gallery'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Gallery() {
    const navigate = useNavigate();
    const [images,setImages] = useState([])

    const goToEdit = () =>{
        navigate('/edit-gallery')
    }
    
    useEffect(()=>{
        const fetchData = async() => {
            try {
                const res = await API.getAllImages();
                setImages(res.data.data.gallery.image)
            } catch (error) {
                if(error.response.data.message) toast.error(error.response.data.message)
                else    toast.error('Failed to fetch images')
            }
        }
        fetchData();
    },[]) 

    // const removeImage = (index) =>{
    //     let imageArray = [...images];
    //     imageArray.splice(index,1)
    //     setImages(imageArray)
    // }

    // const handleImageChange = async (e) => {
    //     const fileList = e.target.files;
    //     setImages([...images, ...fileList]);
    // };

    
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
                    <Col xl={12}>
                        <DivideTitle title="gallery" className="mb-4" />
                        {
                            images.length===0&&
                            <Box className='mc-trip-upload-media' >
                            <p className="m-auto ">No images to show</p>
                        </Box>
                        }   
                        <Box className = 'mc-trip-upload-media' >
                            {
                                images.map((img, index) => (
                                    <Box key={img.name} className="mc-trip-upload-image">
                                      {typeof img === 'string' ? (
                                        <Image key={index} src={img} alt="boat image" style={{maxHeight: '250px'}} />
                                      ) : (
                                        <Image key={index} src={URL?.createObjectURL?.(img)} alt="boat image" style={{maxHeight: '250px'}} />
                                      )}
                                    </Box>
                                  ))
                            }
                            </Box>
                            <button className="btn btn-primary" onClick={goToEdit}>Edit Gallery</button>
                    </Col>
                    
                </Row>
            </CardLayout>
        </PageLayout>
    )
}