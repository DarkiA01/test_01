// src/components/Nav.jsx
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/download.png";
import { MENU_ITEMS } from "../../others/constants/menuItems";

const Nav = () => {
    const location = useLocation();

    const getLinkClasses = (path) => {
        const isActive = location.pathname === path;
        return `px-3 py-2 transition-all text-base font-medium ${
            isActive
                ? "text-primary border-b-2 border-primary"
                : "text-gray-700 hover:text-primary"
        }`;
    };

    return (
        <Navbar maxWidth="xl" className="fixed z-50 h-[80px] bg-white shadow">
            <NavbarBrand>
                <img src={logo} alt="Logo" className="h-10 w-auto " />
            </NavbarBrand>

            <NavbarContent justify="center" className="hidden sm:flex">
                {MENU_ITEMS.map((item) => (
                    <NavbarItem key={item.name}>
                        <Link
                            to={item.path}
                            className={getLinkClasses(item.path)}>
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm">
                        Appointment
                    </button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Nav;
