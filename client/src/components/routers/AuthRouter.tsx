import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Search, EditRoom, Booking, RoomList } from '../screen'
const AuthRouter = () => {
    return (
        <div className="col content-center">
            <BrowserRouter>
                <Routes>
                    <Route path='/show' element={<RoomList />} />
                    <Route path='/create' element={<EditRoom />} />
                    <Route path='/booking' element={<Booking />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default AuthRouter