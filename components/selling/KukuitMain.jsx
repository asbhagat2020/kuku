
import Image from 'next/image'
import React, { useState } from 'react'
import DraggableProgressBar from './DraggableProgressBar'

const KukuitMain = () => {
    const Modal = ({ onClose }) => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                <div className="bg-white w-full max-w-[586px] px-6 sm:px-10 rounded-[20px] shadow-lg flex flex-col justify-center items-center py-8 sm:py-12">
                    <Image width={82} height={82} src='/CheckCircle.svg' alt='' className="w-16 sm:w-20" />
                    <h2 className="text-xl sm:text-3xl font-bold font-karla text-center mt-4 sm:mt-8">Your pickup schedule has been sent to us</h2>
                    <div className="text-[#7f808c] text-base sm:text-xl font-normal font-karla leading-7 sm:leading-9 text-center mt-2 sm:mt-4">Sit back & relax while we send an email confirmation from our team for the further steps</div>
                    <div className="mt-6 flex justify-end">
                        <button onClick={onClose} className="bg-[#e4086f] text-white py-2 px-4 sm:px-6 rounded-lg font-karla text-sm sm:text-base">Close</button>
                    </div>
                </div>
            </div>
        )
    }
    const [submit, setSubmit] = useState(false)
    const [modal, setModal] = useState(false)
    const handleClick = () => setSubmit(true)
    const handleConfirmClick = () => setModal(true)
    const handleCloseModal = () => setModal(false)

    return (
        <div className="relative w-full max-w-[1550px] min-h-screen mx-auto py-8 sm:py-16 px-4 sm:px-8">
            <div
                className={`absolute inset-0 z-0 transition-opacity duration-300 ${modal ? 'opacity-50' : 'opacity-100'}`}
                style={{
                    backgroundImage: "url('kukuit_bg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <div className='w-full max-w-[1020px] bg-white border mx-auto rounded-[20px] relative z-10 overflow-hidden'>
                <div className="w-full">
                    <Image width={1020} height={211} alt='' src='/kukuit_form_top_bg.png' className="w-full h-auto rounded-t-[20px]" />
                </div>
                <div className='absolute top-4 sm:top-10 left-4 sm:left-6'>
                    <h2 className="text-[#e6e6e6] text-3xl sm:text-[46px] font-normal font-luckiest leading-tight">SCHEDULE PICKUP</h2>
                </div>
                <div className='px-4 sm:px-8 lg:px-[94px] mt-8 sm:mt-[56px]'>
                    {submit ? (
                        <>
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
                                <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">Choose the number of items</p>
                                <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">Step 2 of 3</p>
                            </div>
                            <DraggableProgressBar />
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 sm:mt-[76px] mb-4'>
                                <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">Choose the pickup date</p>
                                <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">Step 3 of 3</p>
                            </div>
                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-[56px] mt-4 sm:mt-[56px]'>
                                <div className='w-full sm:w-1/2'>
                                    <input type="date" className='w-full h-[50px] border-2 rounded-lg px-5' />
                                </div>
                                <div className='w-full sm:w-1/2 mt-4 sm:mt-0'>
                                    <input type="time" className='w-full h-[50px] border-2 rounded-lg px-5' />
                                </div>
                            </div>
                            <div className='flex mt-8 sm:mt-[76px] gap-3 items-start sm:items-center'>
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                                <p className='text-base sm:text-xl font-normal font-karla leading-tight sm:leading-7'>I agree to the KUKU Terms & Conditions. We protect your privacy and to understand how, Read our Privacy Policies</p>
                            </div>
                            <div className='flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]'>
                                <button onClick={handleConfirmClick} className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla">Confirm Pickup</button>
                                <button className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla">Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
                                <p className="text-[#151515] text-xl sm:text-2xl font-bold font-karla">Pickup Details</p>
                                <p className="text-black text-sm sm:text-base font-bold font-karla mt-2 sm:mt-0">Step 1 of 3</p>
                            </div>
                            <p className="text-[#a8a8a8] text-sm sm:text-base font-normal font-karla">Please enter your pickup details</p>
                            <div className='w-full h-[200px] sm:h-[392px] mt-6 sm:mt-[36px] shadow'>
                                <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3613.8073542448806!2d55.1406664!3d25.0745178!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1728306215066!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                            <div className='flex flex-col lg:flex-row mt-6 sm:mt-[36px] gap-6 lg:gap-[54px]'>
                                <div className='w-full lg:w-1/2 flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Country</p>
                                        <select className='w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla'>
                                            <option className='font-karla' value="uae">UAE</option>
                                            <option className='font-karla' value="saab">Saab</option>
                                            <option className='font-karla' value="fiat">Fiat</option>
                                            <option className='font-karla' value="audi">Audi</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Address Line 1</p>
                                        <input type='text' className='w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">First name</p>
                                        <input type='text' className='w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Email address</p>
                                        <input type='email' className='w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5' />
                                    </div>
                                </div>
                                <div className='w-full lg:w-1/2 flex flex-col gap-6'>
                                    <div className='flex flex-col'>
                                        <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">City</p>
                                        <select className='w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5 font-karla'>
                                            <option className='font-karla' value="dubai">Dubai</option>
                                            <option className='font-karla' value="abudhabi">Abu Dhabi</option>
                                            <option className='font-karla' value="sharjah">Sharjah</option>
                                            <option className='font-karla' value="ajman">Ajman</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Address Line 2</p>
                                        <input type='text' className='w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Last name</p>
                                        <input type='text' className='w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className="text-[#151515] text-sm sm:text-base font-bold font-karla">Phone number</p>
                                        <input type='tel' className='w-full h-[50px] border-2 rounded-lg px-5 mt-2 sm:mt-5' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row sm:justify-end gap-4 my-8 sm:my-[36px]'>
                                <button onClick={handleClick} className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#e4086f] rounded-[22px] text-[#fde504] text-lg sm:text-xl font-bold font-karla">Next</button>
                                <button className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-[22px] border border-[#e4086f] text-[#e4086f] text-lg sm:text-xl font-bold font-karla">Cancel</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {modal && <Modal onClose={handleCloseModal} />}
        </div>
    )
}

export default KukuitMain