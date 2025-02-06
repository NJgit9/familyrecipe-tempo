import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative bg-amber-50 py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-amber-900 mb-6">
            Share Joy Across Generations
          </h1>
          <p className="text-xl text-amber-800 mb-8">
            Pass down your special recipes and create sweet memories with your
            family and closest friends. Every shared moment in the kitchen
            becomes a treasured family story. Share your memories for
            generations!
          </p>
          <Button
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-lg px-8"
          >
            Start Cooking Together
          </Button>
        </div>
        <div className="flex-1">
          <img
            src="/grandmother-pie.png"
            alt="Grandmother smiling with her grandchildren showing a freshly baked pie"
            className="rounded-lg shadow-2xl w-full max-w-[760px] mx-auto h-auto"
          />
        </div>
      </div>
    </div>
  );
}
