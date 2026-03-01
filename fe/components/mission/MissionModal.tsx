"use client";

import { useState } from "react";
import {
  X,
  CheckCircle,
  Vote,
  MessageSquare,
  FileText,
  Upload,
} from "lucide-react";
import Button from "../ui/Button";

interface MissionAction {
  id: string;
  type: "vote" | "comment" | "proposal" | "upload";
  label: string;
  points: number;
  icon: string;
  completed?: boolean;
}

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  actions: MissionAction[];
  onCompleteAction: (actionId: string, points: number) => Promise<void>;
}

export default function MissionModal({
  isOpen,
  onClose,
  title,
  actions,
  onCompleteAction,
}: MissionModalProps) {
  const [completingAction, setCompletingAction] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<Set<string>>(
    new Set(),
  );

  if (!isOpen) return null;

  const handleCompleteAction = async (action: MissionAction) => {
    if (completedActions.has(action.id)) return;

    setCompletingAction(action.id);
    try {
      await onCompleteAction(action.id, action.points);
      setCompletedActions((prev) => new Set([...prev, action.id]));
    } catch (error) {
      console.error("Failed to complete action:", error);
    } finally {
      setCompletingAction(null);
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "vote":
        return <Vote className="w-6 h-6" />;
      case "comment":
        return <MessageSquare className="w-6 h-6" />;
      case "proposal":
        return <FileText className="w-6 h-6" />;
      case "upload":
        return <Upload className="w-6 h-6" />;
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-rose-100 text-sm mt-1">
              Complete actions below to earn points
            </p>
          </div>

          {/* Actions List */}
          <div className="px-6 py-6 space-y-4">
            {actions.map((action) => {
              const isCompleted = completedActions.has(action.id);
              const isCompleting = completingAction === action.id;

              return (
                <div
                  key={action.id}
                  className={`border rounded-xl p-4 transition-all ${
                    isCompleted
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 hover:border-rose-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        getActionIcon(action.type)
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {action.label}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {isCompleted
                          ? "Completed!"
                          : `Earn ${action.points} points`}
                      </p>
                    </div>

                    <div className="text-right">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          <CheckCircle className="w-4 h-4" />+{action.points}{" "}
                          pts
                        </span>
                      ) : (
                        <Button
                          onClick={() => handleCompleteAction(action)}
                          disabled={isCompleting}
                          variant="primary"
                          size="sm"
                        >
                          {isCompleting ? "Processing..." : "Complete"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {completedActions.size} of {actions.length} actions completed
              </div>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
