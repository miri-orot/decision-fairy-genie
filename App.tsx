
import React, { useState, useEffect, useCallback } from 'react';
import { APP_TITLE, CATCHPHRASE, INPUT_PLACEHOLDER, BUTTON_TEXT_ACTION, BUTTON_TEXT_ASK_AGAIN, LOADING_MESSAGES, ERROR_MESSAGES } from './constants';
import { MagicLampIcon, PaperPlaneIcon, LoadingSpinnerIcon, SparklesIcon, ThinkingFaceIcon } from './components/Icon';
import { fetchDecisionFromGemini } from './services/geminiService';
import { LoadingState } from './types';

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState<string>('');

  useEffect(() => {
    if (loadingStatus === LoadingState.LOADING) {
      const randomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
      setCurrentLoadingMessage(LOADING_MESSAGES[randomIndex]);
      const intervalId = setInterval(() => {
        const newRandomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
        setCurrentLoadingMessage(LOADING_MESSAGES[newRandomIndex]);
      }, 3000); // Change message every 3 seconds
      return () => clearInterval(intervalId);
    }
  }, [loadingStatus]);

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
    if (errorMessage) setErrorMessage(null); // Clear error when user types
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      setErrorMessage(ERROR_MESSAGES.EMPTY_QUESTION);
      setLoadingStatus(LoadingState.IDLE);
      return;
    }
    setLoadingStatus(LoadingState.LOADING);
    setAnswer(null);
    setErrorMessage(null);

    // Animate button on click
    const button = document.getElementById('submit-button');
    button?.classList.add('animate-pulseOnce');
    setTimeout(() => button?.classList.remove('animate-pulseOnce'), 500);

    try {
      const decision = await fetchDecisionFromGemini(question);
      setAnswer(decision);
      setLoadingStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error("Error during handleSubmit:", error); // Log the full error for debugging
      if (error instanceof Error) {
        if (error.message === "Gemini API key not configured. Cannot fetch decision.") {
          setErrorMessage(ERROR_MESSAGES.API_KEY_NOT_CONFIGURED);
        } else if (error.message === "Received an empty response from AI.") {
          setErrorMessage(ERROR_MESSAGES.EMPTY_RESPONSE_ERROR);
        } 
        // Check if the error message indicates a failed fetch or other network-related issues from Gemini API
        else if (error.message.startsWith("Gemini API Error: Failed to fetch") || 
                 error.message.startsWith("Gemini API Error: NetworkError") ||
                 error.message.includes("API key not valid") || // Catching specific invalid key messages from Gemini
                 error.message.includes("IAM permission 'generativelanguage.models.generateContent' denied")) {
          setErrorMessage(ERROR_MESSAGES.API_ERROR);
        }
        else { // For other wrapped "Gemini API Error: ..." or "An unknown error occurred..."
          setErrorMessage(ERROR_MESSAGES.API_ERROR);
        }
      } else { // Fallback for non-Error objects, though less likely with current geminiService
        setErrorMessage(ERROR_MESSAGES.API_ERROR);
      }
      setLoadingStatus(LoadingState.ERROR);
    }
  };
  
  const handleAskAgain = () => {
    setQuestion('');
    setAnswer(null);
    setErrorMessage(null);
    setLoadingStatus(LoadingState.IDLE);
  };

  const renderContent = () => {
    if (loadingStatus === LoadingState.LOADING) {
      return (
        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-md animate-fadeInUp">
          <LoadingSpinnerIcon className="w-12 h-12 text-pink-500 mx-auto animate-spin mb-4" />
          <p className="text-lg font-semibold text-pink-700">{currentLoadingMessage}</p>
        </div>
      );
    }

    if (loadingStatus === LoadingState.ERROR && errorMessage) {
      return (
        <div className="text-center p-6 bg-red-100/80 backdrop-blur-sm rounded-lg shadow-md border border-red-300 animate-fadeInUp">
          <ThinkingFaceIcon className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-lg font-semibold text-red-700 mb-2">오류 발생!</p>
          <p className="text-sm text-red-600 px-2">{errorMessage}</p>
          <button
            onClick={handleAskAgain}
            className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {BUTTON_TEXT_ASK_AGAIN}
          </button>
        </div>
      );
    }
    
    if (loadingStatus === LoadingState.SUCCESS && answer) {
      return (
        <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-xl shadow-xl animate-fadeInUp ">
           <SparklesIcon className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
          <p className="text-2xl md:text-3xl font-bold text-purple-700 leading-relaxed">"{answer}"</p>
          <button
            onClick={handleAskAgain}
            className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {BUTTON_TEXT_ASK_AGAIN}
          </button>
        </div>
      );
    }
    return null; // Initial state, nothing to show yet other than input form
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 pt-8 sm:pt-4 text-slate-800">
      <header className="text-center mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <MagicLampIcon className="w-20 h-20 sm:w-24 sm:h-24 text-purple-600 mx-auto mb-2 drop-shadow-lg" />
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 drop-shadow-sm">
          {APP_TITLE}
        </h1>
        <p className="text-lg sm:text-xl mt-2 text-purple-700 font-medium">{CATCHPHRASE}</p>
      </header>

      <main className="w-full max-w-lg space-y-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        {loadingStatus !== LoadingState.SUCCESS && loadingStatus !== LoadingState.ERROR && (
           <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <div className="relative">
              <input
                type="text"
                value={question}
                onChange={handleQuestionChange}
                placeholder={INPUT_PLACEHOLDER}
                disabled={loadingStatus === LoadingState.LOADING}
                className="w-full p-4 pr-12 text-lg border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-300 shadow-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                onKeyPress={(e) => e.key === 'Enter' && !loadingStatus && handleSubmit()}
              />
              <PaperPlaneIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-400"/>
            </div>
            {errorMessage && loadingStatus === LoadingState.IDLE && (
              <p className="text-red-500 text-sm mt-2 ml-1">{errorMessage}</p>
            )}
            <button
              id="submit-button"
              onClick={handleSubmit}
              disabled={loadingStatus === LoadingState.LOADING || !question.trim()}
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 px-6 text-xl rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <SparklesIcon className="w-6 h-6" />
              <span>{BUTTON_TEXT_ACTION}</span>
            </button>
          </div>
        )}
       
        {renderContent()}
      </main>

      <footer className="text-center mt-12 pb-6 text-sm text-purple-700/80 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
        <p>&copy; {new Date().getFullYear()} 결정 요정 지니. 재미로만 즐겨주세요!</p>
      </footer>
    </div>
  );
};

export default App;