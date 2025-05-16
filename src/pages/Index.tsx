
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to Home component
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Redirecting to home page...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
