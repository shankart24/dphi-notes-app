import React from "react";

const MapComponent = ({ mainArray, handleDelete, handleUpdate }) => {
	return mainArray.length !== 0 ? (
		mainArray.map((item) => (
			<div className="note-box mb-3 p-3 rounded " key={item.id}>
				<span class="badge mr-2 badge-light">{item.date}</span>
				<span className="note-text ml-4 mr-4 text-white">{item.content}</span>
				<button className="btn btn-sm ml-4 mr-2 btn-info" onClick={() => handleUpdate(item)}>
					Edit
				</button>
				<button className="btn btn-sm ml-1 btn-danger" onClick={() => handleDelete(item.id)}>
					Delete
				</button>
			</div>
		))
	) : (
		<p className="text-white">No data</p>
	);
};

export default MapComponent;
