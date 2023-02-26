function addTrack(trackmap){
	let newRow = table.insertRow(-1);
    for (let i = 0; i < 8; i++) {
        newCell = newRow.insertCell(i);
		let newText = document.createTextNode(trackmap[i]);
		newCell.appendChild(newText);
    }
	filler.remove()
	highlight();
}

function highlight(){
	let tableRows = document.getElementsByTagName('tr');
	for (let i = 1; i < tableRows.length; i++) {
		tableRows[i].onmouseover = function(){
			tableRows[i].className = 'active-row'
		}; 
		tableRows[i].onmouseleave = function(){
			tableRows[i].className = ''
		}; 
	}
}

const firstrow = document.getElementsByTagName('th');
for (let i = 0; i < firstrow.length; i++) {
	firstrow[i].onmouseover = function(){
		if(firstrow[i].className.split(' ')[0] != 'on-head'){
			firstrow[i].className = 'active-head'
		}
	}; 
	firstrow[i].onmouseleave = function(){
		if(firstrow[i].className.split(' ')[0] != 'on-head'){
			firstrow[i].className = ''
		}
	}; 
}

function sortTableByColumn(table, column, asc = false) {
	try{document.getElementsByClassName('on-head')[0].className = ''}catch{}
	firstrow[column].className = 'on-head'

	const dirModifier = asc ? 1 : -1;
	const tBody = table.tBodies[0];
	const rows = Array.from(tBody.querySelectorAll("tr"));

	// Sort each row
	const sortedRows = rows.sort((a, b) => {
		const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
		const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

		return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
	});

	// Remove all existing TRs from the table
	while (tBody.firstChild) {
		tBody.removeChild(tBody.firstChild);
	}

	// Re-add the newly sorted rows
	tBody.append(...sortedRows);

	// Remember how the column is currently sorted
	table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
	table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
	table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
	highlight();
}

document.querySelectorAll(".content-table th").forEach(headerCell => {
	headerCell.addEventListener("click", () => {
		const tableElement = headerCell.parentElement.parentElement.parentElement;
		let headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
		if(headerIndex == 0){
			headerIndex = 3
		}
		if(headerIndex == 6){
			headerIndex = 5
		}
		const currentIsAscending = headerCell.classList.contains("th-sort-asc");
		sortTableByColumn(tableElement, headerIndex, currentIsAscending);
	});
});