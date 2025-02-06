export default function Features() {
  return (
    <div className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-16">
          Making Memories in the Kitchen
        </h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="p-6">
            <div className="text-5xl mb-4 text-amber-600">👵</div>
            <h3 className="text-xl font-semibold mb-3 text-amber-900">
              Easy to Read Recipes
            </h3>
            <p className="text-amber-700">
              Large, clear text and simple instructions make following recipes a
              breeze
            </p>
          </div>
          <div className="p-6">
            <div className="text-5xl mb-4 text-amber-600">👨‍👧</div>
            <h3 className="text-xl font-semibold mb-3 text-amber-900">
              Kid-Friendly Activities
            </h3>
            <p className="text-amber-700">
              Special sections for tasks perfect for little helping hands
            </p>
          </div>
          <div className="p-6">
            <div className="text-5xl mb-4 text-amber-600">📸</div>
            <h3 className="text-xl font-semibold mb-3 text-amber-900">
              Photo Memories
            </h3>
            <p className="text-amber-700">
              Capture and save precious moments of cooking together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
