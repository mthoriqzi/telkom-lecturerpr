import React, { useState, useEffect} from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { BrowserRouter, Route, useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'

import Login from "../../pages/Login"

const Layout = () => {

    const themeReducer = useSelector(state => state.ThemeReducer)

    const dispatch = useDispatch()

    const [token, setToken] = useState();

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, [dispatch])

    if(!token) {
        return <Login setToken={setToken} token={token}/>
      }
    // console.log(token)

    // if(token.token =="test12") {
    //     console.log("mashok")
        

    //     return (
            
    //         <BrowserRouter>
    //             <Route render={(props) => (
    //                 <div>
    //                     <Sidebar {...props}/>
    //                     <div className="layout__content">
    //                         <TopNav/>
    //                         <div className="layout__content-main">
    //                             <Routes/>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )}/>
    //         </BrowserRouter>
    //     ) 
    // }

    // const layout1 = () => {
    //     <BrowserRouter>
    //     <Route render={(props) => (
    //         <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
    //             <Sidebar {...props}/>
    //             <div className="layout__content">
    //                 <TopNav/>
    //                 <div className="layout__content-main">
    //                     <Routes/>
    //                 </div>
    //             </div>
    //         </div>
    //     )}/>
    // </BrowserRouter>
    // }
    console.log("direktorat1")

    return (
        <BrowserRouter>
        <Route path='/Login' exact component={Login}/>
            <Route render={(props) => (
                <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    
                    <Sidebar {...props}/>
                    <div className="layout__content">
                        <TopNav token={token}/>
                        <div className="layout__content-main">
                            <Routes token={token}/>
                        </div>
                    </div>
                </div>
            )}/>
        </BrowserRouter>
    )
}

export default Layout
