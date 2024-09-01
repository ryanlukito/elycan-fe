import Image from 'next/image';

const WindDirectionCircle = ({ children }) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  function rotateArrow(param) {
    switch (param) {
      case 'Utara':
        return 0;
      case 'Timur Laut':
        return 45;
      case 'Timur':
        return 90;
      case 'Tenggara':
        return 135;
      case 'Selatan':
        return 180;
      case 'Barat Daya':
        return 225;
      case 'Barat':
        return 270;
      case 'Barat Laut':
        return 315;
      default:
        return 0;
    }
  }

  const rotationDegree = rotateArrow(children);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[10vw] h-[10vw] relative flex items-center justify-center rounded-full">
        {directions.map((dir, index) => (
          <div
            key={dir}
            className="absolute transform"
            style={{ transform: `rotate(${index * 45}deg) translateY(-4vw)` }}
          >
            <div className="transform" style={{ transform: `rotate(-${index * 45}deg)` }}>
              <span className="text-[1vw] font-bold">{dir}</span>
            </div>
          </div>
        ))}
        {/* Arrow Image in the center */}
        <div className="absolute">
          <Image 
            src="/image/arrowrev.png" 
            alt="Compass Arrow" 
            width={10000} 
            height={10000} 
            className="w-[2vw] h-[2.5vw] transform" 
            style={{ transform: `rotate(${rotationDegree}deg)` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default WindDirectionCircle;