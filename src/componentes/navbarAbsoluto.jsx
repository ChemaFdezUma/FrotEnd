import React from "react";
import { AiOutlineClose, AiOutlineInstagram, AiOutlineMenu } from "react-icons/ai"
import { useState } from "react";
import Logowasters from "../images/logoWasters.png"
import {BsGrid} from "react-icons/bs";
import { Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const NavbarAbsoluto = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const {auth,actAuth} = useAuth();
    const handleNav = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav className=" absolute w-full h-24 shadow-xl bg-black z-50">
            <div className="flex justify-between items-center h-full w-full px-4">
                <div className="hidden md:flex w-1/3">
                    <ul className="hidden md:flex">
                        <Link to="/ropa" ><li className="ml-3 hover:border-b text-xl text-white">Ropa</li></Link>
                        <Link to="/ropa" ><li className="ml-10 hover:border-b text-xl text-white">Lienzos</li></Link>
                        <Link to="/ropa" ><li className="ml-10 hover:border-b text-xl text-white">Fotografias</li></Link>
                        <Link to="/ropa" ><li className="ml-10 hover:border-b text-xl text-white">Fotografias</li></Link>

                    </ul>
                </div>
                <div className="hidden md:flex mb-1">
                    <Link to="/">
                        <img
                            src={Logowasters}
                            width="120"
                            height="50"
                            alt="WASTERS" />
                    </Link>
                </div>
                <div className="hidden md:flex w-1/3 justify-end">
                    <ul className="hidden sm:flex">
                        <Link to="/ropa" ><li className="mr-10 hover:border-b text-xl text-white">Videos</li></Link>
                        <Link to="/ropa" ><li className="mr-10 hover:border-b text-xl text-white">Wasters Magazine</li></Link>
                        {
                            auth.valido==0
                            ? <Link to="/login" ><li className="mr-10 hover:border-b text-xl text-white">Iniciar sesion</li></Link>
                            : <Link to="/panelUsuario" ><li className="mr-10 hover:border-b text-xl text-white">Panel de usuario</li></Link>
                        }                    </ul>
                </div>
                <div className=" md:hidden mr-auto">
                    <Link to="/">
                        <img
                            src={Logowasters}
                            width="60"
                            height="50"
                            alt="WASTERS" />
                    </Link>
                </div>
                <div onClick={handleNav} className="md:hidden cursos-pointer pl-24">
                    <BsGrid className="bg-white"  size={25} />
                </div>
            </div>
            <div className={menuOpen ? "fixed z-50 left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500": "fixed left-[-100%] top-0 p-10 ease-out duration-500" }>
                <div className="flex w-full items-center justify-end">
                <div onClick={handleNav} className="cursos-pointer">
                    <AiOutlineClose  size={25}/>
                </div>
                </div>
                <div className="flex-col py-4">
                    <ul>
                    <Link to="/"><li className="py-4">Inicio</li></Link>
                    <Link to="/ropa"><li className="py-4">Ropa</li></Link>
                    <Link to="/"><li className="py-4">Lienzos</li></Link>
                    <Link to="/"><li className="py-4">Fotografias</li></Link>
                    <Link to="/"><li className="py-4">Videos</li></Link>
                    <Link to="/"><li className="py-4">Wasters Magazine</li></Link>
                    <Link to="/"><li className="py-4">Inicio sesion</li></Link>
                    </ul>
                </div>
                <div className=" flex flex-row justify-around pt-10 items-center">
                    <Link to="https://www.instagram.com/wasters.wasters/?igshid="><AiOutlineInstagram size={30} className="cursor-pointer"/>Wasters1</Link>
                    <Link to="https://herewecode.io/"><AiOutlineInstagram size={30} className="cursor-pointer"/>Wasters2</Link>
                    <Link to="https://herewecode.io/"><AiOutlineInstagram size={30} className="cursor-pointer"/>Wasters3</Link>
                </div>
                <div className=" md:hidden mr-auto mt-5">
                    <Link to="/">
                        <img
                            src={Logowasters}
                            width="300"
                            height="50"
                            alt="WASTERS" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}
export default NavbarAbsoluto