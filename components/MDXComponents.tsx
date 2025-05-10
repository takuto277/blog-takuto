import LanguageContent from './LanguageContent';
import CustomImage from './CustomImage';
import CustomLink from './CustomLink';

// カスタムh1コンポーネント - 左揃え + ID付与
const CustomH1 = ({ children }) => {
  const id = children
    ?.toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  
  return (
    <h1 id={id} className="text-left text-2xl font-bold mb-4">
      {children}
    </h1>
  );
};

// カスタムh2コンポーネント - ID付与
const CustomH2 = ({ children }) => {
  const id = children
    ?.toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  
  return (
    <h2 id={id} className="text-left text-xl font-bold mt-8 mb-4">
      {children}
    </h2>
  );
};

// カスタムh3コンポーネント - ID付与
const CustomH3 = ({ children }) => {
  const id = children
    ?.toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  
  return (
    <h3 id={id} className="text-left text-lg font-bold mt-6 mb-3">
      {children}
    </h3>
  );
};

const MDXComponents = {
  LanguageContent,
  img: CustomImage,
  a: CustomLink,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  // 他のカスタムコンポーネントもここに追加できます
};

export default MDXComponents; 