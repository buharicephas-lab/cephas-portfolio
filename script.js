const projects = [
    {
        title: "Medium Landing Page",
        technology: "HTML . CSS",
        image: "medium.png",
        description: "A recreation of the Medium Landing page using HTML and CSS focusing on layout, typography, and visual design."
    },
    {
        title: "Personal Portfolio",
        technology: "HTML . CSS",
        image: "portfolio.png",
        description: "A personal portfolio website built using HTML and CSS to showcase my background, skills, and projects."

    },
    {
        title: "Mario(CS50)",
        technology: "C Programming",
        image: "Mario.png",
        description: "A C programming project completed during Harvard's CS50 course, using nested loops to generate Mario-style pyramids."
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

    card.appendChild(image);

    card.appendChild(heading);

    card.appendChild(description);

    card.appendChild(technology);

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

const githubContainer = document.querySelector("#github-container");

const githubStatus = document.querySelector("#github-status");

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

async function loadGithubRepositories() {
    githubStatus.textContent = "Loading repositories....";

    try {
        const response = await fetch(
            "https://api.github.com/users/buharicephas-lab/repos"
        );

        if (!response.ok) {
            throw new Error("Failed to load repositories");
        }

        
        const repositories = await response.json();

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





