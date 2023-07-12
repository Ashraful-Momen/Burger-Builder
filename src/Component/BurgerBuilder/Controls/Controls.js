import React from "react";
import { Card, CardHeader, CardFooter, CardBody, Button } from "reactstrap";

const control = [
	{ label: "Salad", type: "Salad" },
	{ label: "Cheese", type: "Cheese" },
	{ label: "Meat", type: "Meat" },
];

const BuildControl = (props) => {
	return (
		<div className="d-flex">
			<div
				className="me-auto ms-5"
				style={{ fontWeight: "bold", fontSize: "1.5rem" }}
			>
				{props.label}
			</div>
			<button className="btn btn-danger m-1" onClick={props.removed}>
				Less
			</button>
			<button className="btn btn-success m-1" onClick={props.added}>
				More
			</button>
		</div>
	);
};

const Controls = (props) => {
	return (
		<div className="container ms-md-5" style={{ textAlign: "center" }}>
			<Card
				style={{
					marginTop: "30px",
					marginBottom: "30px",
					textAlign: "center",
				}}
			>
				<CardHeader
					style={{
						backgroundColor: "#e21b70",
						color: "white",
					}}
				>
					Add Ingredient
				</CardHeader>
				<CardBody>
					{control.map((item) => {
						return (
							<BuildControl
								label={item.label}
								type={item.type}
								key={Math.random()}
								added={() => props.ingredientAdded(item.type)}
								removed={() => props.ingredientRemoved(item.type)}
							/>
						);
					})}
				</CardBody>
				<CardFooter>
					Price:<strong>{props.price}</strong> BDT
				</CardFooter>
				<Button disabled={!props.purchasable} onClick={props.toggleModal} style={{backgroundColor: "#e21b70",}}>
					Order Now
				</Button>
			</Card>
		</div>
	);
};

export default Controls;
