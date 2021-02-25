import React from "react";

const SearchNotes = ({ userSearchInput, handleSearchSubmit, setUserSearchInput, searching }) => {
	return (
		<form onSubmit={handleSearchSubmit}>
			<input
				type="text"
				placeholder="Search notes..."
				value={userSearchInput}
				onChange={(e) => setUserSearchInput(e.target.value)}
			/>
			{!searching ? (
				<button className="btn btn-sm ml-2 btn-success" type="submit">
					Search
				</button>
			) : (
				<button className="btn btn-sm ml-2 btn-secondary">Go back</button>
			)}
		</form>
	);
};

export default SearchNotes;
