export default function Testimonials() {
  return (
    <div className="bg-amber-100 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-16">
          Happy Families Share Their Joy
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg text-amber-800 mb-4">
              "I love how easy it is to share my grandmother's recipes with my
              own grandchildren. The memories we make together are priceless!"
            </p>
            <div className="flex items-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Martha"
                alt="Martha"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold text-amber-900">Martha, 68</p>
                <p className="text-amber-600">Proud Grandmother of 4</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg text-amber-800 mb-4">
              "My great-grandma's cookie recipe lives on! Now I can bake with my
              grandkids just like she did with me."
            </p>
            <div className="flex items-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rose"
                alt="Rose"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold text-amber-900">Rose, 75</p>
                <p className="text-amber-600">Great-grandmother</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
