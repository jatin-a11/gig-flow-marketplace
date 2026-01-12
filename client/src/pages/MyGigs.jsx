const handleHire = async (bidId) => {
    try {
        const { data } = await API.patch(`/bids/${bidId}/hire`);
        alert(data.message);
        // Page refresh ya state update karein taaki status 'assigned' dikhe
        window.location.reload(); 
    } catch (err) {
        alert("Hiring failed!");
    }
};