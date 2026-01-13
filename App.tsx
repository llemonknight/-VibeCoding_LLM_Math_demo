
import React, { useState } from 'react';
import { ActivationType } from './types';
import LinearFitting from './components/LinearFitting';
import KnobMachine from './components/KnobMachine';
import GeminiChat from './components/GeminiChat';

const App: React.FC = () => {
  const [activation, setActivation] = useState<ActivationType>(ActivationType.LINEAR);
  const [weight, setWeight] = useState(1.0);
  const [bias, setBias] = useState(0.0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Hero Section */}
      <header className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
            LLM 數學原理簡析
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
            從國中的 <span className="text-pink-400 font-mono">y = ax + b</span> 開始，帶你理解現代 AI 如何透過數千億次運算實現「智慧湧現」。
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-32 space-y-24">
        
        {/* Step 1: Curve Fitting */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-400 text-sm font-bold">
              第一階段：核心本質
            </div>
            <h2 className="text-3xl font-bold">極致的曲線擬合</h2>
            <p className="text-slate-400 leading-relaxed">
              訓練模型的目標，就是找到一組最完美的參數 <span className="text-blue-400 font-mono">a</span> 與 <span className="text-pink-400 font-mono">b</span>，
              使得模型能夠準確預測序列中的下一個字。這本質上就是「線性回歸」。
            </p>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">調整權重 (Weight - a)</label>
              <input 
                type="range" min="-5" max="5" step="0.1" value={weight} 
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
              <label className="block text-sm font-medium text-slate-300">調整偏置 (Bias - b)</label>
              <input 
                type="range" min="-5" max="5" step="0.1" value={bias} 
                onChange={(e) => setBias(parseFloat(e.target.value))}
                className="w-full accent-pink-500"
              />
            </div>

            <div className="flex gap-2">
              {Object.values(ActivationType).map(type => (
                <button 
                  key={type}
                  onClick={() => setActivation(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activation === type ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[400px]">
            <LinearFitting 
              activation={activation} 
              weight={weight} 
              bias={bias} 
              onKnobChange={(w, b) => { setWeight(w); setBias(b); }}
            />
          </div>
        </section>

        {/* Step 2: The Knob Machine */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-bold">
              第二階段：規模化的力量
            </div>
            <h2 className="text-3xl font-bold">從單一公式到 700 億參數</h2>
            <p className="text-slate-400 leading-relaxed">
              在 LLM 中，參數不再是單一的數字，而是巨大的「矩陣」。
              當我們說模型有 70B 時，就是有 700 億個旋鈕在協作。
            </p>
          </div>
          <KnobMachine />
        </section>

        {/* Step 3: Deep Dive & AI Chat */}
        <section className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-pink-500/50 transition-colors">
                <h4 className="text-lg font-bold mb-3 text-pink-400">為何 AI 會轉彎？</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  引入非線性激活函數（σ），讓模型能對高維空間進行「扭曲」與「折疊」，擬合任何複雜的邏輯，而不僅僅是一條直線。
                </p>
              </div>
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-colors">
                <h4 className="text-lg font-bold mb-3 text-blue-400">智慧的「湧現」</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  當參數規模達到臨界點，單純的統計規律會轉化為推理能力。這就是為何「量變產生質變」。
                </p>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
              <h3 className="text-2xl font-bold mb-4">為什麼是「黑箱」？</h3>
              <ul className="space-y-4 text-slate-400">
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">01</span>
                  <span><strong>維度災難：</strong> 運算發生在數千維空間，人類直覺無法理解。</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">02</span>
                  <span><strong>分散式表示：</strong> 知識點分散在數百萬個參數中，沒有特定「記憶區」。</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-bold">03</span>
                  <span><strong>非線性路徑：</strong> 數百層的折疊讓因果關係變得極度複雜。</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="h-[600px] lg:h-auto">
            <GeminiChat />
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© 2024 LLM Math Principles Simplified. Built with Gemini API & React.</p>
      </footer>
    </div>
  );
};

export default App;
