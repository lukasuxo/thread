import React, { useState } from "react";
import { motion } from "framer-motion";

interface ActivityItemProps {
  item: number;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ item }) => {
  return (
    <motion.div
      key={item}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center p-4 rounded-lg hover:bg-gray-800 transition-colors"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-0.5 mr-4">
        <div className="w-full h-full bg-black rounded-full"></div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center space-x-1">
          <span className="font-medium text-white">მომხმარებელი{item}</span>
          <span className="text-gray-400">მოიწონა თქვენი პოსტი</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">{item}სთ წინ</p>
      </div>
      <div className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0"></div>
    </motion.div>
  );
};

const ActivityFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filters = [
    { id: "all", label: "ყველა" },
    { id: "replies", label: "პასუხები" },
    { id: "mentions", label: "მოხსენიებები" },
    { id: "verified", label: "ვერიფიცირებული" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto p-4"
    >
      <h2 className="text-xl font-bold text-white mb-6">აქტივობა</h2>

      <div className="flex mb-6 border-b border-gray-800">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`flex-1 py-3 font-medium ${
              activeFilter === filter.id
                ? "text-white border-b-2 border-white"
                : "text-gray-500 hover:text-gray-300 transition-colors"
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <ActivityItem key={item} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityFeed;