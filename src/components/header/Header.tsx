import Link from "next/link"
import { Pencil, SignOut, List, X } from 'phosphor-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { HeaderType } from "../../utils/interfaces/HeaderType"
import { StyledHeader } from "./headerStyle"
import { useAuth } from "../../hooks/useAuth";

const Header = (props: HeaderType) => {
    const [menu, setMenu] = useState(false)
    let location = useRouter().pathname
    const { user, signOut } = useAuth();
    console.log(user);

    location = location.includes('/shop/') ?? location.includes('/admin/') ? location.split('/')[2] : location.split('/')[1];



    return (
        <StyledHeader>
            <h1 className="header-title">
                <Link href="/">tifuti</Link>
            </h1>

            <nav className={menu ? "header-nav active" : "header-nav"}>
                <ul className="header-nav-list">
                    {props.userType === "shop" ? (
                        <>
                            <li className={location === 'sales' ? "header-nav-item active" : "header-nav-item"}>
                                <Link href="/shop/sales">vendas</Link>
                            </li>
                            <li className={location === 'inventory' ? "header-nav-item active" : "header-nav-item"}>
                                <Link href="/shop/inventory">estoque</Link>
                            </li>
                        </>
                    ) : props.userType === "admin" ? (
                        <>
                            <li className={location === 'shops' ? "header-nav-item active" : "header-nav-item"}>
                                <Link href="/admin/shops">lojas</Link>
                            </li>
                            <li className={location === 'users' ? "header-nav-item active" : "header-nav-item"}>
                                <Link href="/admin/users">usuarios</Link>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                </ul>

                <div className="header-user">
                    <img src={user?.photoURL ?? "https://avatars.githubusercontent.com/u/67597082?v=4"} alt="user" className="header-user-image" referrerPolicy="no-referrer" />

                    <div className="header-user-dropdown">
                        <ul className="header-user-dropdown-list">
                            <li className="header-user-dropdown-item">
                                <Pencil size={20} weight="light" />
                                <p>perfil</p>
                            </li>
                            <li className="header-user-dropdown-item" onClick={signOut}>
                                <SignOut size={20} weight="light" />
                                <p>sair</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mobile-menu-icon" onClick={() => setMenu(!menu)}>
                    <X size={24} weight="light" />
                </div>
            </nav>

            <div className="header-nav-background" onClick={() => setMenu(!menu)}></div>

            <div className="mobile-menu-icon" onClick={() => setMenu(!menu)}>
                <List size={24} weight="light" />
            </div>
        </StyledHeader>
    )
}

export default Header