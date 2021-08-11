const asyncSleep = async ms => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

module.exports = {
    asyncSleep
}