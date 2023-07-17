import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import useAuth from './hooks/useAuth';
import axios from './api/axios';
import Swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const PanelUsuario = () => {
  const { auth, actAuth } = useAuth();
  const [usuario, setUsuario] = useState({});
  const [pedidos, setPedidos] = useState([]);
  const [mostrarPedidos, setMostrarPedidos] = useState(false);
  const navigate = useNavigate();
  const examplePedidos = [
    {
      id: 1,
      fecha: '2023-07-18',
      estado: 'Enviado',
      productos: 'Producto 1, Producto 2',
      precio: 50.99,
    },
    {
      id: 2,
      fecha: '2023-07-17',
      estado: 'Entregado',
      productos: 'Producto 3, Producto 4',
      precio: 70.5,
    },
    {
      id: 3,
      fecha: '2023-07-16',
      estado: 'En proceso',
      productos: 'Producto 5',
      precio: 25.0,
    },
    {
        id: 4,
        fecha: '2023-07-16',
        estado: 'En proceso',
        productos: 'Producto 5',
        precio: 25.0,
      },
  ];

  useEffect(() => {
    actAuth();
  }, []);

  useEffect(() => {
    if (auth.valido === 0) {
      Swal({
        title: 'Error',
        text: 'Para acceder a esta página tienes que estar logeado',
        icon: 'error',
      });
      navigate('/login');
    } else {
      getUser();
      getPedidos();
    }
  }, [auth]); // Dependencia en auth

  const getUser = async () => {
    try {
      const user = await axios.get(
        'http://localhost:8000/usuario/email/' + auth.username
      );
      setUsuario(user.data);
    } catch (err) {
      Swal({
        title: 'Error',
        text: 'Para acceder a esta página tienes que estar logeado',
        icon: 'error',
      });
      navigate('/login');
    }
  };

  const getPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/pedidos');
      setPedidos(response.data);
    } catch (err) {
      console.error('Error al obtener los pedidos:', err);
    }
  };

  const toggleMostrarPedidos = () => {
    setMostrarPedidos(!mostrarPedidos);
  };

  const renderPedidos = () => {
    return examplePedidos.map((pedido) => (
      <div key={pedido.id} className='flex flex-col mb-6'>
        <h5 className='text-center font-bold mb-2'>Pedido {pedido.id}</h5>
        <div className='bg-gray-200 p-4'>
          <div className='flex justify-between'>
            <h5 className='font-bold'>Fecha:</h5>
            <h5>{pedido.fecha}</h5>
          </div>
          <div className='flex justify-between'>
            <h5 className='font-bold'>Estado:</h5>
            <h5>{pedido.estado}</h5>
          </div>
          <div className='flex justify-between'>
            <h5 className='font-bold'>Productos:</h5>
            <h5>{pedido.productos}</h5>
          </div>
          <div className='flex justify-between'>
            <h5 className='font-bold'>Precio:</h5>
            <h5>{pedido.precio}</h5>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow mt-28'>
        <h5 className='text-center text-2xl mb-4'>
          Bienvenido a tu panel de usuario{' '}
          <span className='text-blue-500'>{usuario?.nombre}</span>
        </h5>
        <div className='pedidos'>
          <button
            className={`flex items-center mb-2 focus:outline-none text-xl ml-auto mr-auto ${
              mostrarPedidos ? 'text-red-800' : 'text-gray-500'
            }`}
            onClick={toggleMostrarPedidos}
          >
            Tus pedidos{' '}
            {mostrarPedidos ? (
              <FaAngleUp className='ml-1' />
            ) : (
              <FaAngleDown className='ml-1' />
            )}
          </button>

          <div
            className={`pedidos ${
              mostrarPedidos ? 'visible' : 'invisible'
            }`}
          >
            <div className='overflow-hidden'>
              {mostrarPedidos && renderPedidos()}
            </div>
          </div>
        </div>
      </div>

      <footer className='bg-gray-200 py-4 mt-auto'>
        <div className='flex justify-center'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4'
            onClick={() => navigate('/login')}
          >
            Cerrar sesión
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
            onClick={() => navigate('/contact')}
          >
            Contáctanos
          </button>
        </div>

        <div className='mt-4 text-center'>
          <p>Teléfono: +1234567890</p>
          <p>Correo electrónico: info@example.com</p>
          <p>Instagram: @example</p>
        </div>
      </footer>
    </div>
  );
};

export default PanelUsuario;
