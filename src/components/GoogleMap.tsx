
interface GoogleMapProps {
  address?: string;
}

const GoogleMap = ({ address = "1234 Ranger Road, Wilderness County, WC 12345" }: GoogleMapProps) => {
  return (
    <div className="w-full h-full min-h-[350px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="mb-2 font-medium">Google Map will be embedded here</p>
          <p className="text-sm">{address}</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
