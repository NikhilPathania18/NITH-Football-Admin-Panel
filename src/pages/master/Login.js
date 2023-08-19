import React,{useEffect, useState} from "react";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";
import * as API from '../../api/auth'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [loading, setLoading] = useState('sign in')
    const navigate = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user)    navigate('/')    
    },[])
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]: e.target.value})
    }

    const resetForm = () => {
        setForm({
            email: '',
            password: ''
        })
    }
    const handleSubmit = async(e) => {
        try {
            setLoading('loading...')
            e.preventDefault()
            const {data} = await API.login(form);

            const user = data.data

            if(!user.role||user.role!=='admin'){
                toast.error('Admin Not Found')
                resetForm();
                return;
            }
            else{
                localStorage.setItem('user',JSON.stringify(user)) 
                toast.success('Login successful')
                navigate('/')
            }
        } catch (error) {
            if(error?.response?.data?.message)
            toast.error(error.response.data.message)
            else
            toast.error('Something went wrong')
            console.log(error); 
        }
        setLoading('sign in')
    }
    return (
        <Box className="mc-auth">
            <Image
                src={ data?.pattern.src } 
                alt={ data?.pattern.alt }
                className="mc-auth-pattern"  
            />
            <Box className="mc-auth-group">
                <Logo 
                    src = { "https://img1.wsimg.com/isteam/ip/58ad9390-8c5c-4e8b-923a-343cf5238ee3/Logo%20-%20Transparent.png" }
                    alt = { data?.logo.alt }
                    href = { data?.logo.path }
                    className = "mc-auth-logo" 
                />
                <Heading as="h4" className="mc-auth-title">{ 'Login to Ocealics' }</Heading>
                <Form className="mc-auth-form" >
                    {data?.input.map((item, index) => (
                        <IconField 
                            key = { index }
                            icon = { item.icon }
                            type = { item.type }
                            option = { item.option }
                            value = { index===0 ? form.email : form.password}
                            onChange = {handleChange}
                            name = {index===0 ? 'email': 'password'}
                            classes = { item.fieldSize }
                            placeholder = { item.placeholder }
                            passwordVisible = { item.passwordVisible }
                        />
                    ))}
                    <Button disabled={loading==='loading...'} onClick={handleSubmit} className={`mc-auth-btn ${data?.button.fieldSize}`} >{ loading }</Button>
                    <Anchor className="mc-auth-forgot" href={ data?.forgot.path }>{ data?.forgot.text }</Anchor>
                    {/* <Box className="mc-auth-divide"><Text as="span">{ data?.divide.text }</Text></Box> */}
                    {/* <Box className="mc-auth-connect">
                        {data?.connect.map((item, index) => (
                            <Anchor key={ index } href={ item.path } className={ item.classes }>
                                <i className={ item.icon }></i>
                                <span>{ item.text }</span>
                            </Anchor>
                        ))}
                    </Box> */}
                </Form>
                {/* <Box className="mc-auth-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box> */}
            </Box>
        </Box>
    );
}