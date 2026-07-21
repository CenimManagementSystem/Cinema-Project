// import React from 'react'
// import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import { DashboardPage } from '@/pages/admin/DashboardPage'
// import { DashboardLayout } from '@/layouts/DashboardLayout'
// import { AuthLayout } from '@/layouts/AuthLayout'
// import { Mainlayout } from '@/layouts/Mainlayout'

import { HomePage } from "@/pages/public-site/Home/HomePage"
import { Route, Routes } from "react-router-dom"

export const AppRoutes = () => {
  return (
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
  )
}
