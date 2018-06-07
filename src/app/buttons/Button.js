class Button {
    constructor() {
        this.html = document.createElement("button");
        this.html.addEventListener("click", this.onClick.bind(this));
    }

    onClick() {}
}