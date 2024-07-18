import tailwindConfig from "../../tailwind.config";

const GenerateColorOptions = () => {
  const ColorList= [
    "mauve",
    "blue",
    "green",
    "sapphire",
    "maroon",
    "teal",
    "yellow",
    "lavender",
    "rosewater",
    "sky"
  ];

  const options = ColorList.map((color) => {
    const colorCode = tailwindConfig.theme.extend.colors.light[color];
    return { 
      name: color,
      code: colorCode
    };
  });

  return options;
}

export default GenerateColorOptions;