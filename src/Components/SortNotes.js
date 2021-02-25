import React from "react";

const SortNotes = ({ sortType, handleSorting, filterResults, searchNotes, allNotes, filtering, searching }) => {
	return (
		<div>
			<label className="mr-2 text-white">Order By: </label>
			<select
				value={sortType}
				onChange={(e) => {
					if (filtering) {
						handleSorting(e, filterResults);
					} else if (searching) {
						handleSorting(e, searchNotes);
					} else {
						handleSorting(e, allNotes);
					}
				}}
			>
				<option value="newest">Newest first</option>
				<option value="oldest">Oldest first</option>
			</select>
		</div>
	);
};

export default SortNotes;
