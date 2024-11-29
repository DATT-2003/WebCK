import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Search, CreateRoom, Booking, RoomList, EditRoom, CreateBill } from '../screen'
const AuthRouter = () => {
    return (
        <div className="col content-center">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RoomList />} />
                    <Route path='/edit/:id' element={<EditRoom />} />
                    <Route path='/create' element={<CreateRoom />} />
                    <Route path='/booking' element={<Booking />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/create-bill/:id' element={<CreateBill />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default AuthRouter