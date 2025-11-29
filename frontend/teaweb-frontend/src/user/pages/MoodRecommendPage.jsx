import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import AITyping from "../components/AITyping";
import "../assets/styles/ai-box.css";

export default function MoodRecommendPage() {
  const { mood } = useParams();

  const [tea, setTea] = useState([]);
  const [coconut, setCoconut] = useState([]);
  const [spices, setSpices] = useState([]);
  const [rice, setRice] = useState([]);

  const [loading, setLoading] = useState(true);
  const [aiDone, setAiDone] = useState(false);

  // FIX: safe random picker
  const pickRandom = (arr, count) => {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    return arr
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(count, arr.length));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    setLoading(true);
    setAiDone(false);

    Promise.all([
      fetch("https://ceymoslanka.com/backend/api/tea_manager/get_tea_products.php").then((r) => r.json()),
      fetch("https://ceymoslanka.com/backend/api/coconut_manager/get_coconut_products.php").then((r) => r.json()),
      fetch("https://ceymoslanka.com/backend/api/spices_manager/get_spices_products.php").then((r) => r.json()),
      fetch("https://ceymoslanka.com/backend/api/rice_manager/get_rice_products.php").then((r) => r.json())
    ])
      .then(([t, c, s, r]) => {
        setTea(pickRandom(t, 3));
        setCoconut(pickRandom(c, 2));
        setSpices(pickRandom(s, 2));
        setRice(pickRandom(r, 2));
        setTimeout(() => setLoading(false), 400);
      })
      .catch(() => setLoading(false));
  }, [mood]);

  const moodKey = (mood || "").toLowerCase();

  const moodExplain = {
    adventurous:
      "These selections lean into boldness, layered spices, and unique textures—perfect for someone seeking novelty and exciting flavor notes.",
    calming:
      "These products were chosen for their smooth, balanced, and gentle flavor profiles—ideal for slowing down your thoughts and easing into a calmer state.",
    energizing:
      "These recommendations offer brighter aromas, sharper notes, and naturally uplifting qualities to support mental clarity and energy.",
    "feel good":
      "These picks offer warm, comforting, and satisfying flavor profiles that boost your mood without overwhelming your senses.",
    healing:
      "These selections include soothing flavors and naturally remedial ingredients to support comfort, warmth, and recovery.",
    relaxing:
      "These choices revolve around mellow textures, mild sweetness, and calming aromas that unwind your senses.",
    refreshing:
      "These items were selected for their crisp finishes and clean, cool flavor profiles that leave you feeling refreshed.",
    "wake me up":
      "These suggestions feature bold aromas and strong flavor notes designed to stimulate your senses and boost alertness."
  };

  const explanation =
    moodExplain[moodKey] ||
    "These recommendations were chosen by balancing flavor intensity, aroma, and overall mood-matching sensory qualities.";

  const aiMessages = [
    `Understanding what “${mood}” represents in terms of taste, aroma, and emotional tone...`,
    "Reviewing all available categories for the closest sensory matches...",
    "Weighing each product's profile against your selected mood...",
    "Preparing final recommendations tailored just for you..."
  ];

  // Section renderer
  const section = (title, list, category) => {
    if (!list || list.length === 0) return null;

    return (
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {list.map((item) => (
            <a
              key={item.id}
              href={`/${category}/${item.id}`}
              className="border rounded-lg shadow-sm hover:shadow-md transition bg-white block"
            >
              <img
                src={`https://ceymoslanka.com/backend/uploads/${category}_products/${item.image}`}
                alt={item.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-900">
                  {item.title}
                </h3>
                {item.net_weight && (
                  <p className="text-xs text-gray-600 mt-1">
                    Net Weight: {item.net_weight}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto px-5 pt-28 pb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">
          Mood: {mood}
        </h1>

        <p className="text-gray-600 mb-4">
          Handpicked recommendations crafted for your selected mood.
        </p>

        <div className="ai-box mb-8">
          <AITyping messages={aiMessages} onComplete={() => setAiDone(true)} />

          {aiDone && (
            <p className="text-gray-700 text-sm md:text-base mt-4">
              {explanation}
            </p>
          )}
        </div>

        {aiDone && !loading && (
          <>
            {section("Recommended Tea", tea, "tea")}
            {section("Coconut Products", coconut, "coconut")}
            {section("Spices (Ceylon Cinnamon)", spices, "spices")}
            {section("Rice Products", rice, "rice")}
          </>
        )}
      </div>
    </UserLayout>
  );
}
