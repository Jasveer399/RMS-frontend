import React from 'react'
import '../styles/sidebar.css'
import { Link } from 'react-router-dom'
const StuNavBar = () => {
  return (
<nav class="menu">
    <ol>
        <li class="menu-item"><Link to="/students/home">Dashboard</Link></li>
        <li class="menu-item"><Link to="/students/profile">Organise Profile</Link></li>
        <li class="menu-item"><Link to="/students/exams">Past Exams</Link></li>
        <li class="menu-item"><Link to="/students/results">Result</Link></li>
    </ol>
</nav> 
  )
}

export default StuNavBar
