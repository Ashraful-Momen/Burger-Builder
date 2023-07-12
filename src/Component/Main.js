import React, { Component } from "react";
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Order from "./Order/Order";
import CheckOut from "./Order/CheckOut/CheckOut";
import Auth from "./Auth/Auth";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import { authCheck } from "../redux/authActionCreators";
import Logout from "./Auth/Logout";

const mapStateToProps = (state) => {
	return {
		token: state.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		authCheck: () => dispatch(authCheck()),
	};
};

class Main extends Component {
	componentDidMount() {
		this.props.authCheck();
	}

	render() {
		let route = null;
		if (this.props.token === null) {
			route = (
				<Routes>
					<Route path="/auth" element={<Auth />} />
					<Route path="/logout/*" element={<Navigate to="/auth" replace={true} />} />
					<Route path="/*" element={<Navigate to="/auth" replace={true} />} />
				</Routes>
			);
		} else {
			route = (
				<Routes>
					<Route path="/" element={<BurgerBuilder />} />
					<Route path="/order" element={<Order />} />
					<Route path="/checkout" element={<CheckOut />} />
					<Route path="/logout/*" element={<Logout />} />
					<Route path="/auth" element={<Navigate to="/" replace={true} />} />
				</Routes>
			);
		}
		return (
			<div>
				<Header />
				<div className="container">{route}</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

