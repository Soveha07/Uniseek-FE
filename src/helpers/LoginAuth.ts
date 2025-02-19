const isLoggedIn = (): boolean => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    return loggedIn;
};

export default isLoggedIn;
