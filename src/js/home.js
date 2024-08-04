const linkChildren = document.querySelectorAll(".link-container .link-children");
linkChildren.forEach(element => {
    if (element && element.textContent != null) {
        element.addEventListener("click", () => {
            var _a;
            const url = `https://${(_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()}`;
            window.location.href = url;
        });
    }
});
export {};
