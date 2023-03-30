import React from 'react'

const DeleteModal = ({ isModalOpenDelete, handleReset, handleDelete, module }) => {
    return (
        <div className={isModalOpenDelete ? "modal__container" : "modal__hidden"}>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 backdrop-blur-sm"></div>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="modal relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="text__container">
                                <p className='text__modal'>
                                    Are you sure you want to delete the following module
                                    <span>
                                        {
                                            ` "${module.ESP_NAME}"`
                                        }
                                    </span>
                                    ?
                                </p>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={() => handleDelete(module.ESP_IP)} type="button" className="inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Yes</button>
                                <button onClick={handleReset} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DeleteModal