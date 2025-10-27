var registrations = [];
var editMode = false;
document.addEventListener("DOMContentLoaded", function () {
    // No need to do type safety here as they generally have defined returns
    var dataTablePanel = document.getElementById("dataTable");
    var filterBar = document.getElementById("filter-bar");
    var tableContainer = document.getElementById("table-container");
    var tableData = document.querySelector(".table-container-div");
    var sortControls = document.getElementById("sortControls");
    var filterMenu = document.getElementById("filterMenu");
    var registrationForm = document.getElementById("registrationForm"); // return as HTMLFormElement
    var firstNameInput = document.getElementById("firstName"); // return type HTMLInputElement
    var lastNameInput = document.getElementById("lastName");
    var dobInput = document.getElementById("dateOfBirth");
    var emailInput = document.getElementById("emailAddress");
    var phoneInput = document.getElementById("phoneNumber");
    var examCenterInput = document.getElementById("examCenter");
    // let pageRefreshButton = document.getElementById('pageRefreshButton');
    var submitButton = document.querySelector('.submit-button');
    var tableBody = document.getElementById("tableBody");
    // sort menu
    var sortOptionsMenu = document.getElementById("sortOptionsMenu");
    var overlayBackdrop = document.getElementById("overlay-backdrop");
    var mobileControls = document.getElementById("mobileControls");
    var emptyStateDefault = document.getElementById("empty-state-default");
    var emptyStateFilter = document.getElementById("empty-state-filters");
    var dataSection = document.getElementById("data-section-container");
    // check on intial load
    window.addEventListener('resize', updateUIVisibility);
    // window.addEventListener('change', filterMobileBarVisibility)
    // reload and resize. load when refreshed
    function rerenderTable() {
        // guard clause - A guard clause is a technique of exiting a function early based on a simple conditional check
        if (!tableBody)
            return; // Prevent error if tableBody is null
        //clear the table
        tableBody.innerHTML = "";
        // re-estabish the table
        registrations.forEach(function (user) {
            var row = document.createElement("tr");
            row.setAttribute('data-id', String(user.id)); // defined to take two string arguments
            row.innerHTML = "\n                <td>".concat(user.firstname, " ").concat(user.lastname, "</td>\n                <td>").concat(user.dob, "</td>\n                <td>").concat(user.email, "</td>\n                <td>").concat(user.tele, "</td>\n                <td>").concat(user.exam, "</td>\n                <td>").concat(user.gender, "</td>\n                <td>").concat(user.subjects, "</td>\n                <td><button class=\"action-button button-register-menu edit-button\" type=\"button\">\n                    <img src=\"img/edit_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg\" alt=\"\">\n                </button></td>\n                <td><button class=\"action-button button-register-menu delete-button\" type=\"button\">\n                    <img src=\"img/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg\" alt=\"\">\n                </button></td>\n                ");
            tableBody.appendChild(row);
        });
        updateUIVisibility();
    }
    var firstNameError = document.getElementById("firstNameError");
    var lastNameeError = document.getElementById("lastNameError");
    var dateOfBirthError = document.getElementById("dateOfBirthError");
    var emailAddressError = document.getElementById("emailAddressError");
    // const genderError = document.getElementById("genderError");
    var phoneNumberError = document.getElementById("phoneNumberError");
    // const examCenterError = document.getElementById("examCenterError");
    var subjectError = document.getElementById("subjectError");
    // UPLOAD THE DATA TO form and update registrations.
    registrationForm.addEventListener("submit", function (event) {
        var _a, _b;
        event.preventDefault();
        var isFormValid = true;
        /*
        test used in this case to find the matches and non matches it is part of RegEx
        */
        // validation ==================================================================================================================
        function validateName(name) {
            var namePattern = /^[a-zA-Z\s]+$/;
            if (name.trim() === "")
                return "Name is required.";
            if (name.length < 2)
                return "must be at least 2 characters.";
            if (!namePattern.test(name))
                return "Name can only contain letters and spaces.";
            return "";
        }
        function validateEmail(email) {
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.trim() === "")
                return "Email is required.";
            if (!emailPattern.test(email))
                return "Not a valid email address.";
            return "";
        }
        function validatePhone(phone) {
            var phonePattern = /^[0-9]{10}$/;
            if (phone.trim() === "")
                return "Ph no. is required.";
            if (!phonePattern.test(phone))
                return "Ph no. must be 10 digits.";
            return "";
        }
        function validateDate(dob) {
            if (!dob)
                return "Date of Birth is required.";
            var today = new Date();
            var date = new Date(dob);
            var minimumAge = new Date();
            minimumAge.setFullYear(today.getFullYear() - 18);
            var maximumAge = new Date();
            maximumAge.setFullYear(today.getFullYear() - 120);
            if (date > minimumAge)
                return "must be atleast 18 years old.";
            if (date < maximumAge)
                return 'must be less than 120 years old';
            return "";
        }
        // subject validation 
        var subjectCheckboxes = Array.from(registrationForm.querySelectorAll('input[type="checkbox"][name="maths"], input[type="checkbox"][name="english"], input[type="checkbox"][name="french"], input[type="checkbox"][name="history"]'));
        var isSubjectSelected = subjectCheckboxes.some(function (check) { return check.checked; });
        if (!isSubjectSelected) {
            event.preventDefault();
            subjectError.innerText = 'Select atleast one subject';
            return;
        }
        else {
            subjectError.innerText = '';
        }
        var firstnameValue = firstNameInput.value.trim();
        var lastnameValue = lastNameInput.value.trim();
        var emailValue = emailInput.value.trim();
        var phoneValue = phoneInput.value.trim();
        var dateValue = dobInput.value.trim();
        var nameError = validateName(firstnameValue);
        var lastNameError = validateName(lastnameValue);
        var emailError = validateEmail(emailValue);
        var phoneError = validatePhone(phoneValue);
        var dateError = validateDate(dateValue);
        // let errors = [];
        // if (nameError) errors.push(nameError);
        // if (lastNameError) errors.push(lastNameError);
        // if (emailError) errors.push(emailError);
        // if (phoneError) errors.push(phoneError);
        // if (dateError) errors.push(dateError);
        // if (errors.length > 0) {
        //     alert(errors.join('\n'));
        //     return;
        // }
        if (nameError) {
            firstNameError.innerText = nameError;
            isFormValid = false;
        }
        else {
            firstNameError.innerText = '';
        }
        if (lastNameError) {
            lastNameeError.innerText = lastNameError;
            isFormValid = false;
        }
        else {
            lastNameeError.innerText = '';
        }
        // write a dob one
        if (emailError) {
            emailAddressError.innerText = emailError;
            isFormValid = false;
        }
        else {
            emailAddressError.innerText = '';
        }
        if (phoneError) {
            phoneNumberError.innerHTML = phoneError;
            isFormValid = false;
        }
        else {
            phoneNumberError.innerHTML = '';
        }
        if (dateError) {
            dateOfBirthError.innerHTML = dateError;
            isFormValid = false;
        }
        else {
            dateOfBirthError.innerHTML = '';
        }
        if (!isFormValid) {
            return;
        }
        // ==================================================================================================================
        // if (tableBody && tableBody.rows.length < 1) {
        //     tableContainer.classList.add('deactive-style');
        // }
        // if (tableBody && tableBody.rows.length > 0) {
        //     if (filterBar) filterBar.classList.remove('deactive-style');
        //     if (sortControls) sortControls.classList.remove('deactive-style');
        //     tableContainer.classList.remove('deactive-style');
        // }
        if (editMode) {
            submitButton.textContent = "Submit";
            submitButton.classList.remove("update-button");
        }
        (function () {
            var allCheckBoxes = document.querySelectorAll('#filterMenu input[type="checkbox"]');
            allCheckBoxes.forEach(function (checkbox) { return checkbox.checked = false; });
        })();
        // if (dataTablePanel) dataTablePanel.classList.remove('deactive-style');
        // if (filterBar) filterBar.classList.remove('deactive-style');
        // // if (sortControls) sortControls.classList.remove('deactive-style');
        // if (tableContainer) tableContainer.classList.remove('deactive-style');
        // if(emptyStateDefault){
        //     if(registrations.length > 0){
        //         emptyStateDefault.classList.remove('deactive-style');
        //     }else {
        //         emptyStateDefault.classList.add('deactive-style');
        //     }
        // }
        var gender = document.querySelector('input[name="gender"]:checked');
        var currentId = registrations.length > 0 ? Math.max.apply(Math, registrations.map(function (u) { return u.id; })) + 1 : 0;
        var user = {
            id: currentId,
            firstname: firstNameInput.value,
            lastname: lastNameInput.value,
            dob: dobInput.value,
            email: emailInput.value,
            tele: phoneInput.value,
            exam: examCenterInput.value,
            // to tackle the error of gender parentElement can return we need to check every place before moving formward we can use tertiarry operators
            // gender: gender && gender.parentElement ? gender.parentElement.innerText.trim() : "N/A",
            gender: (_b = (_a = gender === null || gender === void 0 ? void 0 : gender.parentElement) === null || _a === void 0 ? void 0 : _a.innerText.trim()) !== null && _b !== void 0 ? _b : "N/A",
            // we can also then use the Nullish Coalescing operator (??) to provide a default value.
            subjects: [],
        };
        var subMarked = registrationForm.querySelectorAll('.subject-selection-group input[type="checkbox"]:checked');
        // Explicitly type the Set as holding strings: Set<string>
        var selectedSubjects = new Set();
        subMarked.forEach(function (checks) {
            var subjectLabel = checks.closest('label');
            if (subjectLabel) {
                var subject = subjectLabel.textContent.trim();
                if (subject)
                    selectedSubjects.add(subject);
            }
        });
        // to solve unknown[] we have to define what type of array subjects is
        user.subjects = Array.from(selectedSubjects);
        registrations.push(user);
        if (isFormValid) {
            setTimeout(function () {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
        rerenderTable();
        registrationForm.reset();
    });
    if (filterBar) {
        filterBar.addEventListener("click", function (event) {
            event.preventDefault();
            var button = event.currentTarget;
            var isEnabled = button.dataset.enabled === "true";
            if (isEnabled) {
                button.dataset.enabled = "false";
                if (overlayBackdrop && window.innerWidth < 1025) {
                    overlayBackdrop.classList.add("inactive");
                }
            }
            else {
                button.dataset.enabled = "true";
                if (overlayBackdrop && window.innerWidth < 1025) {
                    overlayBackdrop.classList.remove("inactive");
                }
            }
        });
    }
    if (tableBody) {
        tableBody.addEventListener("click", function (event) {
            if (!event.target)
                return;
            var targetElement = event.target;
            var editButton = targetElement.closest(".edit-button");
            var deleteButton = targetElement.closest(".delete-button");
            if (editButton) {
                // update mode
                editMode = true;
                submitButton.textContent = "Update";
                submitButton.classList.add("update-button");
                var row = editButton.closest("tr");
                if (row && row.dataset.id) {
                    var userId_1 = parseInt(row.dataset.id);
                    var userEdit_1 = registrations.find(function (user) { return user.id === userId_1; });
                    if (!userEdit_1)
                        return;
                    firstNameInput.value = userEdit_1.firstname;
                    lastNameInput.value = userEdit_1.lastname;
                    dobInput.value = userEdit_1.dob;
                    emailInput.value = userEdit_1.email;
                    phoneInput.value = userEdit_1.tele;
                    examCenterInput.value = userEdit_1.exam;
                    var genderRadios = document.querySelectorAll('input[name="gender"]');
                    genderRadios.forEach(function (radio) {
                        radio.checked = radio.parentElement ? radio.parentElement.innerText.trim() === userEdit_1.gender : false;
                    });
                    var subjectCheckboxes = registrationForm.querySelectorAll('.subject-selection-group input[type="checkbox"]');
                    subjectCheckboxes.forEach(function (checkbox) {
                        var _a;
                        checkbox.checked = false; // Reset all
                        var labelText = (_a = checkbox.closest('label')) === null || _a === void 0 ? void 0 : _a.textContent.trim();
                        if (labelText && userEdit_1.subjects.includes(labelText)) {
                            checkbox.checked = true;
                        }
                    });
                    registrations = registrations.filter(function (user) { return user.id !== userId_1; });
                    row.remove();
                }
                // rerenderTable();
                (function () {
                    var allCheckBoxes = document.querySelectorAll('#filterMenu input[type="checkbox"]');
                    allCheckBoxes.forEach(function (checkbox) { return checkbox.checked = false; });
                    rerenderTable();
                })();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            if (deleteButton) {
                var row = deleteButton.closest("tr");
                if (row && row.dataset.id) {
                    var userId_2 = parseInt(row.dataset.id);
                    registrations = registrations.filter(function (user) { return user.id !== userId_2; });
                    row === null || row === void 0 ? void 0 : row.remove();
                }
                applyFilterButton === null || applyFilterButton === void 0 ? void 0 : applyFilterButton.click();
            }
        });
    }
    if (sortOptionsMenu) {
        sortOptionsMenu.addEventListener("click", function (event) {
            var _a;
            event.preventDefault();
            var sortLink = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.closest('li[data-sort]');
            if (sortLink) {
                var sortType = sortLink.dataset.sort;
                if (sortType === "A-Z")
                    registrations.sort(function (a, b) { return a.firstname.localeCompare(b.firstname); });
                else if (sortType === "Z-A")
                    registrations.sort(function (a, b) { return b.firstname.localeCompare(a.firstname); });
                // .getTime() returns a number, which clarifies the intent for the sorter.
                else if (sortType === "O-Y")
                    registrations.sort(function (a, b) { return new Date(a.dob).getTime() - new Date(b.dob).getTime(); });
                else if (sortType === "Y-O")
                    registrations.sort(function (a, b) { return new Date(b.dob).getTime() - new Date(a.dob).getTime(); });
            }
            if (applyFilterButton) {
                applyFilterButton.click();
            }
            else {
                rerenderTable();
            }
            if (tableBody && tableBody.rows.length < 1) {
                if (filterBar)
                    filterBar.classList.add('deactive-style');
                // if(sortControls) sortControls.classList.add('deactive-style');
            }
            var sortDropdownToggle = document.getElementById("sortDropdownToggle");
            if (sortDropdownToggle)
                sortDropdownToggle.checked = false;
        });
    }
    var applyFilterButton = document.getElementById("applyFilterButton");
    var clearFilterButton = document.getElementById("clearFilterButton");
    var deleteMode = false;
    if (applyFilterButton) {
        applyFilterButton.addEventListener("click", function () {
            // if (filterMenu) filterMenu.classList.toggle('deactive-style');
            var selectedGenderCheckBoxes = document.querySelectorAll('#filterMenu input[name="gender-filter"]:checked');
            var selectedSubjectCheckboxes = document.querySelectorAll('#filterMenu input[name="subject"]:checked');
            var selectedCenterCheckBoxes = document.querySelectorAll('#filterMenu input[name="center"]:checked');
            var selectedGenders = Array.from(selectedGenderCheckBoxes).map(function (cb) { return cb.value.toLowerCase(); });
            var selectedSubjects = Array.from(selectedSubjectCheckboxes).map(function (cb) { return cb.value.toLowerCase(); });
            var selectedCenters = Array.from(selectedCenterCheckBoxes).map(function (cb) { return cb.value.toLowerCase(); });
            var filteredRegistrations = registrations.filter(function (user) {
                var genderMatch = selectedGenders.length === 0 || selectedGenders.includes(user.gender.toLowerCase());
                var centerMatch = selectedCenters.length === 0 || selectedCenters.includes(user.exam.trim().toLowerCase());
                var subjectMatch = selectedSubjects.length === 0 || user.subjects.some(function (subject) { return selectedSubjects.includes(subject.toLowerCase()); });
                return genderMatch && centerMatch && subjectMatch;
            });
            // if (filteredRegistrations.length === 0) {
            //     if (registrations.length > 0) {
            //         clearFilterButton.click(); 
            //     } else {
            //         rerenderTable();
            //     }
            //     return; 
            // }
            if (tableBody) {
                tableBody.innerHTML = '';
                filteredRegistrations.forEach(function (user) {
                    var row = document.createElement("tr");
                    row.setAttribute('data-id', String(user.id));
                    row.innerHTML = "\n                        <td>".concat(user.firstname, " ").concat(user.lastname, "</td>\n                        <td>").concat(user.dob, "</td>\n                        <td>").concat(user.email, "</td>\n                        <td>").concat(user.tele, "</td>\n                        <td>").concat(user.exam, "</td>\n                        <td>").concat(user.gender, "</td>\n                        <td>").concat(user.subjects.join(', '), "</td>\n                        <td><button class=\"action-button button-register-menu edit-button\" type=\"button\"><img src=\"img/edit_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg\" alt=\"Edit\"></button></td>\n                        <td><button class=\"action-button button-register-menu delete-button\" type=\"button\"><img src=\"img/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg\" alt=\"Delete\"></button></td>\n                    ");
                    tableBody.appendChild(row);
                    // if (dataTablePanel) dataTablePanel.classList.remove('deactive-style');
                    // if (filterBar) filterBar.classList.remove('deactive-style');
                    // if (sortControls) sortControls.classList.remove('deactive-style');
                    // if (tableContainer) tableContainer.classList.remove('deactive-style');
                });
            }
            if (overlayBackdrop && window.innerWidth < 1025) {
                overlayBackdrop.classList.toggle("deactive-style");
            }
            updateUIVisibility();
        });
    }
    if (clearFilterButton) {
        clearFilterButton.addEventListener("click", function () {
            var allCheckBoxes = document.querySelectorAll('#filterMenu input[type="checkbox"]');
            allCheckBoxes.forEach(function (checkbox) { return checkbox.checked = false; });
            rerenderTable();
        });
    }
    // --- Mobile Overlay Logic ---
    var mobileSortButton = document.getElementById('mobileSortButton');
    var sortOverlay = document.getElementById('sortOverlay');
    if (mobileSortButton && sortOverlay) {
        var closeBtn = sortOverlay.querySelector('.close-button');
        var backdrop = sortOverlay.querySelector('.overlay-backdrop');
        var openSortOverlay = function () {
            sortOverlay.classList.add('is-active');
            document.body.classList.add('no-scroll');
        };
        var closeSortOverlay = function () {
            sortOverlay.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        };
        mobileSortButton.addEventListener('click', openSortOverlay);
        closeBtn.addEventListener('click', closeSortOverlay);
        backdrop.addEventListener('click', closeSortOverlay);
    }
    var mobileFilterButton = document.getElementById('mobileFilterButton');
    var filtersOverlay = document.getElementById('filtersOverlay');
    if (mobileFilterButton && filtersOverlay) {
        var closeBtn = filtersOverlay.querySelector('.close-button');
        var backdrop = filtersOverlay.querySelector('.overlay-backdrop');
        var openFilterOverlay = function () {
            filtersOverlay.classList.add('is-active');
            document.body.classList.add('no-scroll');
        };
        var closeFilterOverlay = function () {
            filtersOverlay.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        };
        mobileFilterButton.addEventListener('click', openFilterOverlay);
        closeBtn.addEventListener('click', closeFilterOverlay);
        backdrop.addEventListener('click', closeFilterOverlay);
    }
    function performMobileSort(sortType) {
        if (sortType === "A-Z")
            registrations.sort(function (a, b) { return a.firstname.localeCompare(b.firstname); });
        else if (sortType === "Z-A")
            registrations.sort(function (a, b) { return b.firstname.localeCompare(a.firstname); });
        else if (sortType === "O-Y")
            registrations.sort(function (a, b) { return new Date(a.dob).getTime() - new Date(b.dob).getTime(); });
        else if (sortType === "Y-O")
            registrations.sort(function (a, b) { return new Date(b.dob).getTime() - new Date(a.dob).getTime(); });
        rerenderTable();
    }
    function applyMobileFilters() {
        var selectedGenderCheckBoxes = document.querySelectorAll('#filtersOverlay input[name="gender-mobile"]:checked');
        var selectedSubjectCheckboxes = document.querySelectorAll('#filtersOverlay input[name="subject-mobile"]:checked');
        var selectedCenterCheckBoxes = document.querySelectorAll('#filtersOverlay input[name="center-mobile"]:checked');
        var selectedGenders = Array.from(selectedGenderCheckBoxes).map(function (cb) { return cb.value.toLowerCase(); });
        var selectedSubjects = Array.from(selectedSubjectCheckboxes).map(function (cb) { return cb.value.toLowerCase(); });
        var selectedCenters = Array.from(selectedCenterCheckBoxes).map(function (cb) { return cb.value.toLowerCase(); });
        var filteredRegistrations = registrations.filter(function (user) {
            // each will return a true if 
            var genderMatch = selectedGenders.length === 0 || selectedGenders.includes(user.gender.toLowerCase());
            var centerMatch = selectedCenters.length === 0 || selectedCenters.includes(user.exam.trim().toLowerCase());
            var subjectMatch = selectedSubjects.length === 0 || user.subjects.some(function (subject) { return selectedSubjects.includes(subject.toLowerCase()); });
            return genderMatch && centerMatch && subjectMatch;
        });
        tableBody.innerHTML = '';
        filteredRegistrations.forEach(function (user) {
            var row = document.createElement("tr");
            row.setAttribute('data-id', String(user.id));
            row.innerHTML = "\n            <td>".concat(user.firstname, " ").concat(user.lastname, "</td>\n            <td>").concat(user.dob, "</td>\n            <td>").concat(user.email, "</td>\n            <td>").concat(user.tele, "</td>\n            <td>").concat(user.exam, "</td>\n            <td>").concat(user.gender, "</td>\n            <td>").concat(user.subjects.join(', '), "</td>\n            <td><button class=\"action-button button-register-menu edit-button\" type=\"button\"><img src=\"img/edit_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg\" alt=\"Edit\"></button></td>\n            <td><button class=\"action-button button-register-menu delete-button\" type=\"button\"><img src=\"img/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg\" alt=\"Delete\"></button></td>\n        ");
            tableBody.appendChild(row);
        });
        updateUIVisibility();
    }
    function clearMobileFilters() {
        var allCheckBoxes = document.querySelectorAll('#filtersOverlay input[type="checkbox"]');
        allCheckBoxes.forEach(function (checkbox) { return checkbox.checked = false; });
        rerenderTable();
    }
    var mobileSortOptions = document.querySelector('#sortOverlay .overlay-options');
    var mobileApplyFilterButton = document.getElementById('mobileApplyFilterButton');
    var mobileClearFilterButton = document.getElementById('mobileClearFilterButton');
    if (mobileSortOptions) {
        mobileSortOptions.addEventListener('click', function (event) {
            var sortLink = (event === null || event === void 0 ? void 0 : event.target).closest('li[data-sort]');
            if (sortLink) {
                var sortType = sortLink.dataset.sort;
                if (sortType === "A-Z")
                    registrations.sort(function (a, b) { return a.firstname.localeCompare(b.firstname); });
                else if (sortType === "Z-A")
                    registrations.sort(function (a, b) { return b.firstname.localeCompare(a.firstname); });
                else if (sortType === "O-Y")
                    registrations.sort(function (a, b) { return new Date(a.dob).getTime() - new Date(b.dob).getTime(); });
                else if (sortType === "Y-O")
                    registrations.sort(function (a, b) { return new Date(b.dob).getTime() - new Date(a.dob).getTime(); });
                applyMobileFilters();
                sortOverlay.classList.remove('is-active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    if (mobileApplyFilterButton) {
        mobileApplyFilterButton.addEventListener('click', function () {
            applyMobileFilters();
            filtersOverlay === null || filtersOverlay === void 0 ? void 0 : filtersOverlay.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        });
    }
    if (mobileClearFilterButton) {
        mobileClearFilterButton.addEventListener('click', function () {
            clearMobileFilters();
            filtersOverlay === null || filtersOverlay === void 0 ? void 0 : filtersOverlay.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        });
    }
    function getIsFilterActive() {
        var filterCheckboxes = document.querySelectorAll('#filterMenu input[type="checkbox"]:checked, #filtersOverlay input[type="checkbox"]:checked');
        return filterCheckboxes.length > 0;
    }
    function updateUIVisibility() {
        var totalRegistrations = registrations.length;
        var visibleRows = tableBody ? tableBody.rows.length : 0;
        var isDesktop = window.innerWidth >= 1025;
        var isFilterActive = getIsFilterActive();
        var hasNoData = totalRegistrations === 0;
        var showDefaultEmptyState = hasNoData;
        var showFilteredEmptyState = !hasNoData && visibleRows === 0 && isFilterActive;
        var showTable = !hasNoData && (visibleRows > 0 || !isFilterActive);
        if (filterMenu) {
            isDesktop ? filterMenu.classList.remove('deactive-style') : filterMenu.classList.add('deactive-style');
        }
        if (sortControls) {
            (!isDesktop || hasNoData) ? sortControls.classList.add('deactive-style') : sortControls.classList.remove('deactive-style');
        }
        if (mobileControls) {
            (isDesktop || hasNoData) ? mobileControls.classList.add('deactive-style') : mobileControls.classList.remove('deactive-style');
        }
        if (dataSection) {
            hasNoData ? dataSection.classList.add('deactive-style') : dataSection.classList.remove('deactive-style');
        }
        if (filterBar) {
            hasNoData ? filterBar.classList.add('deactive-style') : filterBar.classList.remove('deactive-style');
        }
        if (tableContainer) {
            hasNoData ? tableContainer.classList.add('deactive-style') : tableContainer.classList.remove('deactive-style');
        }
        if (emptyStateDefault) {
            showDefaultEmptyState ? emptyStateDefault.classList.remove('deactive-style') : emptyStateDefault.classList.add('deactive-style');
        }
        if (emptyStateFilter) {
            showFilteredEmptyState ? emptyStateFilter.classList.remove('deactive-style') : emptyStateFilter.classList.add('deactive-style');
        }
        if (tableData) {
            showTable ? tableData.classList.remove('deactive-style') : tableData.classList.add('deactive-style');
        }
    }
});
