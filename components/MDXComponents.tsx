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

// カスタムpreコンポーネント
const CustomPre = ({ children, ...props }) => {
  return (
    <pre {...props} className="my-4 overflow-auto rounded-lg bg-[#282c34] p-4 text-sm text-white">
      {children}
    </pre>
  );
};

const MDXComponents = {
  LanguageContent,
  img: CustomImage,
  a: CustomLink,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  pre: CustomPre,
  // CodeBlockを使用するコードを削除し、シンプルなコードコンポーネントに置き換え
  code: ({ className, children, ...props }) => {
    // インラインコード
    return <code className="bg-gray-800 text-pink-400 px-1 py-0.5 rounded font-mono text-sm" {...props}>{children}</code>;
  },
  // 他のカスタムコンポーネントもここに追加できます
};

export default MDXComponents; 