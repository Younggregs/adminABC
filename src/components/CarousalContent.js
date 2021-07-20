import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { ReactComponent as Prev } from '../assets/svg/Prev.svg';
import { ReactComponent as Next } from '../assets/svg/Next.svg';


export default function CarousalContent() {
    return (
        <>
        <CarouselProvider
                naturalSlideWidth={150}
                naturalSlideHeight={50}
                totalSlides={3}
                isPlaying={true}
            >
            <Slider>
                <Slide innerClassName="inner-content" 
                index={0}>
                    <div>
                        <h4>“Change is Constant”</h4>
                        <p>-APC</p>
                    </div>
                </Slide>
                <Slide innerClassName="inner-content" 
                index={1}>
                     <div>
                        <h4>“The People's Party”</h4>
                        <p>-APC</p>
                    </div>
                </Slide>
                <Slide innerClassName="inner-content" 
                index={2}>
                     <div>
                        <h4>“Join the ruling party”</h4>
                        <p>-APC</p>
                    </div>
                </Slide>
            </Slider>
                <ButtonBack><Prev /></ButtonBack>
                <ButtonNext><Next /></ButtonNext>
            </CarouselProvider>
        </>
    )
}
