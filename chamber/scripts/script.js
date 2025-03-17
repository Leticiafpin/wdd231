document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('members-container');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('lastModified');

    // Atualiza o ano e última modificação
    yearElement.textContent = new Date().getFullYear();
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;

    // Fetch JSON data
    const response = await fetch('data/members.json');
    const members = await response.json();

    // Render members
    const renderMembers = (view) => {
        container.innerHTML = '';
        container.className = view;

        members.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('member');

            memberDiv.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            container.appendChild(memberDiv);
        });
    };

    // Event listeners for view toggles
    gridViewBtn.addEventListener('click', () => renderMembers('grid'));
    listViewBtn.addEventListener('click', () => renderMembers('list'));

    // Default view
    renderMembers('grid');
});
