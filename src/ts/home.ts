const linkChildren = document.querySelectorAll(".link-container .link-children");

linkChildren.forEach(element => {
    if (element as HTMLDivElement && element.textContent != null) {
        element.addEventListener("click", () => {
            const url = `https://${element.textContent?.trim()}`;
            window.location.href = url;
        });
    }
});



