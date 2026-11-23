const projects = [
    {
        title: "Medium Landing Page",
        technology: "HTML, CSS",
        image: "medium.png",
        description: "A recreation of the Medium Landing page using HTML and CSS focusing on layout, typography, and visual design.",
        skills: ["HTML structure", "CSS styling", "Responsive layouts"]
    },
    {
        title: "Personal Portfolio",
        technology: "HTML, CSS",
        image: "portfolio.png",
        description: "A personal portfolio website built using HTML and CSS to showcase my background, skills, and projects.",
        skills: ["Semantic HTML", "CSS Grid", "Flexbox"]
    },
    {
        title: "Mario(CS50)",
        technology: "C Programming",
        image: "Mario.png",
        description: "A C programming project completed during Harvard's CS50 course, using nested loops to generate Mario-style pyramids.",
        skills: ["C programming", "Nested loops", "Problem-solving"]
    }
];

const container = document.querySelector("#projects-container");

function createProjectCard(project) {
    const card = document.createElement("article");

    const image = document.createElement("img");

    image.src = project.image;

    image.alt = "Screenshot of " + project.title;

    const heading = document.createElement("h3");

    heading.textContent = project.title;

    const description = document.createElement("p");

    description.textContent = project.description;

    const technology = document.createElement("p");

    technology.textContent = project.technology;
    const detailsButton = document.createElement("button");

    detailsButton.type = "button";

    detailsButton.textContent = "View Details";

    detailsButton.classList.add("details-button");

    detailsButton.setAttribute("aria-expanded", "false");

    

    const skillsList = document.createElement("ul");

    skillsList.classList.add("project-details");

    skillsList.hidden = true;

    project.skills.forEach(function(skills){
        const item = document.createElement("li");

        item.textContent = skills;

        skillsList.appendChild(item);
    });

    card.appendChild(image);

    card.appendChild(heading);

    card.appendChild(description);

    card.appendChild(technology);

    card.appendChild(detailsButton);

    card.appendChild(skillsList);

    return card;
}

const projectCards = projects.map(createProjectCard);

projectCards.forEach(function(card) {
    container.appendChild(card);
});

function filterProjects(searchText) {
    return projects.filter(function(project){
        const title = project.title.toLowerCase();

        const technology = project.technology.toLowerCase();

        const search = searchText.toLowerCase();

        return title.includes(search) || technology.includes(search);
    });
}

const searchInput = document.querySelector("#project-search");

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.trim();

    const filteredProjects = filterProjects(searchText);

    container.replaceChildren();

    if (filteredProjects.length === 0) {
        const message = document.createElement("p");

        message.textContent = "No Matching projects found.";

        container.appendChild(message);
    }

    filteredProjects.forEach(function(project){
        const card = createProjectCard(project);

        container.appendChild(card);
    });

    
});

container.addEventListener("click", function(event){
    const button = event.target.closest(".details-button");

    if (!button) {
        return;
    }

    const card = button.closest("article");

    const details = card.querySelector(".project-details");

    details.hidden = !details.hidden;

    

    button.textContent = details.hidden
        ? "View Details"
        : "Hide Details";

    button.setAttribute("aria-expanded", String(!details.hidden));

});

const githubContainer = document.querySelector("#github-container");

const githubStatus = document.querySelector("#github-status");

const githubSearch = document.querySelector("#github-search");

const githubLanguage = document.querySelector("#github-language");


let githubRepositories = [];

function createGithubCard(repository) {
    const card = document.createElement("article");

    const heading = document.createElement("h3");
    heading.textContent = repository.name;

    const description = document.createElement("p");
    description.textContent = 
        repository.description || "No description available.";

        const language = document.createElement("p");

        language.textContent = 
            "Language: " + (repository.language || "Not specified");

        const link = document.createElement("a");

        link.href = repository.html_url;

        link.textContent = "View on Github";

        link.target = "_blank";

        link.rel = "noopener noreferrer";

    card.appendChild(heading);
    card.appendChild(description);
    card.appendChild(language);
    card.appendChild(link);

    return card;
}

function populateLanguages() {
    const languages = githubRepositories.map(function(repository){
        return repository.language;
    });

    const uniqueLanguages = [...new Set(languages)];

    uniqueLanguages.forEach(function(language) {
        if (language) {
            const option = document.createElement("option");

            option.value = language;

            option.textContent = language;

            githubLanguage.appendChild(option);
        }
    });
}

async function loadGithubRepositories() {
    githubStatus.textContent = "Loading repositories....";

     githubSearch.disabled = true;
     githubLanguage.disabled = true;

    try {
        const response = await fetch(
            "https://api.github.com/users/buharicephas-lab/repos"
        );

        if (!response.ok) {
            throw new Error("Failed to load repositories");
        }


        
        const repositories = await response.json();

        githubRepositories = repositories;

        populateLanguages();

        githubSearch.disabled = false;
        githubLanguage.disabled = false;

        githubContainer.replaceChildren();

        if (repositories.length > 0) {
            

            repositories.forEach(function(repository){
                const card = createGithubCard(repository);

                githubContainer.appendChild(card);
            });
        }

        githubStatus.textContent = 
            repositories.length === 0 ? "No public repositories found." : "";


    } catch (error) {
        githubStatus.textContent = 
            "Unable to load repositories. Please try again later.";
    }

}

loadGithubRepositories();



function filterGithubRepositories() {
    const searchText = githubSearch.value.trim().toLowerCase();

    const selectedLanguage = githubLanguage.value;

    const filteredRepositories = githubRepositories.filter(function(repository) {
        const matchesSearch = repository.name.toLowerCase().includes(searchText);

        const matchesLanguage =
            selectedLanguage === "all" ||
            repository.language === selectedLanguage;

        return matchesSearch && matchesLanguage;
    });

    githubContainer.replaceChildren();

    if (filteredRepositories.length === 0) {
        githubStatus.textContent = "No matching repositories found.";
    } else {
        githubStatus.textContent = "";

        filteredRepositories.forEach(function(repository) {
            const card = createGithubCard(repository);

            githubContainer.appendChild(card);
        });
    }
}

githubSearch.addEventListener("input", filterGithubRepositories);

githubLanguage.addEventListener("change", filterGithubRepositories);

// CONTACT FORM VALIDATION

const contactForm = document.querySelector("#contact-form");

const nameInput = document.querySelector("#name");

const emailInput = document.querySelector("#email");

const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#name-error");

const emailError = document.querySelector("#email-error");

const messageError = document.querySelector("#message-error");

const formStatus = document.querySelector("#form-status");

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}

function showError(input, errorElement, message) {
    errorElement.textContent = message;

    input.setAttribute("aria-invalid", "true");
}

function clearError(input, errorElement) {
    errorElement.textContent = "";

    input.removeAttribute("aria-invalid");
}

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const message = messageInput.value.trim();

    let isValid = true;

    clearError(nameInput, nameError);

    clearError(emailInput, emailError);

    clearError(messageInput, messageError);

    formStatus.textContent = "";

    if (name.length < 3) {
        showError(
            nameInput,
            nameError,
            "Name must contain at least 3 characters."
        );

        isValid = false;
    }

    if (!isValidEmail(email)) {
        showError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );

        isValid = false;
    }

    if (message.length < 10) {
        showError(
            messageInput,
            messageError,
            "Message must contain at least 10 characters."
        );

        isValid = false;
    }

    if (isValid) {
        formStatus.textContent =
            "Validation successful! Your message is ready.";
    } else {
        contactForm.querySelector('[aria-invalid="true"]').focus();
    }
});

