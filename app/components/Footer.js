import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <section className="w-full h-[10vw] bg-[#1F127E] mt-[1vw] relative flex flex-row justify-around items-start p-[2.5vw]">
        <div>
            <Image
            src="/image/IMG_2134.PNG"
            width={10000}
            height={10000}
            alt="copyright"
            className="w-[10vw] h-[5vw]"/>
        </div>
        <div>
            <h1 className="text-[1.2vw] text-white font-bold">Social Media</h1>
            <div className="flex flex-row">
                <Image
                    src="/image/instagram-53.PNG"
                    width={10000}
                    height={10000}
                    alt="copyright"
                    className="w-[1.3vw] h-[1.3vw]"
                />
                <div className="flex flex-col">
                    <h1 className="text-white font-bold text-[0.9vw] ml-[0.5vw]">Instagram</h1>
                    <h1 className="text-white font-bold text-[0.7vw] ml-[0.5vw] mt-[0.2vw]">@abi_obiansyah</h1>
                    <h1 className="text-white font-bold text-[0.7vw] ml-[0.5vw] mt-[0.2vw]">@bcdefakhri</h1>
                </div>
            </div>
        </div>
        <div>
            <h1 className="text-white font-bold text-[1.2vw]">Alamat</h1>
            <h1 className="text-white text-[0.8vw] mt-[0.5vw]">Kuncen WB I/358 RT 34 RW 07, Pakuncen, Wirobrajan, <br/> Yogyakarta, Daerah Istimewa Yogyakarta 55253</h1>
        </div>
        <div>
            <h1 className="text-white font-bold text-[1.2vw]">Contact Us</h1>
            <div className="flex flex-row items-center mt-[0.5vw]">
                <Image
                    src="/image/phone.PNG"
                    width={10000}
                    height={10000}
                    alt="copyright"
                    className="w-[0.9vw] h-[0.9vw] text-white"
                />
                <h1 className="text-white text-[0.8vw] ml-[0.5vw]">628995113270</h1>
            </div>
            <div className="flex flex-row items-center mt-[0.5vw]">
                <Image
                    src="/image/mail.PNG"
                    width={10000}
                    height={10000}
                    alt="copyright"
                    className="w-[1.1vw] h-[0.9vw] text-white"
                />
                <h1 className="text-white text-[0.8vw] ml-[0.5vw]">elycan.teladan@gmail.com</h1>
            </div>
        </div>
    </section>

  )
}

export default Footer