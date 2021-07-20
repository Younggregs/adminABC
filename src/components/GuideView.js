import React from 'react'
import { ReactComponent as Naira } from '../assets/svg/naira.svg';
import { IMG_PATH_URL } from '../constants'
import processVehicle from '../blocks/ProcessVehicle'

import '../styles/Components.css'


export default function GuideView(props) {

    const makeImage = (image) => {
        return IMG_PATH_URL + image
    }


    return (
        <div>
            <div>
            <div>
                <p style={{textAlign: 'left', whiteSpace: 'pre-wrap', fontSize: 15}}>
                    <span style={{background: '#00AEFF', padding: 5, color: '#fff'}}>Vehicle: {processVehicle(props.vehicle)}</span>
                    <br />
                    {props.guide} 
                </p>
                <br />
                <p style={{textAlign: 'left', whiteSpace: 'pre-wrap', fontSize: 15}}>Total Travel Time: {props.total_travel_time} mins</p>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <p style={{fontSize: 15}}>Total Travel Cost:</p>
                    <Naira style={{height: 15, width: 20, marginTop: 15}}/>
                    <p style={{fontSize: 15}}>{props.total_travel_cost}</p>
                </div>
                {props.image ? (
                    <div className="image">
                        <img src={makeImage(props.image)} alt=""/>
                    </div>
                ) : (
                    <div />
                )}
            </div>
            <div style={{borderTop: '1px solid whitesmoke', marginTop: 50, marginBottom: 20, width: '100%', height: 0.2}} />
        </div>
    </div>
    )
}
