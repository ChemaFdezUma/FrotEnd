import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import NavbarAbsoluto from './navbarAbsoluto';
import GraffitiAnimation from './transicion';
import { Cart } from './carrito';
import { useCart } from './useCart';
import { BsFillCartPlusFill, BsFillCartXFill } from 'react-icons/bs';
import { Footer } from './Footer';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from "./hooks/useAuth";
import CryptoJS from "crypto-js";
import Swal from 'sweetalert';  

const ImageCard = ({ cam }) => {
    const [imageSrc, setImageSrc] = useState(cam.nombrefoto);
    const handleMouseOver = () => {
        setImageSrc(cam.nombreFoto2);
    };

    const handleMouseOut = () => {
        setImageSrc(cam.nombrefoto);
    };

    return (
        <div className="card mt-2 flex items-center flex-col justify-center" key={cam.id}>
            <div className="card-body">
                <img
                    src={imageSrc}
                    width="400"
                    height="500"
                    alt={cam.Nombre}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                />
            </div>
        </div>
    );
};

export default function Ropa() {
    const {setAuth} = useAuth();
    const { addToCart, checkProduct, removeProduct,getCantidad,quitarUnoCantidad } = useCart();
    const [ropa, setRopa] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const {auth,actAuth} = useAuth();
    const {username,password,accessToken} = auth;
    const getUsers = async () => {
        try {
            /*const response = await axios.get('http://localhost:8000/usuario/comprobar/', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
                },withCredentials: true
              });
              console.log(response.data)
              if(response.data == "fuera"){
                navigate('/login');
                setAuth({ username, password,accessToken:response.data,valido:0});

                }
             else if(response.data !="OK"){
                setAuth({ username, password,accessToken:response.data,valido:1 });
                console.log(auth)*/
                await actAuth();
                if(auth.valido == 0){
                    console.log("deberia salir")
                    Swal({
                        title: "Error",
                        text: "Para acceder a esta pagina tienes que estar logeado",
                        icon: "error",
                      });
                    navigate('/login');
                }
                else{

            } 
        } catch (err) {
            Swal({
                title: "Error",
                text: "Para acceder a esta pagina tienes que estar logeado",
                icon: "error",
              });
            navigate('/login');
        }
    }

    useEffect(() => {
        getUsers();
        getRopa();
    }, []);

    const getRopa = async () => {
        try {
            const res = await axios.get('http://localhost:8000/ropa/');
            setRopa(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const isMobile = useMediaQuery({ maxWidth: 768 });

    const renderRows = () => {
        const itemsPerRow = isMobile ? 1 : 3;
        const rows = [];

        for (let i = 0; i < ropa.length; i += itemsPerRow) {
            const rowItems = ropa.slice(i, i + itemsPerRow);
            const row = (
                <div className="row" key={i}>
                    {rowItems.map((item) => {
                        const funcionComprobadora = checkProduct(item);
                        let cantidad = 0;
                        if(funcionComprobadora){

                        cantidad = getCantidad(item);
                        }
                        return (
                            <div className="col" key={item.id}>
                                <div className="shadow-md p-4">
                                    <div className="flex justify-center">
                                        <ImageCard cam={item} />
                                    </div>
                                    <h2 className="text-lg font-bold mt-2">{item.Nombre}</h2>
                                    <p className="text-gray-500">Precio: {item.precio}</p>
                                    <div className="flex flex-row" style={{ display: funcionComprobadora ? 'block' : 'none' }}>
                                        <button onClick={() => addToCart(item)}> <FiPlusCircle /> </button>
                                        <p>{cantidad}</p>
                                        <button onClick={() => quitarUnoCantidad(item)}>  <FiMinusCircle /> </button>
                                    </div>
                                    <button
                                        onClick={() => funcionComprobadora ? removeProduct(item) : addToCart(item)}
                                        className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                                        style={{ backgroundColor: funcionComprobadora ? '#DC2626' : '#1E40AF' }}
                                    >
                                        {funcionComprobadora ? (
                                            <BsFillCartXFill className="bg-red" />
                                        ) : (
                                            <BsFillCartPlusFill width={20} className="bg-blue" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
            rows.push(row);
        }

        return rows;
    };

    return (
        <GraffitiAnimation in={true}>
            <div className="flex flex-row">
                <NavbarAbsoluto />
                <Cart />
                <div className="container mt-28">{/* Render rows */}{renderRows()}</div>
            </div>
        </GraffitiAnimation>
    );
}
