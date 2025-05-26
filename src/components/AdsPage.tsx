import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.redirectTo || "/";

  useEffect(() => {
    const timer = setTimeout(() => {
      // Giả lập đã xem xong quảng cáo
      sessionStorage.setItem("adsWatched", "true");
      navigate(redirectTo);
    }, 5000); // 5 giây xem quảng cáo

    return () => clearTimeout(timer);
  }, [redirectTo, navigate]);

  return (
    <div className="p-8 text-white bg-black min-h-screen text-center">
      <h2 className="text-2xl font-bold mb-4">🎬 Ads are playing...</h2>
      <p>Please wait. Redirecting to your movie...</p>
    </div>
  );
};

export default AdsPage;
