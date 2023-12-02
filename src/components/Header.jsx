import "./Header.scss"

import TwitterLogo from "../assets/twitter-logo.png"




export default function Header() {
  return (
    <div className="header">
      <img src={TwitterLogo} alt="Simulador de tweets" />

      <h1>Simulador de tweets</h1>
    </div>
  )
}