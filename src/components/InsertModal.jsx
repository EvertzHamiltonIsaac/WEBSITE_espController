import React from 'react'
import 'boxicons'


const InsertModal = ({ setModuleIp, setModuleName, moduleIp, moduleName, isModalOpen, writeToDatabase, handleReset }) => {


    const handleModuleIPChange = e => {
        setModuleIp(e.target.value)
    }

    const handleModuleNameChange = e => {
        setModuleName(e.target.value)
    }

    return (
        <div className={isModalOpen ? "modal__container" : "modal__hidden"}>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="modal relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <box-icon name='microchip'></box-icon>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">INSERT A NEW MODULE</h3>
                                        <div className="inputs__modal mt-2">
                                            <div className="relative mb-3 xl:w-96" data-te-input-wrapper-init>
                                                <label
                                                    htmlFor="exampleFormControlInpu3"
                                                    className=""
                                                >Module IP
                                                </label>
                                                <input
                                                    type="text"
                                                    value={moduleIp} onChange={handleModuleIPChange}
                                                    className=""
                                                />

                                            </div>

                                            <div className="relative mb-3 xl:w-96" data-te-input-wrapper-init>
                                                <label
                                                    htmlFor="exampleFormControlInpu1"
                                                    className=""
                                                >Module Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={moduleName} onChange={handleModuleNameChange}
                                                    className=""
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={writeToDatabase} type="button" className="inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Save Module</button>
                                <button onClick={handleReset} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InsertModal