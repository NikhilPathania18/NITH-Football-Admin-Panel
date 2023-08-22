import React from "react";
import { Dropdown } from "react-bootstrap";
import { DuelText, RoundAvatar } from "..";
import { Anchor } from "../elements";
import { toast } from "react-toastify";

export default function ProfileDropdown({ name, username, image, dropdown , user , setUser}) {

    const handleLogOut = () => {
        localStorage.removeItem('user')
        setUser(null)
        toast.warning('Logged Out successfully')
    }
    return (
        <Dropdown className="mc-header-user">
            <Dropdown.Toggle className="mc-dropdown-toggle">
                <RoundAvatar src={ image } alt="avatar" size="xs" />
                <DuelText title={ name } descrip={ username } size="xs" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                {/* {dropdown.map((item, index) => (
                    <Anchor
                        key={index}
                        href={item.path}
                        icon={item.icon}
                        text={item.text}
                        className="mc-dropdown-menu"
                    />
                ))} */}
                <Anchor
                        key={2}
                        // href={item.path}
                        icon={'lock'}
                        text={'log out'}
                        className="mc-dropdown-menu"
                        onClick={handleLogOut}
                    />
            </Dropdown.Menu>
        </Dropdown>
    )
}