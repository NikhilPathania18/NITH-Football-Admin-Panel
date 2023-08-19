import React, { useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Box, Text, Item, Anchor, Button } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { Breadcrumb, DivideTitle } from "../../components";
import CardLayout from "../../components/cards/CardLayout";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/settings.json";
import * as API from '../../api/cms'
import { useState } from "react";
import { toast } from "react-toastify";

export default function Settings() {

    const [editHome, setEditHome] = useState(false)
    const [editFooter, setEditFooter] = useState(false)
    const [editPages, setEditPages] = useState(false)


    const handleSubmit = async() => {
        try {
            const res = await API.createStaticData({
                en:{
                    hero:{
                        title1: form.enTitle1,
                        title2: form.enTitle2,
                        title3: form.enTitle3,
                        title4: form.enTitle4,
                    },
                    copyRight: footerForm.enCopyRight,
                    ourServices: { 
                        title: pageDetails.enOurServicesTitle, 
                        description: pageDetails.enOurServicesDescription
                     },
                    gallery: { 
                        title: pageDetails.enGalleryTitle, 
                        description: pageDetails.enGalleryDescription 
                    },
                    blog: { 
                        title: pageDetails.enBlogTitle, 
                        description: pageDetails.enBlogDescription 
                    },
                    contactUs: { 
                        title: pageDetails.enContactUsTitle, 
                        description: pageDetails.enContactUsDescription 
                    }
                },
                are:{
                    hero:{
                        title1: form.areTitle1,
                        title2: form.areTitle2,
                        title3: form.areTitle3,
                        title4: form.areTitle4,
                    },
                    copyRight: footerForm.areCopyRight,
                    ourServices: { 
                        title: pageDetails.areOurServicesTitle, 
                        description: pageDetails.areOurServicesDescription
                     },
                    gallery: { 
                        title: pageDetails.areGalleryTitle, 
                        description: pageDetails.areGalleryDescription 
                    },
                    blog: { 
                        title: pageDetails.areBlogTitle, 
                        description: pageDetails.areBlogDescription 
                    },
                    contactUs: { 
                        title: pageDetails.areContactUsTitle, 
                        description: pageDetails.areContactUsDescription 
                    }
                    
                },
                contactInfo: {
                    email: footerForm.email,
                    phone: footerForm.phone
                },
                socialLinks:{
                    fb: footerForm.facebook,
                    insta: footerForm.instagram,
                    linkedin: footerForm.linkedin,
                    pinterest: footerForm.pinterest,
                    tiktok: footerForm.tiktok,
                    twitter: footerForm.twitter,
                    youtube: footerForm.youtube
                },
            })
            toast.success('Data updated succesfully')
        } catch (error) {
            if(error?.response?.data?.message)  toast.error(error.response.data.message)
            else    toast.error('Failed to update data')
        }
    }    

    const handleSubmitHome = async() => {
        try {
            // const res = await API.createStaticData({
            //     en:{
            //         hero:{
            //             title1: form.enTitle1,
            //             title2: form.enTitle2,
            //             title3: form.enTitle3,
            //             title4: form.enTitle4,
            //         }
            //     },
            //     are:{
            //         hero:{
            //             title1: form.areTitle1,
            //             title2: form.areTitle2,
            //             title3: form.areTitle3,
            //             title4: form.areTitle4,
            //         }
            //     }
            // });
            handleSubmit();
            setEditHome(!editHome)
            // console.log(res);
            // toast.success('Data updated successfully')
        } catch (error) {
            if(error?.response?.data?.message)  toast.error(error.response.data?.message)    
            else    toast.error('Something went wrong')
            console.log(error);
        }
    }

    const handleFooterSubmit = async() => {
        try {
            // const res = await API.createStaticData({
            //     contactInfo: {
            //         email: footerForm.email,
            //         phone: footerForm.phone
            //     },
            //     socialLinks:{
            //         fb: footerForm.facebook,
            //         insta: footerForm.instagram,
            //         linkedin: footerForm.linkedin,
            //         pinterest: footerForm.pinterest,
            //         tiktok: footerForm.tiktok,
            //         twitter: footerForm.twitter,
            //         youtube: footerForm.youtube
            //     },
            //     en:{
            //         copyright: footerForm.enCopyRight
            //     },
            //     are:{
            //         copyright: footerForm.areCopyRight
            //     }
            // })
            handleSubmit();
            // if(res&&res.data?.status)    toast.success('Footer details updated successfully')
            setEditFooter(!editFooter)
        } catch (error) {
            if(error?.response?.data?.message)  toast.error(error.response.data?.message)
            else    toast.error('Failed to update Footer Details')
        }
    }

    const handlePageDetailsSubmit = async() => {
        try {
            // const res = await API.createStaticData({
            //     en:{
            //         ourServices: { 
            //             title: pageDetails.enOurServicesTitle, 
            //             description: pageDetails.enOurServicesDescription
            //          },
            //         gallery: { 
            //             title: pageDetails.enGalleryTitle, 
            //             description: pageDetails.enGalleryDescription 
            //         },
            //         blog: { 
            //             title: pageDetails.enBlogTitle, 
            //             description: pageDetails.enBlogDescription 
            //         },
            //         contactUs: { 
            //             title: pageDetails.enContactUsTitle, 
            //             description: pageDetails.enContactUsDescription 
            //         }
            //     },
            //     are:{
            //         ourServices: { 
            //             title: pageDetails.areOurServicesTitle, 
            //             description: pageDetails.areOurServicesDescription
            //          },
            //         gallery: { 
            //             title: pageDetails.areGalleryTitle, 
            //             description: pageDetails.areGalleryDescription 
            //         },
            //         blog: { 
            //             title: pageDetails.areBlogTitle, 
            //             description: pageDetails.areBlogDescription 
            //         },
            //         contactUs: { 
            //             title: pageDetails.areContactUsTitle, 
            //             description: pageDetails.areContactUsDescription 
            //         }
            //     }
            // })
            handleSubmit();
            // if(res&&res.data?.status)    toast.success('Data updated successfully')
            setEditPages(!editPages)
        } catch (error) {
            if(error?.response?.data?.message)  toast.error(error.response.data?.message)
            else    toast.error('Failed to update information')
        }
    }

    const [footerForm,setFooterForm] = useState({
        email: '',
        phone: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        pinterest: '',
        tiktok: '',
        twitter: '',
        youtube: '',
        enCopyRight: '',
        areCopyRight: ''
    })

    const [form , setForm ] = useState({
        enTitle1: '',
        enTitle2: '',
        enTitle3: '',
        enTitle4: '',
        areTitle1: '',
        areTitle2: '',
        areTitle3: '',
        areTitle4: '',
    })
    
    const [pageDetails,setPageDetails] = useState({
        enOurServicesTitle: '',
        enOurServicesDescription: '',
        enGalleryTitle: '',
        enGalleryDescription: '',
        enBlogTitle: '',
        enBlogDescription: '',
        enContactUsTitle: '',
        enContactUsDescription: '',
        areOurServicesTitle: '',
        areOurServicesDescription: '',
        areGalleryTitle: '',
        areGalleryDescription: '',
        areBlogTitle: '',
        areBlogDescription: '',
        areContactUsTitle: '',
        areContactUsDescription: '',
    })

    const setAllFields = (data) => {
        setForm({
            enTitle1: data?.en?.hero?.title1,
            enTitle2: data?.en?.hero?.title2,
            enTitle3: data?.en?.hero?.title3,
            enTitle4: data?.en?.hero?.title4,
            areTitle1: data?.are?.hero?.title1,
            areTitle2: data?.are?.hero?.title2,
            areTitle3: data?.are?.hero?.title3,
            areTitle4: data?.are?.hero?.title4,
        })

        setFooterForm({
            email: data?.contactInfo?.email,
            phone: data?.contactInfo?.phone,
            facebook: data?.socialLinks?.fb,
            instagram: data?.socialLinks?.insta,
            linkedin: data?.socialLinks?.linkedin,
            pinterest: data?.socialLinks?.pinterest,
            tiktok: data?.socialLinks?.tiktok,
            twitter: data?.socialLinks?.twitter,
            youtube: data?.socialLinks?.youtube,
            enCopyRight: data?.en?.copyRight,
            areCopyRight: data?.are?.copyRight
        })

        setPageDetails({
            enOurServicesTitle: data?.en?.ourServices?.title,
            enOurServicesDescription: data?.en?.ourServices?.description,
            enGalleryTitle: data?.en?.gallery?.title,
            enGalleryDescription: data?.en?.gallery?.description,
            enBlogTitle: data?.en?.blog?.title,
            enBlogDescription: data?.en?.blog?.description,
            enContactUsTitle: data?.en?.contactUs?.title,
            enContactUsDescription: data?.en?.contactUs?.description,
            areOurServicesTitle: data?.are?.ourServices?.title,
            areOurServicesDescription: data?.are?.ourServices?.description,
            areGalleryTitle: data?.are?.gallery?.title,
            areGalleryDescription: data?.are?.gallery?.description,
            areBlogTitle: data?.are?.blog?.title,
            areBlogDescription: data?.are?.blog?.description,
            areContactUsTitle: data?.are?.contactUs?.title,
            areContactUsDescription: data?.are?.contactUs?.description,
        })
    }

    const handleHomeChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value})
    }
    const handleFooterChange = (e) => {
        setFooterForm({...footerForm,[e.target.name]: e.target.value})
    }
    const handlePageDetailsChange = (e) => {
        setPageDetails({...pageDetails,[e.target.name]: e.target.value})
    }

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await API.getStaticData();
                const data = res?.data?.data
                console.log(res);
                setAllFields(data)
            } catch (error) {
                if(error?.response?.data?.message)  toast.error(error.response.data?.message)
                else    toast.error('Failed to fetch details')
            }
        }
        fetchData();
    },[])

    const handleHomeEdit = () => {
        setEditHome(!editHome)
        setEditFooter(false)
        setEditPages  (false)
    }

    const handleFooterEdit = () => {
        setEditFooter(!editFooter)
        setEditHome(false)
        setEditPages(false)
    }

    const handlePageEdit = () => {
        setEditPages(!editPages)
        setEditFooter(false)
        setEditHome(false)
    }

    return (
        <PageLayout>
            <CardLayout className="mb-4">
                <Breadcrumb title={ data?.pageTitle }>
                    {data?.breadcrumb.map((item, index) => (
                        <Item key={ index } className="mc-breadcrumb-item">
                            {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                        </Item>
                    ))}
                </Breadcrumb>
            </CardLayout>
            <CardLayout className="p-sm-5 mb-4">
                <Box className="mb-5">
                    <div style={{display:'flex', alignItems:'center'}}>
                    <DivideTitle title="Home Page" className="mb-4" style={{marginBottom:'0 !important'}} />
                    <Button className={`material-icons icons mb-4 p-2 ${editHome?'d-none':''}`} style={{marginLeft:'15px', borderRadius:'100%', color: 'white', backgroundColor: '#5e5d72'}} onClick={handleHomeEdit}>edit</Button>
                    </div>
                    <Row>
                        <Col xl={12} className="ps-xl-5">
                            <Row>
                                <Col xl={6}><LabelField disabled={!editHome} name="enTitle1" value={form.enTitle1} onChange={handleHomeChange}  label="english title 1" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editHome} name="areTitle1" value={form.areTitle1} onChange={handleHomeChange} label="arabic title 1" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editHome} name="enTitle2" value={form.enTitle2} onChange={handleHomeChange}  label="english title 2" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editHome} name="areTitle2" value={form.areTitle2} onChange={handleHomeChange} label="arabic title 2" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editHome} name="enTitle3" value={form.enTitle3} onChange={handleHomeChange}  label="english title 3" type="text" fieldSize="w-100 h-text-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editHome} name="areTitle3" value={form.areTitle3} onChange={handleHomeChange} label="arabic title 3" type="text" fieldSize="w-100 h-text-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editHome} name="enTitle4" value={form.enTitle4} onChange={handleHomeChange} label="english title 4" fieldSize="w-100 h-text-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editHome} name="areTitle4" value={form.areTitle4} onChange={handleHomeChange} label="arabic title 4" fieldSize="w-100 h-text-md" /></Col>
                             </Row>
                        </Col>
                    </Row>
                </Box>
                
                <Button className={`mc-btn primary ${editHome?'':'d-none'}`} icon="verified" text="save all changes" onClick={handleSubmitHome} />
            </CardLayout>
            
            <CardLayout className="p-sm-5 mb-4">
                <Box className="mb-5">
                    <div style={{display:'flex', alignItems:'center'}}>
                    <DivideTitle title="Footer Details" className="mb-4" style={{marginBottom:'0 !important'}} />
                    <Button className={`material-icons icons mb-4 p-2 ${editFooter?'d-none':''}`} style={{marginLeft:'15px', borderRadius:'100%', color: 'white', backgroundColor: '#5e5d72'}} onClick={handleFooterEdit}>edit</Button>
                    </div>
                    <Row>
                        <Col xl={12} className="ps-xl-5">
                            <Row>
                                <Col xl={6}><LabelField disabled={!editFooter} name="email" value={footerForm.email} onChange={handleFooterChange}  label="email" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editFooter} name="phone" value={footerForm.phone} onChange={handleFooterChange} label="phone" type="number" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editFooter} name="facebook" value={footerForm.facebook} onChange={handleFooterChange}  label="facebook" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editFooter} name="instagram" value={footerForm.instagram} onChange={handleFooterChange} label="instagram" type="text" fieldSize="w-100 h-md" /></Col>
                                 <Col xl={6}><LabelField disabled={!editFooter} name="linkedin" value={footerForm.linkedin} onChange={handleFooterChange} label="linkedin" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editFooter} name="pinterest" value={footerForm.pinterest} onChange={handleFooterChange} label="pinterest" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editFooter} name="tiktok" value={footerForm.tiktok} onChange={handleFooterChange} label="tiktok" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editFooter} name="twitter" value={footerForm.twitter} onChange={handleFooterChange} label="twitter" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={12}><LabelField disabled={!editFooter} name="youtube" value={footerForm.youtube} onChange={handleFooterChange} label="youtube" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editFooter} name="enCopyRight" value={footerForm.enCopyRight} onChange={handleFooterChange} label="english copyright" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editFooter} name="areCopyRight" value={footerForm.areCopyRight} onChange={handleFooterChange} label="arabic copyright" type="text" fieldSize="w-100 h-md" /></Col>
                                </Row>
                        </Col>
                    </Row>
                </Box>
                
                <Button className={`mc-btn primary ${editFooter?'':'d-none'}`} icon="verified" text="save all changes" onClick={handleFooterSubmit} />
            </CardLayout>


            <CardLayout className="p-sm-5 mb-4">
                <Box className="mb-5">
                    <div style={{display:'flex', alignItems:'center'}}>
                    <DivideTitle title="Page Details" className="mb-4" style={{marginBottom:'0 !important'}} />
                    <Button className={`material-icons icons mb-4 p-2 ${editPages?'d-none':''}`} style={{marginLeft:'15px', borderRadius:'100%', color: 'white', backgroundColor: '#5e5d72'}} onClick={handlePageEdit}>edit</Button>
                    </div>
                    <Row>
                        <Col xl={12} className="ps-xl-5">
                            <Row>
                                <Col xl={6}><LabelField disabled={!editPages} name="enOurServicesTitle" value={pageDetails.enOurServicesTitle} onChange={handlePageDetailsChange}  label="english our services title " type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editPages} name="areOurServicesTitle" value={pageDetails.areOurServicesTitle} onChange={handlePageDetailsChange} label="arabic our services title " type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editPages} name="enOurServicesDescription" value={pageDetails.enOurServicesDescription} onChange={handlePageDetailsChange}  label="english our services description" type="text" fieldSize="w-100 h-text-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editPages} name="areOurServicesDescription" value={pageDetails.areOurServicesDescription} onChange={handlePageDetailsChange} label="english our services description" type="text" fieldSize="w-100 h-text-md" /></Col>
                                 <Col xl={6}><LabelField disabled={!editPages} name="enGalleryTitle" value={pageDetails.enGalleryTitle} onChange={handlePageDetailsChange} label="english gallery title" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editPages} name="areGalleryTitle" value={pageDetails.areGalleryTitle} onChange={handlePageDetailsChange} label="arabic gallery title" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editPages} name="enGalleryDescription" value={pageDetails.enGalleryDescription} onChange={handlePageDetailsChange} label="english gallery description" type="text" fieldSize="w-100 h-text-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editPages} name="areGalleryDescription" value={pageDetails.areGalleryDescription} onChange={handlePageDetailsChange} label="arabic gallery description" type="text" fieldSize="w-100 h-text-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editPages} name="enBlogTitle" value={pageDetails.enBlogTitle} onChange={handlePageDetailsChange} label="english blog page title" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editPages} name="areBlogTitle" value={pageDetails.areBlogTitle} onChange={handlePageDetailsChange} label="arabic blog page title" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editPages} name="enBlogDescription" value={pageDetails.enBlogDescription} onChange={handlePageDetailsChange} label="english blog description" type="text" fieldSize="w-100 h-text-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editPages} name="areBlogDescription" value={pageDetails.areBlogDescription} onChange={handlePageDetailsChange} label="arabic blog description" type="text" fieldSize="w-100 h-text-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editPages} name="enContactUsTitle" value={pageDetails.enContactUsTitle} onChange={handlePageDetailsChange} label="english contact us title" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField disabled={!editPages} name="areContactUsTitle" value={pageDetails.areContactUsTitle} onChange={handlePageDetailsChange} label="arabic contact us title" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editPages} name="enContactUsDescription" value={pageDetails.enContactUsDescription} onChange={handlePageDetailsChange} label="english contact us description" type="text" fieldSize="w-100 h-text-md" /></Col>
                                <Col xl={6}><LabelTextarea disabled={!editPages} name="areContactUsDescription" value={pageDetails.areContactUsDescription} onChange={handlePageDetailsChange} label="arabic contact us description" type="text" fieldSize="w-100 h-text-md" /></Col>
                                </Row>
                        </Col>
                    </Row>
                </Box>
                
                <Button className={`mc-btn primary ${editPages?'':'d-none'}`} icon="verified" text="save all changes" onClick={handlePageDetailsSubmit} />
            </CardLayout>

        </PageLayout>
    )
}