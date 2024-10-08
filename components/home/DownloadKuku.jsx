import Image from 'next/image'
import React from 'react'

const DownloadKuku = () => {
    return (
        <div className='max-w-[1550px] mx-auto h-[865px] px-[70px]'
        style={{
            backgroundImage: "url('/download_bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            <div className='flex pt-[76px] justify-between'>
                <div>
                    <Image width={335} height={242} src='/dress_left.png' />
                </div>
                <div className='flex flex-col items-center gap-[43px]'>
                    <Image width={40} height={40} src='/round.svg' />
                    <div className="w-[346px] text-center text-[#fde504] text-[46px] font-normal font-luckiest leading-[55.20px]">Clear your wardrobe and sell now</div>
                </div>
                <div>
                    <Image width={335} height={242} src='/dress_left.png' />
                </div>
            </div>
            <div className='flex gap-[100px] justify-center pt-[41px]'>
                <Image width={284} height={111} src='/appstore.png' />
                <Image width={284} height={111} src='/appstore.png' />
            </div>
            <div className='flex justify-center mt-[-60px]'>
                <Image width={256} height={280} src='/kuku_bird.png' />
            </div>
        </div>
    )
}

export default DownloadKuku