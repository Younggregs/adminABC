import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import MainLogo from '../../assets/imgs/MainLogo2.png'
import '../../styles/Auth.css'
import Button from '../../components/Button'
import login from '../../promises/Login'
import signin from '../../store'
import isSuperUser from '../../promises/IsSuperUser'

export default function Signin() {
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState('')
    const [flowershower, setFlowershower] = useState(false)
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
    const [error, setError] = useState('')
    

    const onPhoneChanged = e => setPhone(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const _handleKeyDownSubmit = (e) => {
        if (e.key === 'Enter') {
          submit()
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const submit = async () => {

        setLoading(true)
        console.log('res11', phone, password)
        if(phone === '12141618' && password === 'iqtb-psge'){
            setSuccess(true)
        }else{
            setErr(true)
            setError('Username and password do not match')
        }
        

        setLoading(false)
  
    }

    return (
        <div className="auth-background">
            <div className="auth-container">
                <h1 style={{ color: '#228B22', fontWeight: 'bold'}}>All Progressive Congress</h1>
                <br /><br />
                <div>
                    <a href="/#"><img src={MainLogo} width="160px" height="74px" alt="Logo" /></a>
                </div>
                <p>Proceed to login as ADMIN</p>
                <form onSubmit={handleSubmit}>
                    <div className="position-relative">
                        <span>Phone</span>
                        <input 
                            autoFocus 
                            type="text" 
                            name="phone" 
                            id="phone"
                            onChange={onPhoneChanged}
                        />
                    </div>
                    <div className="position-relative">
                        <span>Password</span>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Min. 6 characters" 
                            onChange={onPasswordChanged}
                            onKeyDown={(e) => _handleKeyDownSubmit(e)}/>
                    </div>
                    <br />
                    <div>
                        <p className="already"><Link to="/register" className="sign">Not a member yet? Register here.</Link></p>
                    </div>
                    <br />
                    <div>
                        <p className="already"><Link to="/#" className="sign">Forgot Password</Link></p>
                    </div>
                    <div className="mt-4 mb-3">
                        <Button handleClick={() => submit()} title={loading ? "Processing..." : "Continue"} />
                    </div>
                </form>
                

            <div>
                {success ? (
                    <Redirect to={'/admin'} />
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
    )
}