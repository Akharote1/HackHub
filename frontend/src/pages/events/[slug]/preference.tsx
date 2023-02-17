import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import problem_statement from "../../../../data/problem_statement.json";
import Badge from "react-bootstrap";

const Preference = () => {
	const dragItem = useRef();
	const dragOverItem = useRef();
	const [list, setList] = useState([]);

	const dragStart = (e, position) => {
		dragItem.current = position;
	};

	const dragEnter = (e, position) => {
		dragOverItem.current = position;
	};

	const drop = (e) => {
		const copyListItems = [...list];
		const dragItemContent = copyListItems[dragItem.current];
		copyListItems.splice(dragItem.current, 1);
		copyListItems.splice(dragOverItem.current, 0, dragItemContent);
		dragItem.current = null;
		dragOverItem.current = null;
		setList(copyListItems);
	};

	useEffect(() => {
		const listItems = problem_statement.statements.map((item, index) => ({
			...item,
			id: index,
		}));
		setList(listItems);
	}, []);

	return (
		<div
			className="d-flex justify-content-center align-items-center shadow-lg py-5"
			style={{
				minHeight: "100vh",
				width: "100vw",
				color: "#19339b",
			}}
		>
			<div
				className=" w-75 bg-white rounded-5 d-flex flex-column justify-content-center align-items-center"
				style={{
					boxShadow: "0px 4px 8px #040f3c4c",
					minHeight: "75%",
					padding: "2rem",
				}}
			>
				<h3 className="mb-5">
					Preference Of the Problem Statement for the Hackathon (Drag and Drop)
				</h3>
				{list &&
					list.map((item, index) => (
						<div
							style={{
								margin: "15px",
								textAlign: "center",
								fontSize: "24px",
								cursor: "grabbing",
								width: "100%",
								backgroundColor: "#fff",
								border: "1px solid #19339b",
								padding: "10px 0",
								borderRadius: "10px",
							}}
							onDragStart={(e) => dragStart(e, index)}
							onDragEnter={(e) => dragEnter(e, index)}
							onDragEnd={drop}
							key={index}
							draggable
						>
							<div className="d-flex flex-wrap justify-content-center ">
								PS{item.id + 1}: {item.title}
								<div className="d-flex ms-5 align-items-center">
									{item.domains.map((domain, index) => (
										<div
											className="bg-primary px-3 rounded-4 text-white me-2"
											style={{
												fontSize: "18px",
											}}
											key={index}
										>
											{domain}
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				<Button
					className="mt-4"
					style={{
						fontSize: "18px",
					}}
				>
					Submit Preference
				</Button>
			</div>
		</div>
	);
};
Preference.getLayout = (page) => {
	return page;
};
export default Preference;
