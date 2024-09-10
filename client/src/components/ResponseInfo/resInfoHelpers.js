const resInfoError = (error, setResInfos) => {
    if (error.response.data) {
        setResInfos((oldResInfos) => [
            ...oldResInfos,
            error.response.data.message,
        ]);
    }
}

export { resInfoError };