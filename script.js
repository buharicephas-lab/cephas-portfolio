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