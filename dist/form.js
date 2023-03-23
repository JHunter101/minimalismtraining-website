"use strict";
window.onload = function () {
    let current_form_page = 1;
    let completedPages = [];
    // Get all buttons in the form
    const buttons = document.querySelectorAll('#form .qbutton');
    // Add click event listener to each button
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons
            buttons.forEach((inner_button) => {
                if (inner_button.id.substring(0, 2) == button.id.substring(0, 2)) {
                    inner_button.classList.remove('selected');
                }
            });
            // Add 'selected' class to the clicked button
            button.classList.add('selected');
            completedPages = JSON.parse(sessionStorage.getItem('completedPages') ?? '[]');
            current_form_page = Number(sessionStorage.getItem('current_form_page'));
            if (completedPages.includes(current_form_page) == false) {
                completedPages.push(current_form_page);
                const element = document.getElementById('form-button-next');
                if (element) {
                    element.classList.add('completed');
                }
            }
            sessionStorage.setItem('completedPages', JSON.stringify(completedPages));
        });
    });
    const textboxes = document.querySelectorAll('#form textarea');
    // Add click event listener to each button
    textboxes.forEach((textbox) => {
        textbox.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                // check if the input value is non-empty after trimming whitespace
                complete_section();
            }
        });
    });
    const inputs = document.querySelectorAll('#form-q5 input');
    const q51 = document.getElementById('q51');
    const q52 = document.getElementById('q52');
    const q53 = document.getElementById('q53');
    const q54 = document.getElementById('q54');
    // Add click event listener to each button
    if (q51 && q52 && q53 && q54) {
        inputs.forEach((input) => {
            input.addEventListener('change', function () {
                if (q51.value.trim() !== '' &&
                    q52.value.trim() !== '' &&
                    q53.value.trim() !== '' &&
                    q54.selectedIndex > 0) {
                    // check if the input value is non-empty after trimming whitespace
                    complete_section();
                }
            });
        });
    }
    sessionStorage.setItem('completedPages', JSON.stringify(completedPages));
    sessionStorage.setItem('current_form_page', String(current_form_page));
};
function complete_section() {
    const completedPages = JSON.parse(sessionStorage.getItem('completedPages') ?? '[]');
    const current_form_page = Number(sessionStorage.getItem('current_form_page'));
    if (completedPages.includes(current_form_page) == false) {
        completedPages.push(current_form_page);
        const element = document.getElementById('form-button-next');
        if (element) {
            element.classList.add('completed');
        }
    }
    sessionStorage.setItem('completedPages', JSON.stringify(completedPages));
}
function update_progress() {
    const completedPages = JSON.parse(sessionStorage.getItem('completedPages') ?? '[]');
    const current_form_page = Number(sessionStorage.getItem('current_form_page'));
    // Update Progress
    [1, 2, 3, 4, 5].forEach((id) => {
        const element = document.getElementById('progress_'.concat(id.toString()));
        if (element) {
            element.classList.remove('current');
            if (current_form_page < id) {
                element.classList.remove('progressed');
            }
            if (current_form_page == id) {
                element.classList.add('current');
            }
            if (current_form_page > id) {
                element.classList.add('progressed');
            }
        }
    });
    // Update Next Button
    const element = document.getElementById('form-button-next');
    if (element) {
        if (completedPages.includes(current_form_page)) {
            element.classList.add('completed');
        }
        else {
            element.classList.remove('completed');
        }
    }
}
function go_next() {
    const completedPages = JSON.parse(sessionStorage.getItem('completedPages') ?? '[]');
    let current_form_page = Number(sessionStorage.getItem('current_form_page'));
    if (completedPages.includes(current_form_page)) {
        hide_elem('form-q'.concat(current_form_page.toString()));
        if (current_form_page == 5) {
            hide_elem('form-progress');
            hide_elem('form-qs');
            hide_elem('form-buttons');
            unhide_elem('form-post');
        }
        if (current_form_page < 5) {
            current_form_page += 1;
            sessionStorage.setItem('current_form_page', String(current_form_page));
            unhide_elem('form-q'.concat(current_form_page.toString()));
            update_progress();
        }
    }
}
function go_back() {
    let current_form_page = Number(sessionStorage.getItem('current_form_page'));
    if (current_form_page > 1) {
        hide_elem('form-q'.concat(current_form_page.toString()));
        current_form_page -= 1;
        sessionStorage.setItem('current_form_page', String(current_form_page));
        unhide_elem('form-q'.concat(current_form_page.toString()));
        update_progress();
    }
}
function unhide_elem(elem) {
    const element = document.getElementById(elem);
    if (element) {
        element.classList.remove('hidden');
    }
}
function hide_elem(elem) {
    const element = document.getElementById(elem);
    if (element) {
        element.classList.add('hidden');
    }
}
