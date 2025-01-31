'use client'
import Image from 'next/image';
import { useState, useEffect, CSSProperties } from 'react';
import { StaticImageData } from 'next/image';


export default function ImgBook({ imgList }: { imgList: Array<StaticImageData> }) {
    var [currImg, updateImg] = useState(0);
    const imageStyling = function (slideNum: number) {
        var styleObj: CSSProperties = {
            transform: "translate(100%)",
            transition: "transform 500ms ease",
        };
        if (slideNum <= currImg) {
            styleObj.transform = "translate(0%)";
        }
        return styleObj;
    };

    // Responsible for auto-moving the images
    useEffect( () => {
        const timeoutId = setTimeout(() => {
            updateImg((currImg + 1) % imgList.length);
        }, 6e3);

        return () => clearTimeout(timeoutId);
    }, [currImg]);

    return (
        <>
            <section className="relative overflow-hidden h-full">
                {
                    imgList.map( (imgData, imgIndex) => {
                        return (
                        <Image alt="image" fill key={imgIndex} onClick={ () => { updateImg((currImg + 1) % imgList.length) } }
                        className="absolute object-cover" style={ imageStyling(imgIndex) }
                        src={ imgData }
                        ></Image>
                        );
                    })
                }
            </section>
        </>
    );
}