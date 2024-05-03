import React from 'react'
import '../../styles/sidebar.css'
import { Link } from 'react-router-dom'
const SideNavBar = () => {
  return (
<nav class="menu">
    <ol>
        <li class="menu-item"><a href="#0">Dashboard</a></li>
        <li class="menu-item"><Link to="/employee/students">Students</Link></li>
        <li class="menu-item"><Link to="/employee/classes">Classes</Link></li>
        <li class="menu-item"><Link to="/employee/exam">Examination</Link></li>
        <li class="menu-item"><Link to="/employee/results">Result</Link></li>
    </ol>
</nav> 
  )
}

export default SideNavBar
