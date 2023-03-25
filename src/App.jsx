import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { uid } from 'uid';
import { set, ref, onValue, update } from 'firebase/database'
import { database } from "./utils/firebase"
import InsertModal from './components/InsertModal';
import { data } from 'autoprefixer';

function App() {
  const [moduleIp, setModuleIp] = useState("");
  const [modules, setModules] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [quantityOfBits, setQuantityOfBits] = useState(4)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [stateOfBit, setStateOfBit] = useState(false)
  //const [voltaje, setVoltaje] = useState("vl")

  const [tempId, setTempId] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    onValue(ref(database), snapshot => {
      setModules([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map(module => {
          setModules(oldArray => [...oldArray, module])
        });
      }
    });
  }, []);

  const handleReset = () => {
    setIsModalOpen(false);
    setModuleIp("")
    setModuleName("")
    setQuantityOfBits(4)
    setStateOfBit(false)
  }

  const writeToDatabase = () => {
    const uuid = uid();

    set(ref(database, `/${moduleIp}`), {
      B0: stateOfBit,
      B1: stateOfBit,
      B2: stateOfBit,
      B3: stateOfBit,
      ESP_NAME: moduleName,
      ESP_ID: uuid,
      ESP_IP: moduleIp
    });

    handleReset();
    //setVoltaje("vl")
  };
  console.log(modules);

  const handleUpdateBits = (esp) => {
    setTempId(esp);
  }

  const handleSubmitChange = (e) => {
    console.log(e.target.value);
    console.log(tempId);
    update(ref(database, `/${tempId}`), {

    })
  }


  return (
    <main className='App backdrop-blur-sm'>
      <InsertModal
        setModuleIp={setModuleIp}
        setModuleName={setModuleName}
        moduleIp={moduleIp}
        moduleName={moduleName}
        writeToDatabase={writeToDatabase}
        isModalOpen={isModalOpen}
        handleReset={handleReset}
      />
      <section className='btn__modal '>
        <button className='btn_modal__insert rounded-lg bg-orange-400 px-4 py-2' onClick={handleOpenModal}>Insert Module</button>
      </section>
      <section className="gridList__container ">
        {
          modules.map(esp => (
            <div key={esp.ESP_ID} className="m-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
              <div className="md:flex">
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">{esp.ESP_ID}</div>
                  <h4 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{esp.ESP_NAME}</h4>
                  <article className="Bit__container">
                    <label className="container">
                      <input checked={esp.B0 ? "checked" : ""} onChange={handleSubmitChange} onClick={() => handleUpdateBits(esp.ESP_IP)} type="checkbox"></input>
                      <div className="checkmark"></div>
                    </label>
                    <label className="container">
                      <input checked={esp.B1 ? "checked" : ""} onChange={handleSubmitChange} onClick={() => handleUpdateBits(esp.ESP_IP)} type="checkbox"></input>
                      <div className="checkmark"></div>
                    </label>
                    <label className="container">
                      <input checked={esp.B2 ? "checked" : ""} onChange={handleSubmitChange} onClick={() => handleUpdateBits(esp.ESP_IP)} type="checkbox"></input>
                      <div className="checkmark"></div>
                    </label>
                    <label className="container">
                      <input checked={esp.B3 ? "checked" : ""} onChange={handleSubmitChange} onClick={() => handleUpdateBits(esp.ESP_IP)} type="checkbox"></input>
                      <div className="checkmark"></div>
                    </label>
                  </article>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </main>
  )
}

export default App
