import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import clienteAxios from '../config/axios'
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [passModificado, setPassModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  const handleSubmit = async e => {
    //Validacion Formularios
    e.preventDefault();
    if([password, repetirPassword].includes('')){
      setAlerta({ msg:'Rellenar todos los espacios', error: true});
      return;
    }
    if(password !== repetirPassword){
      setAlerta({ msg:'Los passwords nos son iguales', error: true});
      return;
    }
    if(password.length < 6){
      setAlerta({ msg: 'El password es muy corto, minimo 6 caracteres', error: true});
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password});
      console.log(data);

      setAlerta({msg: data.msg});
      setPassModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.responde.data.msg,
        error: true
      })
    }
  }

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/veterinarios/olvide-password/${token}`);
        setAlerta({msg: 'Cologa tu nuevo Password', error: false});
        setTokenValido(true);
      } catch (error) {
        console.log(error);
        setAlerta({msg: 'Hubo un error con el enlace', error: true });
      }
    } 
    comprobarToken();
  }, []);

  const {msg} = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu password y no pierdas acceso a <span className="text-black">tus Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        { msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nuevo Password
                </label>
                <input type="password" placeholder="Tu password" autoComplete="new-password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " value={password} onChange={e => setPassword(e.target.value)}  />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Repetir Password
                </label>
                <input type="password" placeholder="Repeti tu password" autoComplete="new-password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl " value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}  />
              </div>
              <input type="submit" value="Guardar Nuevo Password" className="bg-indigo-700 p w-full py-3 px-10 rounded-xl text-white font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>
            <nav className='mt-10 lg:flex lg:justify-between'>
              {passModificado && <Link className='block my-5 text-gray-500' to="/">Inicia Sesion</Link>}
            </nav>
          </>
        )}
      </div>
    </>
  )
}

export default NuevoPassword