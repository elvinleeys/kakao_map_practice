
const KAKAOMAP_API_SRC = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&autoload=false`;

export const loadKakaoMapScript = ():Promise<void> => {
    return new Promise((resolve) => {
        if(document.getElementById('kakao-map-script')) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.id = 'kakao-map-script';
        script.src = KAKAOMAP_API_SRC;

        document.head.appendChild(script);
    })
};

