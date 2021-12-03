/*eslint-disable*/
import React, { createRef } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// import logo from "logo-white.svg";

var ps;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.sidebarRef = createRef();
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <div className="logo">
          <a
            href="#"
            className="simple-text logo-mini"
            target="_blank"
          >
            <div className="logo-img">
              {/* <img src={logo} alt="react-logo" /> */}
            </div>
          </a>
          <a
            href="/#"
            className="simple-text logo-normal"
            // target="_blank"
          >
            Opinion Mining
          </a>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebarRef}>
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    this.activeRoute(prop.layout + prop.path) +
                    (prop.pro ? " active active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={"now-ui-icons " + prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

// export default Sidebar;
