import { Clock, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";
import Pill from "../ui/Pill";

interface ActiveMissionCardProps {
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HIGH IMPACT";
  resetTime: string;
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
  points: number;
  recurring: "daily" | "weekly" | "monthly";
  onComplete: () => void;
}

export default function ActiveMissionCard({
  title,
  difficulty,
  resetTime,
  progress,
  points,
  onComplete,
}: ActiveMissionCardProps) {
  const difficultyColors = {
    EASY: "bg-green-100 text-green-700",
    MEDIUM: "bg-purple-100 text-purple-700",
    "HIGH IMPACT": "bg-rose-100 text-rose-700",
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <Pill className={difficultyColors[difficulty]}>{difficulty}</Pill>
        </div>
        <div className="text-right">
          <span className="text-rose-600 font-bold text-xl">+{points} pts</span>
        </div>
      </div>

      {/* Reset Time */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Clock className="w-4 h-4" />
        <span>Reset {resetTime}</span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">
            Progress: {progress.current}/{progress.total} actions completed
          </span>
          <span className="font-semibold text-gray-900">
            {progress.percentage}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-600 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Complete Button / Completed message */}
      {progress.percentage >= 100 ? (
        <div className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-50 border border-green-200 text-green-700 font-semibold text-sm">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          Mission Completed!
        </div>
      ) : (
        <Button onClick={onComplete} variant="primary" className="w-full">
          Complete
        </Button>
      )}
    </div>
  );
}
