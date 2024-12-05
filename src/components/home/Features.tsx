import React from 'react';
import { Shield, Activity, Award, Clock } from 'lucide-react';

const features = [
  {
    name: 'Accurate Detection',
    description: 'Advanced AI algorithms provide highly accurate melanoma detection results.',
    icon: Shield,
  },
  {
    name: 'Real-time Analysis',
    description: 'Get instant results with our powerful real-time image processing system.',
    icon: Activity,
  },
  {
    name: 'Expert Validation',
    description: 'All results are validated against established medical databases.',
    icon: Award,
  },
  {
    name: 'Quick Results',
    description: 'Receive comprehensive reports within minutes of image upload.',
    icon: Clock,
  },
];

export function Features() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Advanced Melanoma Detection
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our system combines cutting-edge technology with medical expertise to provide accurate and reliable results.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}