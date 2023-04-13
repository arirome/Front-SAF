import React from 'react'


import Navbar from './Navbar'
import SiderBar from './SiderBar'

const Container = ({ children }) => {
  return (
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper">
    <Navbar/>
       {/*   
     <div className="theme-setting-wrapper">
         <div id="settings-trigger"><i className="ti-settings"></i></div>
         <div id="theme-settings" className="settings-panel">
           <i className="settings-close ti-close"></i>
           <p className="settings-heading">Menu Lateral</p>
           <div className="sidebar-bg-options selected" id="sidebar-light-theme"><div className="img-ss rounded-circle bg-light border mr-3"></div>Modo Claro</div>
           <div className="sidebar-bg-options" id="sidebar-dark-theme"><div className="img-ss rounded-circle bg-dark border mr-3"></div>Modo Oscuro</div>
           <p className="settings-heading mt-2">Menu Horizontal</p>
           <div className="color-tiles mx-0 px-4">
             <div className="tiles success"></div>
             <div className="tiles warning"></div>
             <div className="tiles danger"></div>
             <div className="tiles info"></div>
             <div className="tiles dark"></div>
             <div className="tiles default"></div>
           </div>
         </div>
       </div> */}
      
    <SiderBar/>
       
    {children}
    </div>
    </div>
  )
}

export default Container