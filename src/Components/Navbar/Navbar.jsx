import React from 'react'
import logo from "../../assets/logo.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BellDot, FlagIcon, MessageSquare, Search, User } from 'lucide-react'
import flag from "../../assets/Flag.png"


const instyle = {

}


const Navbar = () => {
    return (
        <div>
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff" }}>
                <div>
                    <img src={logo} alt="logo" style={{ width: "120px", height: "50px", marginLeft: "40px" }} />
                </div>
                <div style={{ marginRight: "30px" ,alignItems:"flex-start",display:"flex"}}>
                    <ul style={{ display: "inline-flex", gap: "40px", listStyle: "none", }}>
                        <li style={{ display: "flex", alignItems: "center" ,background:"#f2f2f2" ,cursor:"pointer"}}><input type="text" placeholder='search...' style={{
                            paddingInline: "8px",
                            border: "none",
                            background:"#f2f2f2",
                            outline:"none"
                        }} />
                            <Search color='black' />
                        </li>
                        <li><MessageSquare color='black' /></li>
                        <li><BellDot color='black' /></li>
                        <li>
                            <img src={flag} alt="flag" style={{ width: "auto", height: "30px", borderRadius: "10%" }} />
                        </li>
                        <li><User color='black' /></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar