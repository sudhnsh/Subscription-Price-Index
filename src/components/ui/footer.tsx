interface FooterProps {
  isDarkMode?: boolean;
  bgColorLight?: string;
  bgColorDark?: string;
  textColorLight?: string;
  textColorDark?: string;
  borderColorLight?: string;
  borderColorDark?: string;
}

export default function Footer({ 
  isDarkMode = true,
  bgColorLight = "bg-white/90",
  bgColorDark = "bg-black/90",
  textColorLight = "text-gray-700",
  textColorDark = "text-white",
  borderColorLight = "border-gray-300",
  borderColorDark = "border-gray-800"
}: FooterProps) {
  // Select colors based on current mode
  const bgColor = isDarkMode ? bgColorDark : bgColorLight;
  const textColor = isDarkMode ? textColorDark : textColorLight;
  const borderColor = isDarkMode ? borderColorDark : borderColorLight;
  
  // Link colors based on mode
  const linkColor = isDarkMode 
    ? "text-white hover:text-gray-300" 
    : "text-gray-900 hover:text-gray-700";
  
  const linkDecoration = isDarkMode 
    ? "decoration-gray-600 hover:decoration-gray-400" 
    : "decoration-gray-400 hover:decoration-gray-600";

  return (
    <footer className={`mt-auto border-t ${borderColor} ${bgColor} backdrop-blur-sm px-6 py-4 ${textColor}`}>
      <p className="text-sm font-normal">
        Built with care by{" "}
        <a 
          href="https://sudhnsh.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${linkColor} transition-colors underline ${linkDecoration}`}
        >
          Sudhanshu
        </a>
      </p>
    </footer>
  );
}