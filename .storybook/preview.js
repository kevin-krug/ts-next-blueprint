import "../src/shared/styles/globals.css";
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

// apply unoptimized prop for next image component in stories
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}