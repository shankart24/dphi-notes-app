import React from "react";

const FilterNotes = ({
	filterResults,
	searchNotes,
	allNotes,
	searching,
	handleFilterSubmit,
	handleFilterInput,
	dayEle,
	monthEle,
	yearEle,
	filtering,
}) => {
	return (
		<form
			onSubmit={(e) => {
				if (filtering) {
					handleFilterSubmit(e, filterResults);
				} else if (searching) {
					handleFilterSubmit(e, searchNotes);
				} else {
					handleFilterSubmit(e, allNotes);
				}
			}}
		>
			<label className="text-white">Day: </label>
			<input
				className="ml-2 col-2"
				ref={dayEle}
				type="number"
				placeholder="Eg: 01-31"
				name="day"
				min="1"
				max="31"
				onChange={handleFilterInput}
			/>
			<label className="ml-2 text-white">Month: </label>
			<input
				className="ml-2 col-2"
				ref={monthEle}
				type="number"
				placeholder="Eg: 01-12"
				name="month"
				min="1"
				max="12"
				onChange={handleFilterInput}
			/>
			<label className="ml-2 text-white">Year: </label>
			<input
				className="ml-2 col-2"
				ref={yearEle}
				type="number"
				placeholder="Eg: 2010"
				name="year"
				min="1990"
				max="2030"
				onChange={handleFilterInput}
			/>

			{!filtering ? (
				<button className="btn btn-sm ml-2 btn-success" type="submit">
					Apply Filter
				</button>
			) : (
				<button className="btn btn-sm ml-2 btn-secondary">Go back</button>
			)}
		</form>
	);
};

export default FilterNotes;
