import React, { Component } from "react";
import { logout } from "../../redux/authActionCreators";
import { connect } from "react-redux";
import { Navigate, Routes, Route } from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <Routes>
          <Route path="/logout/*" element={<Navigate to="/auth" replace={true} />} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Logout);





// import React, { Component } from "react";
// import { logout } from "../../redux/authActionCreators";
// import { connect } from "react-redux";
// import { Navigate, Routes, Route } from "react-router-dom";

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		logout: () => dispatch(logout()),
// 	};
// };
// class Logout extends Component {
// 	componentDidMount(){
//         this.props.logout();
//     }
// 	render() {
// 		return (
// 			<div>
// 				<Routes>
// 					<Route path="/" element={<Navigate to="/auth" replace={true} />} />
// 				</Routes>
// 			</div>
// 		);
// 	}
// }

// export default connect(mapDispatchToProps)(Logout);
