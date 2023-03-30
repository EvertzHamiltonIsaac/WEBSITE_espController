import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { uid } from 'uid';
import { set, ref, onValue, update, remove } from 'firebase/database'
import { database } from "./utils/firebase"
import InsertModal from './components/InsertModal';
import { data } from 'autoprefixer';
import DeleteModal from './components/DeleteModal';

function App() {
  const [moduleIp, setModuleIp] = useState("");
  const [modules, setModules] = useState([]);
  const [moduleName, setModuleName] = useState("");
  const [module, setModule] = useState({});
  const [quantityOfBits, setQuantityOfBits] = useState(4)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [stateOfBit, setStateOfBit] = useState(false)
  //const [voltaje, setVoltaje] = useState("vl")

  const [tempId, setTempId] = useState("");


  const handleOpenModalInsert = () => {
    setIsModalOpen(true)
  }
  const handleOpenModalDelete = (module) => {
    setIsModalOpenDelete(true)
    setModule(module)
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

  const handleDelete = (module) => {
    remove(ref(database, `/${module}`));
    handleReset();
  }

  const handleReset = () => {
    setIsModalOpen(false);
    setModuleIp("")
    setModuleName("")
    setQuantityOfBits(4)
    setStateOfBit(false)
    setIsModalOpenDelete(false);
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

  const handleUpdateBits = (e) => {
    console.log(e.target.value)
  }

  const handleSubmitChangeB0 = (module) => {
    update(ref(database, `/${module.ESP_IP}`), {
      B0: !module.B0,
    })
  }

  const handleSubmitChangeB1 = (module) => {
    update(ref(database, `/${module.ESP_IP}`), {
      B1: !module.B1,
    })
  }

  const handleSubmitChangeB2 = (module) => {
    update(ref(database, `/${module.ESP_IP}`), {
      B2: !module.B2,
    })
  }

  const handleSubmitChangeB3 = (module) => {
    update(ref(database, `/${module.ESP_IP}`), {
      B3: !module.B3,
    })
  }

  return (
    <main className='App backdrop-blur-sm'>
      <section className="App__container">
        <InsertModal
          setModuleIp={setModuleIp}
          setModuleName={setModuleName}
          moduleIp={moduleIp}
          moduleName={moduleName}
          writeToDatabase={writeToDatabase}
          isModalOpen={isModalOpen}
          handleReset={handleReset}
        />

        <DeleteModal
          isModalOpenDelete={isModalOpenDelete}
          handleReset={handleReset}
          handleDelete={handleDelete}
          module={module}
        />

        <section className='btn__modal'>
          <button className='btn_modal__insert rounded-lg bg-orange-400 px-4 py-2' onClick={handleOpenModalInsert}>Insert Module</button>
        </section>
        <section className="gridList__container">
          {
            modules.map(esp => (
              <div key={esp.ESP_ID} className="max_width m-4 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="">
                  <div className="p-8">
                    <div className="btn__modal__delete__container">
                      <button className='btn__modal__delete bg-orange-400' onClick={() => handleOpenModalDelete(esp)}><box-icon name='trash'></box-icon></button>
                    </div>

                    <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">{esp.ESP_ID}</div>
                    <h4 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{esp.ESP_NAME}</h4>
                    <article className="Bit__container">
                      <label className="container">
                        <input type="checkbox" checked={esp.B0 ? "checked" : ""} onClick={() => handleSubmitChangeB0(esp)}></input>
                        <div className="checkmark"></div>
                      </label>
                      <label className="container">
                        <input type="checkbox" checked={esp.B1 ? "checked" : ""} onClick={() => handleSubmitChangeB1(esp)}></input>
                        <div className="checkmark"></div>
                      </label>
                      <label className="container">
                        <input type="checkbox" checked={esp.B2 ? "checked" : ""} onClick={() => handleSubmitChangeB2(esp)}></input>
                        <div className="checkmark"></div>
                      </label>
                      <label className="container">
                        <input type="checkbox" checked={esp.B3 ? "checked" : ""} onClick={() => handleSubmitChangeB3(esp)}></input>
                        <div className="checkmark"></div>
                      </label>
                    </article>
                  </div>
                </div>
              </div>
            ))
          }
        </section>
      </section>
    </main>
  )
}

export default App
