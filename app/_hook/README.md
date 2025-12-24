# useAssetLoader Hook

Custom hook để quản lý việc load assets (fonts và images) trước khi hiển thị nội dung chính.

## Tính năng

- ✅ Load Next.js fonts (Quicksand, Dancing Script) một cách chính xác
- ✅ Load custom fonts từ `globals.css` (@font-face)
- ✅ Preload images trước khi hiển thị nội dung
- ✅ Có timeout cho từng loại asset để tránh blocking
- ✅ Console logs với emoji để dễ debug
- ✅ Error handling tốt, không block user nếu có lỗi

## Cách sử dụng

### 1. Basic Usage - Chỉ load fonts

```tsx
import { useAssetLoader } from "../_hook/useAssetLoader";

const MyComponent = () => {
  const { loadAssets } = useAssetLoader();

  React.useEffect(() => {
    loadAssets().then(() => {
      console.log("All fonts loaded!");
    });
  }, [loadAssets]);

  return <div>Content</div>;
};
```

### 2. Advanced Usage - Load fonts và images

```tsx
import { useAssetLoader } from "../_hook/useAssetLoader";

const MyComponent = () => {
  const { loadAssets } = useAssetLoader({
    imagePaths: [
      "/images/hero-banner.jpg",
      "/images/logo.png",
      "/images/background.jpg",
    ],
    fontTimeout: 3000,
    imageTimeout: 5000,
  });

  React.useEffect(() => {
    loadAssets().then(() => {
      console.log("All assets loaded!");
    });
  }, [loadAssets]);

  return <div>Content</div>;
};
```

### 3. Sử dụng trong AppLoading component

Danh sách images được define trực tiếp trong `AppLoading.tsx`:

```tsx
// In AppLoading.tsx
export const AppLoading: React.FunctionComponent<IBackgroundProps> = ({
  children,
}) => {
  // Danh sách các images quan trọng cần preload trước khi hiển thị trang
  const preloadImages: string[] = [
    "/images/hero-banner.jpg",
    "/images/logo.png",
    "/images/background.jpg",
  ];

  // Hook sẽ tự động load fonts và images
  const { loadAssets } = useAssetLoader({
    imagePaths: preloadImages,
    fontTimeout: 3000,
    imageTimeout: 5000,
  });

  // ...rest of component
};
```

Sử dụng trong MainPage:

```tsx
import { AppLoading } from "../_components/AppLoading";

// Đơn giản, không cần truyền gì
<AppLoading>
  <YourContent />
</AppLoading>;
```

## Options

```typescript
interface UseAssetLoaderOptions {
  /**
   * Array of image paths to preload
   * Default: []
   */
  imagePaths?: string[];

  /**
   * Timeout in milliseconds for font loading
   * Default: 3000
   */
  fontTimeout?: number;

  /**
   * Timeout in milliseconds for image loading
   * Default: 5000
   */
  imageTimeout?: number;
}
```

## Return Value

```typescript
{
  loadAssets: () => Promise<void>;
}
```

## Console Logs

Hook này sẽ log các thông tin sau để giúp debug:

- 🚀 `Starting asset loading...`
- ✅ `Next.js fonts explicitly loaded`
- ✅ `All fonts ready (including custom fonts from globals.css)`
- ✅ `Image 1/3 loaded: /path/to/image.jpg`
- ✅ `All 3 images loaded`
- ✅ `All assets loaded successfully`
- ⚠️ `Font loading timeout - proceeding anyway`
- ⚠️ `Image loading timeout - proceeding anyway`
- ❌ `Failed to load image: /path/to/image.jpg`

## Notes

- Hook tự động load tất cả font weights được định nghĩa trong `layout.tsx`
- Nếu một asset fail, hook sẽ không throw error mà continue để không block user
- Timeouts có thể customize tùy theo nhu cầu
- Images được load song song (parallel) để tăng tốc độ
- **Để thêm images cần preload:** Chỉnh sửa array `preloadImages` trong `/app/_components/AppLoading.tsx`
