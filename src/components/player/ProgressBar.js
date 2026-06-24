import React from 'react'

const ProgressBar = ({ PBcurrentTime, PBduration, onScrub }) => {
  const safeDuration = PBduration === Infinity || !PBduration ? 999 : PBduration;
  const progressPercent = safeDuration > 0 ? (PBcurrentTime / safeDuration) * 100 : 0;

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full">
      <div className='bg-neutral-600 h-0.5 w-full rounded-full'>
        <div
          className='h-full bg-stone-200'
          style={{ width: `${progressPercent}%`}}
          ></div>
      </div>
    </div>
  )
}

export default ProgressBar