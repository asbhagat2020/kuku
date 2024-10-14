// components/Modal.js
"use client"
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[487px] h-[660px] rounded-lg shadow-lg relative p-6">
                <button onClick={onClose} className="absolute top-4 right-4 text-black text-lg font-bold">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
