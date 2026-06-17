const project_container = document.querySelectorAll('.project_container');
const title = document.querySelectorAll('.project_title');
const project_location = document.querySelectorAll('.project_location');

for( let i = 0; i < project_container.length; i++ ) {
    project_container[i].addEventListener('mouseover', () => {

        project_container[i].style.width = "35vw";
        title[i].style.opacity = "100%";
        project_location[i].style.opacity = "100%";

            project_container[i].addEventListener('mouseout', () => {
                project_container[i].style.width = "7vw";
                title[i].style.opacity = "0";
                project_location[i].style.opacity = "0";
            });
    });
}
