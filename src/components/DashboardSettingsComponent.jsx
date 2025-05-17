import React from 'react'
import SidebarComponent from './SidebarComponent'

const DashboardSettingsComponent = () => {
  return (
    <div className='flex'>
      <div>
        <SidebarComponent />
      </div>

      <div className='h-screen flex-1 p-7'>
        <h1 className='center'>
          Users can change their Dashboard settings here
        </h1>
      </div>
        
    </div>
  )
}

export default DashboardSettingsComponent
