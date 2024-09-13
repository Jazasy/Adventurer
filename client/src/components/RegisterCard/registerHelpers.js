const passStrength = (password) => {
    if (password.length < 6) return "pass-info pass-info-danger";
    if (password.length < 10) return "pass-info pass-info-warning";
    return "pass-info pass-info-success";
}

const passCheck = (password, verifyPassword) => {
    return password === verifyPassword && password.length > 0;
}


export { passStrength, passCheck };