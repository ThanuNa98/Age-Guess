import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import '../css/AgeGuessForm.css';

function UserAge({ onUserSearch }) {
    const [name, setName] = useState('');
    const [tutorialText, setTutorialText] = useState('');
    const [isAnimating, setIsAnimating] = useState(true);
    const [isAnimatable, setAnimatable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const placeholderText = 'Enter your name';
        const typingInterval = 150; // Adjust this value to control the typing speed
        let currentIndex = -1;
        let typingTimer;

        const typeNextCharacter = () => {
            currentIndex++;
            setTutorialText((prevText) => prevText + placeholderText[currentIndex]);
            if (currentIndex === placeholderText.length - 1) {
                clearInterval(typingTimer);
                setTimeout(() => {
                    setTutorialText('');
                    currentIndex = -1;
                    startTypingAnimation();
                }, 2000); // Delay before clearing the text and starting the animation again (2 seconds in this example)
            }
        };

        const startTypingAnimation = () => {
            setIsAnimating(false);
            setAnimatable(true);
            typingTimer = setInterval(typeNextCharacter, typingInterval);
        };

        startTypingAnimation();

        return () => {
            clearInterval(typingTimer);
        };
    }, []);

    const handleFocus = () => {
        setIsAnimating(false);
        setAnimatable(false);
    };

    const handleBlur = () => {
        if (isAnimatable) {
            setIsAnimating(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() !== '') {
            setIsLoading(true);
            try {
                await onUserSearch(name);
                setName('');
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="user-age">
            <form onSubmit={handleSubmit} className={isAnimatable && isAnimating && !isLoading ? 'fade-in' : ''}>
                <div className="input-container">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={tutorialText}
                        className="input-field"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        contentEditable
                        ref={inputRef}
                    />

                    <button type="submit" className={isAnimating ? 'guessing-button' : 'guess-button'}>
                        <FontAwesomeIcon icon={faDice} className="search-icon" />
                        Guess
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserAge;
