import React from "react";

const AddNotes = ({ handleEditCancel, handleSubmit, inputEle, dateEle, editing, setUserDate, setUserInput, submitUpdate }) => {
	return (
		<form onSubmit={handleSubmit}>
			<input ref={inputEle} type="text" name="content" onChange={(e) => setUserInput(e.target.value)} />

			<input ref={dateEle} type="date" min="1990-01-01" max="2030-01-01" onChange={(e) => setUserDate(e.target.value)} />
			{editing ? (
				<div className="mt-3">
					<button className="btn btn-sm mr-2  btn-info" onClick={() => submitUpdate()}>
						Update
					</button>
					<button className="btn btn-sm ml-2 btn-secondary" onClick={handleEditCancel}>
						cancel
					</button>
				</div>
			) : (
				<button className="btn btn-sm ml-2  btn-success" type="submit">
					Add
				</button>
			)}
		</form>
	);
};

export default AddNotes;
