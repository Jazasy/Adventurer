const passInfoWord = (className) => {
    if(className.includes("danger")) return "weak";
    if(className.includes("warning")) return "almost there";
    return "strong";
}

export { passInfoWord };