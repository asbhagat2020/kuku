import Image from 'next/image'
import React from 'react'

const KukuitMain = () => {
    return (
        <div className='max-w-[1550px] min-h-[1566px] mx-auto pt-[100px] flex'
            style={{
                backgroundImage: "url('kukuit_bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <div className='w-[1020] h-[1400px] bg-white border mx-[210px] rounded-[20px]'>
                <div className="rounded-[20px]">
                    <Image width={1020} height={211} alt='' src='/kukuit_form_top_bg.png' className="rounded-[20px]" />
                </div>
                <div className='px-[94px] mt-[56px]'>
                    <div className='flex justify-between'>
                        <p className="text-[#151515] text-2xl font-bold font-karla">Pickup Details</p>
                        <p className="text-black text-base font-bold font-karla">Step 1 of 3</p>
                    </div>
                    <dp className="text-[#a8a8a8] text-base font-normal font-karla">Please enter your pickup details</dp>
                    <div className='w-full h-[392px] mt-[36px]'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7777.172034036298!2d77.6017767487183!3d12.934307990644406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1728294481554!5m2!1sen!2sin" width="800" height="390" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
            
                </div>

            </div>
        </div>
    )
}

export default KukuitMain