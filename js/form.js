window.onload = function() {
	
	// Get all buttons in the form
	const buttons = document.querySelectorAll('#form .qbutton');

	// Add click event listener to each button
	buttons.forEach(button => {
	  button.addEventListener('click', () => {
		// Remove 'selected' class from all buttons
		buttons.forEach(button => {
		  button.classList.remove('selected');
		});

		// Add 'selected' class to the clicked button
		button.classList.add('selected');
		
		if (completed_pages.includes(current_form_page) == false){
		completed_pages.push(current_form_page)
		var element = document.getElementById("form-button-next");
		element.classList.add('completed');
		}
	  });
	});
	
	const textboxes = document.querySelectorAll('#form textarea');
	// Add click event listener to each button
	textboxes.forEach(textbox => {
	  textbox.addEventListener("input", function() {
		  if (this.value.trim() !== '') { // check if the input value is non-empty after trimming whitespace
			complete_section()
		  }
		});
	});
	
	const inputs = document.querySelectorAll('#form-q5 input');
	const q51 = document.getElementById("q51");
	const q52 = document.getElementById("q52");
	const q53 = document.getElementById("q53");
	const q54 = document.getElementById("q54");
	
	// Add click event listener to each button
	inputs.forEach(input => {
	  input.addEventListener("input", function() {
		  if (q51.value.trim() !== '' && q52.value.trim() !== '' && q53.value.trim() !== '' && q54.selectedIndex > 0) { // check if the input value is non-empty after trimming whitespace
			complete_section()
		  }
		});
	});
	
	  q54.addEventListener("change", function() {
		  if (q51.value.trim() !== '' && q52.value.trim() !== '' && q53.value.trim() !== '' && q54.selectedIndex > 0) { // check if the input value is non-empty after trimming whitespace
			complete_section()
			}
		  }
	  )
};

var current_form_page = 1;
var completed_pages = [];


function complete_section(){
	if (completed_pages.includes(current_form_page) == false){
	completed_pages.push(current_form_page)
	var element = document.getElementById("form-button-next");
	element.classList.add('completed');
	}
}

function update_progress(){
	[1,2,3,4,5].forEach(id => {
		var element = document.getElementById("progress_".concat(id.toString()));
		element.classList.remove('current');
		
		if (current_form_page < id){
			element.classList.remove('progressed');
		}
		
		if (current_form_page == id){
			element.classList.add('current');
		}
		
		if (current_form_page > id){
			element.classList.add('progressed');
		}
	});
	
	if (completed_pages.includes(current_form_page)){
		var element = document.getElementById("form-button-next");
		element.classList.add('completed');
	}
	else {
		var element = document.getElementById("form-button-next");
		element.classList.remove('completed');
		
	}
}


function go_next(){

		  
	if (completed_pages.includes(current_form_page)) {
		hide_elem("form-q".concat(current_form_page.toString()));
		
		if (current_form_page == 5)
		{
			hide_elem("form-progress");
			hide_elem("form-qs");
			hide_elem("form-buttons");
			unhide_elem("form-post");
		}

		if (current_form_page < 5)
		{
			current_form_page += 1;
			unhide_elem("form-q".concat(current_form_page.toString()));
			update_progress()
		}
	}
}

function go_back(){
	if (current_form_page > 1)
	{
		hide_elem("form-q".concat(current_form_page.toString()));
		current_form_page -= 1;
		unhide_elem("form-q".concat(current_form_page.toString()));
		update_progress()
	}
}

function unhide_elem(elem) {
	var element = document.getElementById(elem);
	element.classList.remove('hidden');
}

function hide_elem(elem) {
	var element = document.getElementById(elem);
	element.classList.add('hidden');
}
