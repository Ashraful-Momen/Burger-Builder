import React, { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { resetIngredients } from "../../../redux/actionCreators";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    token: state.token, // last add token
    userId:state.userId, // last add to show order according to user ID.
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredients: () => dispatch(resetIngredients()),
  };
};

const CheckOut = (props) => {
  const [values, setValues] = useState({
    deliveryAddress: "",
    phone: "",
    paymentType: "Cash On Delivery",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/", { state: props.ingredients });
  };

  const inputChangeHandler = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = () => {
    setIsLoading(true);
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      customer: values,
      orderTime: new Date(),
      userId:props.userId, // last add this userId.
    };

    axios
      .post("https://burgerbuliders-default-rtdb.firebaseio.com/order.json?auth=" + props.token, order) //last edit ...?auth=
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setIsModal(true);
          setModalMsg("Order Placed Successfully!");
          props.resetIngredients();
        } else {
          setIsLoading(false);
          setIsModal(true);
          setModalMsg("Something went Wrong!");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsModal(true);
        setModalMsg("Something went Wrong!");
      });
  };

  let form = (
    <div>
      <h4
        style={{
          border: "1px solid grey",
          boxShadow: "1px 1px #888888",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        {" "}
        Price:{props.totalPrice} BDT
      </h4>
      <form
        style={{
          border: "1px solid grey",
          boxShadow: "1px 1px #888888",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <textarea
          name="deliveryAddress"
          value={values.deliveryAddress}
          className="form-control"
          placeholder="Your Address"
          onChange={inputChangeHandler}
        ></textarea>
        <br />
        <input
          name="phone"
          className="form-control"
          value={values.phone}
          placeholder="Phone Number"
          onChange={inputChangeHandler}
        />
        <br />
        <select
          name="paymentType"
          value={values.paymentType}
          className="form-control"
          onChange={inputChangeHandler}
        >
          <option value="Cash On Delivery">Cash On Delivery</option>
          <option value="Bkash">Bkash</option>
        </select>
        <br />
        <Button
          style={{ backgroundColor: "#D70F65" }}
          onClick={submitHandler}
          disabled={!props.purchasable}
        >
          Place Order
        </Button>
        <Button className="secondary ms-3" onClick={goBack}>
          Cancel
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      {isLoading ? <Spinner /> : form}
      <Modal isOpen={isModal} onClick={goBack}>
        <ModalBody>{modalMsg}</ModalBody>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);



// import React, { Component } from "react";
// import { Button ,Modal,ModalBody} from "reactstrap";
// import { connect } from "react-redux";
// import axios from 'axios'
// import Spinner from "../../Spinner/Spinner";
// import {resetIngredients } from '../../../redux/actionCreators'



// const mapStateToProps = (state) => {
// 	return {
// 		ingredients: state.ingredients,
// 		totalPrice: state.totalPrice,
// 		purchasable: state.purchasable,
// 	};
// };
// const mapDispatchToProps = (dispatch) =>{
//  return{
//   resetIngredients:()=>dispatch(resetIngredients()),
//  }

// }

// class CheckOut extends Component {
// 	state = {
// 		values: {
// 			deliveryAddress: "",
// 			phone: "",
// 			paymentType: "Cash On Delivery",
// 		},
//     isLoading:false,
//     isModal:false,
//     modalMsg:"",
// 	};

  

// 	goBack = () => {
// 		// console.log(window.location);
// 		// window.location.href = "/"; //*** take 2 hourse from my life to fix that issue... */
//    console.log( this.props)
// 	};


// 	inputChangeHandler = (e) => {
// 		this.setState({
// 			values: {
// 				...this.state.values,
// 				[e.target.name]: e.target.value,
// 			},
// 		});
// 	};
// 	//   inputChangeHandler = (e) => {
// 	//     const { name, value } = e.target;
// 	//     this.setState((prevState) => ({
// 	//       values: {
// 	//         ...prevState.values,
// 	//         [name]: value,
// 	//       },
// 	//     }));
// 	//   };
// 	submitHandler = () => {
//     this.setState({isLoading:true})
// 		const order = {
// 			ingredients:this.props.ingredients,
//       price:this.props.totalPrice,
//       customer:this.state.values,
//       orderTime: new Date(), 
// 		};
//     axios.post('https://burgerbuliders-default-rtdb.firebaseio.com/order.json',order)
//     .then(response=>
//       {
//         if(response.status===200){
//           this.setState({
//             isLoading:false,
//             isModal:true,
//             modalMsg:"Order Placed Successfully!",
//           })
//           this.props.resetIngredients();
//         }
//         else{
//           this.setState({
//             isLoading:false,
//             isModal:true,
//             modalMsg:"Somethis went Wrong!",
//           })

//         }
//       }
//       )
//     .catch(err=>{
//       this.setState({
//         isLoading:false,
//         isModal:true,
//             modalMsg:"Somethis went Wrong!",
//       })
//     });
// 		// console.log(order);
// 	};

// 	render() {
// 		// console.log(this.props)

//     let form = (<div>
//       <h4
//         style={{
//           border: "1px solid grey",
//           boxShadow: "1px 1px #888888",
//           borderRadius: "5px",
//           padding: "20px",
//         }}
//       >
//         {" "}
//         Price:{this.props.totalPrice} BDT
//       </h4>
//       <form
//         style={{
//           border: "1px solid grey",
//           boxShadow: "1px 1px #888888",
//           borderRadius: "5px",
//           padding: "20px",
//         }}
//       >
//         <textarea
//           name="deliveryAddress"
//           value={this.state.values.deliveryAddress}
//           className="form-control"
//           placeholder="Your Address"
//           onChange={(e) => this.inputChangeHandler(e)}
//         ></textarea>
//         <br />
//         <input
//           name="phone"
//           className="form-control"
//           value={this.state.values.phone}
//           placeholder="Phone Number"
//           onChange={(e) => this.inputChangeHandler(e)}
//         />
//         <br />
//         <select
//           name="paymentType"
//           value={this.state.values.paymentType}
//           className="form-control"
//           onChange={(e) => this.inputChangeHandler(e)}
//         >
//           <option value="Cash On Delivery">Cash On Delivery</option>
//           <option value="Bkash">Bkash</option>
//         </select>
//         <br />
//         <Button
//           style={{ backgroundColor: "#D70F65" }}
//           onClick={this.submitHandler}
//           disabled={!this.props.purchasable}
//         >
//           Place Order
//         </Button>
//         <Button className="secondary ms-3" onClick={this.goBack}>
//           Cancel
//         </Button>
//       </form>
//     </div>)
// 		return (
// 			<div>{this.state.isLoading?<Spinner/>:form}
//       <Modal isOpen={this.state.isModal} onClick={this.goBack}>
//         <ModalBody>{this.state.modalMsg}</ModalBody>
//       </Modal>
//       </div>
// 		);
// 	}
// }


// export default connect(mapStateToProps,mapDispatchToProps)(CheckOut);
