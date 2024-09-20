// import React from 'react';
// import { Link } from 'react-router-dom';
// import { slide as Menu } from 'react-burger-menu';
// import './Navbar.css';

// class Navbar extends React.Component {
//   showSettings(event) {
//     event.preventDefault();
//     // Settings action
//   }

//   render() {
//     return (
//       <div id="outer-container">
//         {/* Traditional Navbar for Desktop */}
//         <nav className="desktop-nav navbar">
//           <div className="navbar-logo">
//             <span className="fna">FNA</span>
//             <span className="ai">.ai</span>
//           </div>
//           <ul className="navbar-list">
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/about">About Us</Link></li>
//             <li><Link to="/extension">Extension</Link></li>
//             <li><Link to="/blockchain">Blockchain</Link></li>
//           </ul>
//         </nav>

//         {/* Sliding Menu for Mobile */}
//         <Menu
//           right // To open from the right
//           pageWrapId={"page-wrap"}
//           outerContainerId={"outer-container"}
//           customBurgerIcon={<img src="/menu.png" alt="Menu" />}
//           className="bm-menu-wrap"
//         >

//           <a id="home" className="menu-item" href="/">Home</a>
//           <a id="about" className="menu-item" href="/about">About Us</a>
//           <a id="extension" className="menu-item" href="/extension">Extension</a>
//           <a id="blockchain" className="menu-item" href="/blockchain">Blockchain</a>
//           <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
//         </Menu>
//       </div>
//     );
//   }
// }

// export default Navbar;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { slide as Menu } from 'react-burger-menu';
// import './Navbar.css';

// class Navbar extends React.Component {
//   showSettings(event) {
//     event.preventDefault();
//     // Settings action
//   }

//   render() {
//     return (
//       <div id="outer-container">
//         {/* Traditional Navbar for Desktop */}
//         <nav className="desktop-nav navbar">
//           <div className="navbar-logo">
//             <span className="fna">FNA</span>
//             <span className="ai">.ai</span>
//           </div>
//           <ul className="navbar-list">
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/about">About Us</Link></li>
//             <li><Link to="/extension">Extension</Link></li>
//             <li><Link to="/blockchain">Blockchain</Link></li>
//           </ul>
//         </nav>

//         {/* Creative Sliding Menu for Mobile */}
//         <Menu
//           right 
//           pageWrapId={"page-wrap"}
//           outerContainerId={"outer-container"}
//           customBurgerIcon={<img src="/menusq.svg" alt="Menu" />} 
//           className="bm-menu-wrap"
//         >
//           <nav className="menu-content">
//             <Link id="home" className="menu-item" to="/">Home</Link>
//             <Link id="about" className="menu-item" to="/about">About Us</Link>
//             <Link id="extension" className="menu-item" to="/extension">Extension</Link>
//             <Link id="blockchain" className="menu-item" to="/blockchain">Blockchain</Link>
//             {/* <a onClick={this.showSettings} className="menu-item" href="#">Settings</a> */}
//           </nav>
//           <div className="menu-footer">
//             <p className="footer-text">Stay Connected</p>
//             <div className="social-icons">
//               <a href="#"><i className="fab fa-facebook-f"></i></a>
//               <a href="#"><i className="fab fa-twitter"></i></a>
//               <a href="#"><i className="fab fa-linkedin-in"></i></a>
//             </div>
//           </div>
//         </Menu>
//       </div>
//     );
//   }
// }

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './Navbar.css';
import Logo from './logo.svg'; // Adjust the path based on your file structure

class Navbar extends React.Component {
  showSettings(event) {
    event.preventDefault();
    // Settings action
  }

  render() {
    return (
      <div id="outer-container">
        {/* Traditional Navbar for Desktop */}
        <nav className="desktop-nav navbar">
          <div className="navbar-logo">
            {/* Replace text with SVG logo */}
            <Link to="/">
              <img src={Logo} alt="Logo" className="navbar-logo-img" />
            </Link>
          </div>
          <ul className="navbar-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/extension">Extension</Link></li>
            <li><Link to="/blockchain">Blockchain</Link></li>
          </ul>
        </nav>

        {/* Creative Sliding Menu for Mobile */}
        <Menu
          right
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          customBurgerIcon={<img src="/menusq.svg" alt="Menu" />}
          className="bm-menu-wrap"
        >
          <div className="menu-header">
            <div className="navbar-logo">
              {/* SVG logo in the menu header as well */}
              <Link to="/">
                <img src={Logo} alt="Logo" className="navbar-logo-img" />
              </Link>
            </div>
          </div>
          <nav className="menu-content">
            <Link id="home" className="menu-item" to="/">Home</Link>
            <Link id="about" className="menu-item" to="/about">About Us</Link>
            <Link id="extension" className="menu-item" to="/extension">Extension</Link>
            <Link id="blockchain" className="menu-item" to="/blockchain">Blockchain</Link>
            <a onClick={this.showSettings} className="menu-item" href="#">Settings</a>
          </nav>
          <div className="menu-footer">
            <p className="footer-text">Stay Connected</p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
