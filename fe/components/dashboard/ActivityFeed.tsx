import { MessageSquare, FileText, Vote, UserPlus } from "lucide-react";

interface Activity {
  id: string;
  type: "vote" | "comment" | "proposal" | "referral";
  description: string;
  time: string;
  location?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons = {
  vote: { icon: Vote, color: "text-rose-600", bg: "bg-rose-50" },
  comment: { icon: MessageSquare, color: "text-rose-600", bg: "bg-rose-50" },
  proposal: { icon: FileText, color: "text-rose-600", bg: "bg-rose-50" },
  referral: { icon: UserPlus, color: "text-rose-600", bg: "bg-rose-50" },
};

const activityLabels = {
  vote: "Log Vote",
  comment: "Log Comment",
  proposal: "Log Proposal",
  referral: "Log Referral",
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-rose-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">M</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Log Participation (Demo)
        </h2>
      </div>

      {/* Activity Icons Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.entries(activityLabels).map(([type, label]) => {
          const {
            icon: Icon,
            bg,
            color,
          } = activityIcons[type as keyof typeof activityIcons];
          return (
            <button
              key={type}
              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-6" />

      {/* Recent Activity Header */}
      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
        RECENT ACTIVITY
      </h3>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No recent activity
          </p>
        ) : (
          activities.map((activity) => {
            const { icon: Icon, color } = activityIcons[activity.type];
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="flex-shrink-0">
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">
                    {activity.description}
                    {activity.location && (
                      <span className="font-semibold">
                        {" "}
                        {activity.location}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
