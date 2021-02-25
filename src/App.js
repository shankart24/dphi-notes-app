import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import AddNotes from "./Components/AddNotes";
import FilterNotes from "./Components/FilterNotes";
import MapComponent from "./Components/MapComponent";
import SearchNotes from "./Components/SearchNotes";
import SortNotes from "./Components/SortNotes";

const App = () => {
	// state for user search
	const [userSearchInput, setUserSearchInput] = useState("");

	// boolean for search
	const [searching, setSearching] = useState(false);

	// state for search results
	const [searchNotes, setSearchNotes] = useState([]);

	// the content the user has written
	const [userInput, setUserInput] = useState("");

	// date selected by user
	const [userDate, setUserDate] = useState();

	// state to store all the created notes
	const [allNotes, setAllNotes] = useState([]);

	// to check if user is editing
	const [editing, setEditing] = useState(false);

	// initial state
	const initialFormState = { id: 0, content: "", date: "" };

	// state to store the current updated note
	const [currentNote, setCurrentNote] = useState(initialFormState);

	// for sorting type
	const [sortType, setSortType] = useState("");

	// boolean to check if sorting took place
	const [sorting, setSorting] = useState(false);

	// state for storing all dates
	const [newAllNotes, setNewAllNotes] = useState([]);

	// boolean to check if filtering took place
	const [filtering, setFiltering] = useState(false);

	// state for filter conditions
	const [filterCondition, setFilterCondition] = useState({ day: "", month: "", year: "" });

	// state for storing filter results
	const [filterResults, setFilterResults] = useState([]);

	// Useful for DOM manipulation
	const dayEle = useRef("");
	const monthEle = useRef("");
	const yearEle = useRef("");
	const inputEle = useRef("");
	const dateEle = useRef(null);

	// --------- FILTERING --------

	// function to check if any of the notes match the filter condition
	const filterFunc = (arr1, arr2) => {
		let newResults = [];
		arr1.forEach((item) => {
			const [iyear, imonth, iday] = item.date.split("-");
			arr2.forEach((date) => {
				if (
					Number(date.day) === Number(iday) &&
					Number(date.month) === Number(imonth) &&
					Number(date.year) === Number(iyear)
				) {
					if (!newResults.includes(item)) {
						newResults.push(item);
					}
				} else if (
					Number(date.day) === Number(iday) ||
					Number(date.month) === Number(imonth) ||
					Number(date.year) === Number(iyear)
				) {
					if (!newResults.includes(item)) {
						newResults.push(item);
					}
				}
			});
		});

		return newResults;
	};

	const handleFilterSubmit = (e, myArray) => {
		e.preventDefault();
		setFilterResults(filterFunc(myArray, filterCondition));
		dayEle.current.value = "";
		monthEle.current.value = "";
		yearEle.current.value = "";
		setFilterCondition([{ day: "", month: "", year: "" }]);
		setFiltering((prev) => !prev);
	};

	const handleFilterInput = (e) => {
		const { name, value } = e.target;
		setFilterCondition([{ ...filterCondition, [name]: value }]);
	};

	// --------- STANDARD ADD & DELETE --------

	const handleSubmit = (e) => {
		e.preventDefault();
		if (userInput.length !== 0 && userDate.length !== 0) {
			setAllNotes([...allNotes, { id: allNotes.length + 1, content: userInput, date: userDate }]);
		}

		inputEle.current.value = "";
		dateEle.current.value = "";
		inputEle.current.focus();
	};

	const handleDelete = (id) => {
		setAllNotes(allNotes.filter((item) => item.id !== id));
	};

	// --------- EDITING or UPDATING --------

	const handleEditCancel = () => {
		inputEle.current.value = "";
		dateEle.current.value = "";
		setEditing(false);
	};

	const handleUpdate = (note) => {
		inputEle.current.value = note.content;
		dateEle.current.value = note.date;
		setEditing(true);
		setCurrentNote({ id: note.id, content: note.content, date: note.date });
	};

	const submitUpdate = () => {
		setUserInput(inputEle.current.value);
		setUserDate(dateEle.current.value);
		const newAllNotes = allNotes.map((item) => {
			if (item.id === currentNote.id) {
				const updatedItem = { id: currentNote.id, content: userInput, date: userDate };
				return updatedItem;
			}
			return item;
		});
		setAllNotes(newAllNotes);
		inputEle.current.value = "";
		dateEle.current.value = "";
		setCurrentNote(initialFormState);
		setEditing(false);
	};

	// --------- SORTING --------

	const handleSorting = (e, myArray) => {
		setSorting(true);
		setSortType(e.target.value);
		setNewAllNotes([
			...myArray.sort((x, y) => {
				let d1Obj = new Date(x.date);
				let d2Obj = new Date(y.date);
				if (sortType === "newest") {
					return d1Obj > d2Obj ? 1 : -1;
				} else {
					return d1Obj > d2Obj ? -1 : 1;
				}
			}),
		]);

		setSorting(false);
	};

	// --------- SEARCHING --------

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setSearching((prev) => !prev);
		setSearchNotes(allNotes.filter((item) => item.content.includes(userSearchInput)));
		setFiltering(false);
	};

	useEffect(() => {
		setSortType("newest");
	}, [allNotes]);

	return (
		<div className="app container-lg text-center ">
			<h1 className="text-white mt-4 mb-4">Notes App</h1>
			<div className="all-forms  p-2 d-flex justify-content-around align-content-center flex-column container-lg ">
				<AddNotes
					handleEditCancel={handleEditCancel}
					handleSubmit={handleSubmit}
					inputEle={inputEle}
					dateEle={dateEle}
					editing={editing}
					setUserDate={setUserDate}
					setUserInput={setUserInput}
					submitUpdate={submitUpdate}
					setEditing={setEditing}
				/>
				<SearchNotes
					userSearchInput={userSearchInput}
					handleSearchSubmit={handleSearchSubmit}
					setUserSearchInput={setUserSearchInput}
					searching={searching}
				/>
				<FilterNotes
					filterResults={filterResults}
					searchNotes={searchNotes}
					allNotes={allNotes}
					searching={searching}
					handleFilterSubmit={handleFilterSubmit}
					handleFilterInput={handleFilterInput}
					dayEle={dayEle}
					monthEle={monthEle}
					yearEle={yearEle}
					filtering={filtering}
				/>
				<SortNotes
					filterResults={filterResults}
					allNotes={allNotes}
					searchNotes={searchNotes}
					filtering={filtering}
					searching={searching}
					sortType={sortType}
					handleSorting={handleSorting}
				/>
			</div>

			<div className="rendered-content p-4 ">
				{/* Immediately invoked function */}
				{(() => {
					if (searching) {
						return <MapComponent mainArray={searchNotes} handleDelete={handleDelete} handleUpdate={handleUpdate} />;
					} else if (sorting) {
						return <MapComponent mainArray={newAllNotes} handleDelete={handleDelete} handleUpdate={handleUpdate} />;
					} else if (filtering) {
						return <MapComponent mainArray={filterResults} handleDelete={handleDelete} handleUpdate={handleUpdate} />;
					} else {
						return <MapComponent mainArray={allNotes} handleDelete={handleDelete} handleUpdate={handleUpdate} />;
					}
				})()}
			</div>
		</div>
	);
};

export default App;
