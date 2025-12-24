import { useRef } from "react";

/**
 * Custom hook for loading assets (fonts and images) before displaying content
 * @returns {loadAssets: () => Promise<void>} - A function that loads all assets
 */

export interface UseAssetLoaderOptions {
  /**
   * Array of image paths to preload
   */
  imagePaths?: string[];

  /**
   * Timeout in milliseconds for font loading (default: 3000)
   */
  fontTimeout?: number;

  /**
   * Timeout in milliseconds for image loading (default: 5000)
   */
  imageTimeout?: number;
}

export const useAssetLoader = (options?: UseAssetLoaderOptions) => {
  const {
    imagePaths = [],
    fontTimeout = 3000,
    imageTimeout = 5000,
  } = options || {};

  // Keep references to loaded images to prevent garbage collection
  const loadedImagesRef = useRef<HTMLImageElement[]>([]);

  /**
   * Load Next.js fonts explicitly
   */
  const loadNextFonts = async (): Promise<void> => {
    if (!document.fonts) {
      console.warn("Font Loading API not supported");
      return;
    }

    try {
      // Load Quicksand (weights used in layout.tsx)
      await Promise.all([
        document.fonts.load("300 1em Quicksand"),
        document.fonts.load("400 1em Quicksand"),
        document.fonts.load("500 1em Quicksand"),
        document.fonts.load("600 1em Quicksand"),
        document.fonts.load("700 1em Quicksand"),
      ]);

      // Load Dancing Script (weights used in layout.tsx)
      await Promise.all([
        document.fonts.load('400 1em "Dancing Script"'),
        document.fonts.load('500 1em "Dancing Script"'),
        document.fonts.load('600 1em "Dancing Script"'),
        document.fonts.load('700 1em "Dancing Script"'),
      ]);
    } catch (error) {
      console.warn("⚠️ Error loading Next.js fonts:", error);
      throw error;
    }
  };

  /**
   * Wait for all fonts to be ready (including @font-face from globals.css)
   */
  const loadAllFonts = async (): Promise<void> => {
    if (!document.fonts) {
      console.warn("Font Loading API not supported");
      return;
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.warn("⚠️ Font loading timeout - proceeding anyway");
        resolve();
      }, fontTimeout);

      // First load Next.js fonts explicitly, then wait for document.fonts.ready
      loadNextFonts()
        .then(() => document.fonts.ready)
        .then(() => {
          clearTimeout(timeout);
          resolve();
        })
        .catch((error) => {
          clearTimeout(timeout);
          console.error("❌ Font loading error:", error);
          reject(error);
        });
    });
  };

  /**
   * Preload images
   */
  const loadImages = async (paths: string[]): Promise<void> => {
    if (paths.length === 0) {
      return;
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.warn("⚠️ Image loading timeout - proceeding anyway");
        resolve();
      }, imageTimeout);

      let loadedCount = 0;
      let hasError = false;
      const total = paths.length;

      const checkComplete = () => {
        if (loadedCount === total) {
          clearTimeout(timeout);
          resolve();
        }
      };

      paths.forEach((path) => {
        const img = new Image();
        // Keep reference to prevent GC
        loadedImagesRef.current.push(img);

        const handleLoad = async () => {
          try {
            // Ensure image is decoded and ready to paint
            await img.decode();
          } catch (e) {
            // Decode might fail on some browsers or for some image types, but it's fine
            // We just want to try to ensure it's in memory
            console.warn(`Image decode warning for ${path}:`, e);
          } finally {
            loadedCount++;
            checkComplete();
          }
        };

        img.onload = handleLoad;

        img.onerror = (error) => {
          loadedCount++;
          if (!hasError) {
            hasError = true;
            console.error(`❌ Failed to load image: ${path}`, error);
          }
          checkComplete();
        };

        img.src = path;
      });
    });
  };

  /**
   * Load all assets (fonts and images)
   */
  const loadAssets = async (): Promise<void> => {
    try {
      await Promise.all([loadAllFonts(), loadImages(imagePaths)]);
    } catch (error) {
      console.error("❌ Error loading assets:", error);
    }
  };

  return {
    loadAssets,
  };
};
