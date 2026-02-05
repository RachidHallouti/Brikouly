import {motion, scale, useAnimate, useAnimationControls, useMotionValue, useMotionValueEvent, useScroll, useTransform} from "motion/react"
import { a } from "motion/react-client"
import { useEffect, useRef, useState } from "react"

export function ImageScroll(props){
    const ref = useRef()
    const {scrollYProgress} = useScroll({
        target: ref,
        offset:["start end","end start"]
    })
    const scale = useTransform(scrollYProgress,[0,0.45,0.55,1],[0.7,1,1,0.7])
    const borderRadius = useTransform(scrollYProgress,[0,0.4,0.6,1],[100,0,0,100])
    const opacity = useTransform(scrollYProgress,[0,0.4,0.6,1],[0.15,1,1,0.15])
    return(
        <motion.img ref={ref} style={{scale,opacity,borderRadius}} className="w-full" src={props.src} alt="" />
    )
}


export default function Motion(){
    
    return(
        <>
        <div className="bg-gray-950 h-800 w-full flex justify-center items-center">
            <div className="relative w-full">
                {[...Array(20)].map(()=>
                <ImageScroll src="https://images7.alphacoders.com/476/476727.jpg"/>
                )}
                
            </div>
        </div>
        </>
    )
}