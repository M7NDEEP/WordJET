import React from 'react';
import { useState ,useEffect } from 'react';

// Importing styles and icons
import './section.css';
import { HiOutlineSpeakerWave } from "react-icons/hi2";

const Section = () => {
    // State to manage the search word and fetched data
    const [searchWord, setSearchWord] = useState('');
    const [wordData, setWordData] = useState(null);
  
    // Function to handle playing audio
    function handleAudioPlay() {
        const audio = document.getElementById('audio');
        audio.play();
    }

    // Async function to handle searching for a word
    const handleSearch = async () => {
        try {
            // Fetch data from the API based on the entered search word
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
            const data = await response.json();
            
            // Set the fetched data to state
            setWordData(data);

            // Reset the audio element to play the new audio
            const audio = document.getElementById('audio');
            audio.pause();
            audio.currentTime = 0;
            audio.load();
        } catch (error) {
            // Handle errors in fetching data
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
        <div className="section-cont">
            {/* Header */}
            <br /><br />
            <h2 className='container'>WordJet: Where Words Take Flight...</h2>

            {/* Search Form */}
            <div className="container mt-4">
                <form className='container' onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                    <div className="form-group">
                        <label htmlFor="exampleInputName">What word do you want to look up?</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            id="exampleInputName"
                            placeholder="Search for a word"
                            value={searchWord}
                            onChange={(e) => setSearchWord(e.target.value)}
                        />
                    </div>
                    <button type="submit" style={{padding:'5px 18px',borderRadius:'4px'}} className="btn btn-primary mt-3">Search</button>
                </form>

                {/* Display Card for Word Data */}
                {wordData && (
                    <div className="card mt-4" style={{ marginLeft: '10px', marginRight: '10px' }}>
                        <div className="card-body">
                            <h5 className="card-title">{wordData[0].word.charAt(0).toUpperCase() + wordData[0].word.slice(1)}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {wordData[0].word}{' '}
                                <HiOutlineSpeakerWave
                                    size={25}
                                    style={{ cursor: 'pointer' }}
                                    className="audio-icon"
                                    onClick={() => handleAudioPlay()}
                                />
                            </h6>
                            <p className="card-text">
                                <strong>Part of Speech :</strong> {wordData[0].meanings[0].partOfSpeech}
                                <br />
                                <strong>Phonetic Pronunciation :</strong> {wordData[0].phonetics[0].text}
                                <br />
                                <strong>Definitions :</strong>
                                <ul>
                                    {/* Mapping through definitions and displaying them as list items */}
                                    {wordData[0].meanings[0].definitions.slice(0, 5).map((definition, index) => (
                                        <li key={index}>{definition.definition}</li>
                                    ))}
                                </ul>
                                <strong>Synonyms :</strong> {wordData[0].meanings[0].synonyms.join(', ')}
                            </p>
                            {/* Audio Container */}
                            <div className="audio-container">
                                <audio id="audio" className="hidden">
                                    {/* Setting the audio source from the fetched data */}
                                    <source src={wordData[0].phonetics[0].audio} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                            {/* Link to More Info */}
                            <a href={wordData[0].sourceUrls[0]} className="card-link" target="_blank" rel="noopener noreferrer">
                                More Info
                            </a>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </>
    );
}

export default Section;
