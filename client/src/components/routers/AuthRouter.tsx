import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Search, Edit, Booking } from '../screen'
const AuthRouter = () => {
    return (
        <div className="col content-center">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Edit />} />
                    <Route path='/booking' element={<Booking />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default AuthRouter
