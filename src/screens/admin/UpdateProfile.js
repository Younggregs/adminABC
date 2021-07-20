import React, { useState } from 'react'
import '../../styles/Landing.css'
import { Redirect } from 'react-router-dom'
import MainLogo from '../../components/MainLogo'
import {DropzoneArea} from 'material-ui-dropzone'
import Button from '../../components/Button'
import update from '../../promises/UpdateProfile'

export default function Contact(){
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (image) => {
        setImage(image)
        console.log('image', image)
    }

    const submit = async () => {
        setLoading(true)
        console.log('image 19', image[0])
        const message = await update(image[0])
        console.log('message', message)
        if(message.code){
            setSuccess(true)
        }else if(message.error_message){
            setErr(true)
            setError(message.error_message)
        }else{
            setErr(true)
            setError('Sorry something broke, could not complete the process')
        }
        setLoading(false)
    }

    return (
        <>
            <div className="container">
            <MainLogo />
                <div className="landing-container">
                    <h1>Update Profile</h1>
                    <p className="subtitle" style={{textAlign: 'left'}}>
                        Update Profile Picture 
                    </p>
                    <DropzoneArea
                        onChange={(e) => handleChange(e)}
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                        showPreviews={true}
                        maxFileSize={5000000}
                        maxFiles={1}
                    />
                    <div className="mt-4 mb-3">
                        <Button handleClick={() => submit()} title={loading ? "Processing..." : "Continue"} />
                    </div>

                    <div>
                        {success ? (
                            <Redirect to={'/dashboard'} />
                        ) : (
                        <div />
                        )}

                        {err ? (
                        <div>
                            <p style={{color: 'red', fontSize: 15}}>{error}</p>
                        </div>
                        ) : (
                        <div />
                        )}
                    </div>
                </div>
            </div>

            
            
        </>
    )
}
