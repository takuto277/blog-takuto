import Image from 'next/image';

function CustomMDXImage(props) {
  const { src, alt, ...rest } = props;
  return (
    <div className="flex justify-center my-6 w-full">
      <Image 
        src={src} 
        alt={alt || ''} 
        width={800}
        height={500}
        className="rounded-lg max-w-[50%]"
        {...rest}
      />
    </div>
  );
}

export default CustomMDXImage; 