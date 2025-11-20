import React from 'react';
import { Heart, Package, Recycle, Sparkles } from 'lucide-react';

export const WhoWeAre = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Who we are?
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Main Content */}
        <div className="rounded-lg p-6 text-center">
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Hey, we&apos;re KuKu - your friendly neighborhood marketplace where pre-loved finds get a second chance and your closet finally gets to breathe.
          </p>
          <p className="text-lg text-gray-700 mt-8 leading-relaxed max-w-4xl mx-auto">
            Let&apos;s be real: we all have clothes we don&apos;t wear anymore. That jacket you swore you&apos;d wear? Still hanging! Those jeans? Too tight, too loose, or just not your vibe anymore. At KuKu we help you turn that “someday I&apos;ll wear it” pile into something way better- cash, space or a happy new customer
          </p>
          <p className="text-lg text-gray-700 mt-8 leading-relaxed max-w-4xl mx-auto">
            KuKu makes it super easy to sell your extra stuff, rent out what you rarely use, or give away old textiles to be reused, repurposed, or recycled. We pick things up, check them out, and handle delivery-so you don&apos;t have to lift a finger (except maybe to snap a pic of your item and with our Ku-Kit service you don&apos;t even have to do that!)
          </p>
          <p className="text-lg text-gray-700 mt-8 leading-relaxed max-w-4xl mx-auto">
            Whether you&apos;re decluttering, downsizing, or just done with hoarding-KuKu helps you live lighter, shop smarter, and make room for what matters.
          </p>
          <p className="text-lg text-gray-700 mt-8 leading-relaxed max-w-4xl mx-auto">
            Think of us as your digital thrift store, rental hub, and donation bin-all rolled into one fun, fuss-free platform.
          </p>
          <p className="text-3xl font-bold text-purple-600 mt-12">
            Let&apos;s keep it moving. Lets keep it KuKu.
          </p>
        </div>

        {/* CTA */}
        {/* <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <Heart className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Ready to Join the KuKu Family?</h2>
          <p className="text-lg mb-4">Download the app and start your circular journey today!</p>
          <a 
            href="/download" 
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300"
          >
            Get the App Now
          </a>
        </div> */}
      </div>
    </div>
  );
};