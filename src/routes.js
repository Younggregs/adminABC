import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Service pages
import history from './services/history'
import AuthLayout from './services/AuthLayout'

import loadable from '@loadable/component'
import Loading from './components/Loading';


// Non-authentication pages begins here
// const Dashboard = loadable(() => import('./screens/pages/Dashboard'), {
//     fallback: Loading,
// })
const Help = loadable(() => import('./screens/pages/Help'), {
    fallback: Loading,
})
const About = loadable(() => import('./screens/pages/About'), {
    fallback: Loading,
})
const Contact = loadable(() => import('./screens/pages/Contact'), {
    fallback: Loading,
})
const Terms = loadable(() => import('./screens/pages/Terms'), {
    fallback: Loading,
})
const Privacy = loadable(() => import('./screens/pages/Privacy'), {
    fallback: Loading,
})
const Disclaimer = loadable(() => import('./screens/pages/Disclaimer'), {
    fallback: Loading,
})
const FAQ = loadable(() => import('./screens/pages/FAQ'), {
    fallback: Loading,
})


// Authentication pages begins here
const Fence = loadable(() => import('./screens/auth/Fence'), {
    fallback: Loading,
})
const Landing = loadable(() => import('./screens/auth/Landing'), {
    fallback: Loading,
})
const Register = loadable(() => import('./screens/auth/Register'), {
    fallback: Loading,
})
const Login = loadable(() => import('./screens/auth/Login'), {
    fallback: Loading,
})
const Signin = loadable(() => import('./screens/auth/Signin'), {
    fallback: Loading,
})
const UpdateProfile = loadable(() => import('./screens/admin/UpdateProfile'), {
    fallback: Loading,
})
const Logout = loadable(() => import('./screens/auth/Logout'), {
    fallback: Loading,
})
const Dashboard = loadable(() => import('./screens/admin/Dashboard'), {
    fallback: Loading,
})
const Location = loadable(() => import('./screens/admin/Location'), {
    fallback: Loading,
})
const Admin = loadable(() => import('./screens/admin/Admin'), {
    fallback: Loading,
})
const User = loadable(() => import('./screens/admin/User'), {
    fallback: Loading,
})
const NotFound = loadable(() => import('./screens/pages/NotFound'), {
    fallback: Loading,
})

const AuthRoutes = ({ component: Component, ...rest }) => (
    <Route history={history}
        {...rest}
        render={props => (
            <AuthLayout {...props}>
                <Component {...rest} />
            </AuthLayout>
        )}
    />
);



export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route 
                        exact 
                        path="/" 
                        component={Fence}/>
                    <Route 
                        exact 
                        path="/landing" 
                        component={Landing}/>
                    <Route 
                        exact 
                        path="/signin" 
                        component={Signin}/>
                    <Route 
                        exact 
                        path="/register" 
                        component={Register}/>
                    <Route 
                        exact 
                        path="/login" 
                        component={Login}/>
                    <Route 
                        exact 
                        path="/update" 
                        component={UpdateProfile}/>
                    <Route 
                        exact 
                        path="/logout" 
                        component={Logout}/>
                    <Route 
                        exact 
                        path="/dashboard" 
                        component={Dashboard}/>
                    <AuthRoutes
                        path="/location"
                        component={Location} />
                    <AuthRoutes
                        path="/admin"
                        component={Admin} />
                    <AuthRoutes
                        path="/user"
                        component={User} />
                    <AuthRoutes
                        path="/help"
                        component={Help} />
                    <AuthRoutes
                        path="/faq"
                        component={FAQ} />
                    <AuthRoutes
                        path="/about"
                        component={About} />
                    <AuthRoutes
                        path="/contact"
                        component={Contact} />
                    <AuthRoutes
                        path="/privacy"
                        component={Privacy} />
                    <AuthRoutes
                        path="/disclaimer"
                        component={Disclaimer} />
                    <AuthRoutes
                        path="/terms"
                        component={Terms} />
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}