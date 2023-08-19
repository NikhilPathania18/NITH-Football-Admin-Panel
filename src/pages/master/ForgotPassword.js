import React, { useState } from "react";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/forgot.json";
import { forgotPassword } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function ForgotPassword() {
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState('get link')
    const navigate = useNavigate();
    const handleSubmit = async() =>{
        try {
            setLoading('loading...')
            const res = await forgotPassword(email)
            if(res&&res.data.status)    toast.success(`Reset link sent to registered email`)
            setLoading('get link')
            navigate('/login')
            console.log(res);
        } catch (error) {
            setLoading('get link')
            if(error?.response?.data?.message)  toast.error(error.response.data.message)
            else    toast.error('Failed to send email')
        }
    }
    return (
        <Box className="mc-auth">
            <Image 
                className="mc-auth-pattern" 
                src={ 'data?.pattern.src' } 
                alt={ data?.pattern.alt }  
            />
            <Box className="mc-auth-group">
                <Logo 
                    src = { 'https://img1.wsimg.com/isteam/ip/58ad9390-8c5c-4e8b-923a-343cf5238ee3/Logo%20-%20Transparent.png' }
                    alt = { data?.logo.alt }
                    href = { data?.logo.path }
                    className = "mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{ data?.title }</Heading>
                <Form className="mc-auth-form">
                    {data?.input.map((item, index) => (
                        <IconField 
                            key = { index }
                            icon = { item.icon }
                            type = { item.type }
                            classes = { item.fieldSize }
                            placeholder = { item.placeholder }
                            passwordVisible = { item.passwordVisible }
                            value = {email}
                            onChange = {(e)=> setEmail(e.target.value)}
                        />
                    ))}
                    <Button onClick={handleSubmit} className={`mc-auth-btn ${data?.button.fieldSize}`} type={ data?.button.type }  disabled={loading==='loading...'} >{ loading }</Button>
                </Form>
                <Box className="mc-auth-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box>
            </Box>
        </Box>
    );
}