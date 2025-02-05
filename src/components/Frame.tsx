"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, { AddFrame, type Context } from "@farcaster/frame-sdk";
import { PROJECT_TITLE, QUIZ_QUESTIONS, COLOR_RESULTS } from "~/lib/constants";

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<keyof typeof COLOR_RESULTS | null>(null);

  const calculateResult = useCallback(() => {
    const colorCounts = userAnswers.reduce((acc, color) => {
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (Object.entries(colorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'blue') as keyof typeof COLOR_RESULTS;
  }, [userAnswers]);

  const handleAnswer = useCallback((color: string) => {
    setUserAnswers(prev => [...prev, color]);
    
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setResult(calculateResult());
    }
  }, [currentQuestionIndex, calculateResult]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setResult(null);
  }, []);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      sdk.actions.ready({});
      setIsSDKLoaded(true);
    };
    
    if (!isSDKLoaded) {
      load();
      return () => sdk.removeAllListeners();
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) return <div>Loading...</div>;

  return (
    <div style={{
      paddingTop: context?.client.safeAreaInsets?.top ?? 0,
      paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
      paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
      paddingRight: context?.client.safeAreaInsets?.right ?? 0,
    }}>
      <div className="w-[300px] mx-auto py-2 px-2">
        <h1 className="text-2xl font-bold text-center mb-4 text-neutral-900">
          {PROJECT_TITLE}
        </h1>

        {!result ? (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="font-bold mb-2">
                Question {currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length}
              </h2>
              <p className="mb-4">{QUIZ_QUESTIONS[currentQuestionIndex].question}</p>
              
              <div className="space-y-2">
                {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option.color)}
                    className="w-full p-2 text-left rounded bg-white hover:bg-gray-200 transition-colors"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-2 bg-gray-200 rounded">
              <div 
                className="h-full bg-purple-500 rounded transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div 
              className="w-full h-32 rounded-lg mb-4 transition-colors duration-500"
              style={{ backgroundColor: result }}
            />
            <h2 className="text-xl font-bold">{COLOR_RESULTS[result].name}</h2>
            <p className="text-gray-600">{COLOR_RESULTS[result].description}</p>
            <button
              onClick={resetQuiz}
              className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
