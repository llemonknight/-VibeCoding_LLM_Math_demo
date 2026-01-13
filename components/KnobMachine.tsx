
import React, { useState, useEffect } from 'react';

interface KnobProps {
  id: number;
  value: number;
  isActive: boolean;
}

const Knob: React.FC<KnobProps> = ({ value, isActive }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
      <div 
        className={`w-10 h-10 rounded-full border-4 border-slate-600 relative transition-transform duration-500 ${isActive ? 'shadow-[0_0_10px_rgba(59,130,246,0.5)]' : ''}`}
        style={{ transform: `rotate(${value * 360}deg)` }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-blue-400 rounded-full" />
      </div>
      <span className="text-[10px] mt-2 text-slate-500">P-{Math.floor(Math.random() * 999)}</span>
    </div>
  );
};

const KnobMachine: React.FC = () => {
  const [knobs, setKnobs] = useState(() => Array.from({ length: 48 }, (_, i) => ({ id: i, value: Math.random(), active: false })));
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isTraining) {
      interval = setInterval(() => {
        setKnobs(prev => prev.map(k => ({
          ...k,
          value: k.value + (Math.random() - 0.5) * 0.1,
          active: Math.random() > 0.7
        })));
      }, 100);
    } else {
      setKnobs(prev => prev.map(k => ({ ...k, active: false })));
    }
    return () => clearInterval(interval);
  }, [isTraining]);

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">參數旋鈕機器 (The Knob Machine)</h3>
          <p className="text-sm text-slate-400">模擬 70B 參數在訓練時的微調過程</p>
        </div>
        <button 
          onClick={() => setIsTraining(!isTraining)}
          className={`px-6 py-2 rounded-full font-bold transition-all ${isTraining ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white shadow-lg`}
        >
          {isTraining ? '停止訓練' : '開始優化旋鈕'}
        </button>
      </div>

      <div className="knob-grid max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {knobs.map(k => (
          <Knob key={k.id} id={k.id} value={k.value} isActive={k.active} />
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl">
        <p className="text-sm text-blue-200 italic">
          "想像一個房間裡有 700 億個旋鈕，訓練模型就是不斷調整它們，直到輸入一段文字時，機器能準確吐出下一個字。"
        </p>
      </div>
    </div>
  );
};

export default KnobMachine;
