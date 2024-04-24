import useMatch from "../../zustand/useMatch";

const Matches = ( {match} ) => {
    const {selectedMatch, setSelectedMatch} = useMatch();

    const isSelected = selectedMatch?._id === match._id;

    return (
        <>
            <div class={`match-container ${isSelected ? "selected-match-container" : "match-container"}`}
                onClick={() => setSelectedMatch(match)}
            >
            {/* <div className="match-container"> */}
                <img src="https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png" alt="Description of the image" width={50} height={50}></img>
                <p>{match.first_name}</p>
            </div>
        </>
    );
};

export default Matches;