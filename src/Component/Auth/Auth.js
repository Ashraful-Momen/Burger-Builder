//This is the Auth Login form...=> 

import React, { Component } from "react";
import { Formik } from "formik";
import { auth } from "../../redux/authActionCreators";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { Alert } from "reactstrap";

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, mode) => dispatch(auth(email, password, mode)),
  };
};

const mapStateToProps = (state)=>{
  return{
    authLoading:state.authLoading,
	  authFailedMsg:state.authFailedMsg,
  }
}

class Auth extends Component {
  state = {
    mode: "Sing Up",
  };

  switchModeHandler = () => {
    this.setState((prevState) => ({
      mode: prevState.mode === "Sing Up" ? "LogIn" : "Sing Up",
    }));
  };

  render() {
    // console.log(this.props.authFailedMsg);
    let error=null;
    if(this.props.authFailedMsg !== null){
      error = (
        <Alert color="danger">{this.props.authFailedMsg}</Alert>
      )
    }


    let form=null;
    if(this.props.authLoading){
     form= <Spinner/>
    }
    else{
       form=(
        <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          this.props.auth(values.email, values.password, this.state.mode);
        }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "Required!"; // email input field empty
          } else if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)
          ) {
            errors.email = "Invalid Email!";
          }

          if (!values.password) {
            errors.password = "Required!";
          } else if (values.password.length < 6) {
            errors.password = "Password Should be at least 6 Characters & must be strong!";
          }

          if (this.state.mode === "Sing Up") {
            if (!values.confirmPassword) {
              errors.confirmPassword = "Required!";
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = "Password Should be matched!";
            }
          }

          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <div
            style={{
              border: "1px solid",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <button
              style={{
                backgroundColor: "#D70F64",
                color: "white",
                width: "100%",
              }}
              className="btn btn-lg"
              onClick={this.switchModeHandler}
            >
              Switch To {this.state.mode === "Sing Up" ? "LogIn" : "Sing Up"}
            </button>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <input
                className="form-control"
                name="email"
                placeholder="Type Your Email"
                value={values.email}
                onChange={handleChange}
              />
              <span style={{ color: "red" }}>{errors.email}</span>
              <br />
              <input
                className="form-control"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              <span style={{ color: "red" }}>{errors.password}</span>
              <br />
              {this.state.mode === "Sing Up" && (
                <div>
                  <input
                    className="form-control"
                    name="confirmPassword"
                    placeholder="RePassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                  <span style={{ color: "red" }}>
                    {errors.confirmPassword}
                  </span>
                  <br />
                </div>
              )}
              <button type="submit" className="btn btn-success">
                {this.state.mode === "Sing Up" ? "Sing Up" : "LogIn"}
              </button>
            </form>
          </div>
        )}
      </Formik>
       )
    }

    return (
      <div>
        {error}
        {form}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);


