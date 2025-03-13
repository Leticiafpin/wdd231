// navigation.js

// Seleciona o botão de menu e o elemento de navegação
const allCourses = document.querySelectorAll('.course');
const filterButtons = document.querySelectorAll('button');

// Adiciona um evento de clique ao botão
filterButtons.forEach(button => {
     // Alterna a classe "hidden" no elemento de navegação

    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        allCourses.forEach(course => {
            if (category === 'all' || course.classList.contains(category)) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
    });
});
