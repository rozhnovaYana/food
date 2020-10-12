const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: data,
    });
    return await res.json();
};
const createMenuCard = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Error ${res.status}`);
    }
    return await res.json();
};
export {
    postData,
    createMenuCard
};