import React, { useEffect, useState } from 'react';
import Foto1 from "../images/Foto1.jpeg";
import Logowasters from "../images/logoWasters.png"
import Navbar from "./navbar";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import axios from 'axios';
import { Player } from 'video-react';
import { Link } from 'react-router-dom';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, Move } from "react-scroll-motion";
import { shake, fadeInDown } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import Cookies from 'js-cookie';
import FotoVertical from "../images/Fotovertical.jpeg";
import useAuth from "./hooks/useAuth";
import CryptoJS from "crypto-js";
import GraffitiAnimation from './transicion';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";


const styles = StyleSheet.create({
  shake: {
    animationName: shake,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
  },
  fadeInDown: {
    animationName: fadeInDown,
    animationDuration: '1s',
  },
});
export default function PaginaPrincipal() {
  const [ropa, setRopa] = useState([]);

  useEffect(() => {
    getRopa();
    getUsuario();
  }, []);

  const URIRopa = "http://localhost:8000/ropa/";
  const URIContrataciones = "http://localhost:8000/contratacion/";
  function decryptData(encryptedData, key) {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
  const { auth, setAuth,actAuth } = useAuth();

  const getUsuario =async () => {
    try {
      await actAuth()
      console.log(auth)
    } catch (error) {
      console.error(error);
    }
  };
      const getRopa = async () => {
    try {
      const res = await axios.get(URIRopa + "portada/get");
      setRopa(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const responsive = {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 3
    }
  };

  const ImageCard = ({ cam }) => {
    const [imageSrc, setImageSrc] = useState(`${cam.nombrefoto}`);

    const handleMouseOver = () => {
      setImageSrc(`/${cam.nombreFoto2}`);
    };

    const handleMouseOut = () => {
      setImageSrc(`/${cam.nombrefoto}`);
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
        <p>{cam.Nombre}</p>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form fields
    const nombreValue = event.target.Nombre.value;
    const emailValue = event.target.Email.value;
    const textareaValue = event.target.Describe.value;

    // You can then use the values as needed
    axios.post(URIContrataciones, {
      Nombre: nombreValue,
      email: emailValue,
      descripcion: textareaValue
    });

    // Optionally, you can reset the form fields after reading the values
    event.target.reset();
  };

  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (fadeIn) {
      const fadeTimer = setTimeout(() => {
        setFadeIn(false);
      }, 1000); // Adjust the timeout to match the duration of the fade-in animation
      return () => clearTimeout(fadeTimer);
    }
  }, [fadeIn]);
  return (
    <div>
      <Navbar />

      <ScrollContainer>
        <ScrollPage className='bg-black flex justify-center items-center'>
          <Animator animation={batch(Fade(0, 1), Move(0, 100))}>
            <img
              src={Logowasters}
              width="900"
              height="60%"
              alt="WASTERS"
              className={css(styles.shake, fadeIn ? styles.fadeInDown : null)}

            />
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <GraffitiAnimation in={true}>
            <Animator animation={batch(Fade(0, 1), Move(0, -200))} className='flex flex-row'>
              <div className='w-full h-42 shadow-xl border-t-2 mt-28'>
                <h1 className=' text-center'>NOVEDADES </h1>
                <AliceCarousel disableDotsControls responsive={responsive} infinite>
                  {ropa.map((cam) => (
                    <ImageCard cam={cam} key={cam.id} />
                  ))}
                </AliceCarousel>
              </div>
            </Animator>
          </GraffitiAnimation>
        </ScrollPage>
        <ScrollPage className='bg-slate-500 flex justify-center items-center'>
          <div className=' flex justify-center items-center'>
            <div className="video-container">
              <video
                poster="/assets/poster.png"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                autoPlay
                muted
                loop
                className='video-player'
              />
            </div>
          </div>
        </ScrollPage>

        <ScrollPage>
          <GraffitiAnimation in={true}>
            <Animator animation={batch(Fade(0, 1), Move(0, 100))}>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 h-[100%] mt-10 px-6 md:px-10 lg:px-16 xl:px-20'>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">Contrataciones, tu información personal:</h1>
                  <Card color="transparent" shadow={false} className='mb-5'>
                    <form className="mt-8 mb-2" onSubmit={handleSubmit}>

                      <div className="mb-4">
                        Nombre
                        <Input name="Nombre" required />
                      </div>
                      <div className="mb-4">
                        Email
                        <Input name="Email" type='email' required />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700">Describe por qué te queremos</label>
                        <textarea
                          name="Describe"
                          required
                          maxLength={500}
                          rows={4}
                          className="form-control resize-none"
                          style={{
                            borderRadius: '8px',
                            border: '2px solid #ddd',
                            padding: '10px',
                            fontSize: '16px',
                            lineHeight: '1.5',
                          }}
                        />
                      </div>
                      <button type='submit' color="blue" ripple="light" className="beautiful-button py-3 px-6">
                        Te leemos
                      </button>
                    </form>
                  </Card>
                </div>
                <div className='w-full md:w-1/2 bg-white h-[100%]'>
                  <img
                    src={FotoVertical}
                    width="100%"
                    height="100%"
                    alt="WASTERS"
                  />
                </div>
              </div>
            </Animator>
          </GraffitiAnimation>
        </ScrollPage>
      </ScrollContainer>
    </div>
  );
}
