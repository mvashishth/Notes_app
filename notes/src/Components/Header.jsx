import React from "react"
import Button from '@mui/material/Button';
function Header(){
    return(
        <header>
        <nav className="navbar navbar-light" style={{backgroundColor: "#152D35"}}>
  <a className="navbar-brand" href="#">
        <h3 style={{color:"white"}}>Simple Notes</h3>
  </a>
</nav>
</header>
    )
}

export default Header