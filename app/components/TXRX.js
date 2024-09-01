import React from 'react'
import Image from 'next/image'

const TXRX = () => {
  return (
    <div>
        <Image
            src="/image/Transmitter_ELY-CAN_final.PNG"
            width={10000}
            height={10000}
            alt="Transmitter"
            className="w-[10vw] h-[20vw] absolute right-[16vw] -bottom-[4.5vw]"
        />
        <Image
        src="/image/Receiver_ELY-CAN_final.png"
        width={10000}
        height={10000}
        alt="Receiver"
        className="w-[8vw] h-[20vw] absolute right-[3vw] -bottom-[4vw]"
        />
    </div>
  )
}

export default TXRX