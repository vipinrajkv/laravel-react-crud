import React from 'react'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import List from '../components/list'
import Create from '../components/create'
import Edit from '../components/edit'
export default function RouterLayout() {
  return (
    <>
        <Routes>
        <Route path='/' element={<List/>}></Route>
        <Route path='/product/create' element={<Create/>}></Route>
        <Route path='/products/:id/edit' element={<Edit/>}></Route>
        </Routes>
    </>
  )
}
