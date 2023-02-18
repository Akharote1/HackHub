import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import problem_statement from "../../../../data/problem_statement.json";
import Badge from "react-bootstrap";
import { useUser } from "../../../hooks/AuthContext";
import { useRouter } from "next/router";
import axiosClient from "../../../services/axios-client";

const Preference = () => {
	const dragItem = useRef();
	const dragOverItem = useRef();
	const [list, setList] = useState([]);

	const [hackathonData, setHackathonData] = useState(null);
  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !router.isReady) return;
    const fetchData = async () => {
      try {
        const res = await axiosClient.get('/hackathon/view/'+router.query.slug);
        setHackathonData(res.data.event)
				setList(res.data.event.ps_list.map((x, index) => {
					const y = {...x}
					y.id = index;
					return y;
				}))
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [user, router.isReady])
  

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

  if (hackathonData == null) return null;

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
					Problem Statement Preference for the {hackathonData.name} (Drag and Drop)
				</h3>
				{list.map((item, index) => (
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
						fontSize: "18px"
					}}
					onClick={async () => {
						await axiosClient.post('/team/submit-preferences/'+router.query.slug, {
							preferences: list.map(x => x.id)
						});
						router.push(`/events/${router.query.slug}`)
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
