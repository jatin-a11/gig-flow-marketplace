const handleHire = async (bidId) => {
    try {
        const { data } = await API.patch(`/bids/${bidId}/hire`);
        alert(data.message);
        window.location.reload(); 
    } catch (err) {
        alert("Hiring failed!");
    }
};