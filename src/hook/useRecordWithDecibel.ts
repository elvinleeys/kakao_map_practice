import React, { useRef, useState } from 'react';

const useRecordWithDecibel = () => {
    const [decibel, setDecibel] = useState<number>(0);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameId = useRef<number | null>(null);
  
    const startMeasuringDecibel = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        audioContextRef.current = new AudioContext();
        const sourceNode = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceNode.connect(analyserRef.current);
        updateDecibel();
      } catch (error) {
        console.error("Failed to start recording:", error);
      }
    };
  
    const stopMeasuringDecibel = () => {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      audioContextRef.current?.close();
      cancelAnimationFrame(animationFrameId.current!);
    };
  
    const updateDecibel = () => {
      if (!analyserRef.current) return;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((acc, value) => acc + value);
      const average = sum / bufferLength;
      const decibel = 20 * Math.log10(average);
  
      setDecibel(Number(decibel.toFixed(2)));
  
      animationFrameId.current = requestAnimationFrame(updateDecibel);
      return console.log(decibel);
    };
  
  
    return { startMeasuringDecibel, stopMeasuringDecibel, decibel };
};

export default useRecordWithDecibel;