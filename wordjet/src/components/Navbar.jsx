import React from 'react';
import { FaJetFighterUp } from 'react-icons/fa6';

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <a className="navbar-brand" >
              wordJET
              <FaJetFighterUp size={22} style={{ position: 'absolute', top: '15px', left: '87px' }} />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
