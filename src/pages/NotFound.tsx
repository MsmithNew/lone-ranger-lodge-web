
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-display text-rvmaroon mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Looks like you've wandered off the trail! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary">
            Return to Homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
