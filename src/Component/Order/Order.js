import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../../redux/actionCreators";
import SingleOrder from "./SingleOrder";
import  Spinner  from "../Spinner/Spinner";

const mapStateToProps = (state) => {
	return {
		orders: state.orders,
		orderLoading: state.orderLoading,
		orderError: state.orderError,
    token:state.token, //last add,
    userId:state.userId,// pass to the fetchOrder function.
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchOrder: (token,userId) => dispatch(fetchOrder(token,userId)), // token,userId lass add
	};
};

class Order extends Component {
	componentDidMount() {
		this.props.fetchOrder(this.props.token,this.props.userId); // for calling this function... //Last Add token, userId
	}

	componentDidUpdate() {
		// console.log(this.props); // check that data is coming from reducer function or not...
	}



	render() {
    let orders = null
    if(this.props.orderError){
      orders= <p style={{
        border: "1px solid grey",
        boxShadow: "1px 1px #888888",
        borderRadius: "5px",
        padding: "5px",
        marginRight:"5px"
      }}>Sorry Failed to Laod the Orders!</p>
    }
    else{
      if(this.props.orders.length === 0){
        orders= <p style={{
          border: "1px solid grey",
          boxShadow: "1px 1px #888888",
          borderRadius: "5px",
          padding: "5px",
          marginRight:"5px"
        }}>You have no Orders!</p>
      }
      else{
        // console.log(this.props.orders.length);
        orders = this.props.orders.map((order)=>{
          return (
            <SingleOrder order={order} key={order.id}/>
          )
        })

      }
      
    } 

		return(
    <div>{this.props.orderLoading? <Spinner/>: orders}</div>
    );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
