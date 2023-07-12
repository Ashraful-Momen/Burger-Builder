import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Logo2 from "../../assets/brandLogo2.png";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		token: state.token,
	};
};

const Header = (props) => {
	let link = null;
	if (props.token === null) {
		link=(<Nav className="me-md-5">
		<NavItem className="mx-3">
			<NavLink to="/auth" className="NavLink">
				LogIn
			</NavLink>
		</NavItem>
	</Nav>)
	} else {
		link=(<Nav className="me-md-5">
		<NavItem className="mx-2">
			<NavLink to="/" className="NavLink">
				BurgerBuilder
			</NavLink>
		</NavItem>
		<NavItem className="mx-3">
			<NavLink to="/order" className="NavLink">
				Orders
			</NavLink>
		</NavItem>
		<NavItem className="mx-3">
			<NavLink to="/logout" className="NavLink">
				LogOut
			</NavLink>
		</NavItem>
	</Nav>)
	}
	return (
		<div className="Navigation">
			<Navbar
				style={{ backgroundColor: "#e21b70", height: "70px" }}
				className="mx-auto"
			>
				<NavbarBrand className="Brand ms-md-5" href="/">
					<img
						src={Logo2}
						alt="BrandLogo"
						style={{ height: "50px", width: "50px", borderRadius: "50%" }}
					/>
				</NavbarBrand>
				{link}
			</Navbar>
		</div>
	);
};

export default connect(mapStateToProps)(Header);
