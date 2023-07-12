import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Summery from "./Summary/Summary";
import { Navigate } from "react-router-dom";
import {
	addIngredient,
	removedIngredient,
	updatePurchable,
} from "../../redux/actionCreators";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
		purchasable: state.purchasable,
	};
};

const mapDispatchToprops = (dispatch) => {
	return {
		addIngredient: (igtype) => dispatch(addIngredient(igtype)),
		removedIngredient: (igtype) => dispatch(removedIngredient(igtype)),
		updatePurchable: () => dispatch(updatePurchable()),
	};
};

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		modalOpen: false,
	};
	addIngredientHandle = (type) => {
		this.props.addIngredient(type);
		this.props.updatePurchable();
	};
	removeIngredientHandle = (type) => {
		this.props.removedIngredient(type);
		this.props.updatePurchable();
	};
	toggleModal = () => {
		this.setState({
			modalOpen: !this.state.modalOpen,
		});
	};

	handleCheckout = () => {
		this.setState({
			onClickCheckout: !this.state.onClickCheckout,
		});
	};

	render() {
		return (
			<div>
				<div className="d-flex flex-md-row flex-column">
					<Burger ingredients={this.props.ingredients} />
					<Controls
						ingredientAdded={this.addIngredientHandle}
						ingredientRemoved={this.removeIngredientHandle}
						price={this.props.totalPrice}
						toggleModal={this.toggleModal}
						purchasable={this.props.purchasable}
					/>
				</div>
				<Modal isOpen={this.state.modalOpen}>
					<ModalHeader>Your Order Summery</ModalHeader>
					<ModalBody>
						<Summery ingredients={this.props.ingredients} />
						<h5>Total Price : {this.props.totalPrice.toFixed(0)} BDT</h5>
					</ModalBody>
					<ModalFooter>
						<Button color="success" onClick={this.handleCheckout} style={{backgroundColor: "#e21b70",}}>
							Continue to CheckOut
						</Button>
						<Button color="secondary" onClick={this.toggleModal}>
							Cancel
						</Button>
					</ModalFooter>
					{this.state.onClickCheckout && (
						<Navigate to="/checkout" replace={true} />
					)}
				</Modal>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToprops)(BurgerBuilder);

//Advance and ALternative coding with Hooks:
// -----------------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import Burger from "./Burger/Burger";
// import Controls from "./Controls/Controls";
// import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
// import Summary from "./Summary/Summary";
// import { useNavigate } from "react-router-dom";

// const INGREDIENT_PRICES = {
//   Salad: 20,
//   Cheese: 30,
//   Meat: 50,
// };

// const BurgerBuilder = () => {
//   const [ingredients, setIngredients] = useState([
//     { type: "Salad", amount: 0 },
//     { type: "Cheese", amount: 0 },
//     { type: "Meat", amount: 0 },
//   ]);
//   const [totalPrice, setTotalPrice] = useState(80);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [purchasable, setPurchasable] = useState(false);
//   const navigate = useNavigate();

//   const addIngredientHandle = (type) => {
//     const updatedIngredients = [...ingredients];
//     const newPrice = totalPrice + INGREDIENT_PRICES[type];
//     for (let item of updatedIngredients) {
//       if (item.type === type) {
//         item.amount++;
//       }
//     }
//     setIngredients(updatedIngredients);
//     setTotalPrice(newPrice);
//     updatePurchable(updatedIngredients);
//   };

//   const removeIngredientHandle = (type) => {
//     const updatedIngredients = [...ingredients];
//     const newPrice = totalPrice - INGREDIENT_PRICES[type];
//     for (let item of updatedIngredients) {
//       if (item.type === type) {
//         if (item.amount <= 0) return;
//         item.amount--;
//       }
//     }
//     setIngredients(updatedIngredients);
//     setTotalPrice(newPrice);
//     updatePurchable(updatedIngredients);
//   };

//   const toggleModal = () => {
//     setModalOpen(!modalOpen);
//   };

//   const updatePurchable = (updatedIngredients) => {
//     const sum = updatedIngredients.reduce((sum, element) => {
//       return sum + element.amount;
//     }, 0);
//     setPurchasable(sum > 0);
//   };

//   const handleCheckout = () => {
//     navigate("/checkout");
//   };

//   return (
//     <div>
//       <div className="d-flex flex-md-row flex-column">
//         <Burger ingredients={ingredients} />
//         <Controls
//           ingredientAdded={addIngredientHandle}
//           ingredientRemoved={removeIngredientHandle}
//           price={totalPrice}
//           toggleModal={toggleModal}
//           purchasable={purchasable}
//         />
//       </div>
//       <Modal isOpen={modalOpen}>
//         <ModalHeader>Your Order Summary</ModalHeader>
//         <ModalBody>
//           <Summary ingredients={ingredients} />
//           <h5>Total Price: {totalPrice.toFixed(0)} BDT</h5>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="success" onClick={handleCheckout}>
//             Continue to CheckOut
//           </Button>
//           <Button color="secondary" onClick={toggleModal}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

// export default BurgerBuilder;
