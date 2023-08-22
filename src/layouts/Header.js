import React, { useContext, useState, useRef, useEffect } from 'react';
import { LanguageDropdown, WidgetDropdown, ProfileDropdown } from '../components/header';
import { Button, Section, Box, Input } from "../components/elements";
import { DrawerContext } from '../context/Drawer';
import { ThemeContext } from '../context/Themes';
import { Logo } from '../components';
import LogoImage from '../images/nith-football-logo.png';
import data from "../data/master/header.json";
import { toast } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import userPhoto from '../images/user-3296.png'

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    const { drawer, toggleDrawer } = useContext(DrawerContext);
    // const { theme, toggleTheme } = useContext(ThemeContext);
    const searchRef = useRef();
    const [scroll, setScroll] = useState("fixed");
    const [search, setSearch] = useState("");

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) setScroll("sticky");
        else setScroll("fixed");
    });

    document.addEventListener('mousedown', (event) => {
        if (!searchRef.current?.contains(event.target)) {
            setSearch("");
        }
    })

    const [user, setUser ] = useState(null)

    useEffect(()=>{
        const fetchData = async() => {
            let user = localStorage.getItem('user')
            user = JSON.parse(user)
            if(user)    setUser(user);
            else{
                navigate('/login')
            }
        }
        fetchData();
    },[location])   

    return (
        <Section as="header" className={`mc-header ${ scroll }`}>
            <Logo 
                src = {LogoImage}
                alt = { data?.logo.alt }
                href = { data?.logo.path }
                name = {' '}
            />
            <Box className="mc-header-group">
                <Box className="mc-header-left">
                    {/* <Button 
                        icon={ data?.search.icon } 
                        className="mc-header-icon search" 
                        onClick={()=> setSearch("show")}
                    /> */}
                    <Button 
                        icon={ drawer ? "menu_open" : "menu" } 
                        className="mc-header-icon toggle" 
                        onClick={ toggleDrawer } 
                    />
                    {/* <Box className={`mc-header-search-group ${ search }`}>
                        <form className="mc-header-search" ref={ searchRef }>
                            <Button className="material-icons">{ data?.search.icon }</Button>
                            <Input type="search" placeholder={ data?.search.placeholder } />
                        </form>
                    </Box> */}
                </Box>
                <Box className="mc-header-right">
                    {/* <Button 
                        icon={ theme }
                        title={ data.theme.title }
                        onClick={ toggleTheme }
                        className={`mc-header-icon ${ data.theme.addClass }`}
                    /> */}
                    {/* <LanguageDropdown  
                        icon={ data.language.icon }
                        title={ data.language.title }
                        addClass={ data.language.addClass }
                        dropdown={ data.language.dropdown }
                    /> */}
                    {/* <WidgetDropdown 
                        icon={ data.cart.icon }
                        title={ data.cart.title }
                        badge={ data.cart.badge }
                        addClass={ data.cart.addClass }
                        dropdown={ data.cart.dropdown }
                    /> */}
                    {/* <WidgetDropdown 
                        icon={ data.message.icon }
                        title={ data.message.title }
                        badge={ data.message.badge }
                        addClass={ data.message.addClass }
                        dropdown={ data.message.dropdown }
                    />
                    <WidgetDropdown 
                        icon={ data.notify.icon }
                        title={ data.notify.title }
                        badge={ data.notify.badge }
                        addClass={ data.notify.addClass }
                        dropdown={ data.notify.dropdown }
                    /> */}
                    <ProfileDropdown 
                        name={ user?.userName } 
                        image={ userPhoto }
                        username={ user?.email }
                        dropdown={ data.profile.dropdown }
                        user={user}
                        setUser = {setUser} 
                        
                    />
                </Box>
            </Box>
        </Section>
    );
}

