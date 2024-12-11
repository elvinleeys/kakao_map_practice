import React, { useEffect, useRef } from 'react';
import { StyleMap } from './MapStyle.style';
import { loadKakaoMapScript } from './useKakaoLoader';

const {kakao} = window;

const KakaoMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = async() => {
      await loadKakaoMapScript();

        const mapOptions = {
          center: new kakao.maps.LatLng(37.3517102, 127.0705203),
          level: 3,
        };

        new kakao.maps.Map(mapRef.current as HTMLElement, mapOptions);
    };
    initMap();
  }, []);

  return (
    <StyleMap ref={mapRef}>
    </StyleMap>
  );
};

export default KakaoMap;