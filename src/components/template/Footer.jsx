import React from "react";
import './Footer.css'

export default props =>
    <footer className="footer">
        <span>Desenvolvido com <i className={`fa fa-${props.icon} text-danger`}></i> por <strong id="destaque">Ian Vinícius</strong></span>
    </footer>