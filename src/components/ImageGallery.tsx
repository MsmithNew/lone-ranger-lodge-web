
interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
