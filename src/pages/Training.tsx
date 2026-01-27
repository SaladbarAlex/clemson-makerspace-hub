import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  RotateCcw,
  Home,
  Award,
  Clock
} from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswers: number[];
  multipleChoice: boolean;
}

const quizData: Record<string, { name: string; questions: Question[] }> = {
  "laser-cutter": {
    name: "Epilog Laser Cutter",
    questions: [
      {
        id: 1,
        question: "What is the first thing you should do before using the laser cutter?",
        options: [
          "Start cutting immediately",
          "Check the ventilation system is on",
          "Leave the lid open while cutting",
          "Disable the safety features"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 2,
        question: "Which materials are NEVER allowed in the laser cutter?",
        options: [
          "Wood and acrylic",
          "PVC, vinyl, and ABS plastic",
          "Cardboard and paper",
          "Leather and fabric"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 3,
        question: "What should you do if you see flames inside the laser cutter?",
        options: [
          "Ignore it and continue",
          "Open the lid immediately",
          "Press the emergency stop and alert staff",
          "Blow on the flames"
        ],
        correctAnswers: [2],
        multipleChoice: false
      },
      {
        id: 4,
        question: "Why is it important to focus the laser before cutting?",
        options: [
          "It makes the machine look professional",
          "It ensures clean, precise cuts",
          "It's not actually important",
          "It makes the laser louder"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 5,
        question: "What file types are accepted by the laser cutter software?",
        options: [
          "Only .jpg files",
          ".svg, .pdf, and .ai files",
          "Only .docx files",
          ".mp3 files"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 6,
        question: "You should NEVER leave the laser cutter unattended while it's running.",
        options: [
          "True",
          "False"
        ],
        correctAnswers: [0],
        multipleChoice: false
      },
      {
        id: 7,
        question: "What determines whether the laser will cut or engrave?",
        options: [
          "The color of the material",
          "Power, speed, and frequency settings",
          "The time of day",
          "The size of the file"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 8,
        question: "What should you check before starting a job?",
        options: [
          "Material is flat and secured",
          "Correct settings for material type",
          "Ventilation is running",
          "All of the above"
        ],
        correctAnswers: [3],
        multipleChoice: false
      },
      {
        id: 9,
        question: "What's the maximum material thickness for the Epilog laser?",
        options: [
          "10 inches",
          "1/2 inch (12.7mm)",
          "5 feet",
          "There is no limit"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 10,
        question: "After finishing your job, you should:",
        options: [
          "Leave immediately",
          "Clean up debris and log your usage",
          "Leave materials on the bed for the next person",
          "Turn off the ventilation right away"
        ],
        correctAnswers: [1],
        multipleChoice: false
      }
    ]
  },
  "3d-printer": {
    name: "3D Printer (FDM)",
    questions: [
      {
        id: 1,
        question: "What does FDM stand for?",
        options: [
          "Fast Digital Manufacturing",
          "Fused Deposition Modeling",
          "Flexible Design Method",
          "Final Design Mode"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 2,
        question: "What temperature can the print bed reach?",
        options: [
          "Room temperature only",
          "Up to 100°C (212°F)",
          "Freezing temperatures",
          "Up to 500°C"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 3,
        question: "Why is bed adhesion important?",
        options: [
          "It's not important",
          "Prevents warping and print failures",
          "Makes prints heavier",
          "Changes the color"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 4,
        question: "What file format is used for 3D printing?",
        options: [
          ".docx",
          ".stl or .3mf",
          ".mp4",
          ".pdf"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 5,
        question: "What is infill in 3D printing?",
        options: [
          "The color of the filament",
          "The internal structure density of a print",
          "A type of printer",
          "The brand name"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 6,
        question: "You should never touch the nozzle or heated bed during printing.",
        options: [
          "True",
          "False"
        ],
        correctAnswers: [0],
        multipleChoice: false
      },
      {
        id: 7,
        question: "What should you do if you see spaghetti-like strands during printing?",
        options: [
          "Let it finish",
          "Stop the print and notify staff",
          "Add more filament",
          "Speed up the print"
        ],
        correctAnswers: [1],
        multipleChoice: false
      },
      {
        id: 8,
        question: "Why do some prints need support structures?",
        options: [
          "They make prints stronger",
          "To support overhanging parts during printing",
          "They're required for all prints",
          "To use more filament"
        ],
        correctAnswers: [1],
        multipleChoice: false
      }
    ]
  }
};

export default function Training() {
  const { equipment } = useParams<{ equipment: string }>();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const quiz = equipment ? quizData[equipment] : null;
  
  useEffect(() => {
    if (!quiz) {
      navigate("/equipment");
    }
  }, [quiz, navigate]);

  if (!quiz) {
    return null;
  }

  const questions = quiz.questions;
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const passingScore = 80;

  const handleAnswerSelect = (optionIndex: number) => {
    const question = questions[currentQuestion];
    
    if (question.multipleChoice) {
      const current = selectedAnswers[currentQuestion] || [];
      if (current.includes(optionIndex)) {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentQuestion]: current.filter(i => i !== optionIndex)
        });
      } else {
        setSelectedAnswers({
          ...selectedAnswers,
          [currentQuestion]: [...current, optionIndex]
        });
      }
    } else {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: [optionIndex]
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    
    questions.forEach((question, index) => {
      const userAnswers = selectedAnswers[index] || [];
      const correctAnswers = question.correctAnswers;
      
      if (
        userAnswers.length === correctAnswers.length &&
        userAnswers.every(a => correctAnswers.includes(a))
      ) {
        correct++;
      }
    });
    
    const finalScore = Math.round((correct / totalQuestions) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    if (finalScore >= passingScore) {
      // Trigger confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const isAnswered = (questionIndex: number) => {
    return (selectedAnswers[questionIndex]?.length || 0) > 0;
  };

  if (showResults) {
    const passed = score >= passingScore;
    
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="card-neumorphic p-8 text-center">
              {/* Result Icon */}
              <div className={cn(
                "mx-auto h-24 w-24 rounded-full flex items-center justify-center mb-6",
                passed ? "bg-success/10" : "bg-destructive/10"
              )}>
                {passed ? (
                  <CheckCircle className="h-12 w-12 text-success" />
                ) : (
                  <XCircle className="h-12 w-12 text-destructive" />
                )}
              </div>

              {/* Score Display */}
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                You scored {score}%
              </h1>
              <p className="text-muted-foreground mb-6">
                {Math.round((score / 100) * totalQuestions)} out of {totalQuestions} correct
              </p>

              {/* Pass/Fail Banner */}
              <div className={cn(
                "rounded-lg p-4 mb-8",
                passed ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              )}>
                {passed ? (
                  <div className="flex items-center justify-center gap-2">
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">Certification Unlocked!</span>
                  </div>
                ) : (
                  <span className="font-semibold">
                    You need {passingScore}% to pass. Keep trying!
                  </span>
                )}
              </div>

              {/* Next Steps */}
              {passed ? (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 text-left">
                    <h3 className="font-semibold text-foreground mb-2">What's next?</h3>
                    <p className="text-sm text-muted-foreground">
                      {equipment === "laser-cutter" 
                        ? "Laser cutters require in-person training. Sign up for the next available session!"
                        : "You're now certified to use this equipment. Visit during open hours to get started!"}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="hero">
                      <Link to="/equipment">Browse Equipment</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/locations">View Locations</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Review the training material and try again. You can retake this quiz as many times as needed!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={handleRetake} variant="hero">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retake Quiz
                    </Button>
                    <Button asChild variant="outline">
                      <Link to={`/equipment/${equipment}`}>Review Material</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to={`/equipment/${equipment}`}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to {quiz.name}
            </Link>
            
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-display text-2xl font-bold text-foreground">
                {quiz.name} Quiz
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                No time limit
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
                <span className="text-muted-foreground">
                  {Math.round(progress)}% complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Question Card */}
          <div className="card-neumorphic p-8 mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion]?.includes(index);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border-2 transition-all",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        isSelected 
                          ? "border-primary bg-primary" 
                          : "border-muted-foreground"
                      )}>
                        {isSelected && (
                          <CheckCircle className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-foreground">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {/* Question Dots */}
            <div className="hidden sm:flex items-center gap-1">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={cn(
                    "h-3 w-3 rounded-full transition-colors",
                    index === currentQuestion 
                      ? "bg-primary" 
                      : isAnswered(index)
                        ? "bg-primary/50"
                        : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>

            {currentQuestion === totalQuestions - 1 ? (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < totalQuestions}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!isAnswered(currentQuestion)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Answer Count */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {Object.keys(selectedAnswers).length} of {totalQuestions} questions answered
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
