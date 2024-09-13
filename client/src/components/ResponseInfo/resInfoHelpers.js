const resInfoError = (error, setResInfos) => {
    if (error) {
        setResInfos((oldResInfos) => [
            ...oldResInfos,
            error,
        ]);
    }
}

export { resInfoError };