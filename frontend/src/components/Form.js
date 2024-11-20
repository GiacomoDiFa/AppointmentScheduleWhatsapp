import React from 'react';

function Form({
    isFormOpen,
    title,
    formData,
    handleInputChange,
    handleSubmit,
    handleUserSelect,
    setIsFormOpen,
    contactsList,
    fields
}) {
    return (
        isFormOpen && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <form className="w-full max-w-lg bg-white p-5 rounded shadow-md" onSubmit={handleSubmit}>
                    <h1 className='font-bold mb-8 text-lg uppercase tracking-wide'>{title}</h1>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        {fields.map((field) => (
                            <div key={field.name} className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={field.name}>
                                    {field.label}
                                </label>
                                <input
                                    value={formData[field.name]}
                                    name={field.name}
                                    onChange={handleInputChange}
                                    disabled={field.disabled || false}
                                    required
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type={field.type || "text"}
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
                    </div>
                    {contactsList && (
                        <select
                            value={formData.numero}
                            onChange={handleUserSelect}
                            required
                            className='border p-2 mb-2 w-full'
                        >
                            <option value="">Seleziona un contatto</option>
                            {contactsList.map((user) => (
                                <option key={user.numero} value={user.numero}>
                                    {user.nome} {user.cognome} - {user.numero}
                                </option>
                            ))}
                        </select>
                    )}
                    <div className='flex justify-end mt-4'>
                        <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline'
                        >
                            Aggiungi
                        </button>
                        <button
                            type='button'
                            onClick={() => setIsFormOpen(false)}
                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                            Annulla
                        </button>
                    </div>
                </form>
            </div>
        )
    );
}

export default Form;
