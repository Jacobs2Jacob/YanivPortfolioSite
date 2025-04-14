/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COCKTAIL_API_URL: string;
  readonly VITE_COCKTAILS_STORAGE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}