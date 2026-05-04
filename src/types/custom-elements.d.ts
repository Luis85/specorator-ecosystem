import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        videoid?: string;
        videotitle?: string;
        playlabel?: string;
        params?: string;
      };
    }
  }
}
