
import { gsap } from 'gsap';
import { Link, Route, Routes } from "react-router-dom"
import PaginaPrincipal from './componentes/paginaPrincipal';
import Ropa from './componentes/ropa';
import './index.css';
import GraffitiLogin from './componentes/login';
import DrawingApp from './componentes/elementoDibuji';
import VerificarCorreo from './componentes/revisaTuCorreoYVerifica';
import { CartProvider } from './componentes/estadoGlobal';
import Pago from './componentes/pago';
import { UserContextProvider } from './componentes/contextos/userContext';
import { useEffect } from 'react';
import PanelUsuario from './componentes/panelUsuario';
function App() {

  return (
    <UserContextProvider>
    <div>
      <Routes>
      <Route path='/' element={<PaginaPrincipal />} />
      <Route path='/ropa' element={<Ropa/>}/>
      <Route path='/login' element={<GraffitiLogin/>}/>
      <Route path='/prueba' element={<DrawingApp/>}/>
      <Route path='/verificar' element={<VerificarCorreo/>}/>
      <Route path='/pago' element={<Pago/>}/>
      <Route path='/panelUsuario' element={<PanelUsuario/>}/>
      <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </div>
    </UserContextProvider>
  )
}

export default App;
