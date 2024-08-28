import Description from "./components/Description";
import SensorBoxArah from './components/SensorBoxArah';
import SensorBoxKecepatan from './components/SensorBoxKecepatan';

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-start relative">
      <div className="w-full h-[7.24vw] bg-[#1F127E] flex items-center justify-center font-bold text-white text-[3.542vw]">Ely-CAN DASHBOARD</div>
      <div className="flex flex-col justify-center items-start mt-[2vw] ml-[2vw]">
        <Description/>
        <div className="w-full flex justify-between items-center mt-[1vw]">
          <SensorBoxKecepatan>Kecepatan Angin</SensorBoxKecepatan>
          <SensorBoxArah>Arah Angin</SensorBoxArah>
        </div>
      </div>
    </main>
  );
}
