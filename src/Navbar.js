// import React from 'react';
// import { Link } from 'react-router-dom';
// import { slide as Menu } from 'react-burger-menu';
// import './Navbar.css';
// import Logo from './logo.svg';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { FaWallet } from 'react-icons/fa';

// class Navbar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       menuOpen: false
//     };
//   }

//   handleStateChange(state) {
//     this.setState({ menuOpen: state.isOpen });
//   }

//   closeMenu() {
//     this.setState({ menuOpen: false });
//   }

//   showSettings(event) {
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <div id="outer-container">
//         {/* Traditional Navbar for Desktop */}
//         <nav className="desktop-nav navbar">
//           <div className="navbar-logo">
//             <Link to="/">
//               <img src={Logo} alt="Logo" className="navbar-logo-img" />
//             </Link>
//           </div>
//           <button 
//             className="wallet-button desktop-wallet-button"
//             onClick={this.props.connectWallet} // Trigger wallet connection on click
//           >
//             <FaWallet className="wallet-icon" /> Connect Wallet
//           </button>
//           <ul className="navbar-list">
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/history">News History</Link></li>
//             <li><Link to="/extension">Extension</Link></li>
//           </ul>
//         </nav>

//         {/* Creative Sliding Menu for Mobile */}
//         <nav className="mobile-nav">
//           <Menu
//             right
//             pageWrapId={"page-wrap"}
//             outerContainerId={"outer-container"}
//             isOpen={this.state.menuOpen}
//             onStateChange={(state) => this.handleStateChange(state)}
//             customBurgerIcon={<img src="/menusq.svg" alt="Menu" />}
//             className="bm-menu-wrap"
//           >
//             <div className="menu-header">
//               <div className="navbar-logo">
//                 <Link to="/" onClick={() => this.closeMenu()}>
//                   <img src={Logo} alt="Logo" className="navbar-logo-img" />
//                 </Link>
//               </div>
//             </div>
//             <nav className="menu-content">
//               <Link id="home" className="menu-item" to="/" onClick={() => this.closeMenu()}>
//                 <i className="fas fa-home"></i> Home
//               </Link>
//               <Link id="about" className="menu-item" to="/history" onClick={() => this.closeMenu()}>
//                 <i className="fas fa-newspaper"></i> News History
//               </Link>
//               <Link id="extension" className="menu-item" to="/extension" onClick={() => this.closeMenu()}>
//                 <i className="fas fa-puzzle-piece"></i> Extension
//               </Link>
//               <a onClick={this.showSettings} className="menu-item" href="#">
//                 <i className="fas fa-cog"></i> Settings
//               </a>
//             </nav>
//             <div className="menu-footer">
//               <p className="footer-text">Stay Connected</p>
//               <div className="social-icons">
//                 <a href="#"><i className="fab fa-facebook-f"></i></a>
//                 <a href="#"><i className="fab fa-twitter"></i></a>
//                 <a href="#"><i className="fab fa-linkedin-in"></i></a>
//               </div>
//             </div>
//           </Menu>
//         </nav>
//       </div>
//     );
//   }
// }

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './Navbar.css';
import Logo from './logo.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaWallet, FaCheckCircle } from 'react-icons/fa';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    const { account, connectWallet } = this.props;

    return (
      <div id="outer-container">
        {}
        <nav className="desktop-nav navbar">
          <div className="navbar-logo">
            <Link to="/">
              <img src={Logo} alt="Logo" className="navbar-logo-img" />
            </Link>
          </div>
          <button 
            className="wallet-button desktop-wallet-button"
            onClick={connectWallet} 
          >
            <FaWallet className="wallet-icon" /> Connect Wallet
            <div className="connection-status">
            {}
            {account ? (
              <FaCheckCircle className="connected-icon" />
            ) : (
              <div className="blank-circle"></div>
            )}
          </div>
          </button>
          <ul className="navbar-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/history">News History</Link></li>
            <li><Link to="/extension">Extension</Link></li>
          </ul>
        </nav>

        {}
        <nav className="mobile-nav">
          <Menu
            right
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
            isOpen={this.state.menuOpen}
            onStateChange={(state) => this.handleStateChange(state)}
            customBurgerIcon={<img src="/menusq.svg" alt="Menu" />}
            className="bm-menu-wrap"
          >
            <div className="menu-header">
              <div className="navbar-logo">
                <Link to="/" onClick={() => this.closeMenu()}>
                  <img src={Logo} alt="Logo" className="navbar-logo-img" />
                </Link>
              </div>
            </div>
            <nav className="menu-content">
              <Link id="home" className="menu-item" to="/" onClick={() => this.closeMenu()}>
                <i className="fas fa-home"></i> Home
              </Link>
              <Link id="about" className="menu-item" to="/history" onClick={() => this.closeMenu()}>
                <i className="fas fa-newspaper"></i> News History
              </Link>
              <Link id="extension" className="menu-item" to="/extension" onClick={() => this.closeMenu()}>
                <i className="fas fa-puzzle-piece"></i> Extension
              </Link>
              <a onClick={this.showSettings} className="menu-item" href="#">
                <i className="fas fa-cog"></i> Settings
              </a>
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
        </nav>
      </div>
    );
  }
}

export default Navbar;
